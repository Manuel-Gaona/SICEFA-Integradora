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

    }

    //metodo para obtener todos los clientes
    async cargarDatosClientes() {
        try {
            const res = await fetch('/data/dataClientes.json');
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
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
                    estatus = "Eliminado"; 
                    this.btnEliminarCliente.classList.add("d-none");
                    this.btnEditarCliente.classList.add("d-none");
                    break;
                case 1: 
                    estatus = "Activo"; 
                    this.btnEliminarCliente.classList.remove("d-none");
                    this.btnEditarCliente.classList.remove("d-none");
                    break;
            }
            this.estatusModal.value = estatus;
        }
    }
    //eliminar cliente
    eliminarCliente(indice, dataClientes){
        Swal.fire({
            title: "¿Desea eliminar el cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                //eliminar cliente
                dataClientes[indice].datos_adicionales.estatus = 0;
                this.cargarDatosClienteModal(dataClientes[indice]);
                //desactivar botones
                this.btnEliminarCliente.classList.add("d-none");
                this.btnEditarCliente.classList.add("d-none");
                Swal.fire({
                    title: "Cliente eliminado",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
            }
        });
    }
    //habilitar campos
    habilitarCamposModal(){
        this.nombreModal.disabled = false;
        this.apellidoPModal.disabled = false;
        this.apellidoMModal.disabled = false;
        this.fechaNacModal.disabled = false;
        this.rfcModal.disabled = false;
        this.curpModal.disabled = false;
        this.domicilioModal.disabled = false;
        this.cpModal.disabled = false;
        this.ciudadModal.disabled = false;
        this.estadoModal.disabled = false;
        this.telefonoModal.disabled = false;
        this.emailModal.disabled = false;
        this.rdgeneromModal.disabled = false;
        this.rdgenerofModal.disabled = false;
    }
    //deshabilitar campos
    deshabilitarCamposModal(){
        this.nombreModal.disabled = true;
        this.apellidoPModal.disabled = true;
        this.apellidoMModal.disabled = true;
        this.fechaNacModal.disabled = true;
        this.rfcModal.disabled = true;
        this.curpModal.disabled = true;
        this.domicilioModal.disabled = true;
        this.cpModal.disabled = true;
        this.ciudadModal.disabled = true;
        this.estadoModal.disabled = true;
        this.telefonoModal.disabled = true;
        this.emailModal.disabled = true;
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