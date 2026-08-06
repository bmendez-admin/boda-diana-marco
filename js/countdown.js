function generarCalendario() {
    const grid = document.getElementById('calendario-grid');
    if (!grid) return;

    const anio = 2026;
    const mes = 11;
    const diaBoda = 4;

    const primerDia = new Date(anio, mes, 1).getDay();
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    let html = '';

    for (let i = 0; i < primerDia; i++) {
        html += '<div class="calendario-dia vacio"></div>';
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
        const clase = dia === diaBoda ? 'calendario-dia marcado' : 'calendario-dia';
        html += `<div class="${clase}">${dia}</div>`;
    }

    grid.innerHTML = html;
}

function animarEntradaCountdown() {
    ScrollTrigger.create({
        trigger: '#countdown',
        start: 'top 75%',
        once: true,
        onEnter: () => {
            const tl = gsap.timeline();

            gsap.fromTo('.countdown-decoracion', { opacity: 0 }, { opacity: 0.5, duration: 1.5, ease: 'power2.out' });

            tl.fromTo('.countdown-eyebrow', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
                .to('.countdown-fecha', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .to('.countdown-bloque', {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: 'power2.out'
                }, '-=0.2')
                .to('.countdown-separador', { opacity: 1, duration: 0.3 }, '-=0.6')
                .to('.countdown-conector', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .to('.countdown-calendario', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5');
        }
    });
}

function initCountdown() {
    const diasEl = document.getElementById('cd-dias');
    const horasEl = document.getElementById('cd-horas');
    const minutosEl = document.getElementById('cd-minutos');
    const segundosEl = document.getElementById('cd-segundos');
    const eyebrow = document.querySelector('.countdown-eyebrow');

    if (!diasEl || !horasEl || !minutosEl || !segundosEl) return;

    generarCalendario();
    animarEntradaCountdown();

    const fechaBoda = new Date('2026-12-04T19:00:00');
    let segundoAnterior = null;

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

        const nuevoSegundo = Math.floor((diff % (1000 * 60)) / 1000);

        diasEl.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        horasEl.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        minutosEl.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        segundosEl.textContent = String(nuevoSegundo).padStart(2, '0');

        if (segundoAnterior !== null && segundoAnterior !== nuevoSegundo) {
            segundosEl.classList.remove('cd-flip');
            void segundosEl.offsetWidth;
            segundosEl.classList.add('cd-flip');
        }
        segundoAnterior = nuevoSegundo;
    }

    actualizar();
    setInterval(actualizar, 1000);
}