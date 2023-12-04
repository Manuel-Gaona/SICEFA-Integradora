/**
 * @author Juan Manuel Gaona Hernandez
 * @description en este archivo se encuentran las funciones que se ejecutan en la vista productos.html
 */
//importar clases
// importar el modelo de includes
import includesModel from "/models/includesModel.js";
// importar el modelo de empleados
import empleadosModel from "../models/empleadosModel.js";
// importar el modelo de productos
import productosModel from "/models/productosModel.js";
// importar el modelo de verificacion
import verificacionModel from "/models/verificacionModel.js";

//instanciar las clases
//instanciar includesModel
const includes = new includesModel();
//instanciar empleadosModel
const empleados = new empleadosModel();
//instanciar productosModel
const productos = new productosModel();
//instanciar verificacionModel
const verificacion = new verificacionModel();

//cargo el header y el footer en el html
//ejecutar el metodo incluirHeader de la instancia includes
includes.incluirHeader();
//ejecutar el metodo incluirFooter de la instancia includes
includes.incluirFooter();

//guardar datos de usuario y rol del sessionStorage
//guardar usuario en variable
const usuario = sessionStorage.getItem("usuario");
//guardar rol en variable
const rol = sessionStorage.getItem("rol");

//guardar datos productos en variable usando el metodo cargarDatosProductos de la instancia productos
let dataProductos = await productos.cargarDatosProductos();
//mostar datos de productos en consola
// console.log(dataProductos);
//declarar el contador de productos para utilizarlo en los id de los productos
let contadorProductos = dataProductos.length;
//guardar datos de empleados en variable usando el metodo getDatosEmpleado de la instancia empleados
let empleado = await empleados.getDatosEmpleado(usuario);
//mostrar datos de empleado en consola
// console.log(empleado);
//declarar variable sucursal
let sucursal;
//verificar si el empleado tiene datos laborales
if (empleado.datosLaborales){
    //guardar sucursal en variable
    sucursal = empleado.datosLaborales.sucursal;
    //mostrar sucursal en nombreSucursal
    document.getElementById("nombreSucursal").innerHTML = " sucursal: " + sucursal;
}
if (rol === "ADMC"){
    //desabilitar el input chkestatusStock
    document.getElementById("chkestatusStock").setAttribute("disabled", "");
}
console.log(sucursal);


//verificar que se haya iniciado sesion
//ejecutar el metodo verificarUsuario de la instancia verificacion
verificacion.verificarUsuario("productos");

//declarar variables para los checkbox
//declarar variable para el checkbox de estatus
let seleccionStatus = 1;
//declarar variable para el checkbox de stock
let seleccionStock = 1;

//verificar si el rol del usuario es ADMC
if(rol === "ADMC"){
    //si el rol es ADMC
    //remover el atributo disabled del nav-agregarProducto-tab
    document.getElementById("nav-agregarProducto-tab").removeAttribute("disabled");
    //remover la clase active del nav-consultar-tab
    document.getElementById("nav-consultar-tab").classList.remove("active");
    //remover la clase show del nav-consultar
    document.getElementById("nav-consultar").classList.remove("show");
    //remover la clase active del nav-consultar
    document.getElementById("nav-consultar").classList.remove("active");
    //agregar la clase active al nav-agregarProducto-tab
    document.getElementById("nav-agregarProducto-tab").classList.add("active");
    //agregar la clase show al nav-agregarProducto
    document.getElementById("nav-agregarProducto").classList.add("show");
    //agregar la clase active al nav-agregarProducto
    document.getElementById("nav-agregarProducto").classList.add("active");
}else {
    //si el rol es otro
    //cargar la tabla con los productos
    loadTable(seleccionStatus, seleccionStock);
}

//funcion que se ejecuta al hacer click en el boton agregar producto
//obtener el boton agregar producto
const btnAgregarProducto = document.getElementById('btnAgregarProducto');
//agregar el evento click al boton agregar producto
btnAgregarProducto.addEventListener('click', (event) => {
    //prevenir que se recargue la pagina
    event.preventDefault();
    //obtener datos del formulario de la pestana agregar producto
    //obtener el nombre de el input txtnombre
    const nombre = document.getElementById('txtnombre').value;
    //obtener el nombre generico de el input txtnombreGenerico
    const nombreGenerico = document.getElementById('txtnombreGenerico').value;
    //obtener la forma farmaceutica de el input txtformaFarmaceutica
    const formaFarmaceutica = document.getElementById('txtformaFarmaceutica').value;
    //obtener la unidad de medida de el input txtunidadMedida
    const unidadMedida = document.getElementById('txtunidadMedida').value;
    //obtener la presentacion de el input txtpresentacion
    const presentacion = document.getElementById('txtpresentacion').value;
    //obtener la principal indicacion de el input txtprincipalIndicacion
    const principalIndicacion = document.getElementById('txtprincipalIndicacion').value;
    //obtener las contraindicaciones de el input txtcontraindicaciones
    const contraindicaciones = document.getElementById('txtcontraindicaciones').value;
    //obtener la concentracion de el input txtconcentracion
    const concentracion = document.getElementById('txtconcentracion').value;
    //obtener las unidades por envase de el input txtunidadesEnvase
    const unidadesEnvase = document.getElementById('txtunidadesEnvase').value;
    //obtener el precio de compra de el input txtprecioCompra
    const precioCompra = document.getElementById('txtprecioCompra').value;
    //obtener el precio unitario de el input txtprecioUnitario
    const precioUnitario = document.getElementById('txtprecioUnitario').value;
    //obtener el codigo de barras de el input txtcodigoBarras
    const codigoBarras = document.getElementById('txtcodigoBarras').value;
    //validar que los campos no esten vacios
    if (nombre === "" || nombreGenerico === "" || formaFarmaceutica === "" || unidadMedida === "" || presentacion === "" || principalIndicacion === "" || contraindicaciones === "" || concentracion === "" || unidadesEnvase === "" || precioCompra === "" || precioUnitario === "" || codigoBarras === ""){
        //mostrar mensaje de error si faltan campos por llenar
        Swal.fire({
            title: "Todos los campos son obligatorios",
            icon: "warning"
        });
    } else {
        //si todos los campos estan llenos agregar el producto
        //actualizar contador de productos para el id
        contadorProductos++;
        //crear objeto producto con los datos del formulario
        let producto = {
            "idProducto": "" + contadorProductos,
            "nombreGeneral": nombre,
            "nombreGenerico": nombreGenerico,
            "formaFarmaceutica": formaFarmaceutica,
            "unidadMedida": unidadMedida,
            "presentacion": presentacion,
            "principalIndicacion": principalIndicacion,
            "contraindicaciones": contraindicaciones,
            "concentracion": concentracion,
            "unidadesEnvase": unidadesEnvase,
            "precioCompra": precioCompra,
            "precioVenta": precioUnitario,
            "foto": "",
            "rutaFoto": "",
            "codigoBarras": codigoBarras,
            "estatus": 1,
            "stockCentro": 0,
            "stockCentroMax": 0,
            "stockPlazaMayor": 0
        }
        //agregar producto al arreglo de productos en la posicion 0 del arreglo con el metodo unshift de la instancia productos
        dataProductos.push(producto);
        //mostrar datos de productos en consola para verificar que se agrego el producto correctamente
        // console.log(dataProductos);
        //guardar datos de productos en el localStorage
        localStorage.setItem("dataProductos", JSON.stringify(dataProductos));
        //vaciar los inputs del formulario de la pestana agregar producto con el metodo reset del formulario
        document.getElementById('formAgregarProducto').reset();
        // hacer focus en el input txtnombre
        document.getElementById('txtnombre').focus();
        //mostrar mensaje de confirmacion de que el producto se agrego correctamente
        Swal.fire({
            title: "Producto agregado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
    }
});
//funcion que se ejecuta al hacer click en el boton nav-consultar-tab
//obtener el boton nav-consultar-tab
const navConsultar = document.getElementById('nav-consultar-tab');
//agregar el evento click al boton nav-consultar-tab
navConsultar.addEventListener('click', () => {
    //cargar la tabla con los productos con la funcion loadTable
    loadTable(seleccionStatus, seleccionStock);
});

//funcion que se ejecuta al hacer click en el boton chkestatus
//obtener el boton chkestatus
const chkestatus = document.getElementById('chkestatus');
//agregar el evento click al boton chkestatus
chkestatus.addEventListener('click', () => {
    //obtener el valor del checkbox
    let checkbox = chkestatus.checked;
    //verificar si el checkbox esta seleccionado
    if (checkbox){
        //si el checkbox esta seleccionado cambiar el valor de la variable seleccionStatus a 0
        seleccionStatus = 0;
        //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
        loadTable(seleccionStatus, seleccionStock)
    } else {
        //si el checkbox no esta seleccionado cambiar el valor de la variable seleccionStatus a 1
        seleccionStatus = 1;
        //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
        loadTable(seleccionStatus, seleccionStock)
    }
});

//funcion que se ejecuta al hacer click en el boton chkestatusStock
//obtener el boton chkestatusStock
const chkestatusStock = document.getElementById('chkestatusStock');
//agregar el evento click al boton chkestatusStock
chkestatusStock.addEventListener('click', () => {
    //obtener el valor del checkbox
    let checkbox = chkestatusStock.checked; 
    //verificar si el checkbox esta seleccionado
    if (checkbox){
        //si el checkbox esta seleccionado cambiar el valor de la variable seleccionStock a 0
        seleccionStock = 0;
        //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
        loadTable(seleccionStatus, seleccionStock)
    } else {
        //si el checkbox no esta seleccionado cambiar el valor de la variable seleccionStock a 1
        seleccionStock = 1;
        //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
        loadTable(seleccionStatus, seleccionStock)
    }
});

//funcion que se ejecuta al hacer click en el boton btnRecargarDatosProducto
//obtener el boton btnRecargarDatosProducto
const btnRecargarDatos = document.getElementById('btnRecargarDatosProducto');
//agregar el evento click al boton btnRecargarDatosProducto
btnRecargarDatos.addEventListener('click', () => {
    //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
    loadTable(seleccionStatus, seleccionStock);
});

//funcion para cargar la tabla con los productos con los parametros seleccionStatus y seleccionStock
async function loadTable(seleccionStatus, seleccionStock){
    //obtener la tabla tblProductos
    let cuerpo = "";
    //usar el metodo forEach para recorrer el arreglo de productos
    await dataProductos.forEach(function (producto){
        //verificar si el producto existe
        if (producto){
            //declarar variable stock
            let stock;
            if (sucursal){
                sucursal = sucursal.replace(/\s/g, '');
                let stockPropiedad = "stock" + sucursal;
                    stock = producto[stockPropiedad];
            } else {
                stock = null;
            }
            //verificar la sucursal
            //verificar si el checkbox de estatus esta seleccionado y el checkbox de stock esta seleccionado
            if (seleccionStatus === 0 && seleccionStock === 0){
                //si el checkbox de estatus esta seleccionado y el checkbox de stock esta seleccionado
                //verificar si el producto esta desactivado y el stock es 0
                if (producto.estatus === 0 && stock === 0){
                    //si el producto esta desactivado y el stock es 0 agregar el producto a la tabla
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
            } else if (seleccionStatus === 0 && seleccionStock === 1){
                //si el checkbox de estatus esta seleccionado y el checkbox de stock no esta seleccionado
                //verificar si el producto esta desactivado y el stock es mayor a 0
                if (producto.estatus === 0){
                    //si el producto esta desactivado agregar el producto a la tabla
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
            } else if (seleccionStatus === 1 && seleccionStock === 0){
                //si el checkbox de estatus no esta seleccionado y el checkbox de stock esta seleccionado
                //verificar si el producto esta activado y el stock es 0
                if (stock === 0){
                    //si el stock es 0 agregar el producto a la tabla
                    cuerpo += '<tr>' +
                                    '<td>' + producto.idProducto + '</td>' +
                                    '<td>' + producto.nombreGeneral + '</td>' +
                                    '<td class="d-none d-lg-table-cell">' + producto.unidadMedida + '</td>' +
                                    '<td>' + stock + '</td>' +
                                    '<td>' + producto.precioVenta + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProducto" data-bs-whatever="' + dataProductos.indexOf(producto) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                }
            } else if (seleccionStatus === 1 && seleccionStock === 1){
                //si el checkbox de estatus no esta seleccionado y el checkbox de stock no esta seleccionado
                //verificar si el producto esta activado y el stock es mayor a 0
                if (producto.estatus === 1 && (stock > 0 || rol === "ADMC")){
                    //si el producto esta activado y el stock es mayor a 0 agregar el producto a la tabla
                    cuerpo += '<tr>' +
                                    '<td>' + producto.idProducto + '</td>' +
                                    '<td>' + producto.nombreGeneral + '</td>' +
                                    '<td class="d-none d-lg-table-cell">' + producto.unidadMedida + '</td>' +
                                    '<td>' + stock + '</td>' +
                                    '<td>' + producto.precioVenta + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProducto" data-bs-whatever="' + dataProductos.indexOf(producto) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                }
            }
        }
        //agregar el cuerpo de la tabla al elemento con el id tblProductos
        document.getElementById("tblProductos").innerHTML = cuerpo;
    });
}

//funcion que se ejecuta al abrir el modalVerProducto
const modalVerProducto = document.getElementById('modalVerProducto');
//verificar si el modalVerProducto existe
if (modalVerProducto){
    //si el modalVerProducto existe
    //escuchar el evento show.bs.modal del modalVerProducto
    modalVerProducto.addEventListener('show.bs.modal', function (event){
        //obtner el boton que abre el modal
        const button = event.relatedTarget;
        //extraer el indice del boton
        const indice = button.getAttribute('data-bs-whatever');
        //obtener datos del producto
        const producto = dataProductos[indice];
        //cargar datos del producto en el modal
        productos.cargarDatosProductoModal(producto, sucursal);
        //checar si el rol es EMPS
        if (rol === "EMPS" || rol === "ADMS"){
            //si el rol es EMPS deshabilitar los campos del modal
            document.getElementById("btnEditarProducto").classList.add("d-none");
            document.getElementById("btnEliminarProducto").classList.add("d-none");
        }
        //funcion que se ejecuta al hacer click en el boton btnEliminarProducto
        //obtener el boton btnEliminarProducto
        const btnEliminarProducto = document.getElementById('btnEliminarProducto');
        //agregar el evento click al boton btnEliminarProducto
        btnEliminarProducto.addEventListener('click', () => {
            //ejectuar el metodo eliminarProducto de la instancia productos con los parametros indice y dataProductos
            productos.eliminarProducto(indice, dataProductos);
        });
        //funcion que se ejecuta al hacer click en el boton btnEditarProducto
        //obtener el boton btnEditarProducto
        const btnEditarProducto = document.getElementById('btnEditarProducto');
        //agregar el evento click al boton btnEditarProducto
        btnEditarProducto.addEventListener('click', () => {
            //habilitar los campos del modal
            productos.habilitarCamposModal()
            //verificar si el rol es ADMC
            if (rol === "ADMC"){
                //ocultar el boton btnEditarProducto;
                btnEditarProducto.classList.add("d-none");
                //ocultar el boton btnEliminarProducto;
                btnEliminarProducto.classList.add("d-none");
                //mostrar el boton btnConfirmarEdicion;
                btnConfirmarEdicion.classList.remove("d-none");
                //mostrar el boton btnCancelarEdicion;
                btnCancelarEdicion.classList.remove("d-none");
            }
        });
        //funcion que se ejecuta al hacer click en el boton btnCancelarEdicion
        //obtener el boton btnCancelarEdicion
        const btnCancelarEdicion = document.getElementById('btnCancelarEdicion');
        //agregar el evento click al boton btnCancelarEdicion
        btnCancelarEdicion.addEventListener('click', () => {
            //deshabilitar los campos del modal
            productos.deshabilitarCamposModal();
            //ejectuar el metodo cargarDatosProductoModal de la instancia productos con los parametros producto y sucursal
            productos.cargarDatosProductoModal(producto, sucursal);
            //verificar si el rol es ADMC
            if (rol === "ADMC"){
                //mostrar el boton btnEditarProducto;
                btnEditarProducto.classList.remove("d-none");
                //mostrar el boton btnEliminarProducto;
                btnEliminarProducto.classList.remove("d-none");
                //ocultar el boton btnConfirmarEdicion;
                btnConfirmarEdicion.classList.add("d-none");
                //ocultar el boton btnCancelarEdicion;
                btnCancelarEdicion.classList.add("d-none");
            }
        });
        //funcion que se ejecuta al hacer click en el boton btnConfirmarEdicion
        //obtener el boton btnConfirmarEdicion
        const btnConfirmarEdicion = document.getElementById('btnConfirmarEdicion');
        //agregar el evento click al boton btnConfirmarEdicion
        btnConfirmarEdicion.addEventListener('click', () => {
            //mostrar mensaje de confirmacion
            Swal.fire({
                title: "¿Desea actualizar los datos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
            }).then((result) => {
                //verificar si se confirmo la accion
                if(result.isConfirmed){
                    //si se confirmo la accion
                    //actualizar datos del producto en dataProductos con el metodo confirmarCambiosModal de la instancia productos con los parametros indice y dataProductos
                    dataProductos[indice] = productos.confirmarCambiosModal(indice, dataProductos);
                    //guardar datos de productos en el localStorage
                    localStorage.setItem("dataProductos", JSON.stringify(dataProductos));
                    //deshabilitar campos
                    productos.deshabilitarCamposModal();
                    //mostrar el boton btnEditarProducto;
                    btnEditarProducto.classList.remove("d-none");
                    //mostrar el boton btnEliminarProducto;
                    btnEliminarProducto.classList.remove("d-none");
                    //ocultar el boton btnConfirmarEdicion;
                    btnConfirmarEdicion.classList.add("d-none");
                    //ocultar el boton btnCancelarEdicion;
                    btnCancelarEdicion.classList.add("d-none");
                    //mostrar datos de productos en consola para verificar que se actualizaron los datos correctamente
                    console.log(dataProductos);
                    //mostrar datos de producto en consola para verificar que se actualizaron los datos correctamente
                    console.log(producto);
                }
                //mostrar mensaje de confirmacion
                Swal.fire({
                    title: "Se ha actualizado correctamente",
                    icon: "success"
                });
            });
        });
        //funcion que se ejecuta al hacer click en el boton btnCerrarModal
        //obtener el boton btnCerrarModal
        const btnCerrarModal = document.getElementById("btnCerrarModal");
        //agregar el evento click al boton btnCerrarModal
        btnCerrarModal.addEventListener("click", () => {
            //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
            loadTable(seleccionStatus, seleccionStock);
            //deshabilitar campos
            productos.deshabilitarCamposModal();
            //verificar si el rol es ADMC
            if (rol === "ADMC"){
                //mostrar el boton btnEditarProducto;
                btnEditarProducto.classList.remove("d-none");
                //mostrar el boton btnEliminarProducto;
                btnEliminarProducto.classList.remove("d-none");
                //ocultar el boton btnConfirmarEdicion;
                btnConfirmarEdicion.classList.add("d-none");
                //ocultar el boton btnCancelarEdicion;
                btnCancelarEdicion.classList.add("d-none");
            }
        });
        //funcion que se ejecuta al hacer click en el boton btnCerrarModalHeader
        //obtener el boton btnCerrarModalHeader
        const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
        //agregar el evento click al boton btnCerrarModalHeader
        btnCerrarModalHeader.addEventListener("click", () => {
            //cargar la tabla con los productos con la funcion loadTable y los parametros seleccionStatus y seleccionStock
            loadTable(seleccionStatus, seleccionStock);
            //deshabilitar campos
            productos.deshabilitarCamposModal();
            //verificar si el rol es ADMC
            if (rol === "ADMC"){
                //si el rol no es ADMC
                //mostrar el boton btnEditarProducto;
                btnEditarProducto.classList.remove("d-none");
                //mostrar el boton btnEliminarProducto;
                btnEliminarProducto.classList.remove("d-none");
                //ocultar el boton btnConfirmarEdicion;
                btnConfirmarEdicion.classList.add("d-none");
                //ocultar el boton btnCancelarEdicion;
                btnCancelarEdicion.classList.add("d-none");
            }
        });
    });
}