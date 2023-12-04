//creo la clase para poder hacer las funciones a utilizar 
class sucursalesModel{
//este contructor me permite acceder a estos datos en el controlador
    constructor() {
        //constantes para los elementos del formulario modal
        //crea constantes del elemento nombre de la sucursal 
        this.nombreSucursal = document.getElementById('txtnombreSucursal-modal');
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
        this.estatus = document.getElementById('txtestatus-modal');
        //crea constantes del elemento estatus de la sucursal
        this.id = document.getElementById('txtid-modal');
        //constantes para botones
        //constantes para el boton de eliminar sucursal
        this.btnEliminarProductoModal = document.getElementById('btnEliminarSucursal');
        //constantes para el boton de editar sucursal
        this.btnEditarProductoModal = document.getElementById('btnEditarSucursal');
        //constantes para el boton de comfirmar la modificacion
        this.btneConfirmarEdicionModal = document.getElementById('btnConfirmarEdicion');
    }

  //metodo para cargar los datos del archivo json
  async cargarDatosSucursales(){
    try {
        //llamar los datos sucursales del json
        const res = await fetch('/data/dataSucursales.json');
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

//metodo para cargar los datos de la sucursal en el modal
cargarDatosSucursalModal(indice, dataSucursales){
    //obtener datos de las sucursales
    const sucursal = dataSucursales[indice];
    console.log(sucursal);
    //Verificar si la sucursal existe
    if (sucursal){
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
        this.estatus.value = sucursal.estatus;
        this.id.value = sucursal.id;
        //switch para verificar el estatus de la sucursal
        switch (sucursal.estatus) {
            case "0":
                this.estatusModal.value = "Inactivo";
                this.btnEditarSucursalModal.classList.add('d-none');
                this.btnEliminarSucursalModal.classList.add('d-none');
                this.btneConfirmarEdicionModal.classList.add('d-none');
                break;
            case "1":
                this.btnEditarSucursalModal.classList.remove('d-none');
                this.btnEliminarSucursaloModal.classList.remove('d-none');
                this.btneConfirmarEdicionModal.classList.remove('d-none');
                this.estatusModal.value = "Activo";
                break;
        }
    }
}

//habilitar campos para editar
habilitarCamposModal(){
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
        this.estatus.disabled = false;
        this.id.disabled = false;
}

//confirmar edicion
confirmarCambiosModal(indice, dataSucursales){
    //obtener datos del sucursal
    const sucursal = dataSucursales[indice];
    //Verificar si la sucursal existe
    if (sucursal){
        //cargar datos en el modal
        sucursal.nombreSucursal = this.nombreSucursal.value;
        sucursal.nombreTitular = this.nombreTitular.value;
        sucursal.RFCTitutar= this.RFCTitutar.value;
        sucursal.domicilio = this.domicilio.value;
        sucursal.colonia = this.colonia.value;
        sucursal.ciudad = this.ciudad.value;
        sucursal.estado = this.estado.value;
        sucursal.cp = this.cp.value;
        sucursal.telefono = this.telefono.value;
        sucursal.longitud = this.longitud.value;
        sucursal.latitud = this.latitud.value;
        sucursal.estatus = this.estatus.value;
        sucursal.id = this.id.value;
    }
    return sucursal;
}

}
//exporta la clase que acabamos de crear para poderla utilizar en el contolador
export default sucursalesModel;