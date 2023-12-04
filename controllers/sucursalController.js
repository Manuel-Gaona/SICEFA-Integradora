//importar clases
import includesModel from "../models/includesModel.js";
import empleadosModel from "../models/empleadosModel.js";
import verificacionModel from "../models/verificacionModel.js";

//instanciar clases
const includes = new includesModel();
const empleados = new empleadosModel();
const verificacion = new verificacionModel();

//Llamar datos sessionStorege
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");

//cargar datos de empleado
const empleado = await empleados.getDatosEmpleado(usuario, await empleados.cargarDatosEmpleados());

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

//Cargar datos de empleado y verificar usuario
verificacion.verificarUsuario("inicio");
cargarDatosEmpleado();

//Acortar funciones
function docID(id){
    return document.getElementById(id);
}

//verificar rol de usuario
if(rol === "ADMC"){
    document.title = "Central"
}

//cargar datos empleado 
async function cargarDatosEmpleado(){

        //revisar que exista el empleado.datosPersona
        if(empleado.datosPersona){
            //constante para nombre completo
            const nombreCompleto = empleado.datosPersona.nombre + " " + empleado.datosPersona.apellidoP + " " + empleado.datosPersona.apellidoM;
            //let para genero
            let genero;
            //switch para genero
            switch(empleado.datosPersona.genero){
                case 0: 
                    genero = "Masculino"; 
                    docID("nombreBienvenida").innerHTML = "¡Bienvenido " + empleado.datosPersona.nombre + "!";
                    break;
                case 1: 
                    genero = "Femenino"; 
                    docID("nombreBienvenida").innerHTML = "¡Bienvenida " + empleado.datosPersona.nombre + "!";
                    break;
                default: genero = "No especificado"; break;
            }
            //console.log(empleado);
            //datos de persona
            docID("txtnombre").value = nombreCompleto;
            docID("txtgenero").value = genero;
            docID("txtfechaNac").value = empleado.datosPersona.fechaNacimiento;
            docID("txtrfc").value = empleado.datosPersona.rfc;
            docID("txtcurp").value = empleado.datosPersona.curp;
            docID("txtdomicilio").value = empleado.datosPersona.datosDomicilio.domicilio;
            docID("txtcp").value = empleado.datosPersona.datosDomicilio.cp;
            docID("txtciudad").value = empleado.datosPersona.datosDomicilio.ciudad;
            docID("txtestado").value = empleado.datosPersona.datosDomicilio.estado;
            docID("txttelefono").value = empleado.datosPersona.telefono;
        }
        if(empleado.datosLaborales){
            //datos laborales
            docID("txtsucursal").value = empleado.datosLaborales.sucursal;
            docID("txtcodigoEmpleado").value = empleado.datosLaborales.codigoEmpleado;
            docID("txtemail").value = empleado.datosLaborales.email;
            docID("txtpuesto").value = empleado.datosLaborales.puesto;
            docID("txtsalario").value = empleado.datosLaborales.salario;
            docID("txtfechaIngreso").value = empleado.datosLaborales.fechaIngreso;
        }
        if(empleado.usuario){
            //datos usuario
            docID("txtnombreUsuario").value = empleado.usuario.nombreUsuario;
            docID("txtcontrasenia").value = empleado.usuario.contrasenia;
            docID("txtrol").value = empleado.usuario.rol;
        }
}

//funcion para cambiar contraseña
const btnUpdatePassword = docID("btnUpdatePassword");
const btnUpdatePasswordConfirm = docID("btnUpdatePasswordConfirm");
const btnUpdatePasswordCancel = docID("btnUpdatePasswordCancel");
const txtcontrasenia = docID("txtcontrasenia");

btnUpdatePassword.addEventListener("click", () => {
    docID("txtcontrasenia").disabled = false;
    docID("txtcontrasenia").focus();
    docID("txtcontrasenia").select();
    docID("txtcontrasenia").value = "";
    //mostrar botones
    btnUpdatePasswordConfirm.classList.remove("d-none");
    btnUpdatePasswordCancel.classList.remove("d-none");
    //ocultar boton
    btnUpdatePassword.classList.add("d-none");
});

btnUpdatePasswordConfirm.addEventListener("click", () => {
    if(txtcontrasenia.value == ""){
        //mostrar alerta de error
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La contraseña no puede estar vacía"
        });
    }
    else if(txtcontrasenia.value == empleado.usuario.contrasenia){
        //mostrar alerta de error
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La contraseña no puede ser igual a la anterior"
        });
    }
    else{
        //actualizar contraseña
        empleados.updatePassword(usuario, txtcontrasenia.value);
        //deshabilitar input
        docID("txtcontrasenia").disabled = true;
        //ocultar botones
        btnUpdatePasswordConfirm.classList.add("d-none");
        btnUpdatePasswordCancel.classList.add("d-none");
        //mostrar boton
        btnUpdatePassword.classList.remove("d-none");
        //mostrar alerta de exito
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Contraseña actualizada correctamente"
        });
    }
});

btnUpdatePasswordCancel.addEventListener("click", () => {
    docID("txtcontrasenia").disabled = true;
    //ocultar botones
    btnUpdatePasswordConfirm.classList.add("d-none");
    btnUpdatePasswordCancel.classList.add("d-none");
    //mostrar boton
    btnUpdatePassword.classList.remove("d-none");
    //cargar datos de empleado
    cargarDatosEmpleado(); 
});