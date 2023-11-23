//crear clase
class ClientesModel {
    constructor() {
    }

    //metodo para obtener todos los clientes
    async cargarDatosClientes() {
        try {
            const res = await fetch('/data/dataClientes.json');
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

}

export default ClientesModel;