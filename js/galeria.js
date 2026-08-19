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

    async function construirListaCompleta() {
        const locales = Array.from(items).map((i) => i.dataset.src);
        locales.push('img/galeria-08.jpg');

        try {
            const res = await fetch(`${API_URL}?action=getGaleriaPublica&key=${API_KEY_PUBLIC}&_=${Date.now()}`, {
                cache: 'no-store',
            });
            const resultado = await res.json();
            if (resultado.ok && resultado.data.length > 0) {
                const invitados = resultado.data.map((item) => item.foto);
                return locales.concat(invitados);
            }
        } catch (e) {
            console.warn('No se pudo cargar la galería de invitados.');
        }
        return locales;
    }

    function mostrarActual() {
        lightboxImg.src = listaActual[indiceActual];
    }

    function abrirLightbox(index) {
        indiceActual = index;
        mostrarActual();
        lightbox.classList.add('lightbox-activo');
    }

    function cerrarLightbox() {
        lightbox.classList.remove('lightbox-activo');
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % listaActual.length;
        mostrarActual();
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + listaActual.length) % listaActual.length;
        mostrarActual();
    }

    items.forEach((item, index) => {
        item.addEventListener('click', async () => {
            listaActual = await construirListaCompleta();
            abrirLightbox(index);
        });
    });

    btnVerMas.addEventListener('click', async () => {
        listaActual = await construirListaCompleta();
        if (listaActual.length === 0) return;
        abrirLightbox(items.length);
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