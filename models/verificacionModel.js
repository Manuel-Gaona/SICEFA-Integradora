//importar modulo empleados
import empleadosModel from "../models/empleadosModel.js";
//instanciar modulo empleados
const empleados = new empleadosModel();
//crear clase
class verificacionModel{

    constructor(){
    }

    //Verificar datos de usuarios
    // async verificarUsuario(usuario){
    //         // Cargar datos de empleados desde el archivo JSON
    //         const datosEmpleados = await empleados.cargarDatosEmpleados();
            
    //         // Verificar si el usuario existe en los datos cargados
    //         const existeUsuario = datosEmpleados.some(empleado => empleado.usuario.nombreUsuario === usuario);
    //         if(existeUsuario == false){
    //             this.cambiarContenidoMain();
    //         }
    // }
    //Verificar datos de usuarios
    async verificarUsuario(pagina){
        // obtener el usuario del usuario de sessionStorage
        const usuario = sessionStorage.getItem("usuario");
        // obtener el rol del usuario de sessionStorage
        const rol = sessionStorage.getItem("rol");

        if(usuario === null || rol === null){
            //si no hay usuario o rol en sessionStorage, dirigir a la pagina de inicio
            window.location.href = "/index.html";
        } else{
            //si hay usuario y rol en sessionStorage, verificar si el usuario tiene permiso para acceder a la pagina
            // Cargar datos de empleados desde el archivo JSON
            const datosEmpleados = await empleados.cargarDatosEmpleados();
            
            // Verificar si el usuario existe en los datos cargados
            const existeUsuario = datosEmpleados.some(empleado => empleado.usuario.nombreUsuario === usuario);
            if(existeUsuario == false){
                window.location.href = "/index.html";
            }
            else{
                //si el usuario existe, verificar si tiene permiso para acceder a la pagina
                //si el rol es ADMC no puede acceder a empleados, clientes y ventas
                if(rol === "ADMC" && (pagina === "empleados" || pagina === "clientes" || pagina === "ventas")){
                    this.cambiarContenidoMain();
                }
                //si el rol es ADMS no puede acceder a sucursales
                else if(rol === "ADMS" && pagina === "sucursales"){
                    this.cambiarContenidoMain();
                }
                //si el rol es EMPS no puede acceder a sucursales, empleados, clientes y pedidos
                else if(rol === "EMPS" && (pagina === "sucursales" || pagina === "empleados" || pagina === "clientes" || pagina === "pedidos")){
                    this.cambiarContenidoMain();
                }
            }
        }
    }
    cambiarContenidoMain(){
        document.getElementById("mainPage").innerHTML = '<div class="container">'+ 
                    '<div class="alert alert-danger text-center" role="alert">' +
                        '<div class="d-flex fa-2xl align-items-center justify-content-center">' +
                            '<i class="fa-solid fa-triangle-exclamation m-2"></i>' +
                            '<p class="h2 m-2">No tienes permisos para ingresar a esta pagina.</p>' +
                        '</div>' +
                        // '<br></br>' +
                        // '<p>Inicia sesión con un usuario que tenga permisos para acceder a esta pagina.</p>' +
                        // '<a href="/index.html" class="alert-link"> Inicia sesión aqui</a>' +
                    '</div>' +
                '</div>';
    }
}
export default verificacionModel;