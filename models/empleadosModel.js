//crear clase
class empleadosModel{
    constructor(){
        this.cargarDatosEmpleados();
        //constantes para modal
        this.nombreModal = document.getElementById("txtnombre-modal");
        this.apellidoPModal = document.getElementById("txtapellidoP-modal");
        this.apellidoMModal = document.getElementById("txtapellidoM-modal");
        this.genModal = document.querySelector('input[name="genero-modal"]:checked');
        this.rdgeneromModal = document.getElementById("rdgenerom-modal");
        this.rdgenerofModal = document.getElementById("rdgenerof-modal");
        this.fechaNacimientoModal = document.getElementById("txtfechaNac-modal");
        this.rfcModal = document.getElementById("txtrfc-modal");
        this.curpModal = document.getElementById("txtcurp-modal");
        this.domicilioModal = document.getElementById("txtdomicilio-modal");
        this.cpModal = document.getElementById("txtcp-modal");
        this.ciudadModal = document.getElementById("txtciudad-modal");
        this.estadoModal = document.getElementById("txtestado-modal");
        this.telefonoModal = document.getElementById("txttelefono-modal");
        this.fechaIngresoModal = document.getElementById("txtfechaIng-modal");
        this.puestoModal = document.getElementById("txtpuesto-modal");
        this.salarioModal = document.getElementById("txtsalario-modal");
        this.emailModal = document.getElementById("txtemail-modal");
        this.codigoEmpleadoModal = document.getElementById("txtcodigo-modal");
        this.sucursalModal = document.getElementById("txtsucursal-modal");
        this.nombreUsuarioModal = document.getElementById("txtusuario-modal");
        this.contraseniaModal = document.getElementById("txtcontrasenia-modal");
        this.rolModal = document.getElementById("txtrol-modal");
        this.estatusModal = document.getElementById("txtestatus-modal");
        //botones modal
        this.btnEliminarEmpleadoModal = document.getElementById("btnEliminarEmpleado");
        this.btnEditarEmpleadoModal = document.getElementById("btnEditarEmpleado");
        this.btnConfirmarEdicionModal = document.getElementById("btnConfirmarEdicion");
    }

    //cargar datos empleados
    async cargarDatosEmpleados(){
        try {
            const res = await fetch('/data/dataEmpleados.json');
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    //cargar datos empleado con usuario
    async getDatosEmpleado(usuario){
        try{
            const dataEmpleados = await this.cargarDatosEmpleados();
            const empleado = dataEmpleados.find((e) => e.usuario.nombreUsuario === usuario);

            if(empleado){
                return empleado
            }
            else{
                return null;
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    } 
    //funcion para cambiar contraseña
    async updatePassword(usuario, contrasenia){
        const dataEmpleados = await this.cargarDatosEmpleados();
        const empleado = dataEmpleados.find((e) => e.usuario.nombreUsuario === usuario);
        empleado.usuario.contrasenia = contrasenia;
        console.log('Contraseña actualizada:', empleado);
    }
    //buscar administradores
    buscarAdministradores(dataEmpleados){
        //variable para contador
        let contador = 0;
        //recorrer arreglo de empleados
        dataEmpleados.forEach(function(empleado){
            //validar que el empleado tenga datos laborales, datos personales y usuario
            if (empleado.datosLaborales && empleado.datosPersona && empleado.usuario){
            }
            //validar que el rol del usuario sea ADMC o ADMS
            else if(empleado.usuario.rol === "ADMC" || empleado.usuario.rol === "ADMS"){
                contador++;
                // console.log(empleado);
            }
        });
        return contador;
    }
    //funcion para genero tipo string a tipo number
    generoStringToNumber(genero){
        let generoNumber;
        switch(genero){
            case "masculino": generoNumber = 0; break;
            case "femenino": generoNumber = 1; break;
        }
        return generoNumber;
    }
    //funcion eliminar empleado
    eliminarEmpleado(indice, dataEmpleados){
        Swal.fire({
            title: "¿Desea eliminar el empleado?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if(result.isConfirmed){
                dataEmpleados[indice].usuario.estatus = 0;
                this.cargarDatosEmpleadoModal(indice, dataEmpleados);
                this.btnEliminarEmpleadoModal.classList.add("d-none");
                this.btnEditarEmpleadoModal.classList.add("d-none");
                this.btnConfirmarEdicionModal.classList.add("d-none");
                Swal.fire({
                    title: "Se ha eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }
    //funcion cargar datos empleado en modal
    cargarDatosEmpleadoModal(indice, dataEmpleados){
        //constantes para modal
        //obtener datos de empleado
        const empleado = dataEmpleados[indice];
        //console.log(empleado);
        //cargar datos en modal
        //datos personales
        if(empleado.datosPersona){
            this.nombreModal.value = empleado.datosPersona.nombre;
            this.apellidoPModal.value = empleado.datosPersona.apellidoP;
            this.apellidoMModal.value = empleado.datosPersona.apellidoM;
            this.rfcModal.value = empleado.datosPersona.rfc;
            this.curpModal.value = empleado.datosPersona.curp;
            this.domicilioModal.value = empleado.datosPersona.datosDomicilio.domicilio;
            this.cpModal.value = empleado.datosPersona.datosDomicilio.cp;
            this.ciudadModal.value = empleado.datosPersona.datosDomicilio.ciudad;
            this.estadoModal.value = empleado.datosPersona.datosDomicilio.estado;
            this.telefonoModal.value = empleado.datosPersona.telefono;
            this.sucursalModal.value = empleado.datosLaborales.sucursal;
            //seleccionar radio segun genero
            switch(empleado.datosPersona.genero){
                case 0: this.rdgeneromModal.checked = true; break;
                case 1: this.rdgenerofModal.checked = true; break;
            }
            let fechaNac = this.cambiarFormatoFechaString(empleado.datosPersona.fechaNacimiento);
            this.fechaNacimientoModal.value = fechaNac;
        }
        //datos laborales
        if(empleado.datosLaborales){
            let fechaIngreso = this.cambiarFormatoFechaString(empleado.datosLaborales.fechaIngreso);
            this.fechaIngresoModal.value = fechaIngreso;
            this.puestoModal.value = empleado.datosLaborales.puesto;
            this.salarioModal.value = empleado.datosLaborales.salario;
            this.emailModal.value = empleado.datosLaborales.email;
            this.codigoEmpleadoModal.value = empleado.datosLaborales.codigoEmpleado;
        }
        //datos usuario
        if(empleado.usuario){
            this.nombreUsuarioModal.value = empleado.usuario.nombreUsuario;
            this.contraseniaModal.value = empleado.usuario.contrasenia;
            this.rolModal.value = empleado.usuario.rol;
            //let para estatus
            let estatus;
            //switch para estatus
            switch(empleado.usuario.estatus){
                case 0: 
                    estatus = "Inactivo"; 
                    this.btnEliminarEmpleadoModal.classList.add("d-none");
                    this.btnEditarEmpleadoModal.classList.add("d-none");
                    this.btnConfirmarEdicionModal.classList.add("d-none");
                    break;
                case 1: 
                    estatus = "Activo"
                    this.btnEliminarEmpleadoModal.classList.remove("d-none");
                    this.btnEditarEmpleadoModal.classList.remove("d-none");
                    ; break;
            }
            this.estatusModal.value = estatus;
        }
    }
    //funcion para habilitar campos
    habilitarCamposModal(){
        //habilitar los campos
        this.nombreModal.disabled = false;
        this.apellidoPModal.disabled = false;
        this.apellidoMModal.disabled = false;
        this.rdgeneromModal.disabled = false;
        this.rdgenerofModal.disabled = false;
        this.fechaNacimientoModal.disabled = false;
        this.rfcModal.disabled = false;
        this.curpModal.disabled = false;
        this.domicilioModal.disabled = false;
        this.cpModal.disabled = false;
        this.ciudadModal.disabled = false;
        this.estadoModal.disabled = false;
        this.telefonoModal.disabled = false;
        this.fechaIngresoModal.disabled = false;
        this.puestoModal.disabled = false;
        this.salarioModal.disabled = false;
        this.emailModal.disabled = false;
        // this.codigoEmpleadoModal.disabled = false;
        this.sucursalModal.disabled = false;
        // this.nombreUsuarioModal.disabled = false;
        this.contraseniaModal.disabled = false;
        this.rolModal.disabled = false;
        // this.estatusModal.disabled = false;
    }
    //funcion para deshabilitar campos
    deshabilitarCamposModal(){
        //deshabilitar los campos
        this.nombreModal.disabled = true;
        this.apellidoPModal.disabled = true;
        this.apellidoMModal.disabled = true;
        this.rdgeneromModal.disabled = true;
        this.rdgenerofModal.disabled = true;
        this.fechaNacimientoModal.type = "text";
        this.fechaNacimientoModal.disabled = true;
        this.rfcModal.disabled = true;
        this.curpModal.disabled = true;
        this.domicilioModal.disabled = true;
        this.cpModal.disabled = true;
        this.ciudadModal.disabled = true;
        this.estadoModal.disabled = true;
        this.telefonoModal.disabled = true;
        this.fechaIngresoModal.type = "text";
        this.fechaIngresoModal.disabled = true;
        this.puestoModal.disabled = true;
        this.salarioModal.disabled = true;
        this.emailModal.disabled = true;
        // this.codigoEmpleadoModal.disabled = true;
        this.sucursalModal.disabled = true;
        // this.nombreUsuarioModal.disabled = true;
        this.contraseniaModal.disabled = true;
        this.rolModal.disabled = true;
        // this.estatusModal.disabled = true;
    }
    //funcion para confirmar cambios
    getDatosFormModal(){
        //obtener datos de empleado
        // const empleado = dataEmpleados[indice];
        let generoNumber;
        if(this.rdgeneromModal.checked){
            generoNumber = 0;
        }
        else if(this.rdgenerofModal.checked){
            generoNumber = 1;
        }
        //cambia formato fecha ingreso
        let fechaIngresoDate = this.fechaIngresoModal.value;
        let fechaIngreso = this.cambiarFormatoFechaDate(fechaIngresoDate);
        //cambia formato fecha nacimiento
        let fechaNacimientoDate = this.fechaNacimientoModal.value;
        let fechaNacimiento = this.cambiarFormatoFechaDate(fechaNacimientoDate);
        //cambio tipo de dato de salario a double
        let salario = parseFloat(this.salarioModal.value);
        //cambiar estatus a number
        let estatusNumber;
        if(this.estatusModal.value === "Activo"){
            estatusNumber = 1;
        }
        else if(this.estatusModal.value === "Inactivo"){
            estatusNumber = 0;
        }
        //crear objeto empleado
        let empleado = {
            datosPersona: {
                nombre: this.nombreModal.value,
                apellidoP: this.apellidoPModal.value,
                apellidoM: this.apellidoMModal.value,
                genero: generoNumber,
                fechaNacimiento: fechaNacimiento,
                rfc: this.rfcModal.value,
                curp: this.curpModal.value,
                foto: "",
                datosDomicilio: {
                    domicilio: this.domicilioModal.value,
                    cp: this.cpModal.value,
                    ciudad: this.ciudadModal.value,
                    estado: this.estadoModal.value
                },
                telefono: this.telefonoModal.value
            },
            datosLaborales: {
                fechaIngreso: fechaIngreso,
                puesto: this.puestoModal.value,
                salario: salario,
                email: this.emailModal.value,
                codigoEmpleado: this.codigoEmpleadoModal.value,
                sucursal: this.sucursalModal.value
            },
            usuario: {
                nombreUsuario: this.nombreUsuarioModal.value,
                contrasenia: this.contraseniaModal.value,
                rol: this.rolModal.value,
                estatus: estatusNumber,
                tipoUsuario: this.definirTipoUsuario(this.rolModal.value)
            }
        };
        return empleado;
    }

    //funcion para cambiar formato de fechaDate
    cambiarFormatoFechaDate(fecha){
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
    //funcion para cambiar formato de fechaString
    cambiarFormatoFechaString(fechaString){
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
    //funcion para obtener rol de usuario
    definirTipoUsuario(rol){
        let tipoUsuario
        if(rol === "ADMC"){
            tipoUsuario = 1;
        }
        else if((rol === "ADMS") || (rol === "EMPS")){
            tipoUsuario = 0;
        }
        else{
            tipoUsuario = null;
        }
        return tipoUsuario;
    }
    //funcion para obtener sucursal de empleado que inicio sesion
    getSucursal(usuario, dataEmpleados){
        try{
            const empleado = dataEmpleados.find((e) => e.usuario.nombreUsuario === usuario);
            let sucursal = empleado.datosLaborales.sucursal;
            return sucursal;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}

export default empleadosModel;