/**
 * @author Juan Manuel Gaona Hernandez
 * @description clase para el modelo de productos donde se crearan los metodos para el controlador
 */
//importar clases
import includesModel from "../models/includesModel.js";
import clientesModel from "../models/clientesModel.js";
import verificacionModel from "../models/verificacionModel.js";

//instanciar clases
const includes = new includesModel();
const clientes = new clientesModel();
const verificacion = new verificacionModel();

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

//datos sessionStorage
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");
// console.log(usuario);
//guardar datos clientes
let dataClientes = await clientes.cargarDatosClientes();
console.log(dataClientes);

//contador de clientes
let contadorClientes = dataClientes.length -1;
//seleccion de la tabla
let seleccion = 1;

//verificar usuario
verificacion.verificarUsuario("clientes");

//escuchar el evento click del boton agregar
const btnAgregarCliente = document.getElementById("btnAgregarCliente");
btnAgregarCliente.addEventListener("click", (event) => {
    event.preventDefault();
    //obtener datos del formulario
    let nombre = document.getElementById("txtnombre").value;
    let apellidoPaterno = document.getElementById("txtapellidoP").value;
    let apellidoMaterno = document.getElementById("txtapellidoM").value;
    let fechaNac = document.getElementById("txtfechaNac").value;
    let rfc = document.getElementById("txtrfc").value;
    let curp = document.getElementById("txtcurp").value;
    let domicilio = document.getElementById("txtdomicilio").value;
    let cp = document.getElementById("txtcp").value;
    let ciudad = document.getElementById("txtciudad").value;
    let estado = document.getElementById("txtestado").value;
    let telefono = document.getElementById("txttelefono").value;
    let email = document.getElementById("txtemail").value;
    let genElement = document.querySelector('input[name="genero"]:checked');
    let gen = genElement ? genElement.value : null;
    //validar datos del formulario
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !fechaNac || !rfc || !curp || !domicilio || !cp || !ciudad || !estado || !telefono || !email || !gen) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Faltan datos por llenar',
        });
    } else {
        //generar id
        contadorClientes++;
        let id = contadorClientes;
        //generar fecha de registro
        let fechaRegistroDate = new Date();
        let fechaRegistro = clientes.cambiarFormatoAfechaString(fechaRegistroDate);
        //generar fecha de nacimiento
        let fechaNacimiento = clientes.cambiarFormatoAfechaString(fechaNac);
        //generar genero
        let genero = clientes.generoStringToNumber(gen);
        //crear objeto cliente
        let cliente = {
            "datos_personales": {
                "nombre": nombre,
                "apellido_paterno": apellidoPaterno,
                "apellido_materno": apellidoMaterno,
                "genero": genero,
                "fecha_de_nacimiento": fechaNacimiento,
                "RFC": rfc,
                "CURP": curp,
                "foto": "",
                "domicilio": domicilio,
                "codigo_postal": cp,
                "ciudad": ciudad,
                "estado": estado,
                "telefono": telefono
            },
            "datos_adicionales": {
                "id": id,
                "correo_electronico": email,
                "fecha_de_registro": fechaRegistro,
                "estatus": 1
            }
        }
        // console.log(cliente);
        dataClientes.unshift(cliente);
        // console.log(dataClientes);
        //guardar datos en localStorage
        localStorage.setItem("dataClientes", JSON.stringify(dataClientes));
        //limpiar formulario
        document.getElementById("formAgregarCliente").reset();
        //hacer focus en el primer campo
        document.getElementById("txtnombre").focus();
        //mensaje de exito
        Swal.fire({
            icon: 'success',
            title: 'Cliente agregado',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
);

//escuchar click en nav-consultar-tab
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

//click en btnRecargarDatos
const btnRecargarDatos = document.getElementById("btnRecargarDatos");
btnRecargarDatos.addEventListener("click", () => {
    loadTable(seleccion);
});

// funcion para cargar tabla
function loadTable(seleccion) {
    let cuerpo = "";
    dataClientes.forEach(function (cliente) {
        if (cliente.datos_personales && cliente.datos_adicionales && (cliente.datos_adicionales.id !== 0)) {
            let nombreCompleto = cliente.datos_personales.nombre + " " + cliente.datos_personales.apellido_paterno + " " + cliente.datos_personales.apellido_materno;
            switch (seleccion) {
                case 0:
                    if (cliente.datos_adicionales.estatus === 0) {
                        cuerpo += 
                            '<tr>' +
                                '<td>' + cliente.datos_adicionales.id +'</td>' +
                                '<td>' + nombreCompleto + '</td>' +
                                '<td class="d-none d-md-table-cell">' + cliente.datos_adicionales.correo_electronico + '</td>'+
                                '<td>' + cliente.datos_adicionales.fecha_de_registro + '</td>'+
                                '<td>' +
                                    '<div class="text-center">' +
                                        '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerCliente" data-bs-whatever="' + dataClientes.indexOf(cliente)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
                    }
                break;
                case 1:
                    if (cliente.datos_adicionales.estatus === 1){ 
                        cuerpo += 
                            '<tr>' +
                                '<td>' + cliente.datos_adicionales.id +'</td>' +
                                '<td>' + nombreCompleto + '</td>' +
                                '<td class="d-none d-md-table-cell">' + cliente.datos_adicionales.correo_electronico + '</td>'+
                                '<td>' + cliente.datos_adicionales.fecha_de_registro + '</td>'+
                                '<td>' +
                                    '<div class="text-center">' +
                                        '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerCliente" data-bs-whatever="' + dataClientes.indexOf(cliente)+ '"><i class="fa-solid fa-plus"></i></button>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
                    }
                break;          
            }
        }
        document.getElementById("tblClientes").innerHTML = cuerpo;
    });
}

//funcion modal
const modalVerCliente = document.getElementById("modalVerCliente");
//escuchar evento show
if (modalVerCliente){
modalVerCliente.addEventListener("show.bs.modal", (event) => {
        //obtener boton que abrio el modal
        let button = event.relatedTarget;
        //obtener indice del boton
        let indice = button.getAttribute("data-bs-whatever");
        //obtener datos del cliente
        let cliente = dataClientes[indice];
        console.log(cliente);
        //cargar datos del cliente en el modal
        clientes.cargarDatosClienteModal(cliente);

        //click en btnEliminarCliente
        const btnEliminarCliente = document.getElementById("btnEliminarCliente");
        btnEliminarCliente.addEventListener("click", () => {
            //usar metodo eliminarCliente
            clientes.eliminarCliente(indice, dataClientes);
        });

        //click en btnActivarCliente
        const btnActivarCliente = document.getElementById("btnActivarCliente");
        btnActivarCliente.addEventListener("click", () => {
            //usar metodo activarCliente
            clientes.activarCliente(indice, dataClientes);
        });

        //click en btnEditarCliente
        const btnEditarCliente = document.getElementById("btnEditarCliente");
        btnEditarCliente.addEventListener("click", () => {
            //habilitar campos
            clientes.habilitarCamposModal();
            //ocultar botones
            //ocultar boton editar cliente
            btnEditarCliente.classList.add("d-none");
            //ocultar boton eliminar cliente
            btnEliminarCliente.classList.add("d-none");
            //mostrar botones
            //mostrar boton confirmar edicion
            btnConfirmarEdicion.classList.remove("d-none");
            //mostrar boton cancelar edicion
            btnCancelarEdicion.classList.remove("d-none");
        });
        
        //click en btnCancelarEdicion
        const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");
        btnCancelarEdicion.addEventListener("click", () => {
            //deshabilitar campos del modal
            clientes.deshabilitarCamposModal();
            //mostrar botones
            //mostrar boton editar cliente
            btnEditarCliente.classList.remove("d-none");
            //mostrar boton de eliminacion
            btnEliminarCliente.classList.remove("d-none");
            //ocultar botones
            //ocultar boton confirmar edicion
            btnConfirmarEdicion.classList.add("d-none");
            //ocultar boton cancelar edicion
            btnCancelarEdicion.classList.add("d-none");
        });

        //click en btnConfirmarEdicion
        const btnConfirmarEdicion = document.getElementById("btnConfirmarEdicion");
        btnConfirmarEdicion.addEventListener("click", () => {
            //pedir confirmacion
            Swal.fire({
                title: '¿Estas seguro?',
                text: "Los cambios serán permanentes",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                //si se confirma la edicion
                if (result.isConfirmed) {
                    //obtener datos del cliente
                    let dataCliente = clientes.getDatosClienteModal();
                    // console.log(dataCliente);
                    //editar cliente
                    dataClientes[indice] = dataCliente;
                    //guardar datos en localStorage
                    localStorage.setItem("dataClientes", JSON.stringify(dataClientes));
                    //mostrar botones
                    //mostrar boton de editar cliente
                    btnEditarCliente.classList.remove("d-none");
                    //mostrar boton de eliminar cliente
                    btnEliminarCliente.classList.remove("d-none");
                    //ocultar botones
                    //ocultar boton confirmar edicion
                    btnConfirmarEdicion.classList.add("d-none");
                    //ocultar boton cancelar edicion
                    btnCancelarEdicion.classList.add("d-none");
                    //deshabilitar campos
                    clientes.deshabilitarCamposModal();
                    //mensaje de exito
                    Swal.fire({
                        icon: 'success',
                        title: 'Cliente editado',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        });

        //click en btnCerrarModal
        const btnCerrarModal = document.getElementById("btnCerrarModal");
        btnCerrarModal.addEventListener("click", () => {
            //cargar tabla
            loadTable(seleccion);
            // //mostar botones
            // //mostrar boton editar cliente
            // btnEditarCliente.classList.remove("d-none");
            // //mostrar boton eliminar cliente
            // btnEliminarCliente.classList.remove("d-none");
            // //ocultar botones
            // //ocultar boton confirmar edicion
            // btnConfirmarEdicion.classList.add("d-none");
            // //ocultar boton cancelar edicion
            // btnCancelarEdicion.classList.add("d-none");
            //deshabilitar campos
            clientes.deshabilitarCamposModal();
        });

        //click en btnCerrarModal-header
        const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
        btnCerrarModalHeader.addEventListener("click", () => {
            //cargar tabla
            loadTable(seleccion);
            // //mostrar botones
            // //mostrar boton editar cliente
            // btnEditarCliente.classList.remove("d-none");
            // //mostrar boton eliminar cliente
            // btnEliminarCliente.classList.remove("d-none");
            // //ocultar botones
            // //ocultar boton confirmar edicion
            // btnConfirmarEdicion.classList.add("d-none");
            // //ocultar boton cancelar edicion
            // btnCancelarEdicion.classList.add("d-none");
            //deshabilitar campos
            clientes.deshabilitarCamposModal();
        });
    });
}