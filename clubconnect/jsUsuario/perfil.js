// ============================================
// PERFIL CLIENTE - CLUBCONNECT
// ============================================

// DATOS DEL PERFIL (simulados - vendrán de BD)
const datosPerfilCliente = {
    nombre: "María González",
    email: "maria@email.com",
    telefono: "3472984412",
    fechaNacimiento: "1995-05-15",
    direccion: "Av. Principal #123, Col. Centro",
    ciudad: "Tlaxcala",
    codigoPostal: "90000",
    tipoSangre: "O+",
    contactoEmergencia: "5551234567",
    alergias: "Ninguna",
    membresia: {
        tipo: "Premium",
        numero: "10003",
        fechaInicio: "2025-03-22",
        fechaVencimiento: "2025-11-22",
        precioMensual: 800,
        renovacionAutomatica: true
    }
};

let edicionActiva = false;
let datosOriginales = {};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarTabs();
    configurarFormularios();
    configurarSwitches();
    cargarDatosPerfil();
});

// ============================================
// SISTEMA DE TABS
// ============================================
function inicializarTabs() {
    const botonesTabs = document.querySelectorAll('.tab-perfil');
    const contenidoTabs = document.querySelectorAll('.tab-contenido');
    
    botonesTabs.forEach(boton => {
        boton.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clases activas
            botonesTabs.forEach(b => b.classList.remove('activo'));
            contenidoTabs.forEach(c => c.classList.remove('activo'));
            
            // Activar tab seleccionado
            this.classList.add('activo');
            document.getElementById(`tab-${tabId}`).classList.add('activo');
            
            // Guardar en localStorage para persistencia
            localStorage.setItem('tabActivo', tabId);
        });
    });
    
    // Restaurar tab activo si existe
    const tabGuardado = localStorage.getItem('tabActivo');
    if (tabGuardado) {
        const botonGuardado = document.querySelector(`[data-tab="${tabGuardado}"]`);
        if (botonGuardado) {
            botonGuardado.click();
        }
    }
}

// ============================================
// CARGAR DATOS DEL PERFIL
// ============================================
function cargarDatosPerfil() {
    // Llenar campos del formulario
    const form = document.getElementById('form-info-personal');
    if (form) {
        form.querySelector('input[type="text"]').value = datosPerfilCliente.nombre;
        form.querySelector('input[type="email"]').value = datosPerfilCliente.email;
        form.querySelector('input[type="tel"]').value = datosPerfilCliente.telefono;
        form.querySelector('input[type="date"]').value = datosPerfilCliente.fechaNacimiento;
        
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs[1].value = datosPerfilCliente.direccion; // Dirección
        inputs[2].value = datosPerfilCliente.ciudad; // Ciudad
        inputs[3].value = datosPerfilCliente.codigoPostal; // CP
    }
    
    console.log('Datos del perfil cargados:', datosPerfilCliente);
}

// ============================================
// EDICIÓN DE PERFIL
// ============================================
function habilitarEdicion() {
    const form = document.getElementById('form-info-personal');
    const inputs = form.querySelectorAll('input, select, textarea');
    const botonesForm = form.querySelector('.botones-form-perfil');
    
    // Guardar datos originales
    datosOriginales = {};
    inputs.forEach(input => {
        datosOriginales[input.name || input.type] = input.value;
        input.disabled = false;
    });
    
    // Mostrar botones de guardar/cancelar
    botonesForm.style.display = 'flex';
    edicionActiva = true;
    
    // Cambiar foco al primer campo
    inputs[0].focus();
}

function cancelarEdicion() {
    const form = document.getElementById('form-info-personal');
    const inputs = form.querySelectorAll('input, select, textarea');
    const botonesForm = form.querySelector('.botones-form-perfil');
    
    // Restaurar datos originales
    inputs.forEach(input => {
        if (datosOriginales[input.name || input.type]) {
            input.value = datosOriginales[input.name || input.type];
        }
        input.disabled = true;
    });
    
    // Ocultar botones
    botonesForm.style.display = 'none';
    edicionActiva = false;
}

// ============================================
// FORMULARIOS
// ============================================
function configurarFormularios() {
    // Formulario de información personal
    const formInfoPersonal = document.getElementById('form-info-personal');
    if (formInfoPersonal) {
        formInfoPersonal.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarInformacionPersonal(this);
        });
    }
    
    // Formulario de cambio de contraseña
    const formPassword = document.getElementById('form-cambiar-password');
    if (formPassword) {
        formPassword.addEventListener('submit', function(e) {
            e.preventDefault();
            cambiarPassword(this);
        });
    }
}

function guardarInformacionPersonal(form) {
    // Recopilar datos del formulario
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    console.log('Guardando información personal:', datos);
    
    // Simular guardado (aquí irá la petición a tu BD)
    setTimeout(() => {
        mostrarNotificacion('Información actualizada correctamente', 'success');
        
        // Deshabilitar campos nuevamente
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.disabled = true);
        
        // Ocultar botones
        form.querySelector('.botones-form-perfil').style.display = 'none';
        edicionActiva = false;
    }, 1000);
}

function cambiarPassword(form) {
    const passwordActual = form.querySelector('input[type="password"]').value;
    const passwordNueva = form.querySelectorAll('input[type="password"]')[1].value;
    const passwordConfirmar = form.querySelectorAll('input[type="password"]')[2].value;
    
    // Validaciones
    if (!passwordActual || !passwordNueva || !passwordConfirmar) {
        mostrarNotificacion('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (passwordNueva !== passwordConfirmar) {
        mostrarNotificacion('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (passwordNueva.length < 8) {
        mostrarNotificacion('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }
    
    console.log('Cambiando contraseña...');
    
    // Simular cambio de contraseña
    setTimeout(() => {
        mostrarNotificacion('Contraseña actualizada correctamente', 'success');
        form.reset();
    }, 1000);
}

// ============================================
// CAMBIAR FOTO
// ============================================
function cambiarFoto() {
    // Crear input file temporal
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file.name);
            
            // Aquí subirías la imagen a tu servidor
            const reader = new FileReader();
            reader.onload = function(event) {
                // Actualizar preview (si fuera imagen real)
                console.log('Imagen cargada, actualizando...');
                mostrarNotificacion('Foto actualizada correctamente', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
}

// ============================================
// SWITCHES DE NOTIFICACIONES
// ============================================
function configurarSwitches() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const preferencia = this.closest('.item-preferencia-notif')
                                    .querySelector('h4').textContent;
            const estado = this.checked ? 'activada' : 'desactivada';
            
            console.log(`Preferencia "${preferencia}" ${estado}`);
            
            // Aquí guardarías la preferencia en la BD
            mostrarNotificacion(`Preferencia actualizada`, 'success');
        });
    });
}

// ============================================
// ACCIONES DE MEMBRESÍA
// ============================================
document.addEventListener('click', function(e) {
    // Renovar membresía
    if (e.target.closest('.btn-renovar-membresia')) {
        renovarMembresia();
    }
    
    // Cambiar plan
    if (e.target.closest('.btn-cambiar-plan')) {
        cambiarPlan();
    }
    
    // Cancelar membresía
    if (e.target.closest('.btn-cancelar-membresia')) {
        cancelarMembresia();
    }
    
    // Cerrar sesión
    if (e.target.closest('.btn-cerrar-sesion')) {
        cerrarSesion(e.target.closest('.item-sesion'));
    }
    
    // Cerrar todas las sesiones
    if (e.target.closest('.btn-cerrar-todas-sesiones')) {
        cerrarTodasSesiones();
    }
});

function renovarMembresia() {
    console.log('Renovando membresía...');
    mostrarNotificacion('Redirigiendo a pago...', 'info');
    // Aquí redirigirías a la página de pago
}

function cambiarPlan() {
    console.log('Cambiando plan de membresía...');
    mostrarNotificacion('Mostrando planes disponibles...', 'info');
    // Aquí mostrarías un modal con los planes disponibles
}

function cancelarMembresia() {
    const confirmar = confirm('¿Estás seguro de que deseas cancelar tu membresía? Esta acción no se puede deshacer.');
    
    if (confirmar) {
        console.log('Cancelando membresía...');
        mostrarNotificacion('Membresía cancelada. Lamentamos verte partir.', 'error');
        // Aquí procesarías la cancelación en la BD
    }
}

// ============================================
// GESTIÓN DE SESIONES
// ============================================
function cerrarSesion(itemSesion) {
    const dispositivo = itemSesion.querySelector('h4').textContent;
    
    console.log('Cerrando sesión en:', dispositivo);
    
    // Animación de salida
    itemSesion.style.opacity = '0';
    itemSesion.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        itemSesion.remove();
        mostrarNotificacion('Sesión cerrada correctamente', 'success');
    }, 300);
}

function cerrarTodasSesiones() {
    const confirmar = confirm('¿Cerrar todas las sesiones excepto la actual?');
    
    if (confirmar) {
        const sesiones = document.querySelectorAll('.item-sesion:not(.actual)');
        
        sesiones.forEach((sesion, index) => {
            setTimeout(() => {
                cerrarSesion(sesion);
            }, index * 100);
        });
        
        mostrarNotificacion('Todas las sesiones han sido cerradas', 'success');
    }
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <i class='bx ${obtenerIconoNotificacion(tipo)}'></i>
        <span>${mensaje}</span>
    `;
    
    // Estilos inline básicos
    Object.assign(notificacion.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: obtenerColorNotificacion(tipo),
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'var(--body-font)',
        fontWeight: '600'
    });
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

function obtenerIconoNotificacion(tipo) {
    const iconos = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };
    return iconos[tipo] || iconos.info;
}

function obtenerColorNotificacion(tipo) {
    const colores = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colores[tipo] || colores.info;
}

// ============================================
// ANIMACIONES
// ============================================
// Agregar estilos de animación al head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{10}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

function calcularDiasRestantes(fechaVencimiento) {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

// ============================================
// LOG DE DESARROLLO
// ============================================
console.log('✅ Módulo de Perfil inicializado');
console.log('👤 Usuario:', datosPerfilCliente.nombre);
console.log('💳 Membresía:', datosPerfilCliente.membresia.tipo);