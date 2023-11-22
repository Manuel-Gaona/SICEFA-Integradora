//crear clase
class ProductosModel {
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
    //metodo para cargar los datos del archivo json
    async cargarDatosProductos(){
        try {
            const res = await fetch('/data/dataProductos.json');
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    //metodo para eliminar un producto
    eliminarProducto(indice, dataProductos){
        Swal.fire({
            title: "¿Desea eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                dataProductos[indice].estatus = "0";
                this.estatusModal.value = "Inactivo";
                this.btnEditarProductoModal.classList.add('disabled');
                this.btnEliminarProductoModal.classList.add('disabled');
                Swal.fire({
                    title: "Producto eliminado",
                    icon: "success"
                });
            }
        });
    }
    //metodo paraa cargar los datos del producto en el modal
    cargarDatosProductoModal(indice, dataProductos){
        //obtener datos del producto
        const producto = dataProductos[indice];
        console.log(producto);
        //Verificar si el producto existe
        if (producto){
            //cargar datos en el modal
            this.idProductoModal.value = producto.idProducto;
            this.nombreModal.value = producto.nombreGeneral;
            this.nombreGenericoModal.value = producto.nombreGenerico;
            this.formaFarmaceuticaModal.value = producto.formaFarmaceutica;
            this.unidadMedidaModal.value = producto.unidadMedida;
            this.presentacionModal.value = producto.presentacion;
            this.principalIndicacionModal.value = producto.principalIndicacion;
            this.contraindicacionesModal.value = producto.contraindicaciones;
            this.concentracionModal.value = producto.concentracion;
            this.unidadesEnvaseModal.value = producto.unidadesEnvase;
            this.precioCompraModal.value = producto.precioCompra;
            this.precioUnitarioModal.value = producto.precioVenta;
            this.codigoBarrasModal.value = producto.codigoBarras;
            //switch para verificar el estatus del producto
            switch (producto.estatus) {
                case "0":
                    this.estatusModal.value = "Inactivo";
                    this.btnEditarProductoModal.classList.add('d-none');
                    this.btnEliminarProductoModal.classList.add('d-none');
                    this.btneConfirmarEdicionModal.classList.add('d-none');
                    break;
                case "1":
                    this.btnEditarProductoModal.classList.remove('d-none');
                    this.btnEliminarProductoModal.classList.remove('d-none');
                    this.btneConfirmarEdicionModal.classList.remove('d-none');
                    this.estatusModal.value = "Activo";
                    break;
            }
        }
    }
    //habilitar campos para editar
    habilitarCamposModal(){
        this.nombreModal.disabled = false;
        this.nombreGenericoModal.disabled = false;
        this.formaFarmaceuticaModal.disabled = false;
        this.unidadMedidaModal.disabled = false;
        this.presentacionModal.disabled = false;
        this.principalIndicacionModal.disabled = false;
        this.contraindicacionesModal.disabled = false;
        this.concentracionModal.disabled = false;
        this.unidadesEnvaseModal.disabled = false;
        this.precioCompraModal.disabled = false;
        this.precioUnitarioModal.disabled = false;
        this.codigoBarrasModal.disabled = false;
    }
    //deshabilitar campos para editar
    deshabilitarCamposModal(){
        this.nombreModal.disabled = true;
        this.nombreGenericoModal.disabled = true;
        this.formaFarmaceuticaModal.disabled = true;
        this.unidadMedidaModal.disabled = true;
        this.presentacionModal.disabled = true;
        this.principalIndicacionModal.disabled = true;
        this.contraindicacionesModal.disabled = true;
        this.concentracionModal.disabled = true;
        this.unidadesEnvaseModal.disabled = true;
        this.precioCompraModal.disabled = true;
        this.precioUnitarioModal.disabled = true;
        this.codigoBarrasModal.disabled = true;
    }
    //confirmar edicion
    confirmarCambiosModal(indice, dataProductos){
        //obtener datos del producto
        const producto = dataProductos[indice];
        //Verificar si el producto existe
        if (producto){
            //cargar datos en el modal
            producto.nombreGeneral = this.nombreModal.value;
            producto.nombreGenerico = this.nombreGenericoModal.value;
            producto.formaFarmaceutica = this.formaFarmaceuticaModal.value;
            producto.unidadMedida = this.unidadMedidaModal.value;
            producto.presentacion = this.presentacionModal.value;
            producto.principalIndicacion = this.principalIndicacionModal.value;
            producto.contraindicaciones = this.contraindicacionesModal.value;
            producto.concentracion = this.concentracionModal.value;
            producto.unidadesEnvase = this.unidadesEnvaseModal.value;
            producto.precioCompra = this.precioCompraModal.value;
            producto.precioVenta = this.precioUnitarioModal.value;
            producto.codigoBarras = this.codigoBarrasModal.value;
        }
        return producto;
    }

}
export default ProductosModel;