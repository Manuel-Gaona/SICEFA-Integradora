/**
 * @author Juan Manuel Gaona Hernandez
 * @description clase para el modelo de productos donde se crearan los metodos para el controlador
 */
//crear clase
class ClientesModel {
    constructor() {
        //declarar propiedades
        this.nombreModal = document.getElementById("txtnombre-modal");
        this.apellidoPModal = document.getElementById("txtapellidoP-modal");
        this.apellidoMModal = document.getElementById("txtapellidoM-modal");
        this.fechaNacModal = document.getElementById("txtfechaNac-modal");
        this.rfcModal = document.getElementById("txtrfc-modal");
        this.curpModal = document.getElementById("txtcurp-modal");
        this.domicilioModal = document.getElementById("txtdomicilio-modal");
        this.cpModal = document.getElementById("txtcp-modal");
        this.ciudadModal = document.getElementById("txtciudad-modal");
        this.estadoModal = document.getElementById("txtestado-modal");
        this.telefonoModal = document.getElementById("txttelefono-modal");
        this.idModal = document.getElementById("txtid-modal");
        this.emailModal = document.getElementById("txtemail-modal");
        this.estatusModal = document.getElementById("txtestatus-modal");
        this.fechaRegistroModal = document.getElementById("txtfechaRegistro-modal");
        this.generoModal = document.querySelector('input[name="genero-modal"]:checked');
        this.rdgeneromModal = document.getElementById("rdgenerom-modal");
        this.rdgenerofModal = document.getElementById("rdgenerof-modal");
        //botones
        this.btnEliminarCliente = document.getElementById("btnEliminarCliente");
        this.btnEditarCliente = document.getElementById("btnEditarCliente");
        this.btnCancelarEdicion = document.getElementById("btnCancelarEdicion");
        this.btnConfirmarEdicion = document.getElementById("btnConfirmarEdicion");
        this.btnCerrarModal = document.getElementById("btnCerrarModal");
        this.btnActivarCliente = document.getElementById("btnActivarCliente");

    }

    //metodo para obtener todos los clientes
    async cargarDatosClientes() {
        if (localStorage.getItem("dataClientes")) {
            //obtener datos de localStorage
            return JSON.parse(localStorage.getItem("dataClientes"));
        }else{
            //obtener datos de json
            try {
                //esperar respuesta de la peticion fetch
                const res = await fetch('/data/dataClientes.json');
                //convertir respuesta a json
                const data = await res.json();
                //regresar datos
                return data;
            } catch (err) {
                console.log(err);
            }
        }
    }
    //cambiar genero de string a numero
    generoStringToNumber(genero){
        let generoNumber;
        switch(genero){
            case "masculino": generoNumber = 0; break;
            case "femenino": generoNumber = 1; break;
        }
        return generoNumber;
    }
    //cargar datos del cliente en el modal
    cargarDatosClienteModal(cliente){
        if(cliente.datos_personales){
            //datos personales
            this.nombreModal.value = cliente.datos_personales.nombre;
            this.apellidoPModal.value = cliente.datos_personales.apellido_paterno;
            this.apellidoMModal.value = cliente.datos_personales.apellido_materno;
            //cambiar formato fecha de nacimiento
            let fechaNacimientoDate = this.cambiarFormatoAfechaDate(cliente.datos_personales.fecha_de_nacimiento);
            this.fechaNacModal.value = fechaNacimientoDate;
            this.rfcModal.value = cliente.datos_personales.RFC;
            this.curpModal.value = cliente.datos_personales.CURP;
            this.domicilioModal.value = cliente.datos_personales.domicilio;
            this.cpModal.value = cliente.datos_personales.codigo_postal;
            this.ciudadModal.value = cliente.datos_personales.ciudad;
            this.estadoModal.value = cliente.datos_personales.estado;
            this.telefonoModal.value = cliente.datos_personales.telefono;
            //genero
            switch(cliente.datos_personales.genero){
                case 0: this.rdgeneromModal.checked = true; break;
                case 1: this.rdgenerofModal.checked = true; break;
            }
        }
        if(cliente.datos_adicionales){ 
            //datos adicionales
            this.idModal.value = cliente.datos_adicionales.id;
            this.emailModal.value = cliente.datos_adicionales.correo_electronico;
            //fecha de registro
            let fechaRegistroDate = this.cambiarFormatoAfechaDate(cliente.datos_adicionales.fecha_de_registro);
            this.fechaRegistroModal.value = fechaRegistroDate;
            //estatus
            let estatus;
            switch(cliente.datos_adicionales.estatus){
                case 0: 
                    estatus = "Inactivo"; 
                    this.btnEliminarCliente.classList.add("d-none");
                    this.btnEditarCliente.classList.add("d-none");
                    this.btnCancelarEdicion.classList.add("d-none");
                    this.btnConfirmarEdicion.classList.add("d-none");
                    this.btnActivarCliente.classList.remove("d-none");
                    break;
                case 1: 
                    estatus = "Activo"; 
                    this.btnEditarCliente.classList.remove("d-none");
                    this.btnEliminarCliente.classList.remove("d-none");
                    this.btnCancelarEdicion.classList.add("d-none");
                    this.btnConfirmarEdicion.classList.add("d-none");
                    this.btnActivarCliente.classList.add("d-none");
                    break;
            }
            this.estatusModal.value = estatus;
        }
    }
    //eliminar cliente
    eliminarCliente(indice, dataClientes){
        //pedir confirmacion para eliminar
        Swal.fire({
            title: "¿Desea eliminar el cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            //si se confirma la eliminacion
            if (result.isConfirmed) {
                //eliminar cliente
                dataClientes[indice].datos_adicionales.estatus = 0;
                //guardar en localStorage
                localStorage.setItem("dataClientes", JSON.stringify(dataClientes));
                //cargar datos del cliente en el modal
                this.cargarDatosClienteModal(dataClientes[indice]);
                //ocultar botones
                //ocultar boton eliminar cliente
                this.btnEliminarCliente.classList.add("d-none");
                //ocultar boton editar cliente
                this.btnEditarCliente.classList.add("d-none");
                //mostrar mensaje de exito de sweetalert
                Swal.fire({
                    title: "Cliente eliminado",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
            }
        });
    }
    //funcion activar cliente
    activarCliente(indice, dataClientes){
        //pedir confirmacion para activar
        Swal.fire({
            title: "¿Desea activar el cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            //si se confirma la activacion
            if (result.isConfirmed) {
                //activar cliente
                dataClientes[indice].datos_adicionales.estatus = 1;
                //guardar en localStorage
                localStorage.setItem("dataClientes", JSON.stringify(dataClientes));
                //cargar datos del cliente en el modal
                this.cargarDatosClienteModal(dataClientes[indice]);
                //mostrar botones
                //mostrar boton eliminar cliente
                this.btnEliminarCliente.classList.remove("d-none");
                //mostrar boton editar cliente
                this.btnEditarCliente.classList.remove("d-none");
                //ocultar botones
                //ocultar boton activar cliente
                this.btnActivarCliente.classList.add("d-none");
                //mostrar mensaje de exito de sweetalert
                Swal.fire({
                    title: "Cliente activado",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
            }
        });
    }
    //busqueda de clientes
    busquedaClientes(busqueda, dataClientes){
        //variable cuerpo para mostrar clientes
        let cuerpo = "";
        //recorrer clientes
        dataClientes.forEach(function(cliente) {
            //validar que el cliente tenga datos personales y datos adicionales
            if(cliente.datos_personales && cliente.datos_adicionales){
                //convertir a minusculas
                busqueda = busqueda.toLowerCase();
                //validar que el valor de busqueda sea igual a alguno de los datos del cliente
                if(cliente.datos_personales.nombre.toLowerCase().includes(busqueda) || cliente.datos_personales.apellido_paterno.toLowerCase().includes(busqueda) || cliente.datos_personales.apellido_materno.toLowerCase().includes(busqueda) || cliente.datos_personales.RFC.toLowerCase().includes(busqueda) || cliente.datos_personales.CURP.toLowerCase().includes(busqueda) || cliente.datos_personales.domicilio.toLowerCase().includes(busqueda) || cliente.datos_personales.codigo_postal.toLowerCase().includes(busqueda) || cliente.datos_personales.ciudad.toLowerCase().includes(busqueda) || cliente.datos_personales.estado.toLowerCase().includes(busqueda) || cliente.datos_personales.telefono.toLowerCase().includes(busqueda) || cliente.datos_adicionales.correo_electronico.toLowerCase().includes(busqueda)){
                    //obtener nombre completo
                    let nombreCompleto = cliente.datos_personales.nombre + " " + cliente.datos_personales.apellido_paterno + " " + cliente.datos_personales.apellido_materno;
                    //agregar datos del cliente al cuerpo
                    cuerpo += '<tr>' +
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
            }
        });
        //cargar datos en la tabla
        document.getElementById("tblClientes").innerHTML = cuerpo;
    }

    //habilitar campos
    habilitarCamposModal(){
        //habilitar campos
        //habilitar nombre
        this.nombreModal.disabled = false;
        //habilitar apellido paterno
        this.apellidoPModal.disabled = false;
        //habilitar apellido materno
        this.apellidoMModal.disabled = false;
        //habilitar fecha de nacimiento
        this.fechaNacModal.disabled = false;
        //habilitar rfc
        this.rfcModal.disabled = false;
        //habilitar curp
        this.curpModal.disabled = false;
        //habilitar domicilio
        this.domicilioModal.disabled = false;
        //habilitar codigo postal
        this.cpModal.disabled = false;
        //habilitar ciudad
        this.ciudadModal.disabled = false;
        //habilitar estado
        this.estadoModal.disabled = false;
        //habilitar telefono
        this.telefonoModal.disabled = false;
        //habilitar email
        this.emailModal.disabled = false;
        //habilitar genero
        this.rdgeneromModal.disabled = false;
        this.rdgenerofModal.disabled = false;
    }
    //deshabilitar campos
    deshabilitarCamposModal(){
        //deshabilitar campos
        //deshabilitar nombre
        this.nombreModal.disabled = true;
        //deshabilitar apellido paterno
        this.apellidoPModal.disabled = true;
        //deshabilitar apellido materno
        this.apellidoMModal.disabled = true;
        //deshabilitar fecha de nacimiento
        this.fechaNacModal.disabled = true;
        //deshabilitar rfc
        this.rfcModal.disabled = true;
        //deshabilitar curp
        this.curpModal.disabled = true;
        //deshabilitar domicilio
        this.domicilioModal.disabled = true;
        //deshabilitar codigo postal
        this.cpModal.disabled = true;
        //deshabilitar ciudad
        this.ciudadModal.disabled = true;
        //deshabilitar estado
        this.estadoModal.disabled = true;
        //deshabilitar telefono
        this.telefonoModal.disabled = true;
        //deshabilitar email
        this.emailModal.disabled = true;
        //deshabilitar genero
        this.rdgeneromModal.disabled = true;
        this.rdgenerofModal.disabled = true;
    }

    //Obtener datos del modal
    getDatosClienteModal(){
        //Cambiar formato fecha de nacimiento
        let fechaNacimientoString = this.cambiarFormatoAfechaString(this.fechaNacModal.value);
        //Cambiar formato fecha de registro
        let fechaRegistroString = this.cambiarFormatoAfechaString(this.fechaRegistroModal.value);
        //obtener genero
        let genero;
        if (this.rdgeneromModal.checked) {
            genero = 0;
        }
        else if (this.rdgenerofModal.checked) {
            genero = 1;
        }
        else {
            genero = null;
        }
        //crear objeto datosCliente
        let datosCliente = {
            datos_personales: {
                "nombre": this.nombreModal.value,
                "apellido_paterno": this.apellidoPModal.value,
                "apellido_materno": this.apellidoMModal.value,
                // cambiar a string fecha de nacimiento
                "fecha_de_nacimiento": fechaNacimientoString,
                "RFC": this.rfcModal.value,
                "CURP": this.curpModal.value,
                "domicilio": this.domicilioModal.value,
                "codigo_postal": this.cpModal.value,
                "ciudad": this.ciudadModal.value,
                "estado": this.estadoModal.value,
                "telefono": this.telefonoModal.value,
                "genero": genero
            },
            datos_adicionales: {
                "id": this.idModal.value,
                //cambiar estatus a numero
                "estatus": this.estatusModal.value == "Activo" ? 1 : 0,
                // cambiar a string fecha de registro
                "fecha_de_registro": fechaRegistroString,
                "correo_electronico": this.emailModal.value,
                // estatus: this.estatusModal.value
            }
        };
        return datosCliente;
    }

    //cambiar formato fecha a date
    cambiarFormatoAfechaDate(fechaString){
        //camabiar formato string dia/mes/año a date año-mes-dia
        // Dividir la cadena en día, mes y año
        let partesFecha = fechaString.split('/');
        let dia = parseInt(partesFecha[0], 10);
        let mes = parseInt(partesFecha[1], 10) - 1; // Restar 1 porque los meses en JavaScript son de 0 a 11
        let anio = parseInt(partesFecha[2], 10);
        // Crear un objeto Date con la nueva información
        let fecha = new Date(anio, mes, dia);
        let fechaDate = fecha.toISOString().split('T')[0]; // Extraer la parte de la fecha (sin la hora)
        return fechaDate;
    }
    //cambiar formato fecha a string
    cambiarFormatoAfechaString(fecha){
        let fechaDate = new Date(fecha);
        //camabiar formato date año-mes-dia a string dia/mes/año
        //obtener año
        let anio = fechaDate.getFullYear();
        //obtener mes y dia
        let dia = this.getDia(fecha);
        //obtener mes
        let mes = this.getMes(fecha);
        //concatenar fecha
        let fechaString = dia + "/" + mes + "/" + anio;
        return fechaString;
    }
    //funcion obtener dia
    getDia(fecha){
        let fechaDate = new Date(fecha);
        let dia;
        //obtener dia
        if((fechaDate.getDate() + 1) < 10){
            dia = "0" + (fechaDate.getDate() + 1);
        }
        else{
            dia = "" + (fechaDate.getDate() + 1);
        }
        return dia;
    }
    //funcion obtener mes
    getMes(fecha){
        let fechaDate = new Date(fecha);
        let mes;
        //obtener mes
        if((fechaDate.getMonth() + 1) < 10){
            mes = "0" + (fechaDate.getMonth() + 1);
        }
        else{
            mes = "" + (fechaDate.getMonth() + 1);
        }
        return mes;
    }
}

export default ClientesModel;