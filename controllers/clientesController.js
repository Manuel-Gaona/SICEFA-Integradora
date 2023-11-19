//importar clases
import includesModel from "../models/includesModel.js";
import empleadosModel from "../models/empleadosModel.js";

//instanciar clases
const includes = new includesModel();
const empleados = new empleadosModel();

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();