class BaseAmortizacion {
    constructor(Monto, TasaInteres, Plazo) {
        this.Monto = Monto;
        this.TasaInteres = TasaInteres;
        this.Plazo = Plazo;
    }

    calcular() {
        throw new Error("Este metodo debe ser implementado por las subclases");
    }
}

module.exports = BaseAmortizacion;
