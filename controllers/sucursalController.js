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

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

//Cargar datos de empleado y verificar usuario
verificacion.verificarUsuario(usuario);
cargarDatosEmpleado();

//Acortar funciones
function docID(id){
    return document.getElementById(id);
}

//cargar datos empleado 
async function cargarDatosEmpleado(){
        //cargar datos de empleado
        const empleado = await empleados.getDatosEmpleado(usuario, await empleados.cargarDatosEmpleados());

        //revisar que exista el empleado.datosPersona
        if(empleado.datosPersona){
            //constante para nombre completo
            const nombreCompleto = empleado.datosPersona.nombre + " " + empleado.datosPersona.apellidoP + " " + empleado.datosPersona.apellidoM;
            //let para genero
            let genero;
            //switch para genero
            switch(empleado.datosPersona.genero){
                case 0: genero = "Masculino"; break;
                case 1: genero = "Femenino"; break;
            }
            //console.log(empleado);
            //Nombre bienvenida
            docID("nombreBienvenida").innerHTML = " " + empleado.datosPersona.nombre;
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
    btnUpdatePasswordConfirm.disabled = false;
    btnUpdatePasswordCancel.disabled = false;
    btnUpdatePassword.disabled = true;
});

btnUpdatePasswordConfirm.addEventListener("click", () => {
    if(txtcontrasenia.value == ""){
        alert("La contraseña no puede estar vacía.");
    }
    else{
        empleados.updatePassword(usuario, txtcontrasenia.value);
        docID("txtcontrasenia").disabled = true;
        btnUpdatePasswordConfirm.disabled = true;
        btnUpdatePasswordCancel.disabled = true;
        btnUpdatePassword.disabled = false;
    }
});

btnUpdatePasswordCancel.addEventListener("click", () => {
    docID("txtcontrasenia").disabled = true;
    btnUpdatePasswordConfirm.disabled = true;
    btnUpdatePasswordCancel.disabled = true;
    btnUpdatePassword.disabled = false;
    cargarDatosEmpleado(); 
});