/**
 * @author Juan Manuel Gaona Hernandez
 * @description clase para el modelo de productos donde se crearan los metodos para el controlador
 */
//crear clase
class ProductosModel {
    //metodo constructor
    constructor() {
        //constantes para los elementos del formulario modal
        //id producto en el modal
        this.idProductoModal = document.getElementById('txtidProducto-modal'); 
        //nombre del producto en el modal
        this.nombreModal = document.getElementById('txtnombre-modal');
        //nombre generico del producto en el modal
        this.nombreGenericoModal = document.getElementById('txtnombreGenerico-modal');
        //forma farmaceutica del producto en el modal
        this.formaFarmaceuticaModal = document.getElementById('txtformaFarmaceutica-modal');
        //unidad de medida del producto en el modal
        this.unidadMedidaModal = document.getElementById('txtunidadMedida-modal');
        //presentacion del producto en el modal
        this.presentacionModal = document.getElementById('txtpresentacion-modal');
        //principal indicacion del producto en el modal
        this.principalIndicacionModal = document.getElementById('txtprincipalIndicacion-modal');
        //contraindicaciones del producto en el modal
        this.contraindicacionesModal = document.getElementById('txtcontraindicaciones-modal');
        //concentracion del producto en el modal
        this.concentracionModal = document.getElementById('txtconcentracion-modal');
        //unidades envase del producto en el modal
        this.unidadesEnvaseModal = document.getElementById('txtunidadesEnvase-modal');
        //precio compra del producto en el modal
        this.precioCompraModal = document.getElementById('txtprecioCompra-modal');
        //precio unitario del producto en el modal
        this.precioUnitarioModal = document.getElementById('txtprecioUnitario-modal');
        //codigo de barras del producto en el modal
        this.codigoBarrasModal = document.getElementById('txtcodigoBarras-modal');
        //stock del producto en el modal
        this.stockModal = document.getElementById('txtstock-modal');
        //estatus del producto en el modal
        this.estatusModal = document.getElementById('txtestatus-modal');
        //constantes para botones
        //boton eliminar producto en el modal
        this.btnEliminarProductoModal = document.getElementById('btnEliminarProducto');
        //boton editar producto en el modal
        this.btnEditarProductoModal = document.getElementById('btnEditarProducto');
        //boton cancelar edicion en el modal
        this.btnCancelarEdicionModal = document.getElementById('btnCancelarEdicion');
        //boton confirmar edicion en el modal
        this.btnConfirmarEdicionModal = document.getElementById('btnConfirmarEdicion');
        //boton activar producto en el modal
        this.btnActivarProductoModal = document.getElementById('btnActivarProducto');
    }
    //metodo para regresar los datos del archivo json
    async cargarDatosProductos(){
        if (localStorage.getItem("dataProductos")) {
            //obtener datos del local storage
            return JSON.parse(localStorage.getItem("dataProductos"));
        }else{
            //try para manejar errores
            try {
                //obtener datos del archivo json 
                const res = await fetch('/data/dataProductos.json');
                //convertir datos a json
                const data = await res.json();
                //retornar datos
                return data;
            } catch (error) {
                //mostrar error en consola
                console.log(error);
            }
        }
    }
    //metodo para eliminar un producto requiere el indice del producto y los datos del archivo json
    eliminarProducto(indice, dataProductos){
        //mostrar alerta para confirmar la eliminacion
        Swal.fire({
            //titulo de la alerta
            title: "¿Desea eliminar el producto?",
            //icono de la alerta
            icon: "warning",
            //botones de la alerta
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            //verificar si se confirmo la eliminacion
            if (result.isConfirmed) {
                //Cambiar el estatus del producto a inactivo
                dataProductos[indice].estatus = 0;
                //guardar cambios en el local storage
                localStorage.setItem("dataProductos", JSON.stringify(dataProductos));
                //Mostar estatus en el modal
                this.estatusModal.value = "Inactivo";
                //ocultar botones de editar y eliminar
                this.btnEditarProductoModal.classList.add('d-none');
                this.btnEliminarProductoModal.classList.add('d-none');
                //mostrar boton de activar
                this.btnActivarProductoModal.classList.remove('d-none');
                //mostrar alerta de producto eliminado
                Swal.fire({
                    title: "Producto eliminado",
                    icon: "success"
                });
            }
        });
    }
    //metodo para activar un producto requiere el indice del producto y los datos del archivo json
    activarProducto(indice, dataProductos){
        //mostrar alerta para confirmar la activacion
        Swal.fire({
            //titulo de la alerta
            title: "¿Desea activar el producto?",
            //icono de la alerta
            icon: "warning",
            //botones de la alerta
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            //verificar si se confirmo la activacion
            if (result.isConfirmed) {
                //Cambiar el estatus del producto a activo
                dataProductos[indice].estatus = 1;
                //guardar cambios en el local storage
                localStorage.setItem("dataProductos", JSON.stringify(dataProductos));
                //Mostar estatus en el modal
                this.estatusModal.value = "Activo";
                //mostrar botones de editar y eliminar
                this.btnEditarProductoModal.classList.remove('d-none');
                this.btnEliminarProductoModal.classList.remove('d-none');
                //ocultar boton de activar
                this.btnActivarProductoModal.classList.add('d-none');
                //mostrar alerta de producto activado
                Swal.fire({
                    title: "Producto activado",
                    icon: "success"
                });
            }
        });
    }
    //metodo para busqueda de productos requiere el valor de la busqueda y los datos del archivo json
    busquedaProductos(valorBusqueda, dataProductos, sucursal){
        //declarar el cuerpo de la tabla
        let cuerpo = "";
        //declarar variable para el stock
        let stock;
        //recorrer los productos
        dataProductos.forEach((producto, indice) => {
            //verificar si el producto existe
            if (producto) {
                //verificar si la sucursal existe
                if (sucursal){
                    //obtener sucursal sin espacios
                    sucursal = sucursal.replace(/\s/g, '');
                    //declarar variable para el stock
                    let stockPropiedad = "stock" + sucursal;
                    //dar valor a la variable stock a partir de la variable stockPropiedad
                    stock = producto[stockPropiedad];
                } else {
                    stock = null;
                }
                //convertir el valor de la busqueda a minusculas
                valorBusqueda = valorBusqueda.toLowerCase();
                //verificar si el valor de la busqueda es igual a alguno de los datos del producto
                if (producto.idProducto.toLowerCase().includes(valorBusqueda) || producto.nombreGeneral.toLowerCase().includes(valorBusqueda) || producto.nombreGenerico.toLowerCase().includes(valorBusqueda) || producto.formaFarmaceutica.toLowerCase().includes(valorBusqueda) || producto.unidadMedida.toLowerCase().includes(valorBusqueda) || producto.presentacion.toLowerCase().includes(valorBusqueda) || producto.principalIndicacion.toLowerCase().includes(valorBusqueda) || producto.contraindicaciones.toLowerCase().includes(valorBusqueda) || producto.concentracion.toLowerCase().includes(valorBusqueda) || producto.unidadesEnvase.toLowerCase().includes(valorBusqueda) || producto.precioCompra.toLowerCase().includes(valorBusqueda) || producto.precioVenta.toLowerCase().includes(valorBusqueda) || (producto.codigoBarras == valorBusqueda)) {
                    cuerpo += '<tr>' +
                                    '<td>' + producto.idProducto + '</td>' +
                                    '<td>' + producto.nombreGeneral + '</td>' +
                                    '<td class="d-none d-lg-table-cell">' + producto.unidadMedida + '</td>' +
                                    '<td>' + stock + '</td>' +
                                    '<td>' + producto.precioVenta + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                        //agregar el boton para abrir el modal con el metodo indexOf de la instancia dataProductos
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProducto" data-bs-whatever="' + dataProductos.indexOf(producto) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                }
            }
        });
        //agregar el cuerpo a la tabla
        document.getElementById('tblProductos').innerHTML = cuerpo;
    }

    //metodo paraa cargar los datos del producto en el modal requiere el indice del producto y los datos del archivo json
    cargarDatosProductoModal(dataProducto, sucursal){
        //Verificar si el producto existe
        if (dataProducto){
            //cargar datos en el modal
            //dar valor al id del producto en el modal a partir del id del producto en el json
            this.idProductoModal.value = dataProducto.idProducto;
            //dar valor al nombre del producto en el modal a partir del nombre del producto en el json
            this.nombreModal.value = dataProducto.nombreGeneral;
            //dar valor al nombre generico del producto en el modal a partir del nombre generico del producto en el json
            this.nombreGenericoModal.value = dataProducto.nombreGenerico;
            //dar valor a la forma farmaceutica del producto en el modal a partir de la forma farmaceutica del producto en el json
            this.formaFarmaceuticaModal.value = dataProducto.formaFarmaceutica;
            //dar valor a la unidad de medida del producto en el modal a partir de la unidad de medida del producto en el json
            this.unidadMedidaModal.value = dataProducto.unidadMedida;
            //dar valor a la presentacion del producto en el modal a partir de la presentacion del producto en el json
            this.presentacionModal.value = dataProducto.presentacion;
            //dar valor a la principal indicacion del producto en el modal a partir de la principal indicacion del producto en el json
            this.principalIndicacionModal.value = dataProducto.principalIndicacion;
            //dar valor a las contraindicaciones del producto en el modal a partir de las contraindicaciones del producto en el json
            this.contraindicacionesModal.value = dataProducto.contraindicaciones;
            //dar valor a la concentracion del producto en el modal a partir de la concentracion del producto en el json
            this.concentracionModal.value = dataProducto.concentracion;
            //dar valor a las unidades envase del producto en el modal a partir de las unidades envase del producto en el json
            this.unidadesEnvaseModal.value = dataProducto.unidadesEnvase;
            //dar valor al precio compra del producto en el modal a partir del precio compra del producto en el json
            this.precioCompraModal.value = dataProducto.precioCompra;
            //dar valor al precio unitario del producto en el modal a partir del precio unitario del producto en el json
            this.precioUnitarioModal.value = dataProducto.precioVenta;
            //dar valor al codigo de barras del producto en el modal a partir del codigo de barras del producto en el json
            this.codigoBarrasModal.value = dataProducto.codigoBarras;
            if (sucursal){
                //obtener sucursal sin espacios
                sucursal = sucursal.replace(/\s/g, '');
                //declarar variable para el stock
                let stockPropiedad = "stock" + sucursal;
                //verificar si el stock de la sucursal existe
                if (dataProducto[stockPropiedad]){
                    //dar valor al stock del producto en el modal a partir de la variable stockPropiedad
                    this.stockModal.value = dataProducto[stockPropiedad];
                } else {
                    //dar valor al stock del producto en el modal de 0
                    this.stockModal.value = 0;
                }
            }else {
                //dar valor al stock del producto en el modal de 0
                this.stockModal.value = 0;
            }
            //switch para verificar el estatus del producto
            switch (dataProducto.estatus) {
                //si el estatus es 0
                case 0:
                    //mostrar estatus inactivo en el modal
                    this.estatusModal.value = "Inactivo";
                    //ocultar botones de editar y eliminar
                    this.btnEditarProductoModal.classList.add('d-none');
                    this.btnEliminarProductoModal.classList.add('d-none');
                    //ocultar boton de cancelar edicion
                    this.btnCancelarEdicionModal.classList.add('d-none');
                    //ocultar boton de confirmar edicion
                    this.btnConfirmarEdicionModal.classList.add('d-none');
                    //mostrar boton de activar
                    this.btnActivarProductoModal.classList.remove('d-none');
                    break;
                //si el estatus es 1    
                case 1:
                    //mostrar estatus activo en el modal
                    this.estatusModal.value = "Activo";
                    //mostrar botones de editar y eliminar
                    this.btnEditarProductoModal.classList.remove('d-none');
                    this.btnEliminarProductoModal.classList.remove('d-none');
                    //ocultar boton de cancelar edicion
                    this.btnCancelarEdicionModal.classList.add('d-none');
                    //ocultar boton de confirmar edicion
                    this.btnConfirmarEdicionModal.classList.add('d-none');
                    //ocultar boton de activar
                    this.btnActivarProductoModal.classList.add('d-none');
                    break;
            }
        }
    }
    //metodo para habilitar los campos para editar en el modal
    habilitarCamposModal(){
        //habilitar input de nombre
        this.nombreModal.disabled = false;
        //habilitar input de nombre generico
        this.nombreGenericoModal.disabled = false;
        //habilitar input de forma farmaceutica
        this.formaFarmaceuticaModal.disabled = false;
        //habilitar input de unidad de medida
        this.unidadMedidaModal.disabled = false;
        //habilitar input de presentacion
        this.presentacionModal.disabled = false;
        //habilitar input de principal indicacion
        this.principalIndicacionModal.disabled = false;
        //habilitar input de contraindicaciones
        this.contraindicacionesModal.disabled = false;
        //habilitar input de concentracion
        this.concentracionModal.disabled = false;
        //habilitar input de unidades envase
        this.unidadesEnvaseModal.disabled = false;
        //habilitar input de precio compra
        this.precioCompraModal.disabled = false;
        //habilitar input de precio unitario
        this.precioUnitarioModal.disabled = false;
        //habilitar input de codigo de barras
        this.codigoBarrasModal.disabled = false;
    }
    //metodo para deshabilitar campos en el modal
    deshabilitarCamposModal(){
        //deshabilitar input de nombre
        this.nombreModal.disabled = true;
        //deshabilitar input de nombre generico
        this.nombreGenericoModal.disabled = true;
        //deshabilitar input de forma farmaceutica
        this.formaFarmaceuticaModal.disabled = true;
        //deshabilitar input de unidad de medida
        this.unidadMedidaModal.disabled = true;
        //deshabilitar input de presentacion
        this.presentacionModal.disabled = true;
        //deshabilitar input de principal indicacion
        this.principalIndicacionModal.disabled = true;
        //deshabilitar input de contraindicaciones
        this.contraindicacionesModal.disabled = true;
        //deshabilitar input de concentracion
        this.concentracionModal.disabled = true;
        //deshabilitar input de unidades envase
        this.unidadesEnvaseModal.disabled = true;
        //deshabilitar input de precio compra
        this.precioCompraModal.disabled = true;
        //deshabilitar input de precio unitario
        this.precioUnitarioModal.disabled = true;
        //deshabilitar input de codigo de barras
        this.codigoBarrasModal.disabled = true;
    }
    //metodo para confirmar los cambios en el modal requiere el indice del producto y los datos del archivo json regresa el producto con los cambios
    confirmarCambiosModal(indice, dataProductos){
        //obtener datos del producto a partir del indice
        const producto = dataProductos[indice];
        //Verificar si el producto existe 
        if (producto){
            //Asignar los nuevos valores al producto a partir de los inputs del modal
            //nombre del producto
            producto.nombreGeneral = this.nombreModal.value;
            //nombre generico del producto
            producto.nombreGenerico = this.nombreGenericoModal.value;
            //forma farmaceutica del producto
            producto.formaFarmaceutica = this.formaFarmaceuticaModal.value;
            //unidad de medida del producto
            producto.unidadMedida = this.unidadMedidaModal.value;
            //presentacion del producto
            producto.presentacion = this.presentacionModal.value;
            //principal indicacion del producto
            producto.principalIndicacion = this.principalIndicacionModal.value;
            //contraindicaciones del producto
            producto.contraindicaciones = this.contraindicacionesModal.value;
            //concentracion del producto
            producto.concentracion = this.concentracionModal.value;
            //unidades envase del producto
            producto.unidadesEnvase = this.unidadesEnvaseModal.value;
            //precio compra del producto
            producto.precioCompra = this.precioCompraModal.value;
            //precio unitario del producto
            producto.precioVenta = this.precioUnitarioModal.value;
            //codigo de barras del producto
            producto.codigoBarras = this.codigoBarrasModal.value;
        }
        //retornar producto con los cambios
        return producto;
    }

}
//exportar clase para poder utilizarla en otros archivos
export default ProductosModel;