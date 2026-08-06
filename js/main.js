const API_URL = 'https://script.google.com/macros/s/AKfycbwh7ittmItcMDsBZ2MxqU7Iu75TkoidMF_jsXXICsD-RhXL9IDQ-e_6dRVPFToFoGI/exec';
const API_KEY_PUBLIC = 'boda-publica-2026';
const DEV_MODE = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

const MOCK_INVITADO = {
    ok: true,
    data: { fila: 2, nombre: 'Ana López', boletosAsignados: 3, boletosConfirmados: 0, estado: 'Pendiente', telefono: '' }
};

let invitadoData = null;

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

function initSobre() {
    const sobreContainer = document.getElementById('sobre-container');
    const instruccion = document.querySelector('.sobre-instruccion');
    const solapaAnimada = document.getElementById('sobre-solapa-animada');
    const sombra = document.getElementById('sobre-sombra');

    gsap.set(solapaAnimada, { rotateX: 0 });

    gsap.fromTo('#sobre',
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
    );

    gsap.fromTo('.sobre-header',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo(instruccion,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power2.out' }
    );

    gsap.to(instruccion, {
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'power1.inOut',
        delay: 2.5
    });

    let abierto = false;

    sobreContainer.addEventListener('click', () => {
        if (abierto) return;
        abierto = true;

        gsap.killTweensOf(instruccion);

        const tl = gsap.timeline();

        tl.to(instruccion, { opacity: 0, duration: 0.2 })
            .to('.sobre-header', { opacity: 0, y: -15, duration: 0.35, ease: 'power2.in' }, '-=0.1')
            .to(sombra, { opacity: 1, width: '85%', duration: 0.4, ease: 'power2.out' }, '-=0.1')
            .to(solapaAnimada, { rotateX: -160, duration: 0.9, ease: 'power2.inOut' }, '-=0.3')
            .to(sombra, { opacity: 0, duration: 0.3, ease: 'power1.in' }, '-=0.2')
            .to('#sobre', { y: -20, scale: 1.04, duration: 0.35, ease: 'power1.out' }, '-=0.3')
            .to(sobreContainer, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: function () {
                    sobreContainer.style.display = 'none';
                    const hero = document.getElementById('hero');
                    const countdown = document.getElementById('countdown');
                    if (hero) {
                        hero.classList.remove('hidden');
                        initHero();
                    }
                    if (countdown) {
                        countdown.classList.remove('hidden');
                        initCountdown();
                    }
                }
            });
    });
}

function initHero() {
    const tl = gsap.timeline();

    tl.fromTo('#hero', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .fromTo('.hero-script', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-nombres', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-frase', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    gsap.to('.hero-scroll', { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut', delay: 2 });
}

function initCountdown() {
    const diasEl = document.getElementById('cd-dias');
    const horasEl = document.getElementById('cd-horas');
    const minutosEl = document.getElementById('cd-minutos');
    const segundosEl = document.getElementById('cd-segundos');
    const eyebrow = document.querySelector('.countdown-eyebrow');

    if (!diasEl || !horasEl || !minutosEl || !segundosEl) return;

    const fechaBoda = new Date('2026-12-04T19:00:00');

    function actualizar() {
        const ahora = new Date();
        const diff = fechaBoda - ahora;

        if (diff <= 0) {
            diasEl.textContent = '00';
            horasEl.textContent = '00';
            minutosEl.textContent = '00';
            segundosEl.textContent = '00';
            if (eyebrow) eyebrow.textContent = '¡Hoy es el gran día!';
            return;
        }

        diasEl.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        horasEl.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        minutosEl.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        segundosEl.textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }

    actualizar();
    setInterval(actualizar, 1000);
}

document.addEventListener('DOMContentLoaded', init);