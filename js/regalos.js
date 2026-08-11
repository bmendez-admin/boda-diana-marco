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
}

function revealRegalos() {
    const regalos = document.getElementById('regalos');
    regalos.classList.add('regalos-visible');
    initRegalos();
    revealRsvp();
}