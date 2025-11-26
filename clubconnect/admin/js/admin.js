document.addEventListener("DOMContentLoaded", () => {
    cargarActividades();

    const form = document.getElementById('form-actividad');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const datos = new FormData(form);
            // admin_id debe provenir de la sesión; por ahora dejamos que el backend lo ignore si no viene
            let res = await fetch('../php/crear_actividad.php', { method: 'POST', body: datos });
            let t = await res.text();
            if (t.trim() === 'success') {
                alert('Actividad creada');
                cargarActividades();
                form.reset();
            } else {
                alert('Error: ' + t);
            }
        });
    }
});

async function cargarActividades() {
    let res = await fetch('../php/listar_actividades.php');
    let actividades = await res.json();
    const cont = document.getElementById('lista-actividades');
    if (!cont) return;
    cont.innerHTML = '';
    actividades.forEach(a => {
        cont.innerHTML += `
            <div class="actividad">
                <h3>${a.titulo}</h3>
                <p>${a.descripcion}</p>
                <small>${a.fecha} • creado_por: ${a.creador_nombre || 'N/A'}</small>
                <div><button onclick="eliminarActividad(${a.id})">Eliminar</button></div>
            </div>
        `;
    });
}

async function eliminarActividad(id) {
    if (!confirm('Eliminar actividad?')) return;
    const datos = new FormData();
    datos.append('id', id);
    let res = await fetch('../php/eliminar_actividad.php', { method: 'POST', body: datos });
    let t = await res.text();
    if (t.trim() === 'success') cargarActividades();
    else alert('Error: ' + t);
}