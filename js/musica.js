function initMusica() {
    const btn = document.getElementById('musica-btn');
    const audio = document.getElementById('musica-audio');
    const flotante = document.getElementById('musica-flotante');
    let sonando = false;

    btn.addEventListener('click', () => {
        if (sonando) {
            audio.pause();
            flotante.classList.remove('musica-activa');
        } else {
            audio.play();
            flotante.classList.add('musica-activa');
        }
        sonando = !sonando;
    });
}

document.addEventListener('DOMContentLoaded', initMusica);