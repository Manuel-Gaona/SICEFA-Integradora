import ModoColorModel from "./modoColorModel.js";
const modoColor = new ModoColorModel();

class includesModel{
    constructor(){
    }
    async incluirHeaderSucursal() {
        //incluir el header
        await fetch('/includes/headerSucursal.html')
                .then(response => response.text())
                .then(data => {
                document.getElementById('headerPage').innerHTML = data;
            });

        const linkEmpleados = document.getElementById("link-empleados");
        const linkClientes = document.getElementById("link-clientes");
        const linkProductos = document.getElementById("link-productos");
        const linkPedidos = document.getElementById("link-pedidos");
        const linkVentas = document.getElementById("link-ventas");
        const linkUsuario = document.getElementById("link-usuario");
        const rol = sessionStorage.getItem("rol");
        
        //checar el rol del usuario
        if(rol === "EMPS"){
            linkEmpleados.remove();
            linkClientes.remove();
            linkPedidos.remove();
            linkUsuario.remove();
        }
        else if(rol === "ADMS"){
        }
        else{
            linkEmpleados.remove();
            linkClientes.remove();
            linkProductos.remove();
            linkPedidos.remove();
            linkVentas.remove();
            linkUsuario.remove();
        }

        //escuchar click en el botón btn-tema-color
        const btnModoColor = document.getElementById('btn-tema-color');
        btnModoColor.addEventListener('click', () => {
                modoColor.cambiarModoColor();
            }
        )
    }
    incluirFooterSucursal() {
        //incluir el footer
        fetch('/includes/footerSucursal.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footerPage').innerHTML = data;
            });
    }
    async incluirHeaderCentral() {
        //incluir el header
        await fetch('/includes/headerCentral.html')
                .then(response => response.text())
                .then(data => {
                document.getElementById('headerPage').innerHTML = data;
            });

        const linkSucursales = document.getElementById("link-sucursales");
        const linkProductos = document.getElementById("link-productos");
        const linkPedidos = document.getElementById("link-pedidos");
        const linkUsuario = document.getElementById("link-usuario");
        const rol = sessionStorage.getItem("rol");
        
        //checar si el rol del usuario es diferente a ADMC
        if(rol === "ADMC"){
        }
        else{
            linkSucursales.remove();
            linkProductos.remove();
            linkPedidos.remove();
            linkUsuario.remove();
        }

        //escuchar click en el botón btn-tema-color
        const btnModoColor = document.getElementById('btn-tema-color');
        btnModoColor.addEventListener('click', () => {
                modoColor.cambiarModoColor();
            }
        )
    }
    incluirFooterCentral() {
        //incluir el footer
        fetch('/includes/footerCentral.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footerPage').innerHTML = data;
            });
    }
}

export default includesModel;