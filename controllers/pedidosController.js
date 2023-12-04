// Importar las clases necesarias desde los módulos correspondientes
import includesModel from "../models/includesModel.js";
import pedidosModel from "../models/pedidosModel.js";
import verificacionModel from "../models/verificacionModel.js";
import empleadosModel from "../models/empleadosModel.js";
import productosModel from "../models/productosModel.js";


// Instanciar objetos de las clases importadas
const includes = new includesModel(); // Instancia de la clase para la inclusión del header y footer en la página
const pedidos = new pedidosModel(); // Instancia de la clase para manejar los datos de pedidos
const verificacion = new verificacionModel(); // Instancia de la clase para verificar la información del usuario
const empleados = new empleadosModel();
const productos = new productosModel();

// Obtener datos del usuario y su rol almacenados en sessionStorage
const usuario = sessionStorage.getItem("usuario"); // Obtener el nombre del usuario
const rol = sessionStorage.getItem("rol"); // Obtener el rol del usuario

if(rol === "ADMS"){
    document.getElementById("nav-agregar-tab").removeAttribute("disabled");
    
}

if(rol === "ADMC"){
    document.getElementById("btnConfirmarEdicion").removeAttribute("disabled");
}

// Obtener datos de pedidos mediante el método cargarDatosPedidos del objeto pedidos
let dataPedidos = await pedidos.cargarDatosPedidos(); // Obtener datos de pedidos desde un archivo JSON
console.log(dataPedidos); // Mostrar los datos de pedidos en la consola
let dataEmpleado = await empleados.getDatosEmpleado(usuario);
console.log(dataEmpleado);
let dataProductos = await productos.cargarDatosProductos();
console.log(dataProductos);

// Llamar a las funciones de los objetos includes para incluir el header y el footer en la página
includes.incluirHeader(); // Incluir el encabezado en la página
includes.incluirFooter(); // Incluir el pie de página en la página

// Verificar el usuario actual con la función verificarUsuario del objeto verificacion
verificacion.verificarUsuario(usuario); // Verificar el usuario y realizar acciones según el rol

// Establecer la variable de selección de la tabla a 1 por defecto
let seleccion = 1; // Variable para determinar qué tipo de pedidos mostrar en la tabla

// Obtener el elemento checkbox con el id "chkestatus"
const chkestatus = document.getElementById("chkestatus"); // Elemento del checkbox de estatus

// Escuchar el evento click del checkbox
chkestatus.addEventListener("click", () => {
    // Obtener el estado actual del checkbox
    let checkbox = chkestatus.checked; // Verificar si el checkbox está marcado

    // Actualizar la variable de selección de acuerdo al estado del checkbox y cargar la tabla
    if (checkbox) {
        seleccion = 0; // Si el checkbox está marcado, seleccionar pedidos inactivos
        loadTable(seleccion); // Cargar la tabla con la nueva selección
    } else {
        seleccion = 1; // Si el checkbox no está marcado, seleccionar pedidos activos
        loadTable(seleccion); // Cargar la tabla con la nueva selección
    }
});

// Cargar la tabla inicialmente con la opción por defecto (seleccion)
loadTable(seleccion); // Llamar a la función para cargar la tabla con la selección actual

// Función para cargar la tabla según la selección realizada
function loadTable(seleccion) {
    // Inicializar la variable para almacenar el contenido de la tabla
    let cuerpo = "";

    // Iterar sobre cada pedido en dataPedidos
    dataPedidos.forEach(function (pedido) {
        // Verificar si el pedido existe
        if (pedido) { }

        // Evaluar la selección actual y construir las filas de la tabla correspondientes
        switch (seleccion) {
            case 0:
                // Filtrar y mostrar solo pedidos con estatus 0 (Inactivos)
                if (pedido.estatus === 0)
                    cuerpo +=
                        '<tr>' +
                        '<td>' + pedido.codigo + '</td>' +
                        '<td>' + pedido.nombre + '</td>' +
                        '<td>' + pedido.unidades + '</td>' +
                        '<td>' + mostrarEstatus(pedido.estatus) + '</td>' +
                        '<td>' +
                        '<div class="text-left">' +
                            '<button type="button" class="btn btn-danger btnEliminar mx-2">Eliminar</button>' +
                            '<button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#modalVerPedido" data-bs-whatever="' + dataPedidos.indexOf(pedido) + '"><i class="fa-solid fa-plus"></i></button>'+
                        '</div>' +
                        '</td>' +
                        '</tr>';
                break;
            case 1:
                // Filtrar y mostrar solo pedidos con estatus 1 (Activos)
                if (pedido.estatus === 1) {
                    cuerpo +=
                        '<tr>' +
                        '<td>' + pedido.codigo + '</td>' +
                        '<td>' + pedido.nombre + '</td>' +
                        '<td>' + pedido.unidades + '</td>' +
                        '<td>' + mostrarEstatus(pedido.estatus) + '</td>' +
                        '<td>' +
                        '<div class="text-left">' +
                            '<button type="button" class="btn btn-danger btnEliminar mx-2">Eliminar</button>' +
                            '<button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#modalVerPedido" data-bs-whatever="' + dataPedidos.indexOf(pedido) + '"><i class="fa-solid fa-plus"></i></button>'+
                        '</div>' +
                        '</td>' +
                        '</tr>';
                    break;
                }
                break;
        }

        // Actualizar el contenido de la tabla en el elemento con id "tblPedidos"
        document.getElementById("tblPedidos").innerHTML = cuerpo;


        // Después de cargar la tabla en la función loadTable
        document.querySelectorAll('#tblPedidos .btnEliminar').forEach((btnEliminar, index) => {
            btnEliminar.addEventListener('click', () => {
                handleEliminarPedido(index);
            });
        });
    });
}



function handleEliminarPedido(index) {
    Swal.fire({
        title: "¿Desea eliminar el pedido?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-secondary mx-2",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Hacer una copia del array
            const newDataPedidos = [...dataPedidos];

            // Eliminar el pedido del array usando splice en la copia
            newDataPedidos.splice(index, 1);

            // Aquí se utiliza el modelo PedidosModel para realizar la eliminación si es necesario
            Swal.fire({
                title: "¡Eliminado!",
                text: "El pedido ha sido eliminado exitosamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-primary",
                },
            }).then(() => {
                // Actualizar la variable dataPedidos con la copia modificada
                dataPedidos = newDataPedidos;

                // Vuelve a cargar la tabla después de eliminar
                loadTable(seleccion);
            });
        }
    });
}


const buscar = document.getElementById("btnBuscar");
buscar.addEventListener("click", () => {
    let cuerpo = "";
    let datobuscado = document.getElementById("txtdatobuscado").value;

    dataPedidos.forEach(function (pedido) {
        let codigo = pedido.codigo;

        if ((codigo == datobuscado) ||
                (datobuscado.toLowerCase() == pedido.nombre.toLowerCase())) {
                    cuerpo +=
                    '<tr>' +
                    '<td>' + pedido.codigo + '</td>' +
                    '<td>' + pedido.nombre + '</td>' +
                    '<td>' + pedido.unidades + '</td>' +
                    '<td>' + mostrarEstatus(pedido.estatus) + '</td>' +
                    '<td>' +
                    '<div class="text-left">' +
                        '<button type="button" class="btn btn-danger btnEliminar mx-2">Eliminar</button>' +
                        '<button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#modalVerPedido" data-bs-whatever="' + dataPedidos.indexOf(pedido) + '"><i class="fa-solid fa-plus"></i></button>'+
                    '</div>' +
                    '</td>' +
                    '</tr>';
        }
    });
    document.getElementById("tblPedidos").innerHTML = cuerpo;
});

function mostrarEstatus(estatus) {
    switch (estatus) {
        case 0:
            return "Completado";
            break;
        case 1:
            return "Pendiente";
            break;
    }
}