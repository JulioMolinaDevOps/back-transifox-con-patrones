class MockAdapter {
    async Open(sql, params = []) {
        console.log("[MockAdapter] Consulta simulada:", sql);
        return [
            { mes: 'Enero', gastos_del_mes: 1000, ingresos_del_mes: 2000, monto_a_favor: 1000 },
            { mes: 'Febrero', gastos_del_mes: 1500, ingresos_del_mes: 2500, monto_a_favor: 1000 },
        ];
    }
}

module.exports = MockAdapter;
