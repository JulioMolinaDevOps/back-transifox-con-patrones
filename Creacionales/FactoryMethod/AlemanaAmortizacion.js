const BaseAmortizacion = require('./BaseAmortizacion');

class AlemanaAmortizacion extends BaseAmortizacion {
    calcular() {
        const i = this.TasaInteres;
        const amortizacion = this.Monto / this.Plazo;
        let saldo = this.Monto;
        const tabla = [];

        for (let t = 1; t <= this.Plazo; t++) {
            const interes = saldo * i;
            const cuota = amortizacion + interes;
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

module.exports = AlemanaAmortizacion;
