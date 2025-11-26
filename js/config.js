// ===========================
// DATOS Y VARIABLES GLOBALES
// ===========================

let configuracion = {
    perfil: {},
    gimnasio: {},
    membresias: [],
    notificaciones: {},
    sistema: {}
};

// ===========================
// INICIALIZACIÓN
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracion();
    inicializarTabs();
    cargarPerfil();
    cargarGimnasio();
    cargarMembresias();
    cargarNotificaciones();
    cargarInfoSistema();
});

// ===========================
// CARGAR CONFIGURACIÓN
// ===========================

function cargarConfiguracion() {
    const configGuardada = localStorage.getItem('configuracion');
    if (configGuardada) {
        configuracion = JSON.parse(configGuardada);
    } else {
        // Configuración por defecto
        configuracion = {
            perfil: {
                nombre: 'Administrador',
                email: 'admin@clubconnect.com',
                telefono: '',
                cargo: 'Administrador',
                foto: null
            },
            gimnasio: {
                nombre: 'Club Fitness Pro',
                direccion: '',
                telefono: '',
                email: '',
                web: '',
                redes: '',
                horaApertura: '06:00',
                horaCierre: '22:00',
                diasOperacion: {
                    lunes: true,
                    martes: true,
                    miercoles: true,
                    jueves: true,
                    viernes: true,
                    sabado: true,
                    domingo: false
                }
            },
            membresias: [
                {
                    id: 1,
                    nombre: 'Básica',
                    precio: 500,
                    duracion: 'Mensual',
                    descripcion: 'Acceso a área de pesas y cardio'
                },
                {
                    id: 2,
                    nombre: 'Premium',
                    precio: 800,
                    duracion: 'Mensual',
                    descripcion: 'Acceso completo + clases grupales'
                },
                {
                    id: 3,
                    nombre: 'VIP',
                    precio: 1200,
                    duracion: 'Mensual',
                    descripcion: 'Acceso completo + entrenador personal'
                }
            ],
            notificaciones: {
                nuevosSocios: true,
                pagos: true,
                vencimientos: true,
                clases: true,
                email: false
            },
            sistema: {
                tema: 'claro',
                ultimaActualizacion: new Date().toISOString()
            }
        };
        guardarConfiguracion();
    }
}

// ===========================
// GUARDAR CONFIGURACIÓN
// ===========================

function guardarConfiguracion() {
    configuracion.sistema.ultimaActualizacion = new Date().toISOString();
    localStorage.setItem('configuracion', JSON.stringify(configuracion));
}

// ===========================
// TABS
// ===========================

function inicializarTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            cambiarTab(tabName);
        });
    });
}

function cambiarTab(tabName) {
    // Desactivar todos los tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('activo');
    });
    
    // Ocultar todo el contenido
    document.querySelectorAll('.tab-contenido').forEach(contenido => {
        contenido.classList.remove('activo');
    });
    
    // Activar tab seleccionado
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('activo');
    document.getElementById(`tab-${tabName}`).classList.add('activo');
}

// ===========================
// PERFIL
// ===========================

function cargarPerfil() {
    const perfil = configuracion.perfil;
    
    document.getElementById('nombre-admin').value = perfil.nombre || '';
    document.getElementById('email-admin').value = perfil.email || '';
    document.getElementById('telefono-admin').value = perfil.telefono || '';
    document.getElementById('cargo-admin').value = perfil.cargo || '';
    
    // Cargar foto de perfil
    if (perfil.foto) {
        document.getElementById('img-perfil').src = perfil.foto;
        document.getElementById('img-perfil').style.display = 'block';
        document.getElementById('iniciales-perfil').style.display = 'none';
    } else {
        const iniciales = obtenerIniciales(perfil.nombre || 'AD');
        document.getElementById('iniciales-perfil').textContent = iniciales;
    }
}

function guardarPerfil(event) {
    event.preventDefault();
    
    configuracion.perfil.nombre = document.getElementById('nombre-admin').value;
    configuracion.perfil.email = document.getElementById('email-admin').value;
    configuracion.perfil.telefono = document.getElementById('telefono-admin').value;
    configuracion.perfil.cargo = document.getElementById('cargo-admin').value;
    
    // Validar contraseñas si se ingresaron
    const passwordActual = document.getElementById('password-actual').value;
    const passwordNueva = document.getElementById('password-nueva').value;
    const passwordConfirmar = document.getElementById('password-confirmar').value;
    
    if (passwordNueva || passwordConfirmar) {
        if (passwordNueva !== passwordConfirmar) {
            alert('❌ Las contraseñas no coinciden');
            return;
        }
        
        if (passwordNueva.length < 6) {
            alert('❌ La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        // Aquí guardarías la contraseña (en un caso real, con encriptación)
        alert('✅ Contraseña actualizada exitosamente');
        
        // Limpiar campos de contraseña
        document.getElementById('password-actual').value = '';
        document.getElementById('password-nueva').value = '';
        document.getElementById('password-confirmar').value = '';
    }
    
    guardarConfiguracion();
    alert('✅ Perfil actualizado exitosamente');
}

function cambiarFoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('❌ Por favor selecciona una imagen válida');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        configuracion.perfil.foto = e.target.result;
        document.getElementById('img-perfil').src = e.target.result;
        document.getElementById('img-perfil').style.display = 'block';
        document.getElementById('iniciales-perfil').style.display = 'none';
        guardarConfiguracion();
        alert('✅ Foto actualizada exitosamente');
    };
    reader.readAsDataURL(file);
}

function eliminarFoto() {
    if (!confirm('¿Estás seguro de eliminar tu foto de perfil?')) return;
    
    configuracion.perfil.foto = null;
    document.getElementById('img-perfil').style.display = 'none';
    document.getElementById('iniciales-perfil').style.display = 'flex';
    document.getElementById('iniciales-perfil').textContent = obtenerIniciales(configuracion.perfil.nombre);
    guardarConfiguracion();
    alert('✅ Foto eliminada exitosamente');
}

// ===========================
// GIMNASIO
// ===========================

function cargarGimnasio() {
    const gimnasio = configuracion.gimnasio;
    
    document.getElementById('nombre-gimnasio').value = gimnasio.nombre || '';
    document.getElementById('direccion-gimnasio').value = gimnasio.direccion || '';
    document.getElementById('telefono-gimnasio').value = gimnasio.telefono || '';
    document.getElementById('email-gimnasio').value = gimnasio.email || '';
    document.getElementById('web-gimnasio').value = gimnasio.web || '';
    document.getElementById('redes-gimnasio').value = gimnasio.redes || '';
    document.getElementById('hora-apertura').value = gimnasio.horaApertura || '06:00';
    document.getElementById('hora-cierre').value = gimnasio.horaCierre || '22:00';
    
    // Cargar días de operación
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    dias.forEach(dia => {
        const checkbox = document.getElementById(`dia-${dia}`);
        if (checkbox) {
            checkbox.checked = gimnasio.diasOperacion?.[dia] || false;
        }
    });
}

function guardarGimnasio(event) {
    event.preventDefault();
    
    configuracion.gimnasio.nombre = document.getElementById('nombre-gimnasio').value;
    configuracion.gimnasio.direccion = document.getElementById('direccion-gimnasio').value;
    configuracion.gimnasio.telefono = document.getElementById('telefono-gimnasio').value;
    configuracion.gimnasio.email = document.getElementById('email-gimnasio').value;
    configuracion.gimnasio.web = document.getElementById('web-gimnasio').value;
    configuracion.gimnasio.redes = document.getElementById('redes-gimnasio').value;
    configuracion.gimnasio.horaApertura = document.getElementById('hora-apertura').value;
    configuracion.gimnasio.horaCierre = document.getElementById('hora-cierre').value;
    
    // Guardar días de operación
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    configuracion.gimnasio.diasOperacion = {};
    dias.forEach(dia => {
        const checkbox = document.getElementById(`dia-${dia}`);
        configuracion.gimnasio.diasOperacion[dia] = checkbox ? checkbox.checked : false;
    });
    
    guardarConfiguracion();
    alert('✅ Información del gimnasio actualizada exitosamente');
}

// ===========================
// MEMBRESÍAS
// ===========================

function cargarMembresias() {
    const contenedor = document.getElementById('lista-membresias');
    if (!contenedor) return;
    
    if (configuracion.membresias.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888;">
                <i class='bx bx-credit-card' style='font-size: 48px; opacity: 0.3;'></i>
                <p style='margin: 15px 0;'>No hay membresías configuradas</p>
                <small>Agrega tu primera membresía para empezar</small>
            </div>
        `;
        return;
    }
    
    contenedor.innerHTML = configuracion.membresias.map(membresia => `
        <div class="item membresia" data-id="${membresia.id}">
            <div class="header membresia">
                <h4>${membresia.nombre}</h4>
                <span class="precio membresia">$${membresia.precio}</span>
            </div>
            <div class="detalles membresia">
                <div class="detalle">
                    <label>Precio</label>
                    <input type="number" value="${membresia.precio}" onchange="actualizarMembresia(${membresia.id}, 'precio', this.value)">
                </div>
                <div class="detalle">
                    <label>Duración</label>
                    <input type="text" value="${membresia.duracion}" onchange="actualizarMembresia(${membresia.id}, 'duracion', this.value)">
                </div>
                <div class="detalle" style="grid-column: 1 / -1;">
                    <label>Descripción</label>
                    <input type="text" value="${membresia.descripcion}" onchange="actualizarMembresia(${membresia.id}, 'descripcion', this.value)">
                </div>
            </div>
            <div class="acciones membresia">
                <button class="boton secundario pequeño" onclick="guardarConfiguracion(); alert('✅ Cambios guardados')">
                    <i class='bx bx-save'></i>
                    Guardar
                </button>
                <button class="boton texto pequeño" onclick="eliminarMembresia(${membresia.id})">
                    <i class='bx bx-trash'></i>
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function actualizarMembresia(id, campo, valor) {
    const membresia = configuracion.membresias.find(m => m.id === id);
    if (membresia) {
        if (campo === 'precio') {
            membresia[campo] = parseFloat(valor);
        } else {
            membresia[campo] = valor;
        }
    }
}

function agregarMembresia() {
    const nombre = prompt('Nombre de la membresía:');
    if (!nombre) return;
    
    const precio = prompt('Precio mensual:');
    if (!precio) return;
    
    const nuevaMembresia = {
        id: configuracion.membresias.length > 0 ? 
            Math.max(...configuracion.membresias.map(m => m.id)) + 1 : 1,
        nombre: nombre,
        precio: parseFloat(precio),
        duracion: 'Mensual',
        descripcion: 'Nueva membresía'
    };
    
    configuracion.membresias.push(nuevaMembresia);
    guardarConfiguracion();
    cargarMembresias();
    alert('✅ Membresía agregada exitosamente');
}

function eliminarMembresia(id) {
    if (!confirm('¿Estás seguro de eliminar esta membresía?')) return;
    
    configuracion.membresias = configuracion.membresias.filter(m => m.id !== id);
    guardarConfiguracion();
    cargarMembresias();
    alert('✅ Membresía eliminada exitosamente');
}

// ===========================
// NOTIFICACIONES
// ===========================

function cargarNotificaciones() {
    const notif = configuracion.notificaciones;
    
    document.getElementById('notif-nuevos-socios').checked = notif.nuevosSocios !== false;
    document.getElementById('notif-pagos').checked = notif.pagos !== false;
    document.getElementById('notif-vencimientos').checked = notif.vencimientos !== false;
    document.getElementById('notif-clases').checked = notif.clases !== false;
    document.getElementById('notif-email').checked = notif.email === true;
}

function guardarNotificaciones() {
    configuracion.notificaciones = {
        nuevosSocios: document.getElementById('notif-nuevos-socios').checked,
        pagos: document.getElementById('notif-pagos').checked,
        vencimientos: document.getElementById('notif-vencimientos').checked,
        clases: document.getElementById('notif-clases').checked,
        email: document.getElementById('notif-email').checked
    };
    
    guardarConfiguracion();
    alert('✅ Preferencias de notificaciones guardadas');
}

// ===========================
// SISTEMA
// ===========================

function cambiarTema() {
    const tema = document.getElementById('tema-sistema').value;
    configuracion.sistema.tema = tema;
    guardarConfiguracion();
    
    // Aquí podrías implementar el cambio de tema real
    alert(`✅ Tema cambiado a: ${tema}`);
}

function exportarDatos() {
    const datos = {
        configuracion: configuracion,
        socios: JSON.parse(localStorage.getItem('socios') || '[]'),
        pagos: JSON.parse(localStorage.getItem('pagos') || '[]'),
        clases: JSON.parse(localStorage.getItem('clases') || '[]'),
        asistencias: JSON.parse(localStorage.getItem('asistencias') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clubconnect-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('✅ Datos exportados exitosamente');
}

function importarDatos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const datos = JSON.parse(event.target.result);
                
                if (confirm('⚠️ Esta acción sobrescribirá todos los datos actuales. ¿Continuar?')) {
                    if (datos.configuracion) localStorage.setItem('configuracion', JSON.stringify(datos.configuracion));
                    if (datos.socios) localStorage.setItem('socios', JSON.stringify(datos.socios));
                    if (datos.pagos) localStorage.setItem('pagos', JSON.stringify(datos.pagos));
                    if (datos.clases) localStorage.setItem('clases', JSON.stringify(datos.clases));
                    if (datos.asistencias) localStorage.setItem('asistencias', JSON.stringify(datos.asistencias));
                    
                    alert('✅ Datos importados exitosamente. Recargando página...');
                    location.reload();
                }
            } catch (error) {
                alert('❌ Error al importar los datos. Verifica que el archivo sea válido.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function crearRespaldo() {
    exportarDatos();
}

function limpiarDatos() {
    const confirmacion = prompt('⚠️ ADVERTENCIA: Esta acción eliminará TODOS los datos del sistema.\n\nEscribe "ELIMINAR" para confirmar:');
    
    if (confirmacion !== 'ELIMINAR') {
        alert('❌ Acción cancelada');
        return;
    }
    
    if (confirm('¿Estás completamente seguro? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('socios');
        localStorage.removeItem('pagos');
        localStorage.removeItem('clases');
        localStorage.removeItem('asistencias');
        
        alert('✅ Todos los datos han sido eliminados. La configuración se mantuvo.');
        location.reload();
    }
}

function resetearSistema() {
    const confirmacion = prompt('⚠️ ADVERTENCIA: Esto restaurará el sistema a su estado inicial.\n\nEscribe "RESETEAR" para confirmar:');
    
    if (confirmacion !== 'RESETEAR') {
        alert('❌ Acción cancelada');
        return;
    }
    
    if (confirm('¿Estás completamente seguro? Se perderán TODOS los datos y configuraciones.')) {
        localStorage.clear();
        alert('✅ Sistema reseteado. Recargando...');
        location.reload();
    }
}

function cargarInfoSistema() {
    // Última actualización
    const ultimaActualizacion = new Date(configuracion.sistema.ultimaActualizacion);
    document.getElementById('ultima-actualizacion').textContent = 
        ultimaActualizacion.toLocaleString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    
    // Calcular espacio usado en localStorage
    let totalSize = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length + key.length;
        }
    }
    const sizeKB = (totalSize / 1024).toFixed(2);
    document.getElementById('datos-almacenados').textContent = `${sizeKB} KB`;
    
    // Contar registros totales
    const socios = JSON.parse(localStorage.getItem('socios') || '[]').length;
    const pagos = JSON.parse(localStorage.getItem('pagos') || '[]').length;
    const clases = JSON.parse(localStorage.getItem('clases') || '[]').length;
    const total = socios + pagos + clases;
    
    document.getElementById('registros-totales').textContent = 
        `${total} (${socios} socios, ${pagos} pagos, ${clases} clases)`;
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

// ===========================
// CERRAR SESIÓN
// ===========================

function cerrarSesion() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        // Opcional: Limpiar datos de sesión si los tienes
        // localStorage.removeItem('sesion');
        
        alert('✅ Sesión cerrada exitosamente');
        
        // Redirigir a página de login (ajusta la ruta según tu estructura)
        // window.location.href = '../login.html';
        
        // O si no tienes login, redirige al inicio
        window.location.href = '../login.html';
    }
}