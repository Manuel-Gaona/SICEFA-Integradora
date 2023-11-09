//declarar variables
let paginaInicio = 0;

//importar las clases
import ModoColorModel from "../../models/modoColorModel.js";
import loginModel from "../../models/loginModel.js";
import empleadosModel from "../../models/empleadosModel.js";

//instanciar las clases
const modoColor = new ModoColorModel();
const login = new loginModel();
const empleados = new empleadosModel();

//escuchar click en el botón btn-tema-color
const btnModoColor = document.getElementById('btn-tema-color');

btnModoColor.addEventListener('click', () => {
        modoColor.cambiarModoColor();
    }
)

//Alternar entre el login de sucursal y el login de central
const btnCambiarLogin = document.getElementById('btn-cambiar-login');
const linkCambiarLogin = document.getElementById('link-cambiar-login');

btnCambiarLogin.addEventListener('click', () => {
  cambiarLogin();
});

linkCambiarLogin.addEventListener('click', () => {
  cambiarLogin();
});

function cambiarLogin() {
    login.cambiarLogin(paginaInicio);
    paginaInicio = 1 - paginaInicio; // Alternar entre 0 y 1
  }

/*
//escuchar click en el botón btn-cambiar-login
const btnCambiarLogin = document.getElementById('btn-cambiar-login')

btnCambiarLogin.addEventListener('click', () => {
        login.cambiarLogin(paginaInicio);
        if (paginaInicio == 0){
            paginaInicio = 1;
        }
        else{
            paginaInicio = 0;
        }
    }
)*/
//proceso de login
const divMensajeError = document.getElementById("mensaje-error");
const mensajeError = (mensaje) => '<div class="alert alert-danger text-center mb-0 mt-2" role="alert">' + mensaje + '</div>';
const form = document.forms.login;

form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const usuarioInput = form.usuario.value;
        const contraseniaInput = form.contrasenia.value;

        const dataEmpleados = await empleados.cargarDatosEmpleados();
        console.log(dataEmpleados);
        const empleado = dataEmpleados.find(e => e.usuario.nombreUsuario === usuarioInput);
        console.log(empleado);
        
        if (usuarioInput === "") {
            divMensajeError.innerHTML = mensajeError("El usuario no puede estar vacío.");
        }
        else if(contraseniaInput === ""){
            divMensajeError.innerHTML = mensajeError("La contraseña no puede estar vacía.");
        }
        else if (empleado) {
            const tipoUsuario = empleado.usuario.tipoUsuario;
            if(tipoUsuario == paginaInicio){
                if (empleado.usuario.contrasenia === contraseniaInput) {
                    if (empleado.usuario.estatus === 1) {
                        const usuario = empleado.usuario.nombreUsuario;
                        const rol = empleado.usuario.rol;
                        sessionStorage.setItem("usuario", usuario);
                        sessionStorage.setItem("rol", rol);
                        switch(paginaInicio){
                            case 0:
                                window.location.href = "views/sucursal/index.html";
                                break;
                            case 1:
                                window.location.href = "views/central/index.html";
                                break;
                            default:
                                alert("Ha ocurrido un error")
                                window.location.href = "index.html";
                        }
                    }
                    else {
                        divMensajeError.innerHTML = mensajeError("Este usuario ya no tiene acceso a la plataforma.");
                    }
                } 
                else {
                    divMensajeError.innerHTML = mensajeError("La contraseña es incorrecta.");
                }
            }
            else{
                divMensajeError.innerHTML = mensajeError("El usuario no pertenece a esta sucursal.");
            }
        } 
        else {
            divMensajeError.innerHTML = mensajeError("El usuario no existe.");
        }
    }
)
