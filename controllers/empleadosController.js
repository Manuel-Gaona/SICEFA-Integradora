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
console.log(dataEmpleados);
//contador empleados
let contadorEmpleados = dataEmpleados.length - 2;

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();
//verificar usuario
verificacion.verificarUsuario(usuario);
//Cargar la tabla
let seleccion = 1;

//Escuchar el evento click del boton agregar empleado
const btnAgregarEmpleado = document.getElementById("btnAgregarEmpleado");

btnAgregarEmpleado.addEventListener("click", (event) => {
    event.preventDefault();
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
    let rol = document.getElementById("txtrol").value;
    let gen = document.querySelector('input[name="genero"]:checked').value;
    //datos 
    let genero, mes, dia, tipoUsuario;
    let fecha = new Date();
    let annio = fecha.getFullYear();
    //switch para genero
    switch (gen) {
        case "masculino":
            genero = 0;
            break;
        case "femenino":
            genero = 1;
            break;
    }
    //if para fecha
    if((fecha.getMonth() + 1) < 10){
        mes = "0" + (fecha.getMonth() + 1);
    }
    else{
        mes = "" + (fecha.getMonth() + 1);
    }
    if(fecha.getDate() + 1 < 10){
        dia = "0" + fecha.getDate();
    }
    else{
        dia = "" + fecha.getDate();
    }
    //declarar variable fechaRegistro
    let fechaRegistro = dia + "/" + mes + "/" + annio;
    //aumentar contador
    contadorEmpleados++;
    //declarar variable codigoEmpleado
    let codigoEmpleado = "" + annio.toString().slice(-2) + mes + dia + contadorEmpleados.toString().padStart(2, '0');
    //definir el tipo de usuario
    if(rol === "ADMC"){
        tipoUsuario = 1;
    }
    else if((rol === "ADMS") || (rol === "EMPS")){
        tipoUsuario = 0;
    }

    let empleado = {
        "datosPersona": {
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "genero": genero,
            "fechaNacimiento": fechaNacimiento,
            "rfc": rfc,
            "curp": curp,
            "foto": "",
            "datosDomicilio": {
                "domicilio": domicilio,
                "cp": cp,
                "ciudad": ciudad,
                "estado": estado,
            },
            "telefono": telefono
        },
        "datosLaborales": {
            "fechaIngreso": fechaRegistro,
            "puesto": puesto,
            "salario": salario,
            "email": email,
            "codigoEmpleado": codigoEmpleado,
            "sucursal": "1"
        },
        "usuario": {
            "nombreUsuario": codigoEmpleado,
            "contrasenia": codigoEmpleado,
            "tipoUsuario": tipoUsuario,
            "rol": rol,
            "estatus": 1
        }
    }
    console.log(empleado);
    //enviar datos al servidor
    dataEmpleados.push(empleado);
    console.log(dataEmpleados);
    loadTable(1);
    Swal.fire({
        title: "Se ha agregado correctamente",
        icon: "success"
    });
});

//Escuchar el evento click en nav-consultar-tab
const navConsultarTab = document.getElementById("nav-consultar-tab");
navConsultarTab.addEventListener("click", () => {
    loadTable(seleccion);
});

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

//escuchar click en recargarDatos
const btnRecargar = document.getElementById("btnRecargarDatos");
btnRecargar.addEventListener("click", () => {
    loadTable(seleccion);
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
                                        '<div class="text-center">' +
                                            //btnTable para cargar modal
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataEmpleados.indexOf(empleado) + '"><i class="fa-solid fa-plus"></i></button>' +
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
                                    '<div class="text-center">' +
                                        //btnTable para cargar modal
                                        '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerEmpleado" data-bs-whatever="' + dataEmpleados.indexOf(empleado) + '"><i class="fa-solid fa-plus"></i></button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
                    }
                break;
            }
        } 
        document.getElementById("tblEmpleados").innerHTML = cuerpo;
    });
}
//funcion cuando se activa el modal
const modalVerEmpleado = document.getElementById("modalVerEmpleado");

if (modalVerEmpleado) {
    modalVerEmpleado.addEventListener("show.bs.modal", (event) => {
        //obtener el boton que abre el modal
        const button = event.relatedTarget;
        //obtener el indice del boton
        const indice = button.getAttribute("data-bs-whatever");
        //obtener datos del empleado
        const empleado = dataEmpleados[indice];
        //cargar datos en modal
        empleados.cargarDatosEmpleadoModal(indice, dataEmpleados);
        
        //eliminar botones si el estatus del empleado es 0


        //escuchar el evento click del btnEliminarEmpleado
        const btnEliminarEmpleado = document.getElementById("btnEliminarEmpleado");
        btnEliminarEmpleado.addEventListener("click", () => {
            empleados.eliminarEmpleado(indice, dataEmpleados);
        });

        //escuchar el evento click del btnEditarEmpleado
        const btnEditarEmpleado = document.getElementById("btnEditarEmpleado");
        btnEditarEmpleado.addEventListener("click", () => {
            //habilitar los campos
            empleados.habilitarCamposModal();
            btnEditarEmpleado.classList.add("disabled");
            btnEliminarEmpleado.classList.add("disabled");
            btnConfirmarEdicion.classList.remove("disabled");
        });

        //escuchar el evento click del btnConfirmarEdicion
        const btnConfirmarEdicion = document.getElementById("btnConfirmarEdicion");
        btnConfirmarEdicion.addEventListener("click", () => {
            //pedir confirmacion
            Swal.fire({
                title: "¿Desea actualizar los datos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
            }).then((result) => {
                if(result.isConfirmed){
                    //actualizar datos
                    dataEmpleados[indice] = empleados.confirmarCambiosModal(indice, dataEmpleados);
                    //deshabilitar campos
                    empleados.deshabilitarCamposModal();
                    btnEditarEmpleado.classList.remove("disabled");
                    btnEliminarEmpleado.classList.remove("disabled");
                    btnConfirmarEdicion.classList.add("disabled");
                    console.log(dataEmpleados);
                }
                //mostrar mensaje de confirmacion
                Swal.fire({
                    title: "Se ha actualizado correctamente",
                    icon: "success"
                });
            });
        });

        //escuchar el evento click del btnCerrarModal
        const btnCerrarModal = document.getElementById("btnCerrarModal");
        btnCerrarModal.addEventListener("click", () => {
            loadTable(seleccion);
            empleados.deshabilitarCamposModal();
            btnEditarEmpleado.classList.remove("disabled");
            btnEliminarEmpleado.classList.remove("disabled");
            btnConfirmarEdicion.classList.add("disabled");
        });
        //escuchar el evento click del btnCerrarModal-header
        const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
        btnCerrarModalHeader.addEventListener("click", () => {
            loadTable(seleccion);
            empleados.deshabilitarCamposModal();
            btnEditarEmpleado.classList.remove("disabled");
            btnEliminarEmpleado.classList.remove("disabled");
            btnConfirmarEdicion.classList.add("disabled");
        });
    });
}