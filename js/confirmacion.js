function initConfirmacion() {
    const btn = document.getElementById('ver-confirmacion-btn');
    const modal = document.getElementById('confirmacion-modal');
    const cerrar = document.getElementById('confirmacion-cerrar');
    const tabs = document.querySelectorAll('.confirmacion-tab');
    const paneles = document.querySelectorAll('.confirmacion-panel');

    if (!btn) return;

    btn.addEventListener('click', () => {
        pintarConfirmacion();
        modal.classList.add('confirmacion-modal-activo');
    });

    cerrar.addEventListener('click', () => {
        modal.classList.remove('confirmacion-modal-activo');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('confirmacion-modal-activo');
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('activo'));
            paneles.forEach((p) => p.classList.remove('confirmacion-panel-activo'));
            tab.classList.add('activo');
            document.querySelector(`.confirmacion-panel[data-panel="${tab.dataset.tab}"]`).classList.add('confirmacion-panel-activo');
        });
    });
}

function pintarConfirmacion() {
    if (!invitadoData) return;

    document.getElementById('confirmacion-nombre').textContent = invitadoData.nombre || '';
    document.getElementById('confirmacion-asistencia').textContent =
        invitadoData.estado === 'Confirmado' ? 'Confirmada' : 'No podrá asistir';
    document.getElementById('confirmacion-boletos').textContent = invitadoData.boletosConfirmados || 0;
    document.getElementById('confirmacion-telefono').textContent = invitadoData.telefono || '—';

    const acompLinea = document.getElementById('confirmacion-acompanantes-linea');
    if (invitadoData.acompanantes && invitadoData.acompanantes.length > 0) {
        document.getElementById('confirmacion-acompanantes').textContent = invitadoData.acompanantes.join(', ');
        acompLinea.hidden = false;
    } else {
        acompLinea.hidden = true;
    }

    const dedicatoriaBloque = document.getElementById('confirmacion-dedicatoria-bloque');
    if (invitadoData.dedicatoria) {
        document.getElementById('confirmacion-dedicatoria').textContent = invitadoData.dedicatoria;
        dedicatoriaBloque.hidden = false;
    } else {
        dedicatoriaBloque.hidden = true;
    }

    const cancionBloque = document.getElementById('confirmacion-cancion-bloque');
    if (invitadoData.cancion) {
        document.getElementById('confirmacion-cancion').textContent = invitadoData.cancion;
        cancionBloque.hidden = false;
    } else {
        cancionBloque.hidden = true;
    }

    const foto = document.getElementById('confirmacion-foto');
    if (invitadoData.foto) {
        foto.src = invitadoData.foto;
        foto.hidden = false;
    } else {
        foto.hidden = true;
    }
}

document.addEventListener('DOMContentLoaded', initConfirmacion);