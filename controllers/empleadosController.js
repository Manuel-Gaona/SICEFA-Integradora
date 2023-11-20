//importar clases
import includesModel from "../models/includesModel.js";
import empleadosModel from "../models/empleadosModel.js";
import verificacionModel from "../models/verificacionModel.js";

//instanciar clases
const includes = new includesModel();
const empleados = new empleadosModel();
const verificacion = new verificacionModel();

//llamar datos sessionStorege
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");
// Crear const dataEmpleados para guardar los datos de los empleados
const dataEmpleados = await empleados.cargarDatosEmpleados();

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();
//verificar usuario
verificacion.verificarUsuario(usuario);
//Cargar la tabla
loadTable(1);

//Escuchar el evento click del boton agregar empleado
const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado");

btnAgregarEmpleado.addEventListener("click", () => {
    //obtener datos del formulario
    let nombre = document.getElementById("txtnombre").value;
    let apellidoP = document.getElementById("txtapellidoP").value;
    let apellidoM = document.getElementById("txtapellidoM").value;
    let fechaNacimiento = document.getElementById("txtfechaNac").value;
    let rfc = document.getElementById("txtrfc").value;
    let curp = document.getElementById("txtcurp").value;
    let domicilio = document.getElementById("txtdomicilio").value;
    let cp = document.getElementById("txtcp").value;
    let ciudad = document.getElementById("txtciudad").value;
    let estado = document.getElementById("txtestado").value;
    let telefono = document.getElementById("txttelefono").value;
    let email = document.getElementById("txtemail").value;
    let puesto = document.getElementById("txtpuesto").value;
    let salario = document.getElementById("txtsalario").value;
    
});

//Escuchar el evento click del checkbox
const chkestatus = document.getElementById("chkestatus");

chkestatus.addEventListener("click", () => {
    let checkbox = chkestatus.checked;
    if(checkbox){
        loadTable(0);
    }
    else{
        loadTable(1);
    }
});
//funcion para cargar la tabla
function loadTable(seleccion){
    let cuerpo = " ";
    dataEmpleados.forEach(function (empleado){
        if (empleado.datosLaborales && empleado.datosPersona && empleado.usuario){
            switch(seleccion){
                case 0:
                    if(empleado.usuario.estatus === 0){
                        var nombreEmpleado = empleado.datosPersona.nombre + " " + empleado.datosPersona.apellidoP + " " + empleado.datosPersona.apellidoM;
                        cuerpo += '<tr>'+
                                    '<td>'+ empleado.datosLaborales.codigoEmpleado +'</td>'+
                                    '<td>'+ nombreEmpleado +'</td>'+
                                    '<td class="d-none d-md-table-cell">'+ empleado.datosLaborales.email +'</td>'+
                                    '<td>' + empleado.usuario.rol + '</td>'+
                                    '<td>' +
                                        '<div class="dropdown d-md-none">' +
                                            '<button class="btn btn-sm btn-secondary dropdown-toggle col-4 m-auto" type="button" id="accionesDropdown" data-bs-toggle="dropdown" aria-expanded="false"></button>' +
                                            '<ul class="dropdown-menu text-center" aria-labelledby="accionesDropdown">' +
                                                '<li><button class="btn btn-sm btn-success col-8 m-auto mb-2"><i class="fa-solid fa-eye"></i></button></li>' +
                                                '<li><button class="btn btn-sm btn-warning col-8 m-auto mb-2"><i class="fa-solid fa-pen"></i></button></li>' +
                                                '<li><button class="btn btn-sm btn-danger col-8 m-auto"><i class="fa-solid fa-trash"></i></button></li>' +
                                            '</ul>' +
                                        '</div>' +
                                        '<div class="row d-none d-md-block">' +
                                            '<button class="btn btn-sm btn-success col-3 mx-1"><i class="fa-solid fa-eye"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                break;
                case 1:
                    if(empleado.usuario.estatus === 1){
                    var nombreEmpleado = empleado.datosPersona.nombre + " " + empleado.datosPersona.apellidoP + " " + empleado.datosPersona.apellidoM;
                    cuerpo += '<tr>'+
                                '<td>'+ empleado.datosLaborales.codigoEmpleado +'</td>'+
                                '<td>'+ nombreEmpleado +'</td>'+
                                '<td class="d-none d-md-table-cell">'+ empleado.datosLaborales.email +'</td>'+
                                '<td>' + empleado.usuario.rol + '</td>'+
                                '<td>' +
                                    '<div class="dropdown d-md-none row">' +
                                        '<button class="btn btn-sm btn-secondary dropdown-toggle col-4 mx-auto" type="button" id="accionesDropdown" data-bs-toggle="dropdown" aria-expanded="false"></button>' +
                                        '<ul class="dropdown-menu text-center" aria-labelledby="accionesDropdown">' +
                                            '<li><button class="btn btn-sm btn-success col-8 m-auto mb-2"><i class="fa-solid fa-eye"></i></button></li>' +
                                            '<li><button class="btn btn-sm btn-warning col-8 m-auto mb-2"><i class="fa-solid fa-pen"></i></button></li>' +
                                            '<li><button class="btn btn-sm btn-danger col-8 m-auto"><i class="fa-solid fa-trash"></i></button></li>' +
                                        '</ul>' +
                                    '</div>' +
                                    '<div class="row d-none d-md-block">' +
                                        '<button class="btn btn-sm btn-success col-3 mx-1"><i class="fa-solid fa-eye"></i></button>' +
                                        '<button class="btn btn-sm btn-warning col-3 mx-1"><i class="fa-solid fa-pen"></i></button>' +
                                        '<button class="btn btn-sm btn-danger col-3 mx-1"><i class="fa-solid fa-trash"></i></button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
                    }
                break;
            }

        }

    });

    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}