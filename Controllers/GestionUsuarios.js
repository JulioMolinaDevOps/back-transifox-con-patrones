


class ServicioUsuarios {

    constructor(DB) {
        this.DB = DB;
    }




    async addUsuarios(Email, Cedula, Clave) {
        try {

            console.log(Email, Cedula, Clave);


            const sql = "INSERT INTO usuarios (Email, Cedula, Clave) VALUES ($1, $2, $3)";

            await this.DB.Open(sql, [Email, Cedula, Clave]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getUsuarios() {
        try {
            const sql = "select * from usuarios Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);

            if (result && result.length > 0) {

                return result.map(propiedad => ({
                    "Cedula": propiedad.cedula,
                    "Email": propiedad.email,
                    "Clave": propiedad.clave,

                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }

    async getUsuarioEspecifico(Cedula, Clave) {
        try {
            const sql = "SELECT * FROM usuarios WHERE Cedula = ? and Clave = ?";
            let result = await this.DB.Open(sql, [Cedula, Clave]);

            if (result && result.length > 0) {
                return {

                    "Correcto": true,


                };
            } else {
                return { "Correcto": false };
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }





}

module.exports = ServicioUsuarios;