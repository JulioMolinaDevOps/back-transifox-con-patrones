const BaseAmortizacion = require('./BaseAmortizacion');

class FrancesaAmortizacion extends BaseAmortizacion {
    calcular() {
        const i = this.TasaInteres;
        const cuota = (this.Monto * i) / (1 - Math.pow(1 + i, -this.Plazo));
        let saldo = this.Monto;
        const tabla = [];

        for (let t = 1; t <= this.Plazo; t++) {
            const interes = saldo * i;
            const amortizacion = cuota - interes;
            const saldoFinal = saldo - amortizacion;

            tabla.push({
                Periodo: t,
                SaldoInicial: saldo.toFixed(2),
                Amortizacion: amortizacion.toFixed(2),
                Interes: interes.toFixed(2),
                CuotaTotal: cuota.toFixed(2),
                SaldoFinal: saldoFinal.toFixed(2)
            });

            saldo = saldoFinal;
        }

        return tabla;
    }
}

module.exports = FrancesaAmortizacion;
