function initFooter() {
    gsap.fromTo('.footer-inner',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#footer',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        }
    );

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
}

document.addEventListener('DOMContentLoaded', initFooter);