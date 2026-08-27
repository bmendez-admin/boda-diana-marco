function initMusica() {
    const btn = document.getElementById('musica-btn');
    const audio = document.getElementById('musica-audio');
    const flotante = document.getElementById('musica-flotante');

    audio.volume = 0;

    btn.addEventListener('click', () => {
        if (audio.paused) {
            flotante.classList.add('musica-cargando');
            audio.play()
                .then(() => {
                    flotante.classList.remove('musica-cargando');
                    gsap.to(audio, {
                        volume: 1,
                        duration: 1.2,
                        ease: 'none'
                    });
                })
                .catch((error) => {
                    flotante.classList.remove('musica-cargando');
                    console.error('No se pudo reproducir el audio:', error);
                });
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => {
        flotante.classList.add('musica-activa');
    });

    audio.addEventListener('pause', () => {
        flotante.classList.remove('musica-activa');
    });

    audio.addEventListener('ended', () => {
        flotante.classList.remove('musica-activa');
    });

    audio.addEventListener('error', () => {
        flotante.classList.remove('musica-cargando');
        console.error('Error al cargar el archivo de audio. Código:', audio.error?.code);
    });
}

document.addEventListener('DOMContentLoaded', initMusica);