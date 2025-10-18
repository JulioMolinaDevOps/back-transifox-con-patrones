const AmortizacionPrototype = require('../Creacionales/Prototype/AmortizacionPrototype');
const AmortizacionBuilder = require('../Creacionales/Builder/AmortizacionBuilder');
const DirectorAmortizacion = require('../Creacionales/Builder/DirectorAmortizacion');
const AmortizacionFactory = require('../Creacionales/FactoryMethod/AmortizacionFactory');

class ServicioAmortizacion {
    constructor(DB) {
        this.DB = DB;
        this.cacheAmortizaciones = new Map(); // Guardar amortizaciones creadas
    }

    CalcularAmortizacion(Monto, TasaInteres, Plazo, Tipo) {
        const estrategia = AmortizacionFactory.crear(Tipo, Monto, TasaInteres, Plazo);
        const tabla = estrategia.calcular();

        const builder = new AmortizacionBuilder();
        const director = new DirectorAmortizacion(builder);
        const resultado = director.construirRespuesta(Tipo, Monto, TasaInteres, Plazo, tabla);

        // Guardar prototipo en memoria para clonaciones futuras
        const prototipo = new AmortizacionPrototype(
            Tipo, Monto, TasaInteres, Plazo, resultado.tabla, resultado.resumen
        );
        this.cacheAmortizaciones.set(`${Tipo}-${Monto}-${TasaInteres}-${Plazo}`, prototipo);

        return resultado;
    }

    // Nuevo método para clonar una amortización existente
    ClonarAmortizacion(claveExistente, nuevosDatos = {}) {
        const existente = this.cacheAmortizaciones.get(claveExistente);

        if (!existente) {
            return { error: "No existe una amortización con esa clave" };
        }

        const clon = existente.clonar(nuevosDatos);

        // Si hay cambios en el monto, tasa o plazo → recalcular tabla
        if (nuevosDatos.monto || nuevosDatos.tasa || nuevosDatos.plazo) {
            const estrategia = AmortizacionFactory.crear(
                clon.tipo, clon.monto, clon.tasa, clon.plazo
            );
            const nuevaTabla = estrategia.calcular();

            const builder = new AmortizacionBuilder();
            const director = new DirectorAmortizacion(builder);
            return director.construirRespuesta(clon.tipo, clon.monto, clon.tasa, clon.plazo, nuevaTabla);
        }

        // Si no hay cambios, devolver clon directo
        return clon;
    }
    async getHistorico() {
        try {
            const sql = "select * from historico Where Disponible='SI'";
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
