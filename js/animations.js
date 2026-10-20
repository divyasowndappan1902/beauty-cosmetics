/**
 * STACKLY - ANIMATIONS ENGINE
 * AOS & GSAP (ScrollTrigger) Custom Animation Pipeline
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion preferred: animations disabled for accessibility.');
    return;
  }

  // Initialize AOS
  initAOS();
  if (typeof AOS !== 'undefined') { AOS.refresh(); }

  // Initialize GSAP
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initGSAPAnimations();
  }
});

/* --------------------------------------------------------------------------
   AOS (Animate On Scroll) Configuration
   -------------------------------------------------------------------------- */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 0,
      disable: false // allow on tablets/desktops
    });
  }
}

/* --------------------------------------------------------------------------
   GSAP Page-Specific & Common Animations
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  // 1. Homepage Hero Timeline
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const badge = heroSection.querySelector('.hero-badge');
    const title = heroSection.querySelector('.hero-title');
    const desc = heroSection.querySelector('.hero-desc');
    const actions = heroSection.querySelector('.hero-actions');
    const heroImage = heroSection.querySelector('.hero-img');
    const heroFrame = heroSection.querySelector('.hero-img-frame');

    if (badge) {
      tl.fromTo(badge, { opacity: 1, y: -15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    }

    if (title) {
      tl.fromTo(title, { opacity: 1, y: 35 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.5');
    }

    if (desc) {
      tl.fromTo(desc, { opacity: 1, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7');
    }

    if (actions) {
      tl.fromTo(actions, { opacity: 1, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
    }

    if (heroFrame && heroImage) {
      tl.fromTo(heroFrame, { clipPath: 'inset(10% 10% 10% 10%)', opacity: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.4, ease: 'expo.out' }, '-=1.2');
      tl.fromTo(heroImage, { scale: 1.15 }, { scale: 1.0, duration: 1.6, ease: 'power2.out' }, '-=1.4');
    }

    // Parallax on mouse move for desktop hero image
    if (window.innerWidth > 992 && heroImage) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(heroImage, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: 'power1.out'
        });
      });
    }
  }

  // 2. Category Cards Stagger (ScrollTrigger)
  const categoryGrid = document.querySelector('.category-grid.animate-grid');
  if (categoryGrid && typeof ScrollTrigger !== 'undefined') {
    const cards = categoryGrid.querySelectorAll('.category-card');
    gsap.fromTo(cards, 
      { opacity: 1, y: 45 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: categoryGrid,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 3. Split Layout Alternating Reveal (Philosophy & About Story)
  const splitSections = document.querySelectorAll('.split-layout.animate-split');
  splitSections.forEach(section => {
    const leftCol = section.querySelector('.split-image-col');
    const rightCol = section.querySelector('.split-text-col');

    if (typeof ScrollTrigger !== 'undefined' && leftCol && rightCol) {
      const isReversed = section.classList.contains('split-reversed');
      const imageFromX = isReversed ? 60 : -60;
      const textFromX = isReversed ? -60 : 60;

      gsap.fromTo(leftCol, 
        { opacity: 1, x: imageFromX },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true
          }
        }
      );

      gsap.fromTo(rightCol,
        { opacity: 1, x: textFromX },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  });

  // 4. Routine Steps Stagger
  const routineGrid = document.querySelector('.routine-grid.animate-routine');
  if (routineGrid && typeof ScrollTrigger !== 'undefined') {
    const steps = routineGrid.querySelectorAll('.routine-card');
    gsap.fromTo(steps,
      { opacity: 1, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: routineGrid,
          start: 'top 78%',
          once: true
        }
      }
    );
  }

  // 5. Featured Collection Banner Reveal
  const collectionBanner = document.querySelector('.featured-collection-banner');
  if (collectionBanner && typeof ScrollTrigger !== 'undefined') {
    const bannerImg = collectionBanner.querySelector('.banner-bg');
    const bannerContent = collectionBanner.querySelector('.banner-content');

    if (bannerImg) {
      gsap.fromTo(bannerImg,
        { scale: 1.12, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: collectionBanner,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    if (bannerContent) {
      gsap.fromTo(bannerContent,
        { opacity: 1, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: collectionBanner,
            start: 'top 80%',
            once: true
          }
        }
      );
    }
  }

  // 6. Services Cards Staggered Scale-Up
  const servicesGrid = document.querySelector('.services-grid.animate-services');
  if (servicesGrid && typeof ScrollTrigger !== 'undefined') {
    const cards = servicesGrid.querySelectorAll('.service-card');
    gsap.fromTo(cards,
      { opacity: 1, y: 35, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: servicesGrid,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 7. How It Works Steps Sequence
  const howStepsGrid = document.querySelector('.how-steps-grid.animate-steps');
  if (howStepsGrid && typeof ScrollTrigger !== 'undefined') {
    const steps = howStepsGrid.querySelectorAll('.how-step-item');
    gsap.fromTo(steps,
      { opacity: 1, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.25,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: howStepsGrid,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 8. Login Page Entrance Animation
  const loginGrid = document.querySelector('.login-page-grid');
  if (loginGrid) {
    const visualCol = loginGrid.querySelector('.login-visual-col');
    const formBox = loginGrid.querySelector('.login-card-inner');

    if (visualCol) {
      gsap.fromTo(visualCol, 
        { opacity: 1, x: -40 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' }
      );
    }

    if (formBox) {
      gsap.fromTo(formBox.children,
        { opacity: 1, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      );
    }
  }

  // 9. About Page Hero & Values Stagger
  const valuesGrid = document.querySelector('.values-grid.animate-values');
  if (valuesGrid && typeof ScrollTrigger !== 'undefined') {
    const cards = valuesGrid.querySelectorAll('.value-card');
    gsap.fromTo(cards,
      { opacity: 1, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: valuesGrid,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // 10. About Page Luxury 7 Sections Custom Animations
  initAboutPageLuxuryAnimations();

  // 11. Services Page Luxury 7 Sections Custom Animations
  initServicesPageLuxuryAnimations();

  // 12. Blog Page Luxury 7 Sections Custom Animations
  initBlogPageLuxuryAnimations();

  // 13. Contact Page Luxury 6 Sections Custom Animations
  initContactPageLuxuryAnimations();
}

/* --------------------------------------------------------------------------
   About Page: 7 Luxury Sections Animation Pipeline
   -------------------------------------------------------------------------- */
function initAboutPageLuxuryAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Section 1: Our Beauty Philosophy (Subtle image scale & badge reveal)
  const philSection = document.querySelector('.philosophy-section');
  if (philSection) {
    const philImg = philSection.querySelector('.philosophy-image-frame img');
    const philBadge = philSection.querySelector('.philosophy-badge-float');

    if (philImg) {
      gsap.fromTo(philImg,
        { scale: 1.15, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: philSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (philBadge) {
      gsap.fromTo(philBadge,
        { opacity: 1, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.4,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: philSection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }
  }

  // Section 2: Mission & Vision (Staggered Panel Entrance)
  const mvSection = document.querySelector('.mission-vision-section');
  if (mvSection) {
    const panels = mvSection.querySelectorAll('.mv-panel');
    gsap.fromTo(panels,
      { opacity: 1, y: 55 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mvSection,
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // Section 3: Our Quality Promise (GSAP line icon reveal)
  const promiseSection = document.querySelector('.promise-section');
  if (promiseSection) {
    const icons = promiseSection.querySelectorAll('.promise-icon-box');
    gsap.fromTo(icons,
      { scale: 0.4, opacity: 1, rotate: -20 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: promiseSection,
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // Section 4: Discover the Beauty Experience (Staggered image reveal & zoom)
  const expSection = document.querySelector('.experience-section');
  if (expSection) {
    const expCards = expSection.querySelectorAll('.experience-card');
    gsap.fromTo(expCards,
      { opacity: 1, y: 60, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: expSection,
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // Section 5: Our Story & Inspiration (Text reveal & Image clip-path reveal)
  const storySection = document.querySelector('.story-section');
  if (storySection) {
    const storyFrame = storySection.querySelector('.story-clip-frame');
    const storyTexts = storySection.querySelectorAll('.story-body-p, .story-text-content .section-title, .story-text-content .section-eyebrow');
    const floatingCard = storySection.querySelector('.story-floating-card');

    if (storyFrame) {
      gsap.fromTo(storyFrame,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 1 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: storySection,
            start: 'top 72%',
            once: true
          }
        }
      );
    }

    if (storyTexts.length) {
      gsap.fromTo(storyTexts,
        { opacity: 1, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.16,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storySection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }

    if (floatingCard) {
      gsap.fromTo(floatingCard,
        { opacity: 1, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySection,
            start: 'top 65%',
            once: true
          }
        }
      );
    }
  }

  // Section 6: What Makes Us Different (Staggered feature reveals)
  const diffSection = document.querySelector('.different-section');
  if (diffSection) {
    const diffItems = diffSection.querySelectorAll('.different-item');
    gsap.fromTo(diffItems,
      { opacity: 1, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: diffSection,
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // Section 7: Your Beauty Journey Starts Here (Background reveal & staggered text entrance)
  const journeySection = document.querySelector('.journey-cta-section');
  if (journeySection) {
    const bgImg = journeySection.querySelector('.journey-cta-bg');
    const heading = journeySection.querySelector('.journey-cta-heading');
    const desc = journeySection.querySelector('.journey-cta-desc');
    const buttons = journeySection.querySelectorAll('.journey-cta-buttons .btn');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeySection,
        start: 'top 75%',
        once: true
      }
    });

    if (bgImg) {
      tl.fromTo(bgImg,
        { scale: 1.18, opacity: 0.15 },
        { scale: 1.05, opacity: 0.35, duration: 1.6, ease: 'power2.out' }
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 1, y: 35 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=1.2'
      );
    }

    if (desc) {
      tl.fromTo(desc,
        { opacity: 1, y: 25 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        '-=0.7'
      );
    }

    if (buttons.length) {
      tl.fromTo(buttons,
        { opacity: 1, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.75, ease: 'back.out(1.4)' },
        '-=0.5'
      );
    }
  }
}

/* --------------------------------------------------------------------------
   Services Page: 7 Luxury Sections Animation Pipeline
   -------------------------------------------------------------------------- */
function initServicesPageLuxuryAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Section 1: Signature Beauty Services (Heading reveal & image entrance)
  const introSection = document.querySelector('.services-intro-section');
  if (introSection) {
    const heading = introSection.querySelector('.services-intro-heading');
    const imgFrame = introSection.querySelector('.services-intro-image-frame');
    const badge = introSection.querySelector('.services-intro-float-badge');

    if (heading) {
      gsap.fromTo(heading,
        { opacity: 1, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (imgFrame) {
      gsap.fromTo(imgFrame,
        { opacity: 1, x: 45, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introSection,
            start: 'top 72%',
            once: true
          }
        }
      );
    }

    if (badge) {
      gsap.fromTo(badge,
        { opacity: 1, y: 25, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          delay: 0.35,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: introSection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }
  }

  // Section 2: Explore Our Beauty Categories (Staggered image reveal & hover zoom)
  const catSection = document.querySelector('.services-categories-section');
  if (catSection) {
    const cards = catSection.querySelectorAll('.service-category-card');
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 1, y: 55, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: catSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 3: Find Your Perfect Beauty Routine (Step-by-step stagger & line animation)
  const routineSection = document.querySelector('.services-routine-section');
  if (routineSection) {
    const lineFill = routineSection.querySelector('.services-routine-line-fill');
    const stepCards = routineSection.querySelectorAll('.services-routine-card');

    if (lineFill) {
      gsap.fromTo(lineFill,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: routineSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (stepCards.length) {
      gsap.fromTo(stepCards,
        { opacity: 1, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.22,
          duration: 0.9,
          delay: 0.2,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: routineSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 4: The Art of Everyday Beauty (Editorial image reveal & slow scale)
  const artSection = document.querySelector('.services-art-section');
  if (artSection) {
    const artImages = artSection.querySelectorAll('.services-art-img-wrap img');
    if (artImages.length) {
      gsap.fromTo(artImages,
        { scale: 1.15, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: artSection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }
  }

  // Section 5: Why Choose Our Beauty Experience? (Icon and text stagger)
  const whySection = document.querySelector('.services-why-section');
  if (whySection) {
    const whyCards = whySection.querySelectorAll('.services-why-card');
    const icons = whySection.querySelectorAll('.services-why-icon');

    if (whyCards.length) {
      gsap.fromTo(whyCards,
        { opacity: 1, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.16,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whySection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (icons.length) {
      gsap.fromTo(icons,
        { rotate: -25, scale: 0.5, opacity: 1 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.16,
          duration: 0.7,
          delay: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: whySection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 6: Beauty Inspiration & Expert Tips (Magazine-style reveal & image zoom)
  const tipsSection = document.querySelector('.services-tips-section');
  if (tipsSection) {
    const tipPanels = tipsSection.querySelectorAll('.services-tip-panel');
    if (tipPanels.length) {
      gsap.fromTo(tipPanels,
        { opacity: 1, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tipsSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 7: Begin Your Beauty Journey (Smooth background reveal & staggered CTA entrance)
  const journeySection = document.querySelector('.services-journey-cta');
  if (journeySection) {
    const bgImg = journeySection.querySelector('.services-journey-bg');
    const heading = journeySection.querySelector('.services-journey-heading');
    const desc = journeySection.querySelector('.services-journey-desc');
    const buttons = journeySection.querySelectorAll('.services-journey-buttons .btn');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeySection,
        start: 'top 75%',
        once: true
      }
    });

    if (bgImg) {
      tl.fromTo(bgImg,
        { scale: 1.18, opacity: 0.12 },
        { scale: 1.05, opacity: 0.32, duration: 1.6, ease: 'power2.out' }
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 1, y: 35 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=1.2'
      );
    }

    if (desc) {
      tl.fromTo(desc,
        { opacity: 1, y: 25 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        '-=0.7'
      );
    }

    if (buttons.length) {
      tl.fromTo(buttons,
        { opacity: 1, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.75, ease: 'back.out(1.4)' },
        '-=0.5'
      );
    }
  }
}

/* --------------------------------------------------------------------------
   Blog Page: 7 Luxury Editorial Sections Animation Pipeline
   -------------------------------------------------------------------------- */
function initBlogPageLuxuryAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Section 1: The Beauty Editorial (Image entrance & staggered text)
  const editSection = document.querySelector('.blog-editorial-section');
  if (editSection) {
    const imgFrame = editSection.querySelector('.blog-editorial-img-frame');
    const badge = editSection.querySelector('.blog-editorial-float-badge');
    const texts = editSection.querySelectorAll('.blog-editorial-title, .blog-editorial-desc, .blog-editorial-meta, .blog-editorial-byline, .blog-editorial-text-col .btn');

    if (imgFrame) {
      gsap.fromTo(imgFrame,
        { opacity: 1, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: editSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (badge) {
      gsap.fromTo(badge,
        { opacity: 1, y: 25, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          delay: 0.35,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: editSection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }

    if (texts.length) {
      gsap.fromTo(texts,
        { opacity: 1, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.16,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: editSection,
            start: 'top 72%',
            once: true
          }
        }
      );
    }
  }

  // Section 2: Explore Beauty Categories (Category stagger & animated underline)
  const catSection = document.querySelector('.blog-categories-section');
  if (catSection) {
    const catItems = catSection.querySelectorAll('.blog-category-item');
    const icons = catSection.querySelectorAll('.blog-category-icon');

    if (catItems.length) {
      gsap.fromTo(catItems,
        { opacity: 1, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: catSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (icons.length) {
      gsap.fromTo(icons,
        { scale: 0.5, rotate: -20, opacity: 1 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          delay: 0.15,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: catSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 3: Latest Beauty Stories (GSAP image reveal & zoom)
  const latestSection = document.querySelector('.blog-latest-section');
  if (latestSection) {
    const storyImgs = latestSection.querySelectorAll('.blog-story-card .blog-story-img');
    if (storyImgs.length) {
      gsap.fromTo(storyImgs,
        { scale: 1.15, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: latestSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 4: Skincare Secrets & Beauty Guides (Clip-path reveal & text stagger)
  const guidesSection = document.querySelector('.blog-guides-section');
  if (guidesSection) {
    const clipFrame = guidesSection.querySelector('.blog-guides-clip-frame');
    const floatCard = guidesSection.querySelector('.blog-guides-float-card');
    const guideItems = guidesSection.querySelectorAll('.blog-guide-item');

    if (clipFrame) {
      gsap.fromTo(clipFrame,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 1 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: guidesSection,
            start: 'top 72%',
            once: true
          }
        }
      );
    }

    if (floatCard) {
      gsap.fromTo(floatCard,
        { opacity: 1, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: guidesSection,
            start: 'top 68%',
            once: true
          }
        }
      );
    }

    if (guideItems.length) {
      gsap.fromTo(guideItems,
        { opacity: 1, x: 25 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: guidesSection,
            start: 'top 70%',
            once: true
          }
        }
      );
    }
  }

  // Section 5: Editor's Selection (Varied entrance directions)
  const selectSection = document.querySelector('.blog-selection-section');
  if (selectSection) {
    const largeCard = selectSection.querySelector('.blog-selection-large');
    const smallCards = selectSection.querySelectorAll('.blog-selection-small-card');

    if (largeCard) {
      gsap.fromTo(largeCard,
        { opacity: 1, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selectSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (smallCards.length) {
      gsap.fromTo(smallCards,
        { opacity: 1, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selectSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 6: The Beauty Inspiration Board (Mood board image reveals & text overlays)
  const inspSection = document.querySelector('.blog-inspiration-section');
  if (inspSection) {
    const moodCards = inspSection.querySelectorAll('.blog-moodboard-card');
    const overlays = inspSection.querySelectorAll('.blog-moodboard-content');

    if (moodCards.length) {
      gsap.fromTo(moodCards,
        { opacity: 1, y: 55, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          duration: 1.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: inspSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (overlays.length) {
      gsap.fromTo(overlays,
        { opacity: 1, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: inspSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 7: Join the Beauty Letter (Subtle reveal & form entrance)
  const newsSection = document.querySelector('.blog-newsletter-section');
  if (newsSection) {
    const heading = newsSection.querySelector('.blog-newsletter-heading');
    const desc = newsSection.querySelector('.blog-newsletter-desc');
    const form = newsSection.querySelector('.blog-newsletter-form');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: newsSection,
        start: 'top 75%',
        once: true
      }
    });

    if (heading) {
      tl.fromTo(heading,
        { opacity: 1, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );
    }

    if (desc) {
      tl.fromTo(desc,
        { opacity: 1, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (form) {
      tl.fromTo(form,
        { opacity: 1, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.4)' },
        '-=0.5'
      );
    }
  }
}

/* --------------------------------------------------------------------------
   Contact Page: 6 Luxury Sections Animation Pipeline
   -------------------------------------------------------------------------- */
function initContactPageLuxuryAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Section 1: Connect With Our Beauty Team (Split layout reveal, subtle image scale & badge)
  const connectSection = document.querySelector('.contact-connect-section');
  if (connectSection) {
    const heading = connectSection.querySelector('.contact-connect-heading');
    const lead = connectSection.querySelector('.contact-connect-lead');
    const desc = connectSection.querySelector('.contact-connect-desc');
    const cards = connectSection.querySelectorAll('.contact-info-card');
    const imgFrame = connectSection.querySelector('.contact-connect-img-frame img');
    const floatBadge = connectSection.querySelector('.contact-connect-float-badge');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: connectSection,
        start: 'top 75%',
        once: true
      }
    });

    if (heading) {
      tl.fromTo(heading,
        { opacity: 1, y: 35 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' }
      );
    }

    if (lead) {
      tl.fromTo(lead,
        { opacity: 1, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (desc) {
      tl.fromTo(desc,
        { opacity: 1, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (cards.length) {
      tl.fromTo(cards,
        { opacity: 1, x: -30 },
        { opacity: 1, x: 0, stagger: 0.18, duration: 0.85, ease: 'power2.out' },
        '-=0.5'
      );
    }

    if (imgFrame) {
      gsap.fromTo(imgFrame,
        { scale: 1.14, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: connectSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (floatBadge) {
      gsap.fromTo(floatBadge,
        { opacity: 1, y: 30, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          delay: 0.45,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: connectSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 2: Get in Touch - Contact Form (Staggered form field entrance)
  const formSection = document.querySelector('.contact-form-section');
  if (formSection) {
    const formFields = formSection.querySelectorAll('.contact-form-group, .contact-form-row, .btn-primary, .contact-form-reassurance');
    if (formFields.length) {
      gsap.fromTo(formFields,
        { opacity: 1, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 3: How Can We Help You? (Staggered Support Panels)
  const helpSection = document.querySelector('.contact-help-section');
  if (helpSection) {
    const helpCards = helpSection.querySelectorAll('.contact-help-card');
    if (helpCards.length) {
      gsap.fromTo(helpCards,
        { opacity: 1, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: helpSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 4: Frequently Asked Questions (Heading reveal & accordion stagger)
  const faqSection = document.querySelector('.contact-faq-section');
  if (faqSection) {
    const faqHeading = faqSection.querySelector('.section-title');
    const faqDesc = faqSection.querySelector('.section-desc');
    const faqItems = faqSection.querySelectorAll('.contact-accordion-item');

    const tlFaq = gsap.timeline({
      scrollTrigger: {
        trigger: faqSection,
        start: 'top 75%',
        once: true
      }
    });

    if (faqHeading) {
      tlFaq.fromTo(faqHeading,
        { opacity: 1, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );
    }

    if (faqDesc) {
      tlFaq.fromTo(faqDesc,
        { opacity: 1, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (faqItems.length) {
      tlFaq.fromTo(faqItems,
        { opacity: 1, y: 25 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }

  // Section 5: Our Customer Care Promise (Staggered 4-Card Reveal)
  const promiseSection = document.querySelector('.contact-promise-section');
  if (promiseSection) {
    const promiseCards = promiseSection.querySelectorAll('.contact-promise-card');
    const promiseIcons = promiseSection.querySelectorAll('.contact-promise-card-icon');

    if (promiseCards.length) {
      gsap.fromTo(promiseCards,
        { opacity: 1, y: 45 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: promiseSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (promiseIcons.length) {
      gsap.fromTo(promiseIcons,
        { scale: 0.5, rotate: -15, opacity: 1 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          stagger: 0.18,
          duration: 0.8,
          delay: 0.25,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: promiseSection,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  }

  // Section 6: Your Beauty Journey Starts Here (Background reveal & staggered text/buttons)
  const journeySection = document.querySelector('.contact-journey-cta');
  if (journeySection) {
    const bg = journeySection.querySelector('.contact-journey-bg');
    const heading = journeySection.querySelector('.contact-journey-heading');
    const desc = journeySection.querySelector('.contact-journey-desc');
    const btns = journeySection.querySelectorAll('.contact-journey-buttons .btn');

    const tlJourney = gsap.timeline({
      scrollTrigger: {
        trigger: journeySection,
        start: 'top 75%',
        once: true
      }
    });

    if (bg) {
      tlJourney.fromTo(bg,
        { scale: 1.18, opacity: 0.1 },
        { scale: 1.05, opacity: 0.32, duration: 1.6, ease: 'power2.out' }
      );
    }

    if (heading) {
      tlJourney.fromTo(heading,
        { opacity: 1, y: 35 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' },
        '-=1.2'
      );
    }

    if (desc) {
      tlJourney.fromTo(desc,
        { opacity: 1, y: 25 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        '-=0.7'
      );
    }

    if (btns.length) {
      tlJourney.fromTo(btns,
        { opacity: 1, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.75, ease: 'back.out(1.4)' },
        '-=0.5'
      );
    }
  }
}






/* Guarantee all text is showing in visible view */
window.addEventListener('load', () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.classList.add('aos-animate');
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });
  if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
    AOS.refresh();
  }
});
