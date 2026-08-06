function getTokenFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function validarInvitado(token) {
    if (DEV_MODE) {
        await new Promise(r => setTimeout(r, 600));
        return MOCK_INVITADO;
    }
    const res = await fetch(`${API_URL}?action=getInvitado&token=${token}&key=${API_KEY_PUBLIC}`);
    const json = await res.json();
    return json;
}

async function init() {
    const token = getTokenFromURL();
    if (!token) {
        mostrarError();
        return;
    }
    const resultado = await validarInvitado(token);
    if (!resultado.ok) {
        mostrarError();
        return;
    }
    if (resultado.data.estado === 'Confirmado' || resultado.data.estado === 'Declinó') {
        mostrarYaConfirmo();
        return;
    }
    invitadoData = resultado.data;
    mostrarInvitacion();
}

function mostrarError() {
    document.getElementById('pantalla-error').classList.remove('hidden');
}

function mostrarYaConfirmo() {
    document.getElementById('pantalla-ya-confirmo').classList.remove('hidden');
}

function mostrarInvitacion() {
    const invitacion = document.getElementById('invitacion');
    invitacion.style.opacity = '1';
    initSobre();
}

document.addEventListener('DOMContentLoaded', init);