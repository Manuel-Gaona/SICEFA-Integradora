//importar modulo empleados
import empleadosModel from "../models/empleadosModel.js";
//instanciar modulo empleados
const empleados = new empleadosModel();
//crear clase
class verificacionModel{

    constructor(){
    }

    //Verificar datos de usuarios
    async verificarUsuario(usuario){
            // Cargar datos de empleados desde el archivo JSON
            const datosEmpleados = await empleados.cargarDatosEmpleados();
            
            // Verificar si el usuario existe en los datos cargados
            const existeUsuario = datosEmpleados.some(empleado => empleado.usuario.nombreUsuario === usuario);
            if(existeUsuario == false){
                this.cambiarContenidoMain();
            }
    }
    cambiarContenidoMain(){
        document.getElementById("mainPage").innerHTML = '<div class="container">'+ 
                    '<div class="alert alert-danger text-center" role="alert">' +
                        '<div class="d-flex fa-2xl align-items-center justify-content-center">' +
                            '<i class="fa-solid fa-triangle-exclamation m-2"></i>' +
                            '<p class="h2 m-2">No tienes permisos para ingresar a esta pagina.</p>' +
                        '</div>' +
                        '<br></br>' +
                        '<a href="/index.html" class="alert-link"> Inicia sesion aqui</a>' +
                    '</div>' +
                '</div>';
    }
}
export default verificacionModel;