//crear clase
class empleadosModel{
    constructor(){
        this.cargarDatosEmpleados();
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
            return console.log(err);
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
    async updatePassword(usuario, contrasenia){
        const dataEmpleados = await this.cargarDatosEmpleados();
        const empleado = dataEmpleados.find((e) => e.usuario.nombreUsuario === usuario);
        empleado.usuario.contrasenia = contrasenia;
        console.log('Contraseña actualizada:', empleado);
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
                this.btnEliminarEmpleadoModal.classList.add("disabled");
                this.btnEditarEmpleadoModal.classList.add("disabled");
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
        console.log(empleado);
        //cargar datos en modal
        //datos personales
        if(empleado.datosPersona){
            this.nombreModal.value = empleado.datosPersona.nombre;
            this.apellidoPModal.value = empleado.datosPersona.apellidoP;
            this.apellidoMModal.value = empleado.datosPersona.apellidoM;
            this.fechaNacimientoModal.value = empleado.datosPersona.fechaNacimiento;
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
        }
        //datos laborales
        if(empleado.datosLaborales){
            this.fechaIngresoModal.value = empleado.datosLaborales.fechaIngreso;
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
                    this.btnEliminarEmpleadoModal.classList.add("disabled");
                    this.btnEditarEmpleadoModal.classList.add("disabled");
                    this.btnConfirmarEdicionModal.classList.add("disabled");
                    break;
                case 1: estatus = "Activo"; break;
            }
            this.estatusModal.value = estatus;
        }
        return empleado;
    }
    //funcion para habilitar campos
    habilitarCamposModal(){
        //habilitar los campos
        this.nombreModal.disabled = false;
        this.apellidoPModal.disabled = false;
        this.apellidoMModal.disabled = false;
        this.rdgeneromModal.disabled = false;
        this.rdgenerofModal.disabled = false;
        this.fechaNacimientoModal.type = "date";
        this.fechaNacimientoModal.disabled = false;
        this.rfcModal.disabled = false;
        this.curpModal.disabled = false;
        this.domicilioModal.disabled = false;
        this.cpModal.disabled = false;
        this.ciudadModal.disabled = false;
        this.estadoModal.disabled = false;
        this.telefonoModal.disabled = false;
        this.fechaIngresoModal.type = "date";
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
    confirmarCambiosModal(indice, dataEmpleados){
        //obtener datos de empleado
        const empleado = dataEmpleados[indice];
        //cargar datos en modal
        //datos personales
        if(empleado.datosPersona){
            empleado.datosPersona.nombre = this.nombreModal.value;
            empleado.datosPersona.apellidoP = this.apellidoPModal.value;
            empleado.datosPersona.apellidoM = this.apellidoMModal.value;
            empleado.datosPersona.fechaNacimiento = this.fechaNacimientoModal.value;
            empleado.datosPersona.rfc = this.rfcModal.value;
            empleado.datosPersona.curp = this.curpModal.value;
            empleado.datosPersona.datosDomicilio.domicilio = this.domicilioModal.value;
            empleado.datosPersona.datosDomicilio.cp = this.cpModal.value;
            empleado.datosPersona.datosDomicilio.ciudad = this.ciudadModal.value;
            empleado.datosPersona.datosDomicilio.estado = this.estadoModal.value;
            empleado.datosPersona.telefono = this.telefonoModal.value;
            empleado.datosLaborales.sucursal = this.sucursalModal.value;
            //seleccionar radio segun genero
            if(this.rdgeneromModal.checked){
                empleado.datosPersona.genero = 0;
            }
            else if(this.rdgenerofModal.checked){
                empleado.datosPersona.genero = 1;
            }
        }
        //datos laborales
        if(empleado.datosLaborales){
            //empleado.datosLaborales.fechaIngreso = this.fechaIngresoModal.value;
            empleado.datosLaborales.puesto = this.puestoModal.value;
            empleado.datosLaborales.salario = this.salarioModal.value;
            empleado.datosLaborales.email = this.emailModal.value;
            //empleado.datosLaborales.codigoEmpleado = this.codigoEmpleadoModal.value;
        }
        //datos usuario
        if(empleado.usuario){
            //empleado.usuario.nombreUsuario = this.nombreUsuarioModal.value;
            empleado.usuario.contrasenia = this.contraseniaModal.value;
            empleado.usuario.rol = this.rolModal.value;
            //eliminar botones si el estatus es = 0
        }
        return empleado;
    }


}

export default empleadosModel;