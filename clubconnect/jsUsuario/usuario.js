document.addEventListener('DOMContentLoaded', () => {
    cargarActividades();
});

async function cargarActividades() {
    let res = await fetch('../php/listar_actividades.php');
    let actividades = await res.json();
    const cont = document.getElementById('actividades');
    if (!cont) return;
    cont.innerHTML = '';
    actividades.forEach(a => {
        cont.innerHTML += `
            <div class="actividad">
                <h3>${a.titulo}</h3>
                <p>${a.descripcion}</p>
                <small>${a.fecha}</small>
            </div>
        `;
    });
}