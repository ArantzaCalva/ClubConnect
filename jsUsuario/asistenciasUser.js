// ============================================
// ASISTENCIAS CLIENTE - CLUBCONNECT
// ============================================

// DATOS SIMULADOS
const estadisticasCliente = {
    visitasMes: 24,
    visitasMesAnterior: 21,
    horasTotales: 36,
    horasMesAnterior: 33,
    promedioVisita: 1.5,
    rachaActual: 7,
    actividadesFavoritas: [
        { nombre: 'Yoga', clases: 15, porcentaje: 75, tipo: 'yoga' },
        { nombre: 'Crossfit', clases: 6, porcentaje: 30, tipo: 'crossfit' },
        { nombre: 'Spinning', clases: 3, porcentaje: 15, tipo: 'spinning' }
    ]
};

const historialAsistencias = [
    {
        id: 1,
        fecha: '2025-11-22',
        clase: 'Yoga Matutino',
        instructor: 'Ana López',
        horaInicio: '08:00',
        horaFin: '09:00',
        duracion: 60,
        tipo: 'yoga',
        estado: 'completado'
    },
    {
        id: 2,
        fecha: '2025-11-20',
        clase: 'Crossfit Intenso',
        instructor: 'Carlos Ruiz',
        horaInicio: '06:30',
        horaFin: '08:00',
        duracion: 90,
        tipo: 'crossfit',
        estado: 'completado'
    },
    {
        id: 3,
        fecha: '2025-11-18',
        clase: 'Spinning Power',
        instructor: 'María Sánchez',
        horaInicio: '17:00',
        horaFin: '17:45',
        duracion: 45,
        tipo: 'spinning',
        estado: 'completado'
    }
];

let periodoActual = 'mes';

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarSelectorPeriodo();
    cargarEstadisticas();
    configurarFiltrosHistorial();
    animarBarrasProgreso();
    animarElementos();
});

// ============================================
// SELECTOR DE PERÍODO
// ============================================
function inicializarSelectorPeriodo() {
    const botonesPeriodo = document.querySelectorAll('.btn-periodo');
    
    botonesPeriodo.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesPeriodo.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            periodoActual = this.getAttribute('data-periodo');
            actualizarDatosPorPeriodo(periodoActual);
        });
    });
}

function actualizarDatosPorPeriodo(periodo) {
    console.log('Actualizando datos para período:', periodo);
    // Aquí cargarías los datos del período seleccionado desde la BD
    
    // Animar el cambio de números
    animarCambioNumeros();
}

// ============================================
// CARGAR ESTADÍSTICAS
// ============================================
function cargarEstadisticas() {
    // Calcular cambios porcentuales
    const cambioVisitas = calcularCambioPorcentual(
        estadisticasCliente.visitasMes,
        estadisticasCliente.visitasMesAnterior
    );
    
    const cambioHoras = calcularCambioPorcentual(
        estadisticasCliente.horasTotales,
        estadisticasCliente.horasMesAnterior
    );
    
    console.log('Estadísticas cargadas:', {
        visitas: estadisticasCliente.visitasMes,
        cambioVisitas: `${cambioVisitas}%`,
        horas: estadisticasCliente.horasTotales,
        cambioHoras: `${cambioHoras}%`
    });
}

function calcularCambioPorcentual(actual, anterior) {
    if (anterior === 0) return 0;
    return Math.round(((actual - anterior) / anterior) * 100);
}

// ============================================
// ANIMACIÓN DE NÚMEROS
// ============================================
function animarCambioNumeros() {
    const numerosGrandes = document.querySelectorAll('.numero-stat-grande');
    
    numerosGrandes.forEach(numero => {
        numero.style.transform = 'scale(1.1)';
        numero.style.color = '#4A9E90'; // Color del tema principal
        
        setTimeout(() => {
            numero.style.transform = 'scale(1)';
            numero.style.color = '';
        }, 300);
    });
}

// ============================================
// FILTROS DE HISTORIAL
// ============================================
function configurarFiltrosHistorial() {
    const buscador = document.querySelector('.buscador-historial');
    const selectorActividad = document.querySelector('.selector-actividad-historial');
    
    if (buscador) {
        buscador.addEventListener('input', function() {
            filtrarHistorial(this.value, selectorActividad.value);
        });
    }
    
    if (selectorActividad) {
        selectorActividad.addEventListener('change', function() {
            filtrarHistorial(buscador.value, this.value);
        });
    }
    
    // Botón cargar más
    const btnCargarMas = document.querySelector('.btn-cargar-mas');
    if (btnCargarMas) {
        btnCargarMas.addEventListener('click', cargarMasRegistros);
    }
}

function filtrarHistorial(textoBusqueda, tipoActividad) {
    const items = document.querySelectorAll('.item-historial');
    
    items.forEach(item => {
        const nombreClase = item.querySelector('.info-historial h3').textContent.toLowerCase();
        const iconoClase = item.querySelector('.icono-clase-historial');
        const tipoClase = iconoClase.classList[1]; // yoga, crossfit, etc.
        
        const coincideTexto = nombreClase.includes(textoBusqueda.toLowerCase());
        const coincideTipo = tipoActividad === 'todas' || tipoClase === tipoActividad;
        
        if (coincideTexto && coincideTipo) {
            item.style.display = 'flex';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function cargarMasRegistros() {
    console.log('Cargando más registros...');
    // Aquí cargarías más registros desde la BD
    
    const btn = document.querySelector('.btn-cargar-mas');
    const iconoOriginal = btn.querySelector('i').className;
    
    // Animación de carga
    btn.querySelector('i').className = 'bx bx-loader-alt bx-spin';
    btn.textContent = 'Cargando...';
    btn.prepend(btn.querySelector('i'));
    
    setTimeout(() => {
        btn.querySelector('i').className = iconoOriginal;
        btn.textContent = 'Cargar más registros';
        btn.prepend(btn.querySelector('i'));
    }, 1500);
}

// ============================================
// ANIMACIÓN DE BARRAS DE PROGRESO
// ============================================
function animarBarrasProgreso() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barras = entry.target.querySelectorAll('.relleno-barra-simple');
                barras.forEach((barra, index) => {
                    setTimeout(() => {
                        barra.style.opacity = '1';
                        barra.style.transform = 'scaleY(1)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const graficaBarras = document.querySelector('.grafica-barras-simple');
    if (graficaBarras) {
        // Preparar barras para animación
        const barras = graficaBarras.querySelectorAll('.relleno-barra-simple');
        barras.forEach(barra => {
            barra.style.opacity = '0';
            barra.style.transform = 'scaleY(0)';
            barra.style.transformOrigin = 'bottom';
            barra.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        observer.observe(graficaBarras);
    }
    
    // Animar barras de actividades favoritas
    const barrasFav = document.querySelectorAll('.relleno-progreso-fav');
    barrasFav.forEach(barra => {
        const anchoFinal = barra.style.width;
        barra.style.width = '0%';
        
        setTimeout(() => {
            barra.style.width = anchoFinal;
        }, 300);
    });
}

// ============================================
// ANIMACIONES GENERALES
// ============================================
function animarElementos() {
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
    
    // Animar tarjetas
    document.querySelectorAll('.card-stat-asistencia, .card-actividad-fav, .item-historial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function formatearDuracion(minutos) {
    if (minutos < 60) {
        return `${minutos} min`;
    }
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
}

// ============================================
// EXPORTAR DATOS (OPCIONAL)
// ============================================
function exportarHistorial() {
    console.log('Exportando historial...');
    // Aquí implementarías la exportación a CSV o PDF
}

// ============================================
// LOG DE DESARROLLO
// ============================================
console.log('✅ Módulo de Asistencias inicializado');
console.log('📊 Estadísticas:', estadisticasCliente);
console.log('📝 Registros en historial:', historialAsistencias.length);