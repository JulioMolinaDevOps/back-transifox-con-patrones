const AmortizacionPrototype = require('../Creacionales/Prototype/AmortizacionPrototype');
const AmortizacionBuilder = require('../Creacionales/Builder/AmortizacionBuilder');
const DirectorAmortizacion = require('../Creacionales/Builder/DirectorAmortizacion');
const AmortizacionFactory = require('../Creacionales/FactoryMethod/AmortizacionFactory');

class ServicioAmortizacion {
    constructor(DB) {
        this.DB = DB;
        this.cacheAmortizaciones = new Map();
    }

    CalcularAmortizacion(Monto, TasaInteres, Plazo, Tipo) {
        const estrategia = AmortizacionFactory.crear(Tipo, Monto, TasaInteres, Plazo);
        const tabla = estrategia.calcular();

        const builder = new AmortizacionBuilder();
        const director = new DirectorAmortizacion(builder);
        const resultado = director.construirRespuesta(Tipo, Monto, TasaInteres, Plazo, tabla);

        // Guardamos prototipo en memoria
        const prototipo = new AmortizacionPrototype(
            Tipo, Monto, TasaInteres, Plazo, resultado.tabla, resultado.resumen
        );
        this.cacheAmortizaciones.set(`${Tipo}-${Monto}-${TasaInteres}-${Plazo}`, prototipo);

        // 🔥 Retornamos solo la lista
        return resultado.tabla;
    }

    ClonarAmortizacion(claveExistente, nuevosDatos = {}) {
        const existente = this.cacheAmortizaciones.get(claveExistente);
        if (!existente) return { error: "No existe una amortización con esa clave" };

        const clon = existente.clonar(nuevosDatos);

        if (nuevosDatos.monto || nuevosDatos.tasa || nuevosDatos.plazo) {
            const estrategia = AmortizacionFactory.crear(
                clon.tipo, clon.monto, clon.tasa, clon.plazo
            );
            const nuevaTabla = estrategia.calcular();
            const builder = new AmortizacionBuilder();
            const director = new DirectorAmortizacion(builder);
            const resultado = director.construirRespuesta(clon.tipo, clon.monto, clon.tasa, clon.plazo, nuevaTabla);
            return resultado.tabla;
        }

        return clon.tabla || [];
    }

    async getHistorico() {
        try {
            const sql = "SELECT * FROM historico WHERE Disponible='SI'";
            const result = await this.DB.Open(sql, []);
            return result.map(r => ({
                Mes: r.mes,
                Gastos_Del_Mes: r.gastos_del_mes,
                Ingresos_Del_Mes: r.ingresos_del_mes,
                Monto_a_Favor: r.monto_a_favor
            }));
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }
}

module.exports = ServicioAmortizacion;
