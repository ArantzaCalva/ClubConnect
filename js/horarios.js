// ================================================
// FUNCIONALIDADES DE HORARIOS Y CLASES
// ================================================

// BASE DE DATOS SIMULADA
let clases = [
    {
        id: 1,
        tipo: 'crossfit',
        instructor: 'Carlos Méndez',
        dia: 'lunes',
        horaInicio: '06:00',
        duracion: 60,
        capacidad: 15,
        inscritos: 12,
        descripcion: 'Entrenamiento de alta intensidad que combina levantamiento de pesas, ejercicios cardiovasculares y gimnásticos.'
    },
    {
        id: 2,
        tipo: 'yoga',
        instructor: 'María González',
        dia: 'martes',
        horaInicio: '08:00',
        duracion: 60,
        capacidad: 20,
        inscritos: 18,
        descripcion: 'Clase de yoga para todos los niveles. Mejora tu flexibilidad, fuerza y equilibrio mental.'
    },
    {
        id: 3,
        tipo: 'spinning',
        instructor: 'Juan Pérez',
        dia: 'martes',
        horaInicio: '18:00',
        duracion: 45,
        capacidad: 12,
        inscritos: 8,
        descripcion: 'Ciclismo indoor con música energizante. Quema calorías mientras fortaleces tus piernas.'
    },
    {
        id: 4,
        tipo: 'pilates',
        instructor: 'Laura Torres',
        dia: 'miercoles',
        horaInicio: '10:00',
        duracion: 50,
        capacidad: 15,
        inscritos: 10,
        descripcion: 'Ejercicios de bajo impacto para fortalecer el core y mejorar la postura.'
    },
    {
        id: 5,
        tipo: 'crossfit',
        instructor: 'Carlos Méndez',
        dia: 'miercoles',
        horaInicio: '18:30',
        duracion: 60,
        capacidad: 15,
        inscritos: 15,
        descripcion: 'Entrenamiento funcional de alta intensidad. Grupo avanzado.'
    },
    {
        id: 6,
        tipo: 'yoga',
        instructor: 'María González',
        dia: 'jueves',
        horaInicio: '07:00',
        duracion: 60,
        capacidad: 20,
        inscritos: 5,
        descripcion: 'Yoga matutino para comenzar el día con energía positiva.'
    },
    {
        id: 7,
        tipo: 'zumba',
        instructor: 'Ana Rodríguez',
        dia: 'viernes',
        horaInicio: '19:00',
        duracion: 45,
        capacidad: 25,
        inscritos: 22,
        descripcion: 'Baile fitness con ritmos latinos. Diversión garantizada mientras te pones en forma.'
    }
];

// Socios inscritos simulados
const sociosInscritos = [
    { id: 1, nombre: 'María González', iniciales: 'MG' },
    { id: 2, nombre: 'Carlos Rodríguez', iniciales: 'CR' },
    { id: 3, nombre: 'Juan Pérez', iniciales: 'JP' },
    { id: 4, nombre: 'Laura Martínez', iniciales: 'LM' },
    { id: 5, nombre: 'Ana Torres', iniciales: 'AT' }
];

// Variables globales
let diaSeleccionado = 'martes';
let tipoSeleccionado = 'todas';
let vistaActual = 'lista';
let claseActual = null;

// ================================================
// FUNCIONES DE MODAL
// ================================================

function abrirModal(idModal) {
    document.getElementById(idModal).classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove('activo');
    document.body.style.overflow = 'auto';
    
    // Limpiar formulario
    if (idModal === 'modal nueva clase') {
        document.querySelector('.formulario.clase').reset();
    }
}

// Cerrar modal al hacer clic fuera
document.querySelectorAll('.modal.fondo').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModal(this.id);
        }
    });
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.fondo.activo').forEach(modal => {
            cerrarModal(modal.id);
        });
    }
});


// ================================================
// FILTROS
// ================================================

// Filtrar por día
document.querySelectorAll('.boton.dia').forEach(boton => {
    boton.addEventListener('click', function() {
        document.querySelectorAll('.boton.dia').forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        diaSeleccionado = this.dataset.dia;
        renderizarClases();
    });
});

// Filtrar por tipo de actividad
document.querySelectorAll('.filtro.actividad').forEach(filtro => {
    filtro.addEventListener('click', function() {
        document.querySelectorAll('.filtro.actividad').forEach(f => f.classList.remove('activo'));
        this.classList.add('activo');
        tipoSeleccionado = this.dataset.tipo;
        renderizarClases();
    });
});

// ================================================
// RENDERIZAR CLASES
// ================================================

function renderizarClases() {
    const contenedor = document.getElementById('contenedor clases');
    
    // Filtrar clases
    let clasesFiltradas = clases.filter(clase => {
        const coincideDia = clase.dia === diaSeleccionado;
        const coincideTipo = tipoSeleccionado === 'todas' || clase.tipo === tipoSeleccionado;
        return coincideDia && coincideTipo;
    });
    
    // Ordenar por hora
    clasesFiltradas.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    
    contenedor.innerHTML = '';
    
    if (clasesFiltradas.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje vacio">
                <i class='bx bx-calendar-x'></i>
                <h3>No hay clases programadas</h3>
                <p>No se encontraron clases para este día y filtro</p>
            </div>
        `;
        return;
    }
    
    clasesFiltradas.forEach(clase => {
        const porcentaje = (clase.inscritos / clase.capacidad) * 100;
        let estadoClase = 'disponible';
        let textoEstado = 'Disponible';
        
        if (porcentaje >= 100) {
            estadoClase = 'llena';
            textoEstado = 'Llena';
        } else if (porcentaje >= 70) {
            estadoClase = 'medio';
            textoEstado = 'Pocos cupos';
        }
        
        const horaFin = calcularHoraFin(clase.horaInicio, clase.duracion);
        
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta clase';
        tarjeta.onclick = () => verDetallesClase(clase.id);
        
        tarjeta.innerHTML = `
            <div class="icono clase ${clase.tipo}">
                <i class='bx ${obtenerIcono(clase.tipo)}'></i>
            </div>
            
            <div class="info clase">
                <h3>${clase.tipo}</h3>
                <p class="instructor">
                    <i class='bx bx-user'></i>
                    ${clase.instructor}
                </p>
                <div class="detalles clase">
                    <span class="detalle item">
                        <i class='bx bx-time'></i>
                        ${clase.horaInicio} - ${horaFin}
                    </span>
                    <span class="detalle item">
                        <i class='bx bx-hourglass'></i>
                        ${clase.duracion} min
                    </span>
                    <span class="detalle item">
                        <i class='bx bx-group'></i>
                        ${clase.inscritos}/${clase.capacidad}
                    </span>
                </div>
            </div>
            
            <div class="acciones clase">
                <div class="estado clase ${estadoClase}">
                    <i class='bx ${estadoClase === 'llena' ? 'bx-lock' : 'bx-check-circle'}'></i>
                    ${textoEstado}
                </div>
            </div>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}

// ================================================
// VER DETALLES DE CLASE
// ================================================

function verDetallesClase(idClase) {
    const clase = clases.find(c => c.id === idClase);
    if (!clase) return;
    
    claseActual = clase;
    
    // Actualizar información
    document.getElementById('titulo detalle').textContent = clase.tipo.charAt(0).toUpperCase() + clase.tipo.slice(1);
    document.getElementById('subtitulo detalle').textContent = `Clase de ${clase.tipo}`;
    
    const iconoDetalle = document.getElementById('icono detalle');
    iconoDetalle.className = `icono clase grande ${clase.tipo}`;
    iconoDetalle.innerHTML = `<i class='bx ${obtenerIcono(clase.tipo)}'></i>`;
    
    document.getElementById('nombre clase detalle').textContent = clase.tipo.charAt(0).toUpperCase() + clase.tipo.slice(1);
    document.getElementById('instructor detalle').textContent = clase.instructor;
    document.getElementById('dia detalle').textContent = clase.dia.charAt(0).toUpperCase() + clase.dia.slice(1);
    
    const horaFin = calcularHoraFin(clase.horaInicio, clase.duracion);
    document.getElementById('horario detalle').textContent = `${clase.horaInicio} - ${horaFin}`;
    document.getElementById('duracion detalle').textContent = `${clase.duracion} minutos`;
    document.getElementById('capacidad detalle').textContent = `${clase.inscritos}/${clase.capacidad}`;
    document.getElementById('texto descripcion').textContent = clase.descripcion;
    
    // Mostrar inscritos simulados
    const listaInscritos = document.getElementById('lista inscritos');
    const numeroInscritos = Math.min(clase.inscritos, sociosInscritos.length);
    
    document.getElementById('contador inscritos').textContent = `(${clase.inscritos})`;
    
    if (numeroInscritos === 0) {
        listaInscritos.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No hay socios inscritos aún</p>';
    } else {
        listaInscritos.innerHTML = '';
        for (let i = 0; i < numeroInscritos; i++) {
            const socio = sociosInscritos[i];
            const item = document.createElement('div');
            item.className = 'item inscrito';
            item.innerHTML = `
                <div class="avatar inscrito">${socio.iniciales}</div>
                <span class="nombre inscrito">${socio.nombre}</span>
            `;
            listaInscritos.appendChild(item);
        }
    }
    
    abrirModal('modal ver clase');
}

// ================================================
// GUARDAR NUEVA CLASE
// ================================================

function guardarClase(event) {
    event.preventDefault();
    
    const nuevaClase = {
        id: clases.length + 1,
        tipo: document.getElementById('tipo actividad').value,
        instructor: document.getElementById('instructor').value,
        dia: document.getElementById('dia clase').value,
        horaInicio: document.getElementById('hora inicio').value,
        duracion: parseInt(document.getElementById('duracion').value),
        capacidad: parseInt(document.getElementById('capacidad').value),
        inscritos: 0,
        descripcion: document.getElementById('descripcion clase').value || 'Sin descripción'
    };
    
    clases.push(nuevaClase);
    
    alert(`✅ Clase creada exitosamente\n\n${nuevaClase.tipo.charAt(0).toUpperCase() + nuevaClase.tipo.slice(1)}\n${nuevaClase.dia} - ${nuevaClase.horaInicio}\nInstructor: ${nuevaClase.instructor}`);
    
    cerrarModal('modal nueva clase');
    renderizarClases();
}

// ================================================
// EDITAR Y ELIMINAR CLASE
// ================================================

function editarClase() {
    if (!claseActual) return;
    alert(`Editar clase: ${claseActual.tipo}\n\n(Próximamente: Modal de edición con datos precargados)`);
}

function eliminarClase() {
    if (!claseActual) return;
    
    if (confirm(`¿Estás seguro de eliminar la clase de ${claseActual.tipo}?\n\nDía: ${claseActual.dia}\nHora: ${claseActual.horaInicio}\nInstructor: ${claseActual.instructor}`)) {
        clases = clases.filter(c => c.id !== claseActual.id);
        alert('✅ Clase eliminada exitosamente');
        cerrarModal('modal ver clase');
        renderizarClases();
    }
}

// ================================================
// UTILIDADES
// ================================================

function obtenerIcono(tipo) {
    const iconos = {
        crossfit: 'bx-run',
        yoga: 'bx-body',
        spinning: 'bx-cycling',
        pilates: 'bx-spa',
        zumba: 'bx-music',
        funcional: 'bx-dumbbell'
    };
    return iconos[tipo] || 'bx-dumbbell';
}

function calcularHoraFin(horaInicio, duracion) {
    const [horas, minutos] = horaInicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracion;
    const horasFin = Math.floor(totalMinutos / 60);
    const minutosFin = totalMinutos % 60;
    return `${horasFin.toString().padStart(2, '0')}:${minutosFin.toString().padStart(2, '0')}`;
}

// ================================================
// INICIALIZACIÓN
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    renderizarClases();
    console.log('✅ Sistema de horarios y clases cargado');
});

/* ================================================
   1. CONTROL DE MODALES
   ================================================ */

/**
 * Abre un modal específico.
 * @param {string} idModal - El ID del modal a abrir (ej: 'modal nueva clase').
 */
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.add('activo');
        document.body.style.overflow = 'hidden'; // Evita scroll en el fondo
    }
}

/**
 * Cierra un modal específico.
 * @param {string} idModal - El ID del modal a cerrar.
 */
function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.remove('activo');
        document.body.style.overflow = ''; // Restaura el scroll
    }
}


/* ---------------------------------
   1. Conteo animado de métricas
----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const numeros = document.querySelectorAll(".numero");

    numeros.forEach(n => {
        let final = parseInt(n.textContent);
        let inicio = 0;
        let velocidad = 20;

        let intervalo = setInterval(() => {
            inicio += 1;
            n.textContent = inicio;

            if (inicio >= final) clearInterval(intervalo);
        }, velocidad);
    });
});


/* ---------------------------------
   2. Barra de progreso en agenda
----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const clases = document.querySelectorAll(".item-clase");

    clases.forEach(c => {
        let barra = document.createElement("div");
        barra.classList.add("barra");

        let relleno = document.createElement("div");
        relleno.classList.add("relleno");

        // Estado para ejemplo:
        let porcentaje = 0;

        if (c.querySelector(".estado").classList.contains("ok")) porcentaje = 45;
        if (c.querySelector(".estado").classList.contains("lleno")) porcentaje = 100;
        if (c.querySelector(".estado").classList.contains("cancelado")) porcentaje = 0;

        barra.appendChild(relleno);
        c.appendChild(barra);

        setTimeout(() => {
            relleno.style.width = porcentaje + "%";
            if (porcentaje === 100) relleno.style.background = "#e65050";
            else if (porcentaje >= 50) relleno.style.background = "#58c75c";
            else relleno.style.background = "#f0c43d";
        }, 300);
    });

});


/* ---------------------------------
   3. Filtro de clases
----------------------------------- */

function filtrarClases() {
    const valor = document.getElementById("filtroTipo").value;
    const items = document.querySelectorAll(".item-clase");

    items.forEach(item => {
        const titulo = item.querySelector(".info h4").textContent;

        if (valor === "todos" || titulo.includes(valor)) {
            item.style.display = "flex";
            item.style.opacity = "1";
        } else {
            item.style.opacity = "0";
            setTimeout(() => item.style.display = "none", 200);
        }
    });
}

document.addEventListener("DOMContentLoaded", crearGrafica);

