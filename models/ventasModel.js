class VentasModel {
    constructor() {
        this.cargarDatosVentas();
        // ... Definir constantes para el modal de ventas
        this.clienteModal = document.getElementById("txtcliente-modal");
        this.productoModal = document.getElementById("txtproducto-modal");
        this.cantidadModal = document.getElementById("txtcantidad-modal");
        this.precioModal = document.getElementById("txtprecio-modal");
        // ... Definir botones del modal de ventas
        this.btnEliminarVentaModal = document.getElementById("btnEliminarVenta");
        this.btnEditarVentaModal = document.getElementById("btnEditarVenta");
        this.btnConfirmarEdicionModal = document.getElementById("btnConfirmarEdicion");
        // ... Otros elementos del modal
    }

    // Cargar datos de ventas
    async cargarDatosVentas() {
        try {
            const res = await fetch('/data/dataVentas.json');
            const data = await res.json();
            this.dataVentas = data;  // Guardar los datos de ventas en una propiedad
            // Puedes realizar acciones adicionales al cargar los datos, como actualizar la interfaz
            // ...
        } catch (err) {
            console.log(err);
        }
    }

    // Agregar nueva venta
    agregarVenta(venta) {
        this.dataVentas.push(venta);
        // Puedes realizar acciones adicionales después de agregar la venta, como actualizar la interfaz
        // ...
    }

    // Eliminar venta
    eliminarVenta(indice) {
        Swal.fire({
            title: "¿Desea eliminar la venta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                this.dataVentas.splice(indice, 1);
                // Puedes realizar acciones adicionales después de eliminar la venta, como actualizar la interfaz
                // ...
                this.btnEliminarVentaModal.classList.add("d-none");
                this.btnEditarVentaModal.classList.add("d-none");
                Swal.fire({
                    title: "Se ha eliminado la venta correctamente",
                    icon: "success"
                });
            }
        });
    }

    // Cargar datos de una venta en el modal
    cargarDatosVentaModal(indice) {
        const venta = this.dataVentas[indice];
        this.clienteModal.value = venta.cliente;
        this.productoModal.value = venta.producto;
        this.cantidadModal.value = venta.cantidad;
        this.precioModal.value = venta.precio;
        //this.sucursalModal.value = venta.sucursal;
        
    }

   
}

export default VentasModel;
