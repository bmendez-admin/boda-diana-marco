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