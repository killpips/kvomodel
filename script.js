/**
 * KILLPIPS KVO MODEL - Interactive JavaScript
 * Modern animations, scroll effects, and jQuery enhancements
 */

$(document).ready(function () {
    'use strict';

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    function createParticles() {
        const container = $('#particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = $('<div class="particle"></div>');

            particle.css({
                position: 'absolute',
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                background: `rgba(245, 166, 35, ${Math.random() * 0.3 + 0.1})`,
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 20 + 15}s ease-in-out infinite`,
                animationDelay: -Math.random() * 20 + 's',
                boxShadow: '0 0 10px rgba(245, 166, 35, 0.3)'
            });

            container.append(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(50px, -50px) rotate(90deg);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(100px, 0) rotate(180deg);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(50px, 50px) rotate(270deg);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const elements = $('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = $(entry.target).data('delay') || 0;
                    setTimeout(() => {
                        $(entry.target).addClass('animated');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    function initParallax() {
        $(window).on('scroll', function () {
            const scrollTop = $(this).scrollTop();
            const windowHeight = $(window).height();

            // Background parallax
            $('.bg-gradient').css('transform', `translateY(${scrollTop * 0.3}px)`);

            // Section-based effects
            $('.section').each(function () {
                const sectionTop = $(this).offset().top;
                const sectionHeight = $(this).outerHeight();

                if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                    const progress = (scrollTop + windowHeight - sectionTop) / (windowHeight + sectionHeight);
                    $(this).css('--scroll-progress', progress);
                }
            });
        });
    }

    // ============================================
    // HOVER EFFECTS
    // ============================================
    function initHoverEffects() {
        // Concept cards
        $('.concept-card').hover(
            function () {
                $(this).find('.concept-icon').css('transform', 'scale(1.1) rotate(5deg)');
            },
            function () {
                $(this).find('.concept-icon').css('transform', 'scale(1) rotate(0deg)');
            }
        );

        // Session cards
        $('.session-card').hover(
            function () {
                $(this).find('.session-percentage').css('transform', 'scale(1.05)');
            },
            function () {
                $(this).find('.session-percentage').css('transform', 'scale(1)');
            }
        );

        // Image frames
        $('.image-frame').hover(
            function () {
                $(this).find('img').css('transform', 'scale(1.02)');
            },
            function () {
                $(this).find('img').css('transform', 'scale(1)');
            }
        );

        // Circle type cards
        $('.circle-type').hover(
            function () {
                $(this).find('.circle-icon').css({
                    'transform': 'scale(1.2)',
                    'text-shadow': '0 0 20px currentColor'
                });
            },
            function () {
                $(this).find('.circle-icon').css({
                    'transform': 'scale(1)',
                    'text-shadow': 'none'
                });
            }
        );

        // Instrument tables
        $('.instrument-table').hover(
            function () {
                $(this).find('h4').css({
                    'padding-left': '20px',
                    'border-left-width': '5px'
                });
            },
            function () {
                $(this).find('h4').css({
                    'padding-left': '15px',
                    'border-left-width': '3px'
                });
            }
        );
    }

    // ============================================
    // SMOOTH TRANSITIONS FOR IMAGES
    // ============================================
    function initImageEffects() {
        // Add loading animation to images
        $('.image-frame img').each(function () {
            const img = $(this);

            img.css('opacity', '0');

            if (this.complete) {
                img.animate({ opacity: 1 }, 500);
            } else {
                img.on('load', function () {
                    $(this).animate({ opacity: 1 }, 500);
                });
            }
        });
    }

    // ============================================
    // TABLE ROW ANIMATIONS
    // ============================================
    function initTableAnimations() {
        $('.data-table .table-row').hover(
            function () {
                $(this).css({
                    'background': 'rgba(245, 166, 35, 0.05)',
                    'transform': 'translateX(5px)'
                });
            },
            function () {
                $(this).css({
                    'background': 'transparent',
                    'transform': 'translateX(0)'
                });
            }
        );

        $('.symbol-row:not(.header)').hover(
            function () {
                $(this).css({
                    'background': 'rgba(0, 212, 255, 0.05)',
                    'transform': 'translateX(5px)'
                });
            },
            function () {
                $(this).css({
                    'background': 'var(--tertiary-bg)',
                    'transform': 'translateX(0)'
                });
            }
        );

        $('.canvas-row:not(.header-row)').hover(
            function () {
                $(this).css('background', 'rgba(245, 166, 35, 0.03)');
            },
            function () {
                $(this).css('background', 'transparent');
            }
        );
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        const counters = $('.stat-percentage, .session-percentage');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = $(entry.target);
                    const text = el.text();

                    // Simple pulse animation
                    el.css({
                        'transform': 'scale(0.8)',
                        'opacity': '0'
                    });

                    setTimeout(() => {
                        el.animate({
                            'opacity': 1
                        }, 500);
                        el.css('transform', 'scale(1)');
                    }, 200);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // GLOW EFFECTS
    // ============================================
    function initGlowEffects() {
        // Add glow on mouse move for certain elements
        $('.brand-logo, .phase-badge, .seq-item').each(function () {
            $(this).on('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                $(this).css({
                    '--mouse-x': x + 'px',
                    '--mouse-y': y + 'px'
                });
            });
        });
    }

    // ============================================
    // SECTION TRANSITIONS
    // ============================================
    function initSectionTransitions() {
        let lastScrollTop = 0;

        $(window).on('scroll', function () {
            const scrollTop = $(this).scrollTop();
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

            $('.section').each(function () {
                const sectionTop = $(this).offset().top;
                const sectionHeight = $(this).outerHeight();

                if (scrollTop >= sectionTop - 200 && scrollTop < sectionTop + sectionHeight - 200) {
                    $(this).addClass('active-section');
                } else {
                    $(this).removeClass('active-section');
                }
            });

            lastScrollTop = scrollTop;
        });
    }

    // ============================================
    // FEATURE LIST STAGGER
    // ============================================
    function initFeatureListStagger() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = $(entry.target).find('li');
                    items.each(function (index) {
                        const item = $(this);
                        item.css({
                            'opacity': '0',
                            'transform': 'translateX(-20px)'
                        });

                        setTimeout(() => {
                            item.animate({
                                opacity: 1
                            }, 400);
                            item.css('transform', 'translateX(0)');
                        }, index * 100);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        $('.feature-list').each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // ZONE ITEMS ANIMATION
    // ============================================
    function initZoneAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = $(entry.target);
                    const idx = el.index();

                    el.css({
                        'opacity': '0',
                        'transform': 'translateY(30px)'
                    });

                    setTimeout(() => {
                        el.animate({ opacity: 1 }, 500);
                        el.css('transform', 'translateY(0)');
                    }, idx * 150);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        $('.zone-item').each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // SMOOTH SCROLL TO SECTIONS
    // ============================================
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            const target = $($(this).attr('href'));

            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 800, 'swing');
            }
        });
    }

    // ============================================
    // COMPARISON ANIMATION
    // ============================================
    function initComparisonAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const comparison = $(entry.target);

                    comparison.find('.comparison-item').each(function (index) {
                        const item = $(this);

                        item.css({
                            'opacity': '0',
                            'transform': index === 0 ? 'translateX(-50px)' : 'translateX(50px)'
                        });

                        setTimeout(() => {
                            item.animate({ opacity: 1 }, 600);
                            item.css('transform', 'translateX(0)');
                        }, index * 200 + 200);
                    });

                    comparison.find('.vs-divider').css({
                        'opacity': '0',
                        'transform': 'scale(0)'
                    });

                    setTimeout(() => {
                        comparison.find('.vs-divider').animate({ opacity: 1 }, 400);
                        comparison.find('.vs-divider').css('transform', 'scale(1)');
                    }, 600);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        $('.comparison-images').each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // TIMEFRAME COMPARISON ANIMATION
    // ============================================
    function initTimeframeAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = $(entry.target);

                    container.find('.timeframe-item').each(function (index) {
                        const item = $(this);

                        item.css({
                            'opacity': '0',
                            'transform': 'scale(0.9)'
                        });

                        setTimeout(() => {
                            item.animate({ opacity: 1 }, 500);
                            item.css('transform', 'scale(1)');
                        }, index * 200);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        $('.timeframe-comparison').each(function () {
            observer.observe(this);
        });
    }

    // ============================================
    // LOGO ANIMATION
    // ============================================
    function initLogoAnimation() {
        const logo = $('.brand-logo');

        logo.on('mouseenter', function () {
            $(this).find('.logo-ring').css('animation-play-state', 'paused');
            $(this).find('.logo-text').css({
                'transform': 'translate(-50%, -50%) scale(1.1)',
                'text-shadow': '0 0 50px rgba(245, 166, 35, 0.8)'
            });
        });

        logo.on('mouseleave', function () {
            $(this).find('.logo-ring').css('animation-play-state', 'running');
            $(this).find('.logo-text').css({
                'transform': 'translate(-50%, -50%) scale(1)',
                'text-shadow': '0 0 30px rgba(245, 166, 35, 0.5)'
            });
        });
    }

    // ============================================
    // INITIALIZE ALL
    // ============================================
    function init() {
        createParticles();
        initScrollAnimations();
        initParallax();
        initHoverEffects();
        initImageEffects();
        initTableAnimations();
        animateCounters();
        initGlowEffects();
        initSectionTransitions();
        initFeatureListStagger();
        initZoneAnimations();
        initSmoothScroll();
        initComparisonAnimation();
        initTimeframeAnimation();
        initLogoAnimation();

        console.log('🚀 KILLPIPS KVO Model - Initialized');
    }

    // Start
    init();

    // Reveal content after everything is loaded
    $(window).on('load', function () {
        $('body').addClass('loaded');
    });
});
