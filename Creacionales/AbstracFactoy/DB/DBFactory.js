const PostgresAdapter = require('./PostgresAdapter');
const OracleAdapter = require('./OracleAdapter');
const MockAdapter = require('./MockAdapter');

class DBFactory {
    static create(dbType, config) {
        switch (dbType) {
            case 'postgres':
                return new PostgresAdapter(config);
            case 'oracle':
                return new OracleAdapter(config);
            case 'mock':
                return new MockAdapter();
            default:
                throw new Error(`Tipo de base de datos no soportado: ${dbType}`);
        }
    }
}

module.exports = DBFactory;
