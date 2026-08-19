/* Main Application Entry Point */
import '../styles/variables.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/animations.css';
import '../styles/responsive.css';

import { initTerminal } from './terminal.js';
import { initCommandPalette } from './command-palette.js';
import { initProjects } from './projects.js';
import { initScrollEffects } from './scroll-effects.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modular features
  initTerminal();
  initCommandPalette();
  initProjects();
  initScrollEffects();

  // Mobile navigation drawer controls
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function closeMobileNav() {
    navLinks?.classList.remove('active');
    mobileNavToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.setAttribute('aria-hidden', 'true');
  }

  function openMobileNav() {
    navLinks?.classList.add('active');
    mobileNavToggle?.setAttribute('aria-expanded', 'true');
    navLinks?.setAttribute('aria-hidden', 'false');
  }

  mobileNavToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks?.classList.contains('active');
    if (isActive) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileNavToggle) {
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
      closeMobileNav();
    }
  });


  // Contact form submission with validation and graceful mailto fallback
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput?.value?.trim();
    const email = emailInput?.value?.trim();
    const message = messageInput?.value?.trim();

    if (!name || !email || !message) {
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please complete all fields before sending.';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please provide a valid email address.';
      }
      return;
    }

    // Direct mailto fallback ensuring real message delivery to blessenpshaju@gmail.com
    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:blessenpshaju@gmail.com?subject=${subject}&body=${body}`;

    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.style.background = 'rgba(0, 245, 212, 0.15)';
      formFeedback.style.border = '1px solid rgba(0, 245, 212, 0.3)';
      formFeedback.style.color = 'var(--accent-cyan)';
      formFeedback.textContent = 'Opening your email client to send message to blessenpshaju@gmail.com...';
    }

    setTimeout(() => {
      window.location.href = mailtoUrl;
      contactForm.reset();
    }, 450);
  });
});
