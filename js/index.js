// ============================================
// DASHBOARD ADMIN - CLUBCONNECT
// ============================================

// DATOS SIMULADOS (vendrán de tu BD)
const datosEstadisticas = {
    totalSocios: 3,
    asistenciasHoy: 12,
    sociosActivos: 2,
    ingresosMes: 1300,
    sociosEnGimnasio: 8,
    membresias: {
        premium: 1,
        basica: 1,
        paseDelDia: 1
    }
};

const asistenciasRecientes = [
    {
        nombre: "Carlos Rodríguez",
        iniciales: "CR",
        actividad: "Crossfit",
        hora: "06:30 AM",
        tiempoRelativo: "Hace 4 horas",
        estado: "completado"
    },
    {
        nombre: "María González",
        iniciales: "MG",
        actividad: "Yoga",
        hora: "08:15 AM",
        tiempoRelativo: "Hace 2 horas",
        estado: "activo"
    },
    {
        nombre: "Juan Pérez",
        iniciales: "JP",
        actividad: "Spinning",
        hora: "10:00 AM",
        tiempoRelativo: "Hace 30 min",
        estado: "activo"
    },
    {
        nombre: "Laura Martínez",
        iniciales: "LM",
        actividad: "Pilates",
        hora: "07:45 AM",
        tiempoRelativo: "Completado",
        estado: "completado"
    }
];

const proximasClases = [
    {
        nombre: "Spinning Power",
        instructor: "María Sánchez",
        hora: "05:00",
        periodo: "PM",
        cupoActual: 5,
        cupoMaximo: 12
    },
    {
        nombre: "Yoga Relajante",
        instructor: "Ana López",
        hora: "06:00",
        periodo: "PM",
        cupoActual: 9,
        cupoMaximo: 15
    },
    {
        nombre: "Crossfit Nocturno",
        instructor: "Carlos Ruiz",
        hora: "07:00",
        periodo: "PM",
        cupoActual: 15,
        cupoMaximo: 15
    }
];

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarFechaHora();
    cargarEstadisticas();
    actualizarTiemposRelativos();
    animarElementos();
    
    // Actualizar cada minuto
    setInterval(actualizarHora, 60000);
    setInterval(actualizarTiemposRelativos, 60000);
});

// ============================================
// FECHA Y HORA
// ============================================
function inicializarFechaHora() {
    actualizarFecha();
    actualizarHora();
}

function actualizarFecha() {
    const fechaElement = document.getElementById('fecha-display');
    if (fechaElement) {
        const ahora = new Date();
        const opciones = { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        const fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
        fechaElement.textContent = fechaFormateada;
    }
}

function actualizarHora() {
    const horaElement = document.getElementById('hora-display');
    if (horaElement) {
        const ahora = new Date();
        let horas = ahora.getHours();
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        const periodo = horas >= 12 ? 'PM' : 'AM';
        
        horas = horas % 12 || 12;
        
        horaElement.textContent = `${horas}:${minutos} ${periodo}`;
    }
}

// ============================================
// CARGAR ESTADÍSTICAS
// ============================================
function cargarEstadisticas() {
    // Actualizar números
    actualizarNumero('total-socios', datosEstadisticas.totalSocios);
    actualizarNumero('asistencias-hoy', datosEstadisticas.asistenciasHoy);
    actualizarNumero('socios-activos', datosEstadisticas.sociosActivos);
    
    // Formatear ingresos
    const ingresoElement = document.getElementById('ingresos-mes');
    if (ingresoElement) {
        ingresoElement.textContent = `$${datosEstadisticas.ingresosMes.toLocaleString()}`;
    }
    
    console.log('Estadísticas cargadas:', datosEstadisticas);
}

function actualizarNumero(elementId, valorFinal) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const valorInicial = 0;
    const duracion = 1000; // 1 segundo
    const incremento = valorFinal / (duracion / 16);
    let valorActual = valorInicial;
    
    const intervalo = setInterval(() => {
        valorActual += incremento;
        if (valorActual >= valorFinal) {
            element.textContent = Math.round(valorFinal);
            clearInterval(intervalo);
        } else {
            element.textContent = Math.round(valorActual);
        }
    }, 16);
}

// ============================================
// TIEMPOS RELATIVOS
// ============================================
function actualizarTiemposRelativos() {
    // Esta función actualizaría los "Hace X horas" dinámicamente
    // Por ahora son estáticos pero aquí calcularías el tiempo real
    console.log('Actualizando tiempos relativos...');
}

function calcularTiempoRelativo(fechaHora) {
    const ahora = new Date();
    const fecha = new Date(fechaHora);
    const diferencia = ahora - fecha;
    
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(diferencia / 3600000);
    const dias = Math.floor(diferencia / 86400000);
    
    if (minutos < 60) {
        return `Hace ${minutos} min`;
    } else if (horas < 24) {
        return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else {
        return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    }
}

// ============================================
// ANIMACIONES
// ============================================
function animarElementos() {
    // Animar tarjetas estadísticas
    const cards = document.querySelectorAll('.card-stat-admin');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
    
    // Animar barras de progreso
    animarBarrasProgreso();
    
    // Observer para elementos que aparecen al scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );
    
    document.querySelectorAll('.card-dashboard').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function animarBarrasProgreso() {
    const barras = document.querySelectorAll('.relleno-tipo, .relleno-barra-simple, .barra-cupo-mini .relleno');
    
    barras.forEach((barra, index) => {
        const anchoFinal = barra.style.width;
        barra.style.width = '0%';
        
        setTimeout(() => {
            barra.style.transition = 'width 1s ease';
            barra.style.width = anchoFinal;
        }, 300 + (index * 100));
    });
}

// ============================================
// MANEJO DE ALERTAS
// ============================================
document.addEventListener('click', function(e) {
    const btnAlerta = e.target.closest('.btn-ver-alerta');
    if (btnAlerta) {
        const alerta = btnAlerta.closest('.alerta-item');
        manejarAlerta(alerta, btnAlerta);
    }
});

function manejarAlerta(alerta, boton) {
    const texto = boton.textContent.trim();
    
    if (texto === 'Ok' || texto === 'Cerrar') {
        // Animar y eliminar alerta
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            alerta.remove();
            actualizarContadorAlertas();
        }, 300);
    } else {
        // Redirigir según el tipo de alerta
        const titulo = alerta.querySelector('h4').textContent;
        
        if (titulo.includes('Membresías')) {
            window.location.href = './socios.html';
        } else if (titulo.includes('Clase')) {
            window.location.href = './horarios.html';
        } else if (titulo.includes('Pago')) {
            window.location.href = './pagos.html';
        }
    }
}

function actualizarContadorAlertas() {
    const badge = document.querySelector('.badge-alertas');
    const alertasRestantes = document.querySelectorAll('.alerta-item').length;
    
    if (badge) {
        badge.textContent = alertasRestantes;
        
        if (alertasRestantes === 0) {
            badge.style.display = 'none';
        }
    }
}

// ============================================
// ACTUALIZACIÓN AUTOMÁTICA
// ============================================
function actualizarDatosDashboard() {
    // Esta función se llamaría periódicamente para actualizar datos desde el servidor
    console.log('Actualizando datos del dashboard...');
    
    // Aquí harías fetch a tu API
    // fetch('/api/dashboard/estadisticas')
    //     .then(response => response.json())
    //     .then(data => {
    //         actualizarEstadisticas(data);
    //     });
}

// Actualizar cada 5 minutos (opcional)
// setInterval(actualizarDatosDashboard, 300000);

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function formatearMoneda(cantidad) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(cantidad);
}

function calcularPorcentaje(parte, total) {
    return Math.round((parte / total) * 100);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Sistema de notificaciones toast
    const notif = document.createElement('div');
    notif.className = `notificacion-toast ${tipo}`;
    notif.innerHTML = `
        <i class='bx ${obtenerIconoNotif(tipo)}'></i>
        <span>${mensaje}</span>
    `;
    
    Object.assign(notif.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db',
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function obtenerIconoNotif(tipo) {
    const iconos = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        info: 'bx-info-circle',
        warning: 'bx-error'
    };
    return iconos[tipo] || iconos.info;
}

// ============================================
// EXPORTAR DATOS
// ============================================
function exportarReporte() {
    console.log('Exportando reporte del dashboard...');
    mostrarNotificacion('Generando reporte...', 'info');
    
    // Aquí generarías un PDF o CSV con los datos
    setTimeout(() => {
        mostrarNotificacion('Reporte generado correctamente', 'success');
    }, 2000);
}

// ============================================
// ATAJOS DE TECLADO (OPCIONAL)
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl + N = Nuevo socio
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        window.location.href = './socios.html';
    }
    
    // Ctrl + A = Marcar asistencia
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        window.location.href = './asistencias.html';
    }
});

// ============================================
// ANIMACIONES CSS
// ============================================
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
// LOG DE DESARROLLO
// ============================================
console.log('✅ Dashboard Admin inicializado');
console.log('📊 Estadísticas:', datosEstadisticas);
console.log('👥 Asistencias recientes:', asistenciasRecientes.length);
console.log('📅 Próximas clases:', proximasClases.length);