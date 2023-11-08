class ModoColorModel {
    constructor() {
        
    }
    cambiarModoColor(){
        // Obtén el atributo data-bs-theme actual
        const temaActual = document.documentElement.getAttribute('data-bs-theme');

        // Cambia de "light" a "dark" o viceversa
        if (temaActual === 'light') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
        }
    }
}

export default ModoColorModel;