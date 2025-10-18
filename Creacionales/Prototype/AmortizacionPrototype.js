class AmortizacionPrototype {
    constructor(tipo, monto, tasa, plazo, tabla, resumen) {
        this.tipo = tipo;
        this.monto = monto;
        this.tasa = tasa;
        this.plazo = plazo;
        this.tabla = tabla;
        this.resumen = resumen;
    }

    // Método clave del patrón
    clonar(nuevosDatos = {}) {
        // Creamos una copia profunda del objeto original
        const copia = new AmortizacionPrototype(
            nuevosDatos.tipo || this.tipo,
            nuevosDatos.monto || this.monto,
            nuevosDatos.tasa || this.tasa,
            nuevosDatos.plazo || this.plazo,
            JSON.parse(JSON.stringify(this.tabla)),
            JSON.parse(JSON.stringify(this.resumen))
        );

        // Si se cambian monto, tasa o plazo → podrías forzar recalcular más adelante
        return copia;
    }
}

module.exports = AmortizacionPrototype;
