const oracledb = require('oracledb');

class OracleAdapter {
    constructor(config) {
        this.config = config;
    }

    async Open(sql, params = []) {
        let conn;
        try {
            conn = await oracledb.getConnection(this.config);
            const result = await conn.execute(sql, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
        } finally {
            if (conn) await conn.close();
        }
    }
}

module.exports = OracleAdapter;
