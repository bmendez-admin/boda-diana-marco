function initUbicacion() {
    gsap.set('.ticket-sello', { scale: 1.35, opacity: 0 });

    gsap.to('.ticket', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
            trigger: '#ubicacion',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.ticket-sello', {
        scale: 1,
        opacity: 0.75,
        duration: 0.6,
        stagger: 0.25,
        delay: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
            trigger: '#ubicacion',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    const path = document.querySelector('.ubicacion-conector-path');
    if (path) {
        gsap.to(path, {
            strokeDashoffset: -22,
            duration: 1.6,
            ease: 'none',
            repeat: -1
        });
    }
}

function revealUbicacion() {
    const ubicacion = document.getElementById('ubicacion');
    ubicacion.classList.add('ubicacion-visible');
    initUbicacion();
    revealDetalles();
}