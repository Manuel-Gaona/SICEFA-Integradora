//importar clases
import includesModel from "../models/includesModel.js";
import clientesModel from "../models/clientesModel.js";
import verificacionModel from "../models/verificacionModel.js";

//instanciar clases
const includes = new includesModel();
const clientes = new clientesModel();
const verificacion = new verificacionModel();

//datos sessionStorage
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");
//guardar datos clientes
let dataClientes = await clientes.cargarDatosClientes();
console.log(dataClientes);
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
    dataClientes.forEach(function (cliente) {
        if (cliente) {}
        switch (seleccion) {
            case 0:
                if (cliente.datos_adicionales.estatus === "0") 
                    cuerpo += 
                        '<tr>' +
                            '<td>' + cliente.datos_adicionales.id +'</td>' +
                            '<td>' + cliente.datos_personales.nombre + '</td>' +
                            '<td>' + cliente.datos_adicionales.correo_electronico + '</td>'+
                            '<td>' + cliente.datos_adicionales.fecha_de_registro + '</td>'+
                            '<td>' +
                                '<div class="text-center">' +
                                    '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataClientes.indexOf(cliente)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';
                break;
                case 1:
                    if (cliente.datos_adicionales.estatus === "1"){ 
                        cuerpo += 
                            '<tr>' +
                                '<td>' + cliente.datos_adicionales.id +'</td>' +
                                '<td>' + cliente.datos_personales.nombre + '</td>' +
                                '<td>' + cliente.datos_adicionales.correo_electronico + '</td>'+
                                '<td>' + cliente.datos_adicionales.fecha_de_registro + '</td>'+
                                '<td>' +
                                    '<div class="text-center">' +
                                        '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataClientes.indexOf(cliente)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
                    }
                break;
                        
        }
        document.getElementById("tblClientes").innerHTML = cuerpo;
    });
}