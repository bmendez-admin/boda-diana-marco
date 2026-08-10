function initItinerario() {
    const track = document.querySelector('.itinerario-track');
    const eventos = document.querySelectorAll('.itinerario-evento');
    const linea = document.querySelector('.itinerario-linea');
    const esMobile = window.innerWidth <= 768;

    gsap.set(eventos, { opacity: 0, y: 40 });
    gsap.set('.itinerario-nodo', { scale: 0 });

    if (esMobile) {
        eventos.forEach(evento => {
            gsap.to(evento, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: evento,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
            gsap.to(evento.querySelector('.itinerario-nodo'), {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: evento,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.to(linea, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#itinerario',
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: 1
            }
        });
        return;
    }

    const distanciaScroll = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#itinerario',
            start: 'top top',
            end: () => `+=${distanciaScroll + window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    tl.to(track, {
        x: -distanciaScroll,
        ease: 'none'
    }, 0);

    tl.fromTo(linea, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);

    eventos.forEach((evento, index) => {
        const posicion = index / eventos.length;
        tl.to(evento, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, posicion);

        tl.to(evento.querySelector('.itinerario-nodo'), {
            scale: 1,
            duration: 0.2,
            ease: 'back.out(2)'
        }, posicion);
    });
}

function revealItinerario() {
    const itinerario = document.getElementById('itinerario');
    itinerario.classList.add('itinerario-visible');
    initItinerario();
}

window.addEventListener('load', () => {
    document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
    });
});