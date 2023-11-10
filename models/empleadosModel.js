//crear clase
class empleadosModel{
    constructor(){
        this.cargarDatosEmpleados();
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
}

export default empleadosModel;