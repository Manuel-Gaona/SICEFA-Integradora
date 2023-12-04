//importar clases
//Esta linea importa el archivo models includes para poder insertar el header y el footer
import includesModel from "/models/includesModel.js";
//Esta linea importa el modelo sucursal para poder llamar las funciones en este controlador
import sucursalesModel from "/models/sucursalesModel.js";
//Esta linea importa el modelo de empleados para poder utilizar los datos en este apartado
import empleadoModel from "/models/empleadosModel.js";

//instancia de clases
//intancia los icludes para por utulizarlos
const includes = new includesModel();
//intancia las sucursales del controlador para por utulizarlas
const sucursales = new sucursalesModel();
//intancia los empleados para por utulizarlos en la creacion de las sucursales
const empleados = new  empleadoModel();

//variables globales
//variable para el rol
let rol = sessionStorage.getItem("rol");
//variable para el usuario
let usuario = sessionStorage.getItem("usuario");

//variable que guardar datos sucursales
let dataSucursales = await sucursales.cargarDatosSucursales();
//para comprobar si cargan los datos en la cosola
console.log(dataSucursales);
//variable que guardar datos de empleados
let dataEmpleados = await empleados.cargarDatosEmpleados();
// variable para contar las sucursales
let contadorSucursales = dataSucursales.length;

//incluir header y footer
includes.incluirHeader();
includes.incluirFooter();

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
var modal = document.getElementById("miModal");
    //modal
    const modalVerSucursal = document.getElementById('modalVerSucursal');

    if (modalVerSucursal){
        modalVerSucursal.addEventListener('show.bs.modal', function (event){
            //boton que abre el modal
            const button = event.relatedTarget;
            //extraer el indice del boton
            const indice = button.getAttribute('data-bs-whatever');
            //obtener datos del producto
            const sucursal = dataSucursales[indice];
            //cargar datos del producto en el modal
            sucursales.cargarDatosSucursalModal(indice, dataSucursales);
    
            //click en eliminar producto
            const btnEliminarSucursal = document.getElementById('btnEliminarSucursal');
            btnEliminarSucursal.addEventListener('click', () => {
                sucursales.eliminarProducto(indice, dataSucursales);
            });
            //click en editar producto
            const btnEditarSucursal = document.getElementById('btnEditarSucursal');
            btnEditarSucursal.addEventListener('click', () => {
                sucursales.habilitarCamposModal();
            });
            //click en confirmar edicion
            const btnConfirmarEdicion = document.getElementById('btnConfirmarEdicion');
            btnConfirmarEdicion.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Desea actualizar los datos?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                }).then((result) => {
                    if(result.isConfirmed){
                        //actualizar datos
                        dataSucursales[indice] = sucursales.confirmarCambiosModal(indice, dataSucursales);
                        //deshabilitar campos
                        sucursales.deshabilitarCamposModal();
                        btnEditarSucursal.classList.remove("disabled");
                        btnEliminarSucursal.classList.remove("disabled");
                        btnConfirmarEdicion.classList.add("disabled");
                        console.log(dataProductos);
                    }
                    //mostrar mensaje de confirmacion
                    Swal.fire({
                        title: "Se ha actualizado correctamente",
                        icon: "success"
                    });
                });
            });
            
            //click en btnCerrarModal
        const btnCerrarModal = document.getElementById("btnCerrarModal");
        btnCerrarModal.addEventListener("click", () => {
            loadTable(seleccion);
            sucursales.deshabilitarCamposModal();
            btnEditarSucursal.classList.remove("disabled");
            btnEliminarSucursal.classList.remove("disabled");
            btnConfirmarEdicion.classList.add("disabled");
        });
            //escuchar el evento click del btnCerrarModal-header
            const btnCerrarModalHeader = document.getElementById("btnCerrarModal-header");
            btnCerrarModalHeader.addEventListener("click", () => {
                loadTable(seleccion);
                sucursales.deshabilitarCamposModal();
                btnEditarSucursal.classList.remove("disabled");
                btnEliminarSucursal.classList.remove("disabled");
                btnConfirmarEdicion.classList.add("disabled");
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
    //datos 
    let fecha = new Date();
    let annio = fecha.getFullYear();
    let mes = "";
    let dia = "";
    //if para fecha
    if((fecha.getMonth() + 1) < 10){
        mes = "0" + (fecha.getMonth() + 1);
    }
    else{
        mes = "" + (fecha.getMonth() + 1);
    }
    if(fecha.getDate() + 1 < 10){
        dia = "0" + fecha.getDate();
    }
    else{
        dia = "" + fecha.getDate();
    }
    //declarar variable fechaRegistro
    let fechaRegistro = dia + "/" + mes + "/" + annio;
    //aumentar contador
    contadorSucursales++;
    //declarar variable codigoESucursal
    let codigoSucursal = "" + contadorSucursales.toString().padStart(2, '0');
    //definir el tipo de usuario

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

    //este imprime el usuario del titular de la sucursal
    document.getElementById("formAgregarEmpleado").reset();
    //este imprime el nombre del titular de la sucursal
    document.getElementById("txtnombreSucursal").focus();
    //con estos comandos se crear admin
    let usuario = "Admin" + codigoSucursal;	
    let admin = {
        "usuario": {
            "nombreUsuario": usuario,
            "contrasenia": usuario,
            "tipoUsuario": 1,
            "rol": "ADMS",
            "estatus": 1
        }
    }
    //para mandar el usuario creado a la parte superior
    dataEmpleados.unshift(admin);
    //comprovar si se ejecuta correcto en la consola
    console.log(dataEmpleados);
    
});