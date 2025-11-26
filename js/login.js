document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    
    // ID en el HTML para ser seleccionados de forma única
    const formAdmin = document.querySelector('.form-box.login form');      // Selecciona el formulario dentro de la caja de login/administrador
    const formUsuario = document.querySelector('.form-box.register form'); // Selecciona el formulario dentro de la caja de registro/usuario

    
    const manejarRedireccion = (event, destinoUrl) => {
        event.preventDefault(); // Detiene el envío normal del formulario
        
        // ** Aquí iría tu lógica de validación de credenciales **
        
        console.log(`Simulación: Redirigiendo a ${destinoUrl}`);
        window.location.href = destinoUrl; // Redirección final
    };

    // Al hacer clic en el botón 'Usuario' (Muestra el formulario de registro/usuario)
    if (registerBtn && container) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });
    }

    // Al hacer clic en el botón 'Administrador' (Muestra el formulario de login/administrador)
    if (loginBtn && container) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }

    if (formAdmin) {
        formAdmin.addEventListener('submit', (e) => {
            manejarRedireccion(e, './admin/index.html'); 
        });
    }
    
    // envío del formulario de Usuario / Registro
    if (formUsuario) {
        formUsuario.addEventListener('submit', (e) => {
            manejarRedireccion(e, '../usuario/indexUser.html'); 
        });
    }
});