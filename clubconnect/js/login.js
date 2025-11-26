document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    
    const formAdmin = document.querySelector('.form-box.login form');
    const formUsuario = document.querySelector('.form-box.register form');

    // Mostrar formulario usuario
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    // Mostrar formulario admin
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // LOGIN ADMIN
    formAdmin.addEventListener('submit', async e => {
        e.preventDefault();

        let datos = new FormData(formAdmin);

        let res = await fetch("./php/login_admin.php", {
            method: "POST",
            body: datos
        });

        let t = await res.text();

        if (t.trim() === "success") {
            window.location.href = "./admin/index.html";
        } else {
            alert("❌ Usuario o contraseña incorrectos");
        }
    });

    // LOGIN USUARIO
    formUsuario.addEventListener('submit', async e => {
        e.preventDefault();

        let datos = new FormData(formUsuario);

        let res = await fetch("./php/login_usuario.php", {
            method: "POST",
            body: datos
        });

        let t = await res.text();

        if (t.trim() === "success") {
            window.location.href = "./usuario/indexUser.html";
        } else {
            alert("❌ Email o contraseña incorrectos");
        }
    });
});
