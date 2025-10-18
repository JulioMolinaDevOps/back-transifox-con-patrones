const AlemanaAmortizacion = require('./AlemanaAmortizacion');
const FrancesaAmortizacion = require('./FrancesaAmortizacion');
const AmericanaAmortizacion = require('./AmericanaAmortizacion');

class AmortizacionFactory {
    static crear(tipo, Monto, TasaInteres, Plazo) {
        switch (tipo) {
            case 'A': return new AlemanaAmortizacion(Monto, TasaInteres, Plazo);
            case 'F': return new FrancesaAmortizacion(Monto, TasaInteres, Plazo);
            case 'M': return new AmericanaAmortizacion(Monto, TasaInteres, Plazo);
            default: throw new Error(`Tipo de amortización no válido: ${tipo}`);
        }
    }
}

module.exports = AmortizacionFactory;
