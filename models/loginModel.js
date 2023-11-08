//crear clase
class loginModel{

    constructor(){
    }

    //cambiar login
    cambiarLogin(paginaInicio){
        const contenidoDiv = (titulo) => '<h1 id="h1-SICEFA-sm" class="text-center mx-auto mb-3 d-sm-none">' + titulo + '</h1>'
        if(paginaInicio == 0){
            document.getElementById("h1-SICEFA").innerHTML = "SICEFA central";
            document.getElementById("h2-SICEFA").innerHTML = "SICEFA central";
            document.getElementById("h1-SICEFA-sm").innerHTML =  contenidoDiv("SICEFA central") ;
            document.getElementById("link-cambiar-login").innerHTML = "SICEFA sucursal";
            document.getElementById("btn-cambiar-login").innerHTML = "Cambiar a sucursal";
        }
        else{
            document.getElementById("h1-SICEFA").innerHTML = "SICEFA sucursal";
            document.getElementById("h2-SICEFA").innerHTML = "SICEFA sucursal";
            document.getElementById("h1-SICEFA-sm").innerHTML = contenidoDiv("SICEFA sucursal");
            document.getElementById("link-cambiar-login").innerHTML = "SICEFA central";
            document.getElementById("btn-cambiar-login").innerHTML = "Cambiar a central";
        }
    }
}

export default loginModel;