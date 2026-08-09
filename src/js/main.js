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

  mobileNavToggle?.addEventListener('click', () => {
    const isActive = navLinks?.classList.toggle('active');
    mobileNavToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active');
      mobileNavToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Interactive mouse spotlight positioning on glass cards
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

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

    /* 
      ===================================================================
      DEVELOPER NOTE FOR BACKEND INTEGRATION:
      Currently there is no live email backend service connected.
      To enable real-time email delivery to blessenpshaju@gmail.com:
      
      Option 1 (EmailJS):
        import emailjs from '@emailjs/browser';
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { name, email, message }, 'YOUR_PUBLIC_KEY');

      Option 2 (Formspree / Resend API):
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
      ===================================================================
    */

    if (formFeedback) {
      formFeedback.style.display = 'block';
      formFeedback.style.background = 'rgba(0, 245, 212, 0.15)';
      formFeedback.style.border = '1px solid rgba(0, 245, 212, 0.3)';
      formFeedback.style.color = 'var(--accent-cyan)';
      formFeedback.textContent = 'Form submitted locally. Connect an email service or backend to enable real message delivery.';
    }

    contactForm.reset();
  });
});
