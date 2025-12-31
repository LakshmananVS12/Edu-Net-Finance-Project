/* ============================================
   Finora - Landing Page GSAP Animations
   ============================================ */

// Wait for GSAP to load
window.addEventListener('load', () => {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded!');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    console.log('GSAP initialized');
    
    // Hero Section Animations
    gsap.from('.hero__logo', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero__headline', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero__subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.hero__cta', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero__image', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    // Features Section Title
    gsap.fromTo('.features__title', 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.features__title',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: 'power2.out'
        }
    );
    
    gsap.fromTo('.features__subtitle',
        { y: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.features__subtitle',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            delay: 0.2,
            ease: 'power2.out'
        }
    );
    
    // Feature Cards - Stagger Animation
    gsap.fromTo('.feature-card',
        { y: 60, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.features__grid',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power2.out'
        }
    );
    
    // AI Features Section
    gsap.fromTo('.features__ai-title',
        { scale: 0.8, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.features__ai-title',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.7)'
        }
    );
    
    gsap.fromTo('.features__ai-grid .feature-card',
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.features__ai-grid',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power2.out'
        }
    );
    
    // CTA Section
    gsap.fromTo('.cta-section__title',
        { scale: 0.9, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            scale: 1,
            opacity: 1,
            ease: 'power2.out'
        }
    );
    
    gsap.fromTo('.cta-section__text',
        { y: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            delay: 0.2,
            ease: 'power2.out'
        }
    );
    
    gsap.fromTo('.cta-section__buttons',
        { y: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            delay: 0.4,
            ease: 'power2.out'
        }
    );
    
    // Parallax effect for hero image
    gsap.to('.hero__image', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 150,
        ease: 'none'
    });
    
    // Smooth fade-in for footer
    gsap.fromTo('.footer',
        { opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 95%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 1,
            ease: 'power2.out'
        }
    );
    
    // Hover animation enhancement for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Action cards hover
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Debug: Log ScrollTrigger instances
    console.log('ScrollTrigger instances:', ScrollTrigger.getAll().length);
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
});
