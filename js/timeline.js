function initTimeline() {
    const hitos = document.querySelectorAll('.timeline-hito');
    const linea = document.querySelector('.timeline-linea');

    gsap.set(hitos, { opacity: 0 });
    gsap.set('.timeline-nodo', { scale: 0 });

    hitos.forEach((hito, index) => {
        const desdeIzquierda = index % 2 === 0;
        gsap.set(hito, { x: desdeIzquierda ? -60 : 60 });

        gsap.to(hito, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: hito,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.to(hito.querySelector('.timeline-nodo'), {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: hito,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.fromTo(linea, { scaleY: 0 }, {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
            trigger: '#timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    initTimeline();
});