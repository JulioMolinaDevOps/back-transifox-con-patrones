const BaseAmortizacion = require('./BaseAmortizacion');

class AmericanaAmortizacion extends BaseAmortizacion {
    calcular() {
        const i = this.TasaInteres;
        const tabla = [];
        const interes = this.Monto * i;
        let saldo = this.Monto;

        for (let t = 1; t <= this.Plazo; t++) {
            let amortizacion = 0;
            let cuota = interes;

            if (t === this.Plazo) {
                amortizacion = this.Monto;
                cuota += amortizacion;
                saldo = 0;
            }

            tabla.push({
                Periodo: t,
                SaldoInicial: t === 1 ? this.Monto.toFixed(2) : tabla[t - 2].SaldoFinal,
                Amortizacion: amortizacion.toFixed(2),
                Interes: interes.toFixed(2),
                CuotaTotal: cuota.toFixed(2),
                SaldoFinal: saldo.toFixed(2)
            });
        }

        return tabla;
    }
}

module.exports = AmericanaAmortizacion;
