class DirectorAmortizacion {
    constructor(builder) {
        this.builder = builder;
    }

    construirRespuesta(tipo, monto, tasa, plazo, tabla) {
        return this.builder
            .setMeta({ tipo, monto, tasa, plazo })
            .addFilas(tabla)
            .build();
    }
}

module.exports = DirectorAmortizacion;
