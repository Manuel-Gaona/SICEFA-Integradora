//crear clase
class PedidosModel {
    constructor() {
    }

    //metodo para obtener todos los clientes
    async cargarDatosPedidos() {
        try {
            const res = await fetch('/data/dataPedidos.json');
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default PedidosModel;