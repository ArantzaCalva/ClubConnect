// ================================================
// FUNCIONALIDADES DE ASISTENCIAS
// ================================================

// BASE DE DATOS SIMULADA (Más adelante se conectará a BD real)
const socios = [
    {
        id: 10003,
        nombre: 'María González',
        membresia: 'Premium',
        iniciales: 'MG',
        activo: true,
        actividad: 'Yoga'
    },
    {
        id: 10008,
        nombre: 'Carlos Rodríguez',
        membresia: 'Premium',
        iniciales: 'CR',
        activo: true,
        actividad: 'Crossfit'
    },
    {
        id: 10015,
        nombre: 'Juan Pérez',
        membresia: 'Pase del Día',
        iniciales: 'JP',
        activo: true,
        actividad: 'Spinning'
    },
    {
        id: 10022,
        nombre: 'Laura Martínez',
        membresia: 'Básica',
        iniciales: 'LM',
        activo: true,
        actividad: 'Pilates'
    },
    {
        id: 10005,
        nombre: 'Ana Torres',
        membresia: 'Premium',
        iniciales: 'AT',
        activo: true,
        actividad: 'Zumba'
    }
];

// ASISTENCIAS SIMULADAS
let asistencias = [
    {
        id: 1,
        socioId: 10003,
        nombre: 'María González',
        membresia: 'Premium - #10003',
        iniciales: 'MG',
        actividad: 'Yoga',
        entrada: '08:15',
        salida: null,
        fecha: new Date().toISOString().split('T')[0]
    },
    {
        id: 2,
        socioId: 10008,
        nombre: 'Carlos Rodríguez',
        membresia: 'Premium - #10008',
        iniciales: 'CR',
        actividad: 'Crossfit',
        entrada: '06:30',
        salida: '08:00',
        fecha: new Date().toISOString().split('T')[0]
    },
    {
        id: 3,
        socioId: 10015,
        nombre: 'Juan Pérez',
        membresia: 'Pase del Día - #10015',
        iniciales: 'JP',
        actividad: 'Spinning',
        entrada: '10:00',
        salida: null,
        fecha: new Date().toISOString().split('T')[0]
    },
    {
        id: 4,
        socioId: 10022,
        nombre: 'Laura Martínez',
        membresia: 'Básica - #10022',
        iniciales: 'LM',
        actividad: 'Pilates',
        entrada: '07:45',
        salida: '09:15',
        fecha: new Date().toISOString().split('T')[0]
    }
];

// Variable para filtro actual
let filtroActual = 'hoy';

// ================================================
// FUNCIONES DE MODAL
// ================================================

function abrirModal(idModal) {
    document.getElementById(idModal).classList.add('activo');
    document.body.style.overflow = 'hidden';
    
    // Establecer hora actual
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    document.getElementById('hora entrada').value = `${hora}:${minutos}`;
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove('activo');
    document.body.style.overflow = 'auto';
    
    // Limpiar campos
    document.getElementById('buscar socio input').value = '';
    document.getElementById('info socio').style.display = 'none';
    document.getElementById('actividad entrada').value = '';
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
// BUSCAR SOCIO POR ID O MEMBRESÍA
// ================================================

let socioSeleccionado = null;

document.getElementById('buscar socio input')?.addEventListener('input', function(e) {
    const texto = e.target.value.trim();
    
    if (texto.length >= 3) {
        // Buscar por ID (número) o por nombre
        const busqueda = texto.toLowerCase();
        const socioEncontrado = socios.find(socio => 
            socio.id.toString().includes(busqueda) || 
            socio.nombre.toLowerCase().includes(busqueda)
        );
        
        if (socioEncontrado) {
            socioSeleccionado = socioEncontrado;
            mostrarSocioEncontrado(socioEncontrado);
        } else {
            document.getElementById('info socio').style.display = 'none';
            socioSeleccionado = null;
        }
    } else {
        document.getElementById('info socio').style.display = 'none';
        socioSeleccionado = null;
    }
});

function mostrarSocioEncontrado(socio) {
    document.getElementById('info socio').style.display = 'flex';
    document.getElementById('avatar socio').textContent = socio.iniciales;
    document.getElementById('nombre socio').textContent = socio.nombre;
    document.getElementById('membresia socio').textContent = `${socio.membresia} - #${socio.id}`;
    
    const estadoElement = document.getElementById('estado socio');
    if (socio.activo) {
        estadoElement.className = 'estado membresia activa';
        estadoElement.innerHTML = '<i class="bx bx-check-circle"></i> Membresía Activa';
    } else {
        estadoElement.className = 'estado membresia vencida';
        estadoElement.innerHTML = '<i class="bx bx-x-circle"></i> Membresía Vencida';
    }
    
    // Pre-seleccionar actividad si el socio tiene una
    if (socio.actividad) {
        document.getElementById('actividad entrada').value = socio.actividad.toLowerCase();
    }
}

// ================================================
// REGISTRAR ASISTENCIA
// ================================================

function registrarAsistencia() {
    if (!socioSeleccionado) {
        alert('⚠️ Por favor busca y selecciona un socio primero');
        return;
    }
    
    const actividad = document.getElementById('actividad entrada').value;
    const hora = document.getElementById('hora entrada').value;
    
    if (!actividad) {
        alert('⚠️ Por favor selecciona una actividad');
        return;
    }
    
    // Verificar si ya tiene asistencia hoy
    const yaRegistrado = asistencias.find(a => 
        a.socioId === socioSeleccionado.id && 
        a.fecha === new Date().toISOString().split('T')[0] &&
        a.salida === null
    );
    
    if (yaRegistrado) {
        alert('⚠️ Este socio ya tiene una asistencia activa hoy');
        return;
    }
    
    // Crear nueva asistencia
    const nuevaAsistencia = {
        id: asistencias.length + 1,
        socioId: socioSeleccionado.id,
        nombre: socioSeleccionado.nombre,
        membresia: `${socioSeleccionado.membresia} - #${socioSeleccionado.id}`,
        iniciales: socioSeleccionado.iniciales,
        actividad: actividad.charAt(0).toUpperCase() + actividad.slice(1),
        entrada: hora,
        salida: null,
        fecha: new Date().toISOString().split('T')[0]
    };
    
    asistencias.unshift(nuevaAsistencia); // Agregar al inicio
    
    // Actualizar vista
    actualizarResumen();
    renderizarAsistencias();
    
    alert(`✅ Asistencia registrada exitosamente\n\nSocio: ${socioSeleccionado.nombre}\nActividad: ${nuevaAsistencia.actividad}\nHora: ${hora}`);
    
    cerrarModal('modal marcar asistencia');
}

// ================================================
// MARCAR SALIDA
// ================================================

function marcarSalida(asistenciaId) {
    const asistencia = asistencias.find(a => a.id === asistenciaId);
    
    if (!asistencia) return;
    
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const horaSalida = `${hora}:${minutos}`;
    
    if (confirm(`¿Marcar salida de ${asistencia.nombre}?\n\nHora: ${horaSalida}`)) {
        asistencia.salida = horaSalida;
        
        // Actualizar vista
        actualizarResumen();
        renderizarAsistencias();
        
        alert(`✅ Salida registrada: ${horaSalida}`);
    }
}

// ================================================
// RENDERIZAR ASISTENCIAS
// ================================================

function renderizarAsistencias() {
    const contenedor = document.querySelector('.contenedor.registros');
    if (!contenedor) return;
    
    // Filtrar asistencias según filtro actual
    let asistenciasFiltradas = filtrarAsistencias();
    
    // Aplicar búsqueda si hay texto
    const textoBusqueda = document.querySelector('.buscador.asistencias input')?.value.toLowerCase();
    if (textoBusqueda) {
        asistenciasFiltradas = asistenciasFiltradas.filter(a => 
            a.nombre.toLowerCase().includes(textoBusqueda) ||
            a.membresia.toLowerCase().includes(textoBusqueda)
        );
    }
    
    // Actualizar contador
    document.querySelector('.contador.lista').textContent = `${asistenciasFiltradas.length} registros`;
    
    contenedor.innerHTML = '';
    
    if (asistenciasFiltradas.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888;">
                <i class='bx bx-search' style="font-size: 3rem; margin-bottom: 10px;"></i>
                <p>No se encontraron registros</p>
            </div>
        `;
        return;
    }
    
    asistenciasFiltradas.forEach(asistencia => {
        const estaPresente = asistencia.salida === null;
        
        const registro = document.createElement('article');
        registro.className = 'registro asistencia';
        
        registro.innerHTML = `
            <div class="foto socio">
                <div class="avatar socio">${asistencia.iniciales}</div>
            </div>
            
            <div class="info socio">
                <h3>${asistencia.nombre}</h3>
                <span class="membresia">${asistencia.membresia}</span>
            </div>

            <div class="actividad registro">
                <i class='bx bx-dumbbell'></i>
                <span>${asistencia.actividad}</span>
            </div>

            <div class="horario registro">
                <div class="entrada">
                    <i class='bx bx-log-in'></i>
                    <div>
                        <small>Entrada</small>
                        <strong>${asistencia.entrada}</strong>
                    </div>
                </div>
                ${asistencia.salida ? `
                    <div class="salida">
                        <i class='bx bx-log-out'></i>
                        <div>
                            <small>Salida</small>
                            <strong>${asistencia.salida}</strong>
                        </div>
                    </div>
                ` : ''}
                <div class="estado ${estaPresente ? 'presente' : 'completado'}">
                    <i class='bx ${estaPresente ? 'bx-check-circle' : 'bx-check-double'}'></i>
                    <span>${estaPresente ? 'En el gimnasio' : 'Completado'}</span>
                </div>
            </div>

            <div class="acciones registro">
                <button class="boton ver detalles" onclick="verDetalles(${asistencia.id})">
                    <i class='bx bx-show'></i>
                </button>
                ${estaPresente ? `
                    <button class="boton marcar salida" onclick="marcarSalida(${asistencia.id})">
                        <i class='bx bx-log-out'></i>
                    </button>
                ` : ''}
            </div>
        `;
        
        contenedor.appendChild(registro);
    });
}

// ================================================
// FILTROS POR FECHA
// ================================================

function filtrarAsistencias() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    return asistencias.filter(asistencia => {
        const fechaAsistencia = new Date(asistencia.fecha + 'T00:00:00');
        
        switch(filtroActual) {
            case 'hoy':
                return fechaAsistencia.getTime() === hoy.getTime();
                
            case 'semana':
                const inicioSemana = new Date(hoy);
                inicioSemana.setDate(hoy.getDate() - hoy.getDay());
                const finSemana = new Date(inicioSemana);
                finSemana.setDate(inicioSemana.getDate() + 6);
                return fechaAsistencia >= inicioSemana && fechaAsistencia <= finSemana;
                
            case 'mes':
                return fechaAsistencia.getMonth() === hoy.getMonth() &&
                       fechaAsistencia.getFullYear() === hoy.getFullYear();
                
            default:
                return true;
        }
    });
}

// Botones de filtro
document.querySelectorAll('.filtro.rapido').forEach(boton => {
    boton.addEventListener('click', function() {
        document.querySelectorAll('.filtro.rapido').forEach(b => b.classList.remove('activo'));
        this.classList.add('activo');
        
        filtroActual = this.dataset.filtro;
        actualizarResumen();
        renderizarAsistencias();
    });
});

// ================================================
// ACTUALIZAR RESUMEN
// ================================================

function actualizarResumen() {
    const hoy = new Date().toISOString().split('T')[0];
    
    // Asistencias de hoy
    const asistenciasHoy = asistencias.filter(a => a.fecha === hoy);
    document.querySelector('.tarjeta.resumen:nth-child(1) .numero').textContent = asistenciasHoy.length;
    
    // Asistencias de la semana
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const asistenciasSemana = asistencias.filter(a => {
        const fecha = new Date(a.fecha);
        return fecha >= inicioSemana;
    });
    document.querySelector('.tarjeta.resumen:nth-child(2) .numero').textContent = asistenciasSemana.length;
    
    // Asistencias del mes
    const mesActual = new Date().getMonth();
    const asistenciasMes = asistencias.filter(a => {
        const fecha = new Date(a.fecha);
        return fecha.getMonth() === mesActual;
    });
    document.querySelector('.tarjeta.resumen:nth-child(3) .numero').textContent = asistenciasMes.length;
    
    // En el gimnasio ahora
    const enGimnasio = asistencias.filter(a => a.fecha === hoy && a.salida === null);
    document.querySelector('.tarjeta.resumen:nth-child(4) .numero').textContent = enGimnasio.length;
}

// ================================================
// BUSCADOR
// ================================================

document.querySelector('.buscador.asistencias input')?.addEventListener('input', function() {
    renderizarAsistencias();
});

// ================================================
// VER DETALLES
// ================================================

function verDetalles(asistenciaId) {
    const asistencia = asistencias.find(a => a.id === asistenciaId);
    if (!asistencia) return;
    
    const duracion = asistencia.salida ? calcularDuracion(asistencia.entrada, asistencia.salida) : 'En curso';
    
    alert(`📋 Detalles de Asistencia\n\n` +
          `Socio: ${asistencia.nombre}\n` +
          `Membresía: ${asistencia.membresia}\n` +
          `Actividad: ${asistencia.actividad}\n` +
          `Entrada: ${asistencia.entrada}\n` +
          `Salida: ${asistencia.salida || 'Aún en el gimnasio'}\n` +
          `Duración: ${duracion}\n` +
          `Fecha: ${formatearFecha(asistencia.fecha)}\n\n` +
          `(Próximamente: Modal con historial completo)`);
}

function calcularDuracion(entrada, salida) {
    const [hE, mE] = entrada.split(':').map(Number);
    const [hS, mS] = salida.split(':').map(Number);
    
    const minutosEntrada = hE * 60 + mE;
    const minutosSalida = hS * 60 + mS;
    const duracionMin = minutosSalida - minutosEntrada;
    
    const horas = Math.floor(duracionMin / 60);
    const minutos = duracionMin % 60;
    
    return `${horas}h ${minutos}min`;
}

function formatearFecha(fecha) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const f = new Date(fecha + 'T00:00:00');
    return `${f.getDate()} ${meses[f.getMonth()]} ${f.getFullYear()}`;
}

// ================================================
// EXPORTAR
// ================================================

document.querySelector('.boton.exportar')?.addEventListener('click', function() {
    alert('📊 Exportar Asistencias\n\n' +
          '• PDF - Reporte detallado\n' +
          '• Excel - Datos completos\n' +
          '• CSV - Para análisis\n\n' +
          '(Próximamente: Generación de reportes)');
});

// ================================================
// INICIALIZACIÓN
// ================================================

// Establecer fecha de hoy
const hoy = new Date().toISOString().split('T')[0];
document.getElementById('fecha seleccionada').value = hoy;

// Renderizar al cargar
document.addEventListener('DOMContentLoaded', function() {
    actualizarResumen();
    renderizarAsistencias();
    console.log('✅ Sistema de asistencias cargado y funcional');
});