//crear clase
class empleadosModel{
    constructor(){

    }

    //cargar datos empleados
    async cargarDatosEmpleados(){
        try {
            const res = await fetch('data/dataEmpleados.json');
            const data = await res.json();
            return data;
        } catch (err) {
            return console.log(err);
        }
    }
}

export default empleadosModel;