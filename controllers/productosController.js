//importar clases
import includesModel from "/models/includesModel.js";
import productosModel from "/models/productosModel.js";
import verificacionModel from "/models/verificacionModel.js";

//instancia de clases
const includes = new includesModel();
const productos = new productosModel();
const verificacion = new verificacionModel();

//datos sessionStorage
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");
//guardar datos productos
let dataProductos = await productos.cargarDatosProductos();
console.log(dataProductos);
//contador de productos
let contadorProductos = dataProductos.length -1;

//incluir header y footer
includes.incluirHeader();
includes.incluirFooter();
//verificar usuario
verificacion.verificarUsuario(usuario);
//seleccion de la tabla 
let seleccion = 1;
//cargar tabla
loadTable(seleccion);

//click en chkestatus
const chkestatus = document.getElementById('chkestatus');
chkestatus.addEventListener('click', () => {
    let checkbox = chkestatus.checked;
    if (checkbox){
        seleccion = 0;
        loadTable(seleccion)
    } else {
        seleccion = 1;
        loadTable(seleccion)
    }
});

//click en recargar Datos
const btnRecargarDatos = document.getElementById('btnRecargarDatosProducto');
btnRecargarDatos.addEventListener('click', () => {
    loadTable(seleccion);
});

//cargar tabla
async function loadTable(seleccion){
    let cuerpo = "";
    await dataProductos.forEach(function (producto){
        if (producto){
            switch(seleccion){
                case 0:
                    if (producto.estatus === "0"){
                        cuerpo += '<tr>' +
                                    '<td>' + producto.idProducto + '</td>' +
                                    '<td>' + producto.nombreGeneral + '</td>' +
                                    '<td class="d-none d-lg-table-cell">' + producto.concentracion + '</td>' +
                                    '<td>' + producto.unidadMedida + '</td>' +
                                    '<td>' + producto.precioVenta + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProducto" data-bs-whatever="' + dataProductos.indexOf(producto) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                break;
                case 1:
                    if (producto.estatus === "1"){
                        cuerpo += '<tr>' +
                                    '<td>' + producto.idProducto + '</td>' +
                                    '<td>' + producto.nombreGeneral + '</td>' +
                                    '<td class="d-none d-lg-table-cell">' + producto.concentracion + '</td>' +
                                    '<td>' + producto.unidadMedida + '</td>' +
                                    '<td>' + producto.precioVenta + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProducto" data-bs-whatever="' + dataProductos.indexOf(producto) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                break;
                default:
                    cuerpo += `
                    <tr>
                        <td>hola</td>
                    </tr>
                    `;
            }
        }
        document.getElementById("tblProductos").innerHTML = cuerpo;
    });
}

//modal
const modalVerProducto = document.getElementById('modalVerProducto');

if (modalVerProducto){
    modalVerProducto.addEventListener('show.bs.modal', function (event){
        //boton que abre el modal
        const button = event.relatedTarget;
        //extraer el indice del boton
        const indice = button.getAttribute('data-bs-whatever');
        //obtener datos del producto
        const producto = dataProductos[indice];
        //cargar datos del producto en el modal
        productos.cargarDatosProductoModal(indice, dataProductos);

        //click en eliminar producto
        const btnEliminarProducto = document.getElementById('btnEliminarProducto');
        btnEliminarProducto.addEventListener('click', () => {
            productos.eliminarProducto(indice, dataProductos);
        });
        //click en editar producto
        const btnEditarProducto = document.getElementById('btnEditarProducto');
        btnEditarProducto.addEventListener('click', () => {
            productos.habilitarCamposModal();
        });
        //click en confirmar edicion
        const btnConfirmarEdicion = document.getElementById('btnConfirmarEdicion');
        btnConfirmarEdicion.addEventListener('click', () => {
            Swal.fire({
                title: "¿Desea actualizar los datos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
            }).then((result) => {
                if(result.isConfirmed){
                    //actualizar datos
                    dataProductos[indice] = productos.confirmarCambiosModal(indice, dataProductos);
                    //deshabilitar campos
                    productos.deshabilitarCamposModal();
                    btnEditarProducto.classList.remove("disabled");
                    btnEliminarProducto.classList.remove("disabled");
                    btnConfirmarEdicion.classList.add("disabled");
                    console.log(dataProductos);
                }
                //mostrar mensaje de confirmacion
                Swal.fire({
                    title: "Se ha actualizado correctamente",
                    icon: "success"
                });
            });
        });
        //click en btnCerrarModal
        const btnCerrarModal = document.getElementById("btnCerrarModal");
        btnCerrarModal.addEventListener("click", () => {
            loadTable(seleccion);
            productos.deshabilitarCamposModal();
            btnEditarProducto.classList.remove("disabled");
            btnEliminarProducto.classList.remove("disabled");
            btnConfirmarEdicion.classList.add("disabled");
        });
        //escuchar el evento click del btnCerrarModal-header
        const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
        btnCerrarModalHeader.addEventListener("click", () => {
            loadTable(seleccion);
            productos.deshabilitarCamposModal();
            btnEditarProducto.classList.remove("disabled");
            btnEliminarProducto.classList.remove("disabled");
            btnConfirmarEdicion.classList.add("disabled");
        });
    });
}