/**
 * All About Jee - Portfolio Interactive Script
 * Features: Dark/Light Mode Switcher, Hamburger Menu, Smooth Scroll with Nav Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Dark Mode Toggle Switcher
  // ==========================================
  const toggleSwitch = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('jee_theme');

  // Load saved theme or default to light
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('jee_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('jee_theme', 'light');
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
  }

  // ==========================================
  // 2. Responsive Hamburger Menu Toggle
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate icon between hamburger and 'X'
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // ==========================================
  // 3. Smooth Scroll Navigation & Close Menu
  // ==========================================
  const actionLinks = document.querySelectorAll('a[href^="#"]');

  actionLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          // Close mobile menu if active
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
          }

          // Smooth scroll offset calculation (accounting for fixed header)
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

  // ==========================================
  // 4. Scroll Active Nav Item Indicator
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

});
});
