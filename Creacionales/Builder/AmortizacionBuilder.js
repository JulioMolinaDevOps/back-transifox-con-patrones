class AmortizacionBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this._tabla = [];
        this._meta = {};
        this._totales = { totalInteres: 0, totalAmortizacion: 0, totalPagado: 0 };
    }

    setMeta({ tipo, monto, tasa, plazo }) {
        this._meta = { tipo, monto, tasa, plazo };
        return this;
    }

    addFila(fila) {
        this._tabla.push(fila);

        const interes = parseFloat(fila.Interes) || 0;
        const amortizacion = parseFloat(fila.Amortizacion) || 0;
        const cuota = parseFloat(fila.CuotaTotal) || 0;

        this._totales.totalInteres += interes;
        this._totales.totalAmortizacion += amortizacion;
        this._totales.totalPagado += cuota;

        return this;
    }

    addFilas(filas) {
        filas.forEach(f => this.addFila(f));
        return this;
    }

    build() {
        const resumen = {
            Total_Interes: this._totales.totalInteres.toFixed(2),
            Total_Amortizacion: this._totales.totalAmortizacion.toFixed(2),
            Total_Pagado: this._totales.totalPagado.toFixed(2)
        };

        return {
            ...this._meta,
            tabla: this._tabla,
            resumen
        };
    }
}

module.exports = AmortizacionBuilder;
