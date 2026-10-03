/* ==========================================================================
   WHIMSICAL JUMINOCORE PORTFOLIO - SCRIPT
   Features:
   - Interactive Light/Dark Mode Switcher with LocalStorage Memory
   - Mobile Hamburger Menu Toggle
   - Smooth Scroll with Header Offset Adjustment
   - Auto-highlight Active Menu Link on Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // -----------------------------------------------------------------------
  // 1. LIGHT / DARK MODE SWITCHER
  // -----------------------------------------------------------------------
  const toggleSwitch = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('theme');

  // Check saved user preference from LocalStorage
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  } else {
    // Default system preference check (optional fallback)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleSwitch.checked = true;
    }
  }

  // Switch Theme Function
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);


  // -----------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU
  // -----------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Toggle Hamburger Icon between Bars and X-mark
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }


  // -----------------------------------------------------------------------
  // 3. SMOOTH SCROLLING & CLOSE MOBILE MENU ON CLICK
  // -----------------------------------------------------------------------
  const clickableLinks = document.querySelectorAll('.nav-item, .hero-cta a, .logo');

  clickableLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Check if link points to an anchor ID on the same page
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-xmark');
              icon.classList.add('fa-bars');
            }
          }

          // Calculate precise scroll offset considering fixed navbar
          const headerOffset = 75;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });


  // -----------------------------------------------------------------------
  // 4. AUTO-HIGHLIGHT ACTIVE NAVBAR ITEM ON SCROLL
  // -----------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
});
