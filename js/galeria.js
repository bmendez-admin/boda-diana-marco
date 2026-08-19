function initGaleria() {
    const items = document.querySelectorAll('.galeria-item:not(.galeria-item-vermas)');
    const btnVerMas = document.getElementById('galeria-ver-mas');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnCerrar = document.getElementById('lightbox-cerrar');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    let listaActual = [];
    let indiceActual = 0;

    gsap.to('.galeria-item', {
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

    function abrirLightbox(lista, index) {
        listaActual = lista;
        indiceActual = index;
        lightboxImg.src = listaActual[indiceActual];
        lightbox.classList.add('lightbox-activo');
    }

    function cerrarLightbox() {
        lightbox.classList.remove('lightbox-activo');
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % listaActual.length;
        lightboxImg.src = listaActual[indiceActual];
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + listaActual.length) % listaActual.length;
        lightboxImg.src = listaActual[indiceActual];
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            const lista = Array.from(items).map((i) => i.dataset.src);
            abrirLightbox(lista, index);
        });
    });

    btnVerMas.addEventListener('click', async () => {
        try {
            const res = await fetch(`${API_URL}?action=getGaleriaPublica&key=${API_KEY_PUBLIC}&_=${Date.now()}`, {
                cache: 'no-store',
            });
            const resultado = await res.json();
            if (!resultado.ok || resultado.data.length === 0) return;
            const lista = resultado.data.map((item) => item.foto);
            abrirLightbox(lista, 0);
        } catch (e) {
            console.warn('No se pudo cargar la galería completa.');
        }
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