// ventas.js


// Función para cargar datos de ventas al inicio
document.addEventListener('DOMContentLoaded', function () {
    // Realizar una solicitud fetch para obtener los datos del archivo JSON
    fetch('dataVentas.json')
        .then(response => response.json())
        .then(datosVentas => cargarDatosEnTabla(datosVentas))
        .catch(error => console.error('Error al cargar los datos:', error));
});

// Función para cargar datos en la tabla
function cargarDatosEnTabla(datos) {
    var tableBody = document.getElementById('ventasTableBody');

    datos.forEach(function (venta) {
        var newRow = tableBody.insertRow();

        Object.values(venta).forEach(function (value) {
            var newCell = newRow.insertCell();
            newCell.innerHTML = value;
        });

        // Crear un botón de eliminar
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = 'Eliminar';
        deleteButton.onclick = function () {
            eliminarVenta(newRow);
        };

        // Insertar el botón en la celda de acciones
        var cellAcciones = newRow.insertCell();
        cellAcciones.appendChild(deleteButton);

        // Crear un botón de generación de PDF
        var pdfButton = document.createElement('button');
        pdfButton.classList.add('btn', 'btn-success', 'btn-sm');
        pdfButton.innerHTML = 'PDF';
        pdfButton.onclick = function () {
            generarPDF(newRow);
        };

        // Insertar el botón de generación de PDF en la nueva celda
        var cellPDF = newRow.insertCell();
        cellPDF.appendChild(pdfButton);
        function generarPDF(venta) {
    // Obtén la ubicación relativa del documento PDF en tu proyecto
    var rutaPDF = 'detalle de venta.pdf'; // Ajusta esto según tu estructura de carpetas y nombre del archivo PDF

    // Abre el documento PDF en una nueva ventana o pestaña del navegador
    window.open(rutaPDF, '_blank');

    // Mostrar una alerta de SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'PDF abierto',
        text: 'El documento PDF ha sido abierto correctamente.',
    });
}
    });
}

// Función para generar un PDF con la información de la fila seleccionada
// Función para generar un PDF con la información de la venta
function generarPDF(venta) {
    // Crear un nuevo objeto html2pdf
    var pdf = new html2pdf();

    // Crear el contenido HTML del PDF
    var contenidoPDF = `
        <h1>Detalles de la Venta</h1>
        <p><strong>Cliente:</strong> ${venta.cliente}</p>
        <p><strong>Fecha:</strong> ${venta.fecha}</p>
        <p><strong>Hora:</strong> ${venta.hora}</p>
        <p><strong>Empleado:</strong> ${venta.empleado}</p>
        <p><strong>Productos:</strong> ${venta.productos}</p>
        <p><strong>Sucursal:</strong> ${venta.sucursal}</p>
    `;

    // Agregar el contenido al PDF
    pdf.from(contenidoPDF);

    // Guardar el PDF con un nombre único
    var nombrePDF = 'Venta_' + Date.now() + '.pdf';
    pdf.save(nombrePDF);

    // Mostrar una alerta de SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'PDF generado',
        text: 'El PDF ha sido generado correctamente.',
    });
}

// Ejemplo de uso (llama a esta función con los datos de la venta)
var ventaEjemplo = {
    cliente: 'Juan Pérez',
    fecha: '2023-12-06',
    hora: '15:30',
    empleado: 'Ana Gómez',
    productos: 'Producto 1, Producto 2',
    sucursal: 'Sucursal A',
};

// Llama a la función para generar el PDF con los datos de la venta de ejemplo
generarPDF(ventaEjemplo);


// Función para buscar ventas
function buscarVentas() {
    // Obtener el término de búsqueda
    var terminoBusqueda = document.getElementById('buscar').value.toLowerCase();

    // Validar que se haya ingresado un término de búsqueda
    if (!terminoBusqueda.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingrese un término de búsqueda.',
        });
        return;
    }

    // Recorrer todas las filas de la tabla
    var filas = document.getElementById('ventasTableBody').rows;
    var resultadosEncontrados = false;

    for (var i = 0; i < filas.length; i++) {
        // Obtener el contenido de cada celda en minúsculas
        var contenidoFila = filas[i].textContent.toLowerCase();

        // Mostrar u ocultar la fila según si el término de búsqueda está presente
        var filaVisible = contenidoFila.includes(terminoBusqueda);
        filas[i].style.display = filaVisible ? '' : 'none';

        // Actualizar la variable resultadosEncontrados si se encuentra alguna coincidencia
        resultadosEncontrados = resultadosEncontrados || filaVisible;
    }

    // Mostrar una alerta si no se encuentran resultados
    if (!resultadosEncontrados) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron resultados para la búsqueda.',
        });
    }
}

// Función para eliminar una venta
function eliminarVenta(row) {
    // Confirmar con SweetAlert2 antes de eliminar
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Eliminar la fila
            row.remove();
            // Mostrar una alerta de SweetAlert2
            Swal.fire(
                'Eliminado',
                'La venta ha sido eliminada.',
                'success'
            );
        }
    });
}

// Función para registrar una venta
function registrarVenta() {
    // Obtener los valores del formulario
    var cliente = document.getElementById('cliente').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;
    var empleado = document.getElementById('empleado').value;
    var productos = document.getElementById('productos').value;
    var sucursal = document.getElementById('sucursal').value;

    // Validar que los campos no estén vacíos
    if (!cliente || !fecha || !hora || !empleado || !productos || !sucursal) {
        // Mostrar una alerta de SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos del formulario.',
        });
        return;
    }

    // Crear una nueva fila para la tabla
    var tableBody = document.getElementById('ventasTableBody');
    var newRow = tableBody.insertRow();

    // Insertar celdas con los valores del formulario
    var cellCliente = newRow.insertCell(0);
    var cellFecha = newRow.insertCell(1);
    var cellHora = newRow.insertCell(2);
    var cellEmpleado = newRow.insertCell(3);
    var cellProductos = newRow.insertCell(4);
    var cellSucursal = newRow.insertCell(5);
    var cellAcciones = newRow.insertCell(6);

    cellCliente.innerHTML = cliente;
    cellFecha.innerHTML = fecha;
    cellHora.innerHTML = hora;
    cellEmpleado.innerHTML = empleado;
    cellProductos.innerHTML = productos;
    cellSucursal.innerHTML = sucursal;

    // Crear un botón de eliminar
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.onclick = function () {
        eliminarVenta(newRow);
    };

    // Insertar el botón en la celda de acciones
    cellAcciones.appendChild(deleteButton);

    // Limpiar los campos del formulario después de registrar la venta
    document.getElementById('cliente').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('empleado').value = '';
    document.getElementById('productos').value = '';
    document.getElementById('sucursal').value = '';

    // Mostrar una alerta de SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Venta registrada con éxito.',
    });
    

    // Otras acciones que puedas necesitar realizar después de registrar la venta
    // ...
}
