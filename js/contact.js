/**
 * STACKLY - CONTACT & ACCORDION ENGINE
 * Interactive contact form validation, accessible FAQ accordions, and demo feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initAccordions();
});

/* --------------------------------------------------------------------------
   Contact Form Validation & Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  const nameInput = contactForm.querySelector('#contact-name');
  const emailInput = contactForm.querySelector('#contact-email');
  const subjectInput = contactForm.querySelector('#contact-subject');
  const enquiryInput = contactForm.querySelector('#contact-enquiry');
  const messageInput = contactForm.querySelector('#contact-message');
  const successBanner = document.querySelector('#contact-success-banner');

  const setError = (input, message) => {
    const parent = input.closest('.form-group');
    if (!parent) return;
    let errorEl = parent.querySelector('.input-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'input-error-msg';
      parent.appendChild(errorEl);
    }
    errorEl.textContent = message;
    parent.classList.add('has-error');
  };

  const clearError = (input) => {
    const parent = input.closest('.form-group');
    if (!parent) return;
    const errorEl = parent.querySelector('.input-error-msg');
    if (errorEl) {
      errorEl.textContent = '';
    }
    parent.classList.remove('has-error');
  };

  // Real-time input clearing
  [nameInput, emailInput, subjectInput, enquiryInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => clearError(field));
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please provide your full name.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Please provide your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'Please provide a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Enquiry
    if (!enquiryInput.value) {
      setError(enquiryInput, 'Please select an enquiry category.');
      isValid = false;
    } else {
      clearError(enquiryInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Please enter a subject line.');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
      setError(messageInput, 'Please enter your message (at least 15 characters).');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      return;
    }

    // Store message in localStorage for Admin Dashboard
    try {
      const messages = JSON.parse(localStorage.getItem('letoile_messages') || '[]');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      const dateStr = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')}, ${now.getFullYear()}`;
      const newMsg = {
        id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        enquiry: enquiryInput.value || 'general',
        message: messageInput.value.trim(),
        date: dateStr,
        read: false
      };
      messages.unshift(newMsg);
      localStorage.setItem('letoile_messages', JSON.stringify(messages));
    } catch (err) {
      console.warn('Could not sync message to localStorage:', err);
    }

    // Success State
    if (successBanner) {
      successBanner.style.display = 'block';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    contactForm.reset();
  });
}

/* --------------------------------------------------------------------------
   Accessible Accordion System (FAQ)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all siblings in the same accordion container
      const parentAccordion = item.closest('.accordion');
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const sibContent = sibling.querySelector('.accordion-content');
            const sibHeader = sibling.querySelector('.accordion-header');
            if (sibContent) sibContent.style.maxHeight = null;
            if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}
