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

//obtener elementos del DOM
const btnModoColor = document.getElementById('btn-tema-color');
const btnCambiarLogin = document.getElementById('btn-cambiar-login');
const linkCambiarLogin = document.getElementById('link-cambiar-login');
const divMensajeError = document.getElementById("mensaje-error");

//escuchar click en el botón btn-tema-color
btnModoColor.addEventListener('click', () => {
        modoColor.cambiarModoColor();
    }
)

//Alternar entre el login de sucursal y el login de central

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
  
  
  //proceso de login
const mensajeError = (mensaje) => '<div class="alert alert-danger text-center mb-0 mt-2" role="alert">' + mensaje + '</div>';
const form = document.forms.login;
form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const usuarioInput = form.usuario.value;
        const contraseniaInput = form.contrasenia.value;
        const dataEmpleados = await empleados.cargarDatosEmpleados();
        // console.log(dataEmpleados);
        const empleado = dataEmpleados.find(e => e.usuario.nombreUsuario === usuarioInput);
        // console.log(empleado);
        
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
                        window.location.href = "views/sucursal/index.html";
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
