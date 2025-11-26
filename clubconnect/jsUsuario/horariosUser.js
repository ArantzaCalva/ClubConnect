// ============================================
// HORARIOS CLIENTE - CLUBCONNECT
// ============================================

// DATOS SIMULADOS DE CLASES
const clasesDisponibles = [
    {
        id: 1,
        nombre: "Yoga Matutino",
        instructor: "Ana López",
        horaInicio: "06:00",
        horaFin: "07:00",
        periodo: "AM",
        duracion: 60,
        tipo: "yoga",
        nivel: "principiante",
        cupoActual: 8,
        cupoMaximo: 15,
        descripcion: "Clase de yoga enfocada en respiración, flexibilidad y relajación. Perfecta para comenzar el día con energía positiva y balance mental.",
        requisitos: [
            "Mat de yoga (opcional, hay disponibles)",
            "Ropa cómoda",
            "Botella de agua",
            "Toalla"
        ]
    },
    {
        id: 2,
        nombre: "Crossfit Intenso",
        instructor: "Carlos Ruiz",
        horaInicio: "07:00",
        horaFin: "08:30",
        periodo: "AM",
        duracion: 90,
        tipo: "crossfit",
        nivel: "avanzado",
        cupoActual: 13,
        cupoMaximo: 15,
        descripcion: "Entrenamiento funcional de alta intensidad combinando fuerza, cardio y resistencia. Ideal para quienes buscan resultados rápidos.",
        requisitos: [
            "Ropa deportiva",
            "Tenis apropiados",
            "Botella de agua",
            "Toalla",
            "Guantes (opcional)"
        ]
    }
];

let fechaActual = new Date();
let filtroActivo = 'todas';

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarFiltros();
    actualizarFechaDisplay();
    configurarEventos();
});

// ============================================
// FILTROS
// ============================================
function inicializarFiltros() {
    // Filtros de días
    const tabsDias = document.querySelectorAll('.tab-dia');
    tabsDias.forEach(tab => {
        tab.addEventListener('click', function() {
            tabsDias.forEach(t => t.classList.remove('activo'));
            this.classList.add('activo');
            
            const dia = this.getAttribute('data-dia');
            filtrarPorDia(dia);
        });
    });

    // Filtros de actividad
    const filtrosAct = document.querySelectorAll('.filtro-act');
    filtrosAct.forEach(filtro => {
        filtro.addEventListener('click', function() {
            filtrosAct.forEach(f => f.classList.remove('activo'));
            this.classList.add('activo');
            
            filtroActivo = this.getAttribute('data-filtro');
            aplicarFiltroActividad();
        });
    });
}

function aplicarFiltroActividad() {
    const todasLasClases = document.querySelectorAll('.card-clase');
    
    todasLasClases.forEach(clase => {
        const actividad = clase.getAttribute('data-actividad');
        
        if (filtroActivo === 'todas' || actividad === filtroActivo) {
            clase.style.display = 'block';
            setTimeout(() => {
                clase.style.opacity = '1';
                clase.style.transform = 'translateY(0)';
            }, 10);
        } else {
            clase.style.opacity = '0';
            clase.style.transform = 'translateY(20px)';
            setTimeout(() => {
                clase.style.display = 'none';
            }, 300);
        }
    });
}

function filtrarPorDia(dia) {
    console.log('Filtrando clases para:', dia);
    // Aquí se implementaría la lógica para filtrar por día
    // Cuando esté conectado a BD, cargarás las clases del día seleccionado
}

// ============================================
// NAVEGACIÓN DE FECHAS
// ============================================
function cambiarDia(direccion) {
    fechaActual.setDate(fechaActual.getDate() + direccion);
    actualizarFechaDisplay();
    
    // Aquí cargarías las clases del nuevo día desde la BD
    console.log('Cambiando a fecha:', fechaActual.toLocaleDateString('es-ES'));
}

function actualizarFechaDisplay() {
    const fechaMostrada = document.getElementById('fecha-mostrada');
    if (fechaMostrada) {
        const opciones = { weekday: 'long', day: 'numeric', month: 'short' };
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
        
        const hoy = new Date();
        const esHoy = fechaActual.toDateString() === hoy.toDateString();
        
        if (esHoy) {
            fechaMostrada.textContent = `Hoy, ${fechaFormateada.split(',')[1]}`;
        } else {
            fechaMostrada.textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
        }
    }
}

// ============================================
// MODAL DETALLES DE CLASE
// ============================================
function verDetallesClase(idClase) {
    // Buscar los datos de la clase
    const clase = clasesDisponibles.find(c => c.id === idClase) || clasesDisponibles[0];
    
    // Llenar el modal con la información
    document.getElementById('modal-nombre-clase').textContent = clase.nombre;
    document.getElementById('modal-horario-clase').textContent = 
        `${clase.horaInicio} ${clase.periodo} - ${clase.horaFin} ${clase.periodo}`;
    document.getElementById('modal-instructor').textContent = clase.instructor;
    document.getElementById('modal-duracion').textContent = `${clase.duracion} minutos`;
    document.getElementById('modal-nivel').textContent = clase.nivel.charAt(0).toUpperCase() + clase.nivel.slice(1);
    document.getElementById('modal-cupo').textContent = `${clase.cupoActual} / ${clase.cupoMaximo} lugares`;
    document.getElementById('modal-descripcion').textContent = clase.descripcion;
    
    // Actualizar icono según el tipo de actividad
    const iconoModal = document.querySelector('.icono-modal');
    iconoModal.className = `icono-modal ${clase.tipo}`;
    
    const iconElement = iconoModal.querySelector('i');
    switch(clase.tipo) {
        case 'yoga':
        case 'pilates':
            iconElement.className = 'bx bx-body';
            break;
        case 'crossfit':
            iconElement.className = 'bx bx-dumbbell';
            break;
        case 'spinning':
            iconElement.className = 'bx bx-cycling';
            break;
    }
    
    // Llenar requisitos
    const listaRequisitos = document.getElementById('modal-requisitos');
    listaRequisitos.innerHTML = '';
    clase.requisitos.forEach(req => {
        const li = document.createElement('li');
        li.innerHTML = `<i class='bx bx-check'></i> ${req}`;
        listaRequisitos.appendChild(li);
    });
    
    // Mostrar modal
    abrirModalDetalles();
}

function abrirModalDetalles() {
    const modal = document.getElementById('modal-detalles-clase');
    if (modal) {
        modal.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalDetalles() {
    const modal = document.getElementById('modal-detalles-clase');
    if (modal) {
        modal.classList.remove('activo');
        document.body.style.overflow = 'auto';
    }
}

// ============================================
// CONFIGURAR EVENTOS
// ============================================
function configurarEventos() {
    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-detalles-clase');
        if (modal && event.target === modal) {
            cerrarModalDetalles();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarModalDetalles();
        }
    });

    // Animación de entrada para las tarjetas
    animarTarjetasAlScroll();
}

// ============================================
// ANIMACIONES
// ============================================
function animarTarjetasAlScroll() {
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

    document.querySelectorAll('.card-clase').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function calcularPorcentajeCupo(actual, maximo) {
    return Math.round((actual / maximo) * 100);
}

function obtenerEstadoCupo(porcentaje) {
    if (porcentaje >= 90) return 'lleno';
    if (porcentaje >= 70) return 'alerta';
    return 'disponible';
}

// ============================================
// LOG DE DESARROLLO
// ============================================
console.log('✅ Módulo de Horarios inicializado');
console.log('📅 Fecha actual:', fechaActual.toLocaleDateString('es-ES'));
console.log('🏋️ Clases cargadas:', clasesDisponibles.length);