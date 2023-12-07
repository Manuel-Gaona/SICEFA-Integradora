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

// Llama a la función para incluir el header y el footer
includes.incluirHeader();
includes.incluirFooter();

// Verificar usuario
verificacion.verificarUsuario("ventas");
