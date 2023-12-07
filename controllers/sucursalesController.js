//importar clases
//Esta linea importa el archivo models includes para poder insertar el header y el footer
import includesModel from "/models/includesModel.js";
//Esta linea importa el modelo sucursal para poder llamar las funciones en este controlador
import sucursalesModel from "/models/sucursalesModel.js";
//Esta linea importa el modelo de empleados para poder utilizar los datos en este apartado
import empleadoModel from "/models/empleadosModel.js";
//Esta linea importa el modelo de verificacion para poder utilizar los datos en este apartado
import verificacionModel from "/models/verificacionModel.js";

//instancia de clases
//intancia los icludes para utulizarlos
const includes = new includesModel();
//intancia las sucursales del controlador para por utulizarlas
const sucursales = new sucursalesModel();
//intancia los empleados para por utulizarlos en la creacion de las sucursales
const empleados = new  empleadoModel();
//intancia la verificacion para por utulizarlos en la creacion de las sucursales
const verificacion = new verificacionModel();

//variable que guardar datos sucursales
let dataSucursales = await sucursales.cargarDatosSucursales();
//para comprobar si cargan los datos en la cosola
console.log(dataSucursales);
// variable para contar las sucursales
let contadorSucursales = dataSucursales.length;

        

//incluir header y footer
includes.incluirHeader();
includes.incluirFooter();

//verificar usuario
verificacion.verificarUsuario("sucursales");

//seleccion de la tabla 
let seleccion = 1;
//cargar tabla
loadTable(seleccion);

//click en chkestatus si esta activo o inactivo
const chkestatus = document.getElementById('chkestatus');
chkestatus.addEventListener('click', () => {
    //validar si en 0 esta inactivo y 1 si esta activo
    let checkbox = chkestatus.checked;
    if (checkbox){
        seleccion = 0;
        loadTable(seleccion)
    } else {
        seleccion = 1;
        loadTable(seleccion)
    }
});



const btnRecargarDatos = document.getElementById("btnRecargarDatos");
btnRecargarDatos.addEventListener('click', () => {

    loadTable(seleccion);
});



//carga la tabla con los parametros que le asicne en los datos de json
async function loadTable(seleccion){
    let cuerpo = "";
    //comando para que el proceso no habance hasta que termine de cargar los datos
    await dataSucursales.forEach(function (sucursales){
        //valida si existen sucursales
        if (sucursales){
            
            switch(seleccion){
                case 0:
                //valida si en los datos el estatuses esta inactivo
                    if (sucursales.estatus === 0){
                        cuerpo += '<tr>' +
                                    '<td>' + sucursales.nombre + '</td>' +
                                    '<td>' + sucursales.titular + '</td>' +
                                    '<td>' + sucursales.domicilio + '</td>' +
                                    '<td>' + sucursales.codigo_postal + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerSucursal" data-bs-whatever="' + dataSucursales.indexOf(sucursales) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                break;
                case 1:
                    //valida si en los datos el estatuseses esta activo
                    if (sucursales.estatus === 1){
                        
                        cuerpo += '<tr>' +
                                    '<td>' + sucursales.nombre + '</td>' +
                                    '<td>' + sucursales.titular + '</td>' +
                                    '<td>' + sucursales.domicilio + '</td>' +
                                    '<td>' + sucursales.codigo_postal + '</td>' +
                                    '<td>' +
                                        '<div class="text-center">' +
                                            '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerSucursal" data-bs-whatever="' + dataSucursales.indexOf(sucursales) + '"><i class="fa-solid fa-plus"></i></button>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                break;
            }
        }
        //este codigo te permite imprimir la tabla en el html
        document.getElementById("tblSucursales").innerHTML = cuerpo;
    });
}
//funcion cuando se activa el modal
const modalVerSucursal = document.getElementById("modalVerSucursal");
//escuchar el evento show del modal
if (modalVerSucursal) {
    modalVerSucursal.addEventListener("show.bs.modal", (event) => {
        //obtener el boton que abre el modal
        const button = event.relatedTarget;
        //obtener el indice del boton
        const indice = button.getAttribute("data-bs-whatever");
        //obtener datos de la sucursal
        const sucursal = dataSucursales[indice];
        //cargar datos en modal
        sucursales.cargarDatosSucursalModal(indice, dataSucursales);
        console.log(sucursales);
        
        //escuchar el evento click del btnEliminarSucursal
        const btnEliminarSucursal = document.getElementById("btnEliminarSucursal");
        btnEliminarSucursal.addEventListener("click", () => {
            sucursales.eliminarSucursal(indice, dataSucursales);
        });

        const btnActivarSucursal = document.getElementById("btnActivarSucursal");
        btnActivarSucursal.addEventListener("click", () => {
            sucursales.activarsucursal(indice, dataSucursales);
        });

        //escuchar el evento click del btnEditarSucursal
        const btnEditarSucursal = document.getElementById("btnEditarSucursal");
        btnEditarSucursal.addEventListener("click", () => {
            //habilitar los campos
            sucursales.habilitarCamposModal();
            btnEditarSucursal.classList.add("d-none");
            btnEliminarSucursal.classList.add("d-none");
            btnConfirmarEdicion.classList.remove("d-none");
            btnCancelarEdicion.classList.remove("d-none");
        });

        //escuchar el evento click del btnCancelarEdicion
        const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");
        btnCancelarEdicion.addEventListener("click", () => {
            sucursales.deshabilitarCamposModal();
            btnEditarSucursal.classList.remove("d-none");
            btnEliminarSucursal.classList.remove("d-none");
            btnConfirmarEdicion.classList.add("d-none");
            btnCancelarEdicion.classList.add("d-none");
        });

        //escuchar el evento click del btnConfirmarEdicion
        const btnConfirmarEdicion = document.getElementById("btnConfirmarEdicion");
        btnConfirmarEdicion.addEventListener("click", () => {
            //pedir confirmacion
            Swal.fire({
                title: "¿Desea actualizar los datos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
            }).then((result) => {
                if(result.isConfirmed){
                    //obtener datos del formulario
                    let datasucursal = sucursales.getDatosFormModal();
                    console.log(datasucursal);
                    //editar datos del empleado
                    dataSucursales[indice] = datasucursal;
                    // console.log(datasucursal);
                    //deshabilitar campos
                    sucursales.deshabilitarCamposModal();
                    btnEditarSucursal.classList.remove("d-none");
                    btnEliminarSucursal.classList.remove("d-none");
                    btnCancelarEdicion.classList.add("d-none");
                    btnConfirmarEdicion.classList.add("d-none");
                    //mostrar mensaje de confirmacion
                    Swal.fire({
                        title: "Se ha actualizado correctamente",
                        icon: "success"
                    });
                }
            });
        });
            
            //click en btnCerrarModal
            const btnCerrarModal = document.getElementById("btnCerrarModal");
            btnCerrarModal.addEventListener("click", () => {
                loadTable(seleccion);
                sucursales.deshabilitarCamposModal();
                btnEditarSucursal.classList.remove("d-none");
                btnEliminarSucursal.classList.remove("d-none");
                btnConfirmarEdicion.classList.add("d-none");
            });
            //escuchar el evento click del btnCerrarModal-header
            const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
            btnCerrarModalHeader.addEventListener("click", () => {
                loadTable(seleccion);
                sucursales.deshabilitarCamposModal();
                btnEditarSucursal.classList.remove("d-none");
                btnEliminarSucursal.classList.remove("d-none");
                btnConfirmarEdicion.classList.add("d-none");
                btnCancelarEdicion.classList.add("d-none");
            });
        });
    }



    //Escuchar el evento click del boton agregar sucursal
const btnAgregarSucursal = document.getElementById("btnAgregarSucursal");

btnAgregarSucursal.addEventListener("click", (event) => {
    event.preventDefault();
    //obtener datos del formulario
    let nombre = document.getElementById("txtnombreSucursal").value;
    let nombreTitular = document.getElementById("txtnombreTitular").value;
    let RFCTitutar = document.getElementById("txtRFCTitular").value;
    let domicilio = document.getElementById("txtdomicilio").value;
    let colonia = document.getElementById("txtcolonia").value;
    let ciudad = document.getElementById("txtciudad").value;
    let estado = document.getElementById("txtestado").value;
    let cp = document.getElementById("txtcp").value;
    let telefono = document.getElementById("txttelefono").value;
    let longitu = document.getElementById("txtlongitud").value;
    let latitud = document.getElementById("txtlatitud").value;
    let codigoSucursal = "" + contadorSucursales.toString().padStart(3, '0');
    if (nombre === "" || nombreTitular === "" || RFCTitutar === "" || domicilio === "" || colonia === "" || ciudad === "" || estado === "" || cp === "" || telefono === "" || longitu === "" || latitud === "" || codigoSucursal === ""){
        //mostrar mensaje de error si faltan campos por llenar
        Swal.fire({
            title: "Todos los campos son obligatorios",
            icon: "warning"
        });
    } else{

    let sucursal = {
        "nombre": nombre,
        "titular": nombreTitular,
        "rfc_titular": RFCTitutar,
        "domicilio": domicilio,
        "colonia": colonia,
        "ciudad": ciudad,
        "estado": estado,
        "codigo_postal": cp,
        "telefono": telefono,
        "longitud": longitu,
        "latitud": latitud,
        "estatus": 1,
        "id": codigoSucursal
    }
    console.log(sucursal);
    //enviar datos al servidor
    dataSucursales.push(sucursal);
    console.log(dataSucursales);
    loadTable(1);
    Swal.fire({
        title: "Se ha agregado correctamente",
        icon: "success"
    });
    }

    document.getElementById("theform").reset();
    
});

const buscarSucursal = document.getElementById("buscarSucursal");
buscarSucursal.addEventListener("click", (event) => {
  let cuerpo = "";
  let datobuscado = document.getElementById("txtdatobuscado").value.toLowerCase();

  // Verificar si el campo de búsqueda está vacío
  if (datobuscado.trim() === "") {
    // Si está vacío, no mostrar ninguna sucursal
    document.getElementById("tblSucursales").innerHTML = "";
    return;
  }

  dataSucursales.forEach(function (sucursal) {
    if (sucursal.nombre.toLowerCase().includes(datobuscado)) {
      let registro =
        '<tr>' +
        '<td>' + sucursal.nombre + '</td>' +
        '<td>' + sucursal.titular + '</td>' +
        '<td>' + sucursal.domicilio + '</td>' +
        '<td>' + sucursal.codigo_postal + '</td>' +
        '<td>' +
            '<div class="text-center">' +
                '<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerSucursal" data-bs-whatever="' + dataSucursales.indexOf(sucursal) + '"><i class="fa-solid fa-plus"></i></button>' +
            '</div>' +
        '</td>' +
        '</tr>';
      cuerpo += registro;
    }
  });
  document.getElementById("tblSucursales").innerHTML = cuerpo;
  document.getElementById("txtdatobuscado").value = "";

});

  






   