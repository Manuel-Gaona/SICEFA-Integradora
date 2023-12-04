// Importar clases
import includesModel from "../models/includesModel.js";
import ventasModel from "../models/ventasModel.js";
import verificacionModel from "../models/verificacionModel.js";

// Instanciar clases
const includes = new includesModel();
const ventas = new ventasModel();
const verificacion = new verificacionModel();

// Declarar constantes y variables
const usuario = sessionStorage.getItem("usuario");
const rol = sessionStorage.getItem("rol");

// Crear const dataVentas para guardar los datos de las ventas
//let dataVentas = await ventas.cargarDatosVentas();
//console.log(dataVentas);

let dataVentas;

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

// Verificar usuario
verificacion.verificarUsuario(usuario);

// ... (tu código existente)

// Escuchar el evento click del botón agregar venta
const btnAgregarVenta = document.getElementById("btnAgregarVenta");
btnAgregarVenta.addEventListener("click", async (event) => {
  event.preventDefault();
  // Asegurarse de que dataVentas esté inicializado antes de usarlo
  if (!dataVentas) {
    try {
      dataVentas = await ventas.cargarDatosVentas();
      console.log("Datos cargados:", dataVentas);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      return;
    }
  }
  // Obtener datos del formulario
  let cliente = document.getElementById("cliente").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let empleado = document.getElementById("empleado").value;
  let productos = document.getElementById("productos").value;
  let sucursal = document.getElementById("sucursal").value;

  // Validar datos
  if (!cliente || !fecha || !hora || !empleado || !productos || !sucursal) {
    Swal.fire({
      title: "Faltan datos",
      text: "Por favor, completa todos los campos obligatorios.",
      icon: "error",
    });
  } else {
    // Crear objeto venta
    let venta = {
      cliente: cliente,
      fecha: fecha,
      hora: hora,
      empleado: empleado,
      productos: productos,
      sucursal: sucursal,
    };

    // Enviar datos al servidor
    dataVentas.unshift(venta);
    console.log("Datos después de agregar nueva venta:", dataVentas);

    document.getElementById("formAgregarVenta").reset();
    document.getElementById("cliente").focus();

    // Mostrar mensaje de confirmación
    Swal.fire({
      title: "Se ha agregado correctamente",
      icon: "success",
    });
  }
});

// Escuchar el evento click en nav-consultar-tab
const navConsultarTab = document.getElementById("consultar-tab");
navConsultarTab.addEventListener("click", () => {
  loadTable(dataVentas);
});

// Escuchar el evento click del checkbox (if applicable)
const chkestatus = document.getElementById("chkestatus");
if (chkestatus) {
  chkestatus.addEventListener("click", () => {
    // Logic for handling checkbox click, if applicable
  });
}

// Escuchar click en recargarDatos
// Asegúrate de que el script se ejecute después de que se haya cargado el DOM

function generateTable(data) {
    // Obtén la referencia del elemento donde se mostrará la tabla
    const tableContainer = document.getElementById('tablaVentas');

    // Crea la tabla
    
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered'); // Agrega clases de Bootstrap


    // Crea el encabezado de la tabla
    const headerRow = table.insertRow(0);
    for (const key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    }

    
  
  // ... (your existing code)
  
  function eliminarVenta(indice) {
    if (dataVentas && dataVentas.length > indice) {
        dataVentas.splice(indice, 1);
        // Puedes realizar cualquier lógica adicional necesaria
        loadTable(dataVentas); // Recargar la tabla después de eliminar
    }
}
  data.forEach((venta, index) => {
      const row = table.insertRow(index + 1);
      for (const key in venta) {
          const cell = row.insertCell();
          cell.textContent = venta[key];
      }
  
      const cellEliminar = row.insertCell();
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger'); // Add Bootstrap classes
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => confirmarEliminarVenta(index));
      cellEliminar.appendChild(btnEliminar);
  });
 
  
  // Confirm the sale deletion NO BORRAR
  async function confirmarEliminarVenta(indice) {
      try {
          const result = await Swal.fire({
              title: '¿Estás seguro?',
              text: 'No podrás revertir esto.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Sí, eliminar'
          });
  
          if (result.isConfirmed) {
              eliminarVenta(indice);
              Swal.fire(
                  'Eliminado',
                  'La venta ha sido eliminada.',
                  'success'
              );
          }
      } catch (error) {
          console.error('Error during confirmation:', error);
      }
     
  
    }

    // Agrega la tabla al contenedor
    tableContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar la nueva tabla
    tableContainer.appendChild(table);

    console.log("Tabla generada:", data);
}


// Función para cargar la tabla
async function loadTable() {
    try {
        // Asegúrate de obtener los datos correctamente
        const data = await cargarDatosVentas();

        // Verifica si data tiene un valor antes de usarlo
        if (data) {
            // Utiliza los datos para generar la tabla
            generateTable(data);
        } else {
            console.error("No se obtuvieron datos de ventas");
        }
    } catch (error) {
        console.error("Error al cargar datos de ventas:", error);
    }
    

}

// Ejemplo de función cargarDatosVentas (ajusta según tu implementación)
async function cargarDatosVentas() {
    try {
        const res = await fetch('/data/dataVentas.json');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error al cargar datos de ventas:", err);
        throw err;
    }
    
}

