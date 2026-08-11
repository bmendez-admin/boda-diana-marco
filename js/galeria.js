function initGaleria() {
    const items = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnCerrar = document.getElementById('lightbox-cerrar');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    let indiceActual = 0;

    gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#galeria',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    function abrirLightbox(index) {
        indiceActual = index;
        const src = items[indiceActual].querySelector('.galeria-img').src;
        lightboxImg.src = src;
        lightbox.classList.add('lightbox-activo');
    }

    function cerrarLightbox() {
        lightbox.classList.remove('lightbox-activo');
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % items.length;
        lightboxImg.src = items[indiceActual].querySelector('.galeria-img').src;
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + items.length) % items.length;
        lightboxImg.src = items[indiceActual].querySelector('.galeria-img').src;
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => abrirLightbox(index));
    });

    btnCerrar.addEventListener('click', cerrarLightbox);
    btnNext.addEventListener('click', siguiente);
    btnPrev.addEventListener('click', anterior);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox-activo')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowRight') siguiente();
        if (e.key === 'ArrowLeft') anterior();
    });
}

function revealGaleria() {
    const galeria = document.getElementById('galeria');
    galeria.classList.add('galeria-visible');
    initGaleria();
    revealRegalos();
}