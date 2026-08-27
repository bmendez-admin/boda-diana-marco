function initItinerario() {
    const track = document.querySelector('.itinerario-track');
    const eventos = document.querySelectorAll('.itinerario-evento');
    const linea = document.querySelector('.itinerario-linea');
    const esMobile = window.innerWidth <= 768;

    gsap.set(eventos, { opacity: 0, y: 20 });
    gsap.set('.itinerario-nodo', { scale: 0 });

    if (esMobile) {
        gsap.to(linea, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.itinerario-track',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1
            }
        });

        eventos.forEach(evento => {
            gsap.to(evento, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: evento,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
            gsap.to(evento.querySelector('.itinerario-nodo'), {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: evento,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });
        return;
    }

    const calcularYAnimar = () => {
        const distanciaScroll = track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#itinerario',
                start: 'top top',
                end: () => `+=${distanciaScroll + window.innerHeight * 0.5}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                    const indiceActivo = Math.round(self.progress * (eventos.length - 1));
                    eventos.forEach((evento, index) => {
                        evento.querySelector('.itinerario-nodo').classList.toggle('itinerario-nodo-activo', index === indiceActivo);
                    });
                }
            }
        });

        tl.to(track, { x: -distanciaScroll, ease: 'none' }, 0);
        tl.fromTo(linea, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);

        eventos.forEach((evento, index) => {
            const posicion = index / eventos.length;
            tl.to(evento, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, posicion);
            tl.to(evento.querySelector('.itinerario-nodo'), { scale: 1, duration: 0.2, ease: 'back.out(2)' }, posicion);
        });
    };

    const imagenes = track.querySelectorAll('img');
    let cargadas = 0;
    const total = imagenes.length;

    if (total === 0) {
        calcularYAnimar();
        return;
    }

    imagenes.forEach(img => {
        if (img.complete) {
            cargadas++;
            if (cargadas === total) calcularYAnimar();
        } else {
            img.addEventListener('load', () => {
                cargadas++;
                if (cargadas === total) calcularYAnimar();
            });
            img.addEventListener('error', () => {
                cargadas++;
                if (cargadas === total) calcularYAnimar();
            });
        }
    });
}

function revealItinerario() {
    const itinerario = document.getElementById('itinerario');
    itinerario.classList.add('itinerario-visible');
    initItinerario();
    revealUbicacion();
}

window.addEventListener('load', () => {
    document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
    });
});