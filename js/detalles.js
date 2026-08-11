function initDetalles() {
    const items = document.querySelectorAll('.detalle-item');

    gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#detalles',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    items.forEach(item => {
        const boton = item.querySelector('.detalle-pregunta');
        const respuesta = item.querySelector('.detalle-respuesta');

        boton.addEventListener('click', () => {
            const estaActivo = item.classList.contains('activo');

            items.forEach(otro => {
                if (otro !== item) {
                    otro.classList.remove('activo');
                    gsap.to(otro.querySelector('.detalle-respuesta'), {
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
            });

            if (estaActivo) {
                item.classList.remove('activo');
                gsap.to(respuesta, {
                    height: 0,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            } else {
                item.classList.add('activo');
                gsap.set(respuesta, { height: 'auto' });
                const alturaFinal = respuesta.offsetHeight;
                gsap.fromTo(respuesta, { height: 0 }, {
                    height: alturaFinal,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

function revealDetalles() {
    const detalles = document.getElementById('detalles');
    detalles.classList.add('detalles-visible');
    initDetalles();
    revealGaleria();
}