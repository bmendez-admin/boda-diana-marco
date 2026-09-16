function initRegalos() {
    const cards = document.querySelectorAll('.regalo-card');
    const sobrePanel = document.getElementById('sobre-toggle');
    const sobreDatos = document.getElementById('sobre-datos');
    let sobreAbierto = false;

    gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#regalos',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    sobrePanel.addEventListener('click', () => {
        sobreAbierto = !sobreAbierto;
        sobrePanel.classList.toggle('activo', sobreAbierto);

        if (sobreAbierto) {
            gsap.set(sobreDatos, { height: 'auto' });
            const alturaFinal = sobreDatos.offsetHeight;
            gsap.fromTo(sobreDatos, { height: 0 }, {
                height: alturaFinal,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        } else {
            gsap.to(sobreDatos, {
                height: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    });

    initCopiarDatos();
}

function initCopiarDatos() {
    const botones = document.querySelectorAll('.sobre-dato-copiar');

    botones.forEach((boton) => {
        boton.addEventListener('click', async (e) => {
            e.stopPropagation();
            const valor = boton.dataset.copiar;

            try {
                await navigator.clipboard.writeText(valor);
                mostrarCopiado(boton);
            } catch (err) {
                console.warn('No se pudo copiar al portapapeles', err);
            }
        });
    });
}

function mostrarCopiado(boton) {
    const iconoCopiar = boton.querySelector('.icono-copiar');
    const iconoCheck = boton.querySelector('.icono-check');

    boton.classList.add('copiado');
    iconoCopiar.hidden = true;
    iconoCheck.hidden = false;

    clearTimeout(boton._copiarTimeout);
    boton._copiarTimeout = setTimeout(() => {
        boton.classList.remove('copiado');
        iconoCopiar.hidden = false;
        iconoCheck.hidden = true;
    }, 1600);
}

function revealRegalos() {
    const regalos = document.getElementById('regalos');
    regalos.classList.add('regalos-visible');
    initRegalos();
    revealRsvp();
}