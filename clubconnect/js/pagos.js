// ===========================
// DATOS Y VARIABLES GLOBALES
// ===========================

let pagos = [];
let socios = [];
let pagosFiltrados = [];
let pagoEditando = null;

// Precios de membresías
const preciosMembresias = {
    basica: 500,
    premium: 800,
    vip: 1200
};

// Descuentos por duración
const descuentos = {
    1: 0,
    3: 0.05,
    6: 0.10,
    12: 0.15
};

// ===========================
// INICIALIZACIÓN
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    inicializarEventos();
    establecerFechaActual();
    renderizarPagos();
    actualizarResumen();
});

// ===========================
// CARGAR DATOS
// ===========================

function cargarDatos() {
    // Cargar pagos del localStorage
    const pagosGuardados = localStorage.getItem('pagos');
    if (pagosGuardados) {
        pagos = JSON.parse(pagosGuardados);
    } else {
        // Datos de ejemplo
        pagos = [
            {
                id: 1,
                socioId: 1,
                nombreSocio: "María García",
                membresia: "Premium",
                numeroMembresia: "MEM-001",
                monto: 800,
                duracion: 1,
                metodoPago: "Tarjeta",
                fechaPago: "2025-11-01",
                fechaVencimiento: "2025-12-01",
                estado: "pagado",
                notas: ""
            },
            {
                id: 2,
                socioId: 2,
                nombreSocio: "Carlos Ruiz",
                membresia: "VIP",
                numeroMembresia: "MEM-002",
                monto: 1200,
                duracion: 1,
                metodoPago: "Efectivo",
                fechaPago: "2025-11-05",
                fechaVencimiento: "2025-12-05",
                estado: "pagado",
                notas: ""
            },
            {
                id: 3,
                socioId: 3,
                nombreSocio: "Ana Martínez",
                membresia: "Básica",
                numeroMembresia: "MEM-003",
                monto: 500,
                duracion: 1,
                metodoPago: "Transferencia",
                fechaPago: "2025-10-15",
                fechaVencimiento: "2025-11-15",
                estado: "vencido",
                notas: "Membresía vencida"
            },
            {
                id: 4,
                socioId: 4,
                nombreSocio: "Luis Hernández",
                membresia: "Premium",
                numeroMembresia: "MEM-004",
                monto: 800,
                duracion: 1,
                metodoPago: "Efectivo",
                fechaPago: "2025-10-20",
                fechaVencimiento: "2025-11-20",
                estado: "pendiente",
                notas: "Pago próximo a vencer"
            }
        ];
    }

    // Cargar socios del localStorage
    const sociosGuardados = localStorage.getItem('socios');
    if (sociosGuardados) {
        socios = JSON.parse(sociosGuardados);
    } else {
        // Socios de ejemplo
        socios = [
            { id: 1, nombre: "María García", membresia: "Premium", numeroMembresia: "MEM-001" },
            { id: 2, nombre: "Carlos Ruiz", membresia: "VIP", numeroMembresia: "MEM-002" },
            { id: 3, nombre: "Ana Martínez", membresia: "Básica", numeroMembresia: "MEM-003" },
            { id: 4, nombre: "Luis Hernández", membresia: "Premium", numeroMembresia: "MEM-004" },
            { id: 5, nombre: "Sofia López", membresia: "Básica", numeroMembresia: "MEM-005" }
        ];
    }

    pagosFiltrados = [...pagos];
}

// ===========================
// GUARDAR DATOS
// ===========================

function guardarDatos() {
    localStorage.setItem('pagos', JSON.stringify(pagos));
}

// ===========================
// EVENTOS
// ===========================

function inicializarEventos() {
    // Búsqueda
    const inputBuscar = document.getElementById('buscar pago');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', function() {
            filtrarPagos();
        });
    }

    // Filtros rápidos
    const botonesFiltro = document.querySelectorAll('.filtro.pago');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            filtrarPagos();
        });
    });

    // Selector de mes
    const selectorMes = document.getElementById('selector mes');
    if (selectorMes) {
        selectorMes.addEventListener('change', function() {
            filtrarPagos();
        });
    }

    // Búsqueda de socio en modal
    const buscarSocioPago = document.getElementById('buscar socio pago');
    if (buscarSocioPago) {
        buscarSocioPago.addEventListener('input', function() {
            buscarSocio(this.value);
        });
    }

    // Tipo de membresía
    const tipoMembresia = document.getElementById('tipo membresia');
    if (tipoMembresia) {
        tipoMembresia.addEventListener('change', calcularMonto);
    }
}

// ===========================
// RENDERIZAR PAGOS
// ===========================

function renderizarPagos() {
    const contenedor = document.getElementById('registros pagos');
    const contador = document.querySelector('.contador.pagos');
    
    if (!contenedor) return;

    if (pagosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje vacio">
                <i class='bx bx-receipt'></i>
                <p>No hay pagos registrados</p>
                <small>Comienza registrando un nuevo pago</small>
            </div>
        `;
        if (contador) contador.textContent = '0 registros';
        return;
    }

    contenedor.innerHTML = pagosFiltrados.map(pago => {
        const estadoClass = pago.estado === 'pagado' ? 'estado pagado' : 
                          pago.estado === 'pendiente' ? 'estado pendiente' : 
                          'estado vencido';
        
        const estadoTexto = pago.estado === 'pagado' ? 'Pagado' : 
                           pago.estado === 'pendiente' ? 'Pendiente' : 
                           'Vencido';
        
        const estadoIcono = pago.estado === 'pagado' ? 'bx-check-circle' : 
                           pago.estado === 'pendiente' ? 'bx-time-five' : 
                           'bx-error';

        return `
            <div class="fila pago">
                <div class="columna socio">
                    <div class="avatar socio">${obtenerIniciales(pago.nombreSocio)}</div>
                    <div>
                        <strong>${pago.nombreSocio}</strong>
                        <small>${pago.numeroMembresia}</small>
                    </div>
                </div>
                <div class="columna membresia">
                    <span class="badge membresia ${pago.membresia.toLowerCase()}">${pago.membresia}</span>
                </div>
                <div class="columna monto">
                    <strong>$${pago.monto.toLocaleString()}</strong>
                </div>
                <div class="columna fecha">
                    ${formatearFecha(pago.fechaPago)}
                </div>
                <div class="columna vencimiento">
                    ${formatearFecha(pago.fechaVencimiento)}
                </div>
                <div class="columna estado">
                    <span class="${estadoClass}">
                        <i class='bx ${estadoIcono}'></i>
                        ${estadoTexto}
                    </span>
                </div>
                <div class="columna acciones">
                    <button class="boton icono" onclick="verDetallePago(${pago.id})" title="Ver detalle">
                        <i class='bx bx-show'></i>
                    </button>
                    <button class="boton icono" onclick="eliminarPago(${pago.id})" title="Eliminar">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    if (contador) {
        contador.textContent = `${pagosFiltrados.length} registro${pagosFiltrados.length !== 1 ? 's' : ''}`;
    }
}

// ===========================
// FILTRAR PAGOS
// ===========================

function filtrarPagos() {
    const busqueda = document.getElementById('buscar pago')?.value.toLowerCase() || '';
    const estadoActivo = document.querySelector('.filtro.pago.activo')?.dataset.estado || 'todos';
    const mesSeleccionado = document.getElementById('selector mes')?.value || 'todos';

    pagosFiltrados = pagos.filter(pago => {
        // Filtro de búsqueda
        const coincideBusqueda = pago.nombreSocio.toLowerCase().includes(busqueda) ||
                                pago.membresia.toLowerCase().includes(busqueda) ||
                                pago.numeroMembresia.toLowerCase().includes(busqueda);

        // Filtro de estado
        const coincideEstado = estadoActivo === 'todos' || pago.estado === estadoActivo;

        // Filtro de mes
        let coincideMes = true;
        if (mesSeleccionado !== 'todos') {
            const fechaPago = new Date(pago.fechaPago);
            coincideMes = fechaPago.getMonth() === parseInt(mesSeleccionado);
        }

        return coincideBusqueda && coincideEstado && coincideMes;
    });

    renderizarPagos();
}

// ===========================
// BUSCAR SOCIO
// ===========================

function buscarSocio(busqueda) {
    if (!busqueda || busqueda.length < 2) {
        document.getElementById('info socio pago').style.display = 'none';
        return;
    }

    const socioEncontrado = socios.find(socio => 
        socio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        socio.numeroMembresia.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (socioEncontrado) {
        document.getElementById('info socio pago').style.display = 'flex';
        document.getElementById('nombre socio pago').textContent = socioEncontrado.nombre;
        document.getElementById('membresia socio pago').textContent = 
            `${socioEncontrado.membresia} - ${socioEncontrado.numeroMembresia}`;
        document.querySelector('.avatar.socio.pago').textContent = 
            obtenerIniciales(socioEncontrado.nombre);
        
        // Pre-seleccionar el tipo de membresía
        const tipoMembresia = document.getElementById('tipo membresia');
        tipoMembresia.value = socioEncontrado.membresia.toLowerCase();
        calcularMonto();
    } else {
        document.getElementById('info socio pago').style.display = 'none';
    }
}

// ===========================
// CALCULAR MONTO
// ===========================

function calcularMonto() {
    const tipoMembresia = document.getElementById('tipo membresia').value;
    const duracion = parseInt(document.getElementById('duracion pago').value);
    const montoInput = document.getElementById('monto pago');

    if (!tipoMembresia || !duracion) {
        montoInput.value = '';
        return;
    }

    const precioBase = preciosMembresias[tipoMembresia];
    const descuento = descuentos[duracion];
    const montoTotal = precioBase * duracion * (1 - descuento);

    montoInput.value = montoTotal.toFixed(2);
}

// ===========================
// GUARDAR PAGO
// ===========================

function guardarPago(event) {
    event.preventDefault();

    const buscarSocio = document.getElementById('buscar socio pago').value;
    const socioEncontrado = socios.find(socio => 
        socio.nombre.toLowerCase().includes(buscarSocio.toLowerCase()) ||
        socio.numeroMembresia.toLowerCase().includes(buscarSocio.toLowerCase())
    );

    if (!socioEncontrado) {
        alert('Por favor, selecciona un socio válido');
        return;
    }

    const tipoMembresia = document.getElementById('tipo membresia').value;
    const duracion = parseInt(document.getElementById('duracion pago').value);
    const monto = parseFloat(document.getElementById('monto pago').value);
    const metodoPago = document.getElementById('metodo pago').value;
    const fechaPago = document.getElementById('fecha pago').value;
    const notas = document.getElementById('notas pago').value;

    // Calcular fecha de vencimiento
    const fecha = new Date(fechaPago);
    fecha.setMonth(fecha.getMonth() + duracion);
    const fechaVencimiento = fecha.toISOString().split('T')[0];

    const nuevoPago = {
        id: pagos.length > 0 ? Math.max(...pagos.map(p => p.id)) + 1 : 1,
        socioId: socioEncontrado.id,
        nombreSocio: socioEncontrado.nombre,
        membresia: tipoMembresia.charAt(0).toUpperCase() + tipoMembresia.slice(1),
        numeroMembresia: socioEncontrado.numeroMembresia,
        monto: monto,
        duracion: duracion,
        metodoPago: metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1),
        fechaPago: fechaPago,
        fechaVencimiento: fechaVencimiento,
        estado: 'pagado',
        notas: notas
    };

    pagos.unshift(nuevoPago);
    guardarDatos();
    cerrarModal('modal registrar pago');
    filtrarPagos();
    actualizarResumen();
    
    // Limpiar formulario
    document.querySelector('.formulario.pago').reset();
    document.getElementById('info socio pago').style.display = 'none';

    alert('✅ Pago registrado exitosamente');
}

// ===========================
// VER DETALLE PAGO
// ===========================

function verDetallePago(id) {
    const pago = pagos.find(p => p.id === id);
    if (!pago) return;

    document.getElementById('numero recibo').textContent = `#PAG-${String(pago.id).padStart(4, '0')}`;
    document.getElementById('socio recibo').textContent = pago.nombreSocio;
    document.getElementById('membresia recibo').textContent = `${pago.membresia} - ${pago.numeroMembresia}`;
    document.getElementById('duracion recibo').textContent = `${pago.duracion} ${pago.duracion === 1 ? 'Mes' : 'Meses'}`;
    document.getElementById('metodo recibo').textContent = pago.metodoPago;
    document.getElementById('fecha recibo').textContent = formatearFecha(pago.fechaPago);
    document.getElementById('vencimiento recibo').textContent = formatearFecha(pago.fechaVencimiento);
    document.getElementById('monto recibo').textContent = `$${pago.monto.toLocaleString()}`;

    abrirModal('modal ver pago');
}

// ===========================
// ELIMINAR PAGO
// ===========================

function eliminarPago(id) {
    if (!confirm('¿Estás seguro de eliminar este pago?')) return;

    pagos = pagos.filter(p => p.id !== id);
    guardarDatos();
    filtrarPagos();
    actualizarResumen();
    
    alert('✅ Pago eliminado exitosamente');
}

// ===========================
// ACTUALIZAR RESUMEN
// ===========================

function actualizarResumen() {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    // Ingresos del mes
    const ingresosMes = pagos
        .filter(p => {
            const fecha = new Date(p.fechaPago);
            return fecha.getMonth() === mesActual && 
                   fecha.getFullYear() === añoActual && 
                   p.estado === 'pagado';
        })
        .reduce((total, p) => total + p.monto, 0);

    // Pagos pendientes
    const pagosPendientes = pagos.filter(p => p.estado === 'pendiente');
    const montoPendiente = pagosPendientes.reduce((total, p) => total + p.monto, 0);

    // Membresías vencidas
    const membresiasVencidas = pagos.filter(p => p.estado === 'vencido').length;

    // Actualizar en el DOM
    const montoElements = document.querySelectorAll('.tarjeta.financiera .monto');
    if (montoElements[0]) montoElements[0].textContent = `$${ingresosMes.toLocaleString()}`;
    if (montoElements[1]) montoElements[1].textContent = `$${montoPendiente.toLocaleString()}`;
    if (montoElements[2]) montoElements[2].textContent = membresiasVencidas;

    // Actualizar contador de socios pendientes
    const cambioElements = document.querySelectorAll('.tarjeta.financiera .cambio');
    if (cambioElements[1]) {
        cambioElements[1].innerHTML = `<i class='bx bx-user'></i> ${pagosPendientes.length} socios`;
    }
}

// ===========================
// UTILIDADES
// ===========================

function obtenerIniciales(nombre) {
    return nombre
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function establecerFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    const inputFecha = document.getElementById('fecha pago');
    if (inputFecha) {
        inputFecha.value = hoy;
    }
}

// ===========================
// MODALES
// ===========================

function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('activo');
        }, 10);
        
        // Si es el modal de registrar pago, establecer fecha actual
        if (idModal === 'modal registrar pago') {
            establecerFechaActual();
        }
    }
}

function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.remove('activo');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Limpiar formulario si es el modal de registro
        if (idModal === 'modal registrar pago') {
            document.querySelector('.formulario.pago')?.reset();
            document.getElementById('info socio pago').style.display = 'none';
            document.getElementById('monto pago').value = '';
        }
    }
}

// Cerrar modal al hacer clic fuera (en el fondo)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal') && event.target.classList.contains('fondo')) {
        const modales = ['modal registrar pago', 'modal ver pago'];
        modales.forEach(id => {
            const modal = document.getElementById(id);
            if (modal && modal.classList.contains('activo')) {
                cerrarModal(id);
            }
        });
    }
});

// Prevenir que el clic dentro del modal lo cierre
document.addEventListener('DOMContentLoaded', function() {
    const modalContenidos = document.querySelectorAll('.modal.contenido');
    modalContenidos.forEach(contenido => {
        contenido.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

// ===========================
// EXPORTAR DATOS
// ===========================

const botonExportar = document.querySelector('.boton.exportar');
if (botonExportar) {
    botonExportar.addEventListener('click', function() {
        exportarPagos();
    });
}

function exportarPagos() {
    const csv = convertirACSV(pagosFiltrados);
    descargarCSV(csv, 'pagos_' + new Date().toISOString().split('T')[0] + '.csv');
}

function convertirACSV(datos) {
    const headers = ['ID', 'Socio', 'Membresía', 'Número', 'Monto', 'Duración', 'Método', 'Fecha Pago', 'Vencimiento', 'Estado', 'Notas'];
    const filas = datos.map(p => [
        p.id,
        p.nombreSocio,
        p.membresia,
        p.numeroMembresia,
        p.monto,
        p.duracion + ' mes(es)',
        p.metodoPago,
        p.fechaPago,
        p.fechaVencimiento,
        p.estado,
        p.notas || ''
    ]);

    return [headers, ...filas]
        .map(fila => fila.map(celda => `"${celda}"`).join(','))
        .join('\n');
}

function descargarCSV(contenido, nombreArchivo) {
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}