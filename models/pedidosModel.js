// Crear una clase para el modelo de Pedidos
class PedidosModel {
    // Constructor de la clase
    constructor() {
        //constantes para los elementos del formulario modal
        this.idProductoModal = document.getElementById('txtidProducto-modal'); 
        this.nombreModal = document.getElementById('txtnombre-modal');
        this.nombreGenericoModal = document.getElementById('txtnombreGenerico-modal');
        this.formaFarmaceuticaModal = document.getElementById('txtformaFarmaceutica-modal');
        this.unidadMedidaModal = document.getElementById('txtunidadMedida-modal');
        this.presentacionModal = document.getElementById('txtpresentacion-modal');
        this.principalIndicacionModal = document.getElementById('txtprincipalIndicacion-modal');
        this.contraindicacionesModal = document.getElementById('txtcontraindicaciones-modal');
        this.concentracionModal = document.getElementById('txtconcentracion-modal');
        this.unidadesEnvaseModal = document.getElementById('txtunidadesEnvase-modal');
        this.precioCompraModal = document.getElementById('txtprecioCompra-modal');
        this.precioUnitarioModal = document.getElementById('txtprecioUnitario-modal');
        this.codigoBarrasModal = document.getElementById('txtcodigoBarras-modal');
        this.estatusModal = document.getElementById('txtestatus-modal');
        //constantes para botones
        this.btnEliminarProductoModal = document.getElementById('btnEliminarProducto');
        this.btnEditarProductoModal = document.getElementById('btnEditarProducto');
        this.btneConfirmarEdicionModal = document.getElementById('btnConfirmarEdicion');
    }

    // Método para obtener todos los pedidos
    async cargarDatosPedidos() {
        try {
            // Realizar una solicitud para obtener datos de pedidos desde un archivo JSON
            const res = await fetch('/data/dataPedidos.json');
            // Convertir la respuesta a formato JSON
            const data = await res.json();
            // Devolver los datos obtenidos
            return data;
        } catch (err) {
            // Capturar y registrar errores en la consola
            console.log(err);
        }
    }

}

// Exportar la clase PedidosModel para su uso en otros módulos
export default PedidosModel;