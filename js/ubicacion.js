function crearSvgMapa() {
    return `
    <svg viewBox="0 0 400 300" preserveAspectRatio="none">
        <line x1="0" y1="60" x2="400" y2="60" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <line x1="0" y1="150" x2="400" y2="150" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <line x1="0" y1="230" x2="400" y2="230" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <line x1="90" y1="0" x2="90" y2="300" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <line x1="200" y1="0" x2="200" y2="300" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <line x1="320" y1="0" x2="320" y2="300" stroke="#C9A96E" stroke-width="1" opacity="0.5"/>
        <circle cx="200" cy="150" r="70" stroke="#B8860B" stroke-width="1" stroke-dasharray="4 5" fill="none" opacity="0.6"/>
    </svg>`;
}

function initUbicacion() {
    gsap.to('.ticket', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#ubicacion',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
}

function revealUbicacion() {
    const ubicacion = document.getElementById('ubicacion');
    ubicacion.classList.add('ubicacion-visible');
    initUbicacion();
    revealDetalles();
}