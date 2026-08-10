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
  // Initialize sub-modules
  initTerminal();
  initCommandPalette();
  initProjects();
  initScrollEffects();

  // Mobile nav menu toggle
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

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close mobile nav on click outside or Escape key
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

  // Interactive mouse spotlight positioning on glass cards
  function initGlassSpotlights() {
    document.querySelectorAll('.glass-card').forEach(card => {
      if (card.dataset.spotlightBound) return;
      card.dataset.spotlightBound = 'true';
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  window.initGlassSpotlights = initGlassSpotlights;
  initGlassSpotlights();


  // Contact form submission handler with frontend validation
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

    // Frontend validation: Check required fields
    if (!name || !email || !message) {
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please fill out all fields before submitting.';
      }
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please enter a valid email address.';
      }
      return;
    }

    // Set Web3Forms Access Key or Formspree ID here to receive real emails to blessenpshaju@gmail.com
    // Get free key in 1 minute from https://web3forms.com/ or https://formspree.io/
    const WEB3FORMS_ACCESS_KEY = ''; // e.g. 'YOUR_ACCESS_KEY_HERE'
    const FORMSPREE_FORM_ID = '';    // e.g. 'mknlqpxw'

    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.style.background = 'rgba(59, 130, 246, 0.15)';
      formFeedback.style.border = '1px solid rgba(59, 130, 246, 0.3)';
      formFeedback.style.color = 'var(--accent-blue)';
      formFeedback.textContent = 'Sending message...';
    }

    if (WEB3FORMS_ACCESS_KEY) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, name, email, message })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && formFeedback) {
          formFeedback.style.background = 'rgba(0, 245, 212, 0.15)';
          formFeedback.style.border = '1px solid rgba(0, 245, 212, 0.3)';
          formFeedback.style.color = 'var(--accent-cyan)';
          formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
          contactForm.reset();
        } else if (formFeedback) {
          formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
          formFeedback.style.color = '#ef4444';
          formFeedback.textContent = data.message || 'Error sending message. Please try again.';
        }
      })
      .catch(() => {
        if (formFeedback) {
          formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
          formFeedback.style.color = '#ef4444';
          formFeedback.textContent = 'Network error. Please try again later.';
        }
      });
    } else if (FORMSPREE_FORM_ID) {
      fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      .then(res => {
        if (res.ok && formFeedback) {
          formFeedback.style.background = 'rgba(0, 245, 212, 0.15)';
          formFeedback.style.border = '1px solid rgba(0, 245, 212, 0.3)';
          formFeedback.style.color = 'var(--accent-cyan)';
          formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
          contactForm.reset();
        } else if (formFeedback) {
          formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
          formFeedback.style.color = '#ef4444';
          formFeedback.textContent = 'Error sending message. Please try again.';
        }
      })
      .catch(() => {
        if (formFeedback) {
          formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
          formFeedback.style.color = '#ef4444';
          formFeedback.textContent = 'Network error. Please try again later.';
        }
      });
    } else {
      // Local fallback mode when no API key is provided yet
      setTimeout(() => {
        if (formFeedback) {
          formFeedback.style.background = 'rgba(0, 245, 212, 0.15)';
          formFeedback.style.border = '1px solid rgba(0, 245, 212, 0.3)';
          formFeedback.style.color = 'var(--accent-cyan)';
          formFeedback.textContent = 'Message validated locally! To receive real emails in your inbox, add a Web3Forms key or Formspree ID to src/js/main.js.';
        }
        contactForm.reset();
      }, 400);
    }
  });

});
