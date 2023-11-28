//importar clases
import includesModel from "../models/includesModel.js";
import pedidosModel from "../models/pedidosModel.js";
import verificacionModel from "../models/verificacionModel.js";

//instanciar clases
const includes = new includesModel();
const pedidos = new pedidosModel();
const verificacion = new verificacionModel();

//datos sessionStorage
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");

//guardar datos clientes
let dataPedidos = await pedidos.cargarDatosPedidos();
console.log(dataPedidos);

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

//verificar usuario
verificacion.verificarUsuario(usuario);

//seleccion de la tabla
let seleccion = 1;

//Escuchar el evento click del checkbox
const chkestatus = document.getElementById("chkestatus");
chkestatus.addEventListener("click", () => {
    let checkbox = chkestatus.checked;
    if(checkbox){
        seleccion = 0;
        loadTable(seleccion);
    }
    else{
        seleccion = 1;
        loadTable(seleccion);
    }
});

//cargar tabla
loadTable(seleccion);

// funcion para cargar tabla
function loadTable(seleccion) {
    let cuerpo = "";
    dataPedidos.forEach(function (pedido) {
        if (pedido) {
            switch (seleccion) {
                case 0:
                if (pedido.estatus === 0) {
                    cuerpo += 
                        '<tr>' +
                            '<td>' + pedido.codigo +'</td>' +
                            '<td>' + pedido.nombre + '</td>' +
                            '<td>' + pedido.unidades + '</td>' +
                            '<td>' + pedido.estatus + '</td>'+
                            '<td>' +
                                '<div class="text-center">' +
                                    '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataPedidos.indexOf(pedido)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';
                }
            break;
            case 1:
                if (pedido.estatus === 1){ 
                    cuerpo += 
                        '<tr>' +
                        '<td>' + pedido.codigo +'</td>' +
                        '<td>' + pedido.nombre + '</td>' +
                        '<td>' + pedido.unidades + '</td>' +
                        '<td>' + pedido.estatus + '</td>'+
                            '<td>' +
                                '<div class="text-center">' +
                                    '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataPedidos.indexOf(pedido)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';
                }
            break;
                }
            }
        document.getElementById("tblPedidos").innerHTML = cuerpo;
    });
}
