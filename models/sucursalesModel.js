//creo la clase para poder hacer las funciones a utilizar 
class sucursalesModel {
    //este contructor me permite acceder a estos datos en el controlador
    constructor() {
        //constantes para los elementos del formulario modal
        //crea constantes del elemento nombre de la sucursal 
        this.nombreSucursal = document.getElementById('txtnombresucursal-modal');
        //crea constantes del elemento nombre del titular de la sucrsal
        this.nombreTitular = document.getElementById('txtnombreTitular-modal');
        //crea constantes del elemento RFC del titular de la sucursal
        this.RFCTitutar = document.getElementById('txtRFCTitutar-modal');
        //crea constantes del elemento domicilio de la sucursal
        this.domicilio = document.getElementById('txtdomicilio-modal');
        //crea constantes del elemento colonia de la sucursal
        this.colonia = document.getElementById('txtcolonia-modal');
        //crea constantes del elemento ciudad de la sucursal
        this.ciudad = document.getElementById('txtciudad-modal');
        //crea constantes del elemento estado de la sucursal
        this.estado = document.getElementById('txtestado-modal');
        //crea constantes del elemento codigo postal de la sucursal
        this.cp = document.getElementById('txtcp-modal');
        //crea constantes del elemento telefono de la sucursal
        this.telefono = document.getElementById('txttelefono-modal');
        //crea constantes del elemento longitud de la sucursal
        this.longitud = document.getElementById('txtlongitud-modal');
        //crea constantes del elemento latitud de la sucursal
        this.latitud = document.getElementById('txtlatitud-modal');
        //crea constantes del elemento estatus de la sucursal
        this.estatusModal = document.getElementById('txtestatus-modal');
        //crea constantes del elemento estatus de la sucursal
        this.id = document.getElementById('txtid-modal');
        //constantes para botones
        //constantes para el boton de eliminar sucursal
        this.btnEliminarSucursalModal = document.getElementById('btnEliminarSucursal');
        //constantes para el boton de editar sucursal
        this.btnEditarSucursalModal = document.getElementById('btnEditarSucursal');
        //constantes para el boton de comfirmar la modificacion
        this.btneConfirmarEdicionModal = document.getElementById('btnConfirmarEdicion');
        this.btnActivarSucursal = document.getElementById('btnActivarSucursal');
    }   

    //metodo para cargar los datos del archivo json
    async cargarDatosSucursales() {
        try {
            //llamar los datos sucursales del json
            const res = await fetch('/data/dataSucursales.json');
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    //funcion para cargar los datos de la sucursal en el modal
     async cargarDatosSucursalModal(indice, dataSucursales) {
        //obtener datos de las sucursales
        const sucursal = dataSucursales[indice];
        console.log(sucursal);
        //Verificar si la sucursal existe
        if (sucursal) {
            //cargar datos en el modal
            this.nombreSucursal.value = sucursal.nombre;
            this.nombreTitular.value = sucursal.titular;
            this.RFCTitutar.value = sucursal.rfc_titular;
            this.domicilio.value = sucursal.domicilio;
            this.colonia.value = sucursal.colonia;
            this.ciudad.value = sucursal.ciudad;
            this.estado.value = sucursal.estado;
            this.cp.value = sucursal.codigo_postal;
            this.telefono.value = sucursal.telefono;
            this.longitud.value = sucursal.longitud;
            this.latitud.value = sucursal.latitud;
            this.estatusModal.value = sucursal.estatus;
            this.id.value = sucursal.id;
            //switch para verificar el estatus de la sucursal
            switch (sucursal.estatus) {
                case 0:
                    this.estatusModal.value = "Inactivo";
                    this.btnEditarSucursalModal.classList.add('d-none');
                    this.btnEliminarSucursalModal.classList.add('d-none');
                    this.btnActivarSucursal.classList.remove('d-none');
                    // this.btneConfirmarEdicionModal.classList.add('d-none');
                    break;
                case 1:
                    this.estatusModal.value = "Activo";
                    this.btnEditarSucursalModal.classList.remove('d-none');
                    this.btnEliminarSucursalModal.classList.remove('d-none');
                    this.btnActivarSucursal.classList.add('d-none');
                    // this.btneConfirmarEdicionModal.classList.remove('d-none');
                    break;
            }
        }
    }

    //funcion eliminar sucursal
    eliminarSucursal(indice, dataSucursales){
        Swal.fire({
            title: "¿Desea eliminar la sucursal?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if(result.isConfirmed){
                dataSucursales[indice].estatus = 0;
                this.estatusModal.value = "Inactivo";
                this.btnEliminarSucursalModal.classList.add("d-none");
                this.btnEditarSucursalModal.classList.add("d-none");
                this.btnActivarSucursal.classList.remove('d-none');
                
                Swal.fire({
                    title: "Se ha eliminado correctamente",
                    icon: "success"
                });
            }
        });
    }

    //activar sucursal

    activarsucursal(indice, dataSucursales){
        Swal.fire({
            title: "¿Desea activar la sucursal?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if(result.isConfirmed){
                dataSucursales[indice].estatus = 1;
                this.estatusModal.value = "Activo";
                this.btnEliminarSucursalModal.classList.remove("d-none");
                this.btnEditarSucursalModal.classList.remove("d-none");
                this.btnActivarSucursal.classList.add('d-none');

                Swal.fire({
                    title: "Se ha activado correctamente",
                    icon: "success"
                });
            }
        });


    }

    //habilitar campos para editar
    habilitarCamposModal() {
        this.nombreSucursal.disabled = false;
        this.nombreTitular.disabled = false;
        this.RFCTitutar.disabled = false;
        this.domicilio.disabled = false;
        this.colonia.disabled = false;
        this.ciudad.disabled = false;
        this.estado.disabled = false;
        this.cp.disabled = false;
        this.telefono.disabled = false;
        this.longitud.disabled = false;
        this.latitud.disabled = false;
    }

    //funcion para deshabilitar campos
    deshabilitarCamposModal() {
        //deshabilitar los campos
        this.nombreSucursal.disabled = true;
        this.nombreTitular.disabled = true;
        this.RFCTitutar.disabled = true;
        this.domicilio.disabled = true;
        this.colonia.disabled = true;
        this.ciudad.disabled = true;
        this.estado.disabled = true;
        this.cp.disabled = true;
        this.telefono.disabled = true;
        this.longitud.disabled = true;
        this.latitud.disabled = true;
        this.estatusModal.disabled = true;
        this.id.disabled = true;
    }

    //confirmar edicion
    getDatosFormModal() {
        let estatusnumero;

        if(this.estatusModal.value === "Activo"){
            estatusnumero = 1;

        }
        else if(this.estatusModal.value === "Inactivo"){
            estatusnumero = 0;

        }
        
        //Crear objeto sucursal
        let sucursal= {

            
                "nombre" : this.nombreSucursal.value,
                "titular" : this.nombreTitular.value,
                "rfc_titular" : this.RFCTitutar.value,
                "domicilio" : this.domicilio.value,
                "colonia" : this.colonia.value,
                "ciudad" : this.ciudad.value,
                "estado" : this.estado.value,
                "codigo_postal" : this.cp.value,
                "telefono" : this.telefono.value,
                "longitud" : this.longitud.value,
                "latitud" : this.latitud.value,
                "estatus" : estatusnumero,
                "id" : this.id.value
            
    }
    return sucursal;
}


  
    
}
//exporta la clase que acabamos de crear para poderla utilizar en el contolador
export default sucursalesModel;