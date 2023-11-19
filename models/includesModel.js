import ModoColorModel from "./modoColorModel.js";
const modoColor = new ModoColorModel();

class includesModel{
    constructor(){
    }
    async incluirHeader() {
        //incluir el header
        await fetch('/includes/header.html')
                .then(response => response.text())
                .then(data => {
                document.getElementById('headerPage').innerHTML = data;
            });

        const linkSucursales = document.getElementById("link-sucursales");
        const linkEmpleados = document.getElementById("link-empleados");
        const linkClientes = document.getElementById("link-clientes");
        const linkProductos = document.getElementById("link-productos");
        const linkPedidos = document.getElementById("link-pedidos");
        const linkVentas = document.getElementById("link-ventas");
        const linkUsuario = document.getElementById("link-usuario");
        const linkSalir = document.getElementById("link-salir");
        const sicefaHeader = document.getElementById("SICEFA-header");
        const rol = sessionStorage.getItem("rol");
        
        //checar el rol del usuario
        if( rol === "ADMS"){
            linkSucursales.remove();
        }
        else if(rol === "EMPS"){
            linkEmpleados.remove();
            linkClientes.remove();
            linkPedidos.remove();
            linkUsuario.remove();
        }
        else if(rol === "ADMC"){
            linkClientes.remove();
            linkVentas.remove();
            linkEmpleados.remove();
            linkUsuario.href = "/views/central/index.html";
            sicefaHeader.innerHTML = " CENTRAL";
        }
        else{
            linkEmpleados.remove();
            linkClientes.remove();
            linkProductos.remove();
            linkPedidos.remove();
            linkVentas.remove();
            linkUsuario.remove();
            linkSucursales.remove();
            linkSalir.remove();
        }

        //escuchar click en el botón btn-tema-color
        const btnModoColor = document.getElementById('btn-tema-color');
        btnModoColor.addEventListener('click', () => {
                modoColor.cambiarModoColor();
            }
        )
        //escuchar click en la etiqueta a link-salir
        linkSalir.addEventListener('click', () => {
            sessionStorage.clear();
        });
    }
    incluirFooter() {
        //incluir el footer
        fetch('/includes/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footerPage').innerHTML = data;
            });
    }
}

export default includesModel;