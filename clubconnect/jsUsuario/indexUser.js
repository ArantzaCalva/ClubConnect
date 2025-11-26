// ============================================
// DASHBOARD CLIENTE - CLUBCONNECT
// ============================================

// DATOS SIMULADOS DEL CLIENTE (más adelante vendrán de la BD)
const datosCliente = {
    nombre: "María González",
    iniciales: "MG",
    membresia: {
        tipo: "Premium",
        numero: "10003",
        estado: "activa",
        fechaVencimiento: "2025-11-22",
        diasRestantes: 30
    },
    estadisticas: {
        visitasMes: 8,
        horasEntrenamiento: 12,
        clasesCompletadas: 5,
        rachaConsecutiva: 3
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarFecha();
    cargarDatosCliente();
    calcularDiasRestantes();
});

// ============================================
// FECHA ACTUAL
// ============================================
function inicializarFecha() {
    const fechaElement = document.getElementById('fecha-actual');
    if (fechaElement) {
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const fecha = new Date().toLocaleDateString('es-ES', opciones);
        fechaElement.textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    }
}

// ============================================
// CARGAR DATOS DEL CLIENTE
// ============================================
function cargarDatosCliente() {
    // Esta función se conectará a tu backend más adelante
    console.log('Datos del cliente cargados:', datosCliente);
    
    // Actualizar estadísticas en la interfaz
    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    // Actualizar números de estadísticas
    const stats = datosCliente.estadisticas;
    
    // Puedes agregar lógica para actualizar los números dinámicamente
    console.log('Estadísticas actualizadas');
}

// ============================================
// CALCULAR DÍAS RESTANTES DE MEMBRESÍA
// ============================================
function calcularDiasRestantes() {
    const fechaVencimiento = new Date(datosCliente.membresia.fechaVencimiento);
    const hoy = new Date();
    const diferencia = fechaVencimiento - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    
    const diasElement = document.querySelector('.dias-restantes');
    if (diasElement) {
        diasElement.textContent = `${dias} días`;
    }
    
    // Cambiar color si está próximo a vencer
    if (dias <= 7) {
        diasElement.style.color = '#e74c3c';
    } else if (dias <= 15) {
        diasElement.style.color = '#f39c12';
    }
}

// ============================================
// MODAL QR CHECK-IN
// ============================================
function abrirModalQR() {
    const modal = document.getElementById('modal-qr');
    if (modal) {
        modal.classList.add('activo');
        document.body.style.overflow = 'hidden';
        
        // Aquí se generaría el QR real con una librería como QRCode.js
        console.log('Generando QR para check-in:', datosCliente.membresia.numero);
    }
}

function cerrarModalQR() {
    const modal = document.getElementById('modal-qr');
    if (modal) {
        modal.classList.remove('activo');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-qr');
    if (modal && event.target === modal) {
        cerrarModalQR();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModalQR();
    }
});

// ============================================
// NOTIFICACIONES (OPCIONAL)
// ============================================
function verificarVencimientoProximo() {
    const diasRestantes = datosCliente.membresia.diasRestantes;
    
    if (diasRestantes <= 7 && diasRestantes > 0) {
        mostrarNotificacion(`Tu membresía vence en ${diasRestantes} días. ¡Renueva pronto!`, 'warning');
    }
}

function mostrarNotificacion(mensaje, tipo) {
    // Puedes implementar un sistema de notificaciones toast
    console.log(`Notificación [${tipo}]: ${mensaje}`);
    
    // Ejemplo básico de alerta (mejorar con un sistema toast)
    // alert(mensaje);
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.tarjeta-acceso, .tarjeta-estadistica, .tarjeta-clase').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// DATOS DE EJEMPLO PARA CLASES
// (Estos vendrían de la BD)
// ============================================
const clasesProximas = [
    {
        id: 1,
        nombre: "Yoga Matutino",
        hora: "06:00",
        periodo: "AM",
        duracion: 60,
        instructor: "Ana López",
        cupo: { actual: 8, maximo: 15 },
        nivel: "principiante"
    },
    {
        id: 2,
        nombre: "Crossfit Intenso",
        hora: "07:00",
        periodo: "AM",
        duracion: 90,
        instructor: "Carlos Ruiz",
        cupo: { actual: 13, maximo: 15 },
        nivel: "avanzado"
    },
    {
        id: 3,
        nombre: "Spinning",
        hora: "05:00",
        periodo: "PM",
        duracion: 45,
        instructor: "María Sánchez",
        cupo: { actual: 5, maximo: 12 },
        nivel: "intermedio"
    }
];

// ============================================
// DATOS DE EJEMPLO PARA ASISTENCIAS
// (Estos vendrían de la BD)
// ============================================
const asistenciasRecientes = [
    {
        fecha: "2025-11-22",
        clase: "Yoga Matutino",
        horaInicio: "08:00",
        horaFin: "09:00",
        duracion: 60
    },
    {
        fecha: "2025-11-20",
        clase: "Crossfit Intenso",
        horaInicio: "06:30",
        horaFin: "08:00",
        duracion: 90
    },
    {
        fecha: "2025-11-18",
        clase: "Spinning",
        horaInicio: "17:00",
        horaFin: "17:45",
        duracion: 45
    }
];

// ============================================
// LOG DE DESARROLLO
// ============================================
console.log('✅ Dashboard Cliente inicializado');
console.log('👤 Usuario:', datosCliente.nombre);
console.log('💳 Membresía:', datosCliente.membresia.tipo, '-', datosCliente.membresia.numero);