function initHero() {
    const wrapper = document.getElementById('hero-imagen-wrapper');

    const tl = gsap.timeline();

    tl.to(wrapper, {
        clipPath: 'circle(75% at 50% 50%)',
        duration: 1.6,
        ease: 'power3.inOut'
    })
    .fromTo('.hero-script', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .fromTo('.hero-nombres', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-frase', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    gsap.to('.hero-scroll', { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut', delay: 2 });

    gsap.to(wrapper, {
        scale: 1.08,
        duration: 22,
        ease: 'none'
    });
}