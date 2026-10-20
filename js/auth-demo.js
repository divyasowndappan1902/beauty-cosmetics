/**
 * STACKLY - AUTHENTICATION & ROLE SELECTION ENGINE
 * Luxury login & signup interactions with dynamic role selector (Admin & Customer),
 * respective forms, instant demo credentials, and automated redirection to dashboards.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoleSelectors();
  initDynamicValidation();
  initAuthForm();
  initPasswordVisibilityToggle();
  initAuthViewToggle();
  initOAuthAndRecoveryDemos();
  checkSignupFlash();
});

// Current Active Roles
let currentLoginRole = 'customer';
let currentSignupRole = 'customer';

// Helper for XSS-safe text output
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

/* --------------------------------------------------------------------------
   1. Dynamic Role Selectors (Login & Signup)
   -------------------------------------------------------------------------- */
function initRoleSelectors() {
  // Login Role Cards
  const loginRoleCards = document.querySelectorAll('#login-role-slot .role-card');
  const loginDemoEmail = document.querySelector('#login-demo-email');
  const loginDemoPass = document.querySelector('#login-demo-pass');
  const quickFillLoginBtn = document.querySelector('#btn-quick-fill-login');
  const loginEmailInput = document.querySelector('#login-email');
  const loginPassInput = document.querySelector('#login-password');
  const loginSubmitBtn = document.querySelector('#login-submit-btn');
  const loginHeading = document.querySelector('#login-main-heading');
  const loginDesc = document.querySelector('#login-main-desc');

  if (loginRoleCards.length) {
    loginRoleCards.forEach(card => {
      card.addEventListener('click', () => {
        loginRoleCards.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');

        currentLoginRole = card.getAttribute('data-role');

        if (currentLoginRole === 'admin') {
          if (loginDemoEmail) loginDemoEmail.textContent = 'admin@example.com';
          if (loginDemoPass) loginDemoPass.textContent = 'admin123';
          if (loginHeading) loginHeading.innerHTML = 'Maison Command <em style="font-family: var(--font-serif); font-style: italic; color: var(--accent-gold);">Center</em>';
          if (loginDesc) loginDesc.textContent = 'Enter authorized administrative credentials for Atelier operations, catalog and salon management.';
          if (loginSubmitBtn) loginSubmitBtn.innerHTML = 'Sign In to Maison Command <i class="fa-solid fa-shield-halved" style="font-size: 0.85rem;"></i>';
          if (loginEmailInput) loginEmailInput.placeholder = 'admin@example.com';
        } else {
          if (loginDemoEmail) loginDemoEmail.textContent = 'name@example.com';
          if (loginDemoPass) loginDemoPass.textContent = 'client123';
          if (loginHeading) loginHeading.innerHTML = 'Welcome Back, <em style="font-family: var(--font-serif); font-style: italic; color: var(--accent-gold);">Cher Client</em>';
          if (loginDesc) loginDesc.textContent = 'Please enter your client credentials to access your private beauty dossier and salon orders.';
          if (loginSubmitBtn) loginSubmitBtn.innerHTML = 'Sign In as VIP Client <i class="fa-solid fa-gem" style="font-size: 0.85rem;"></i>';
          if (loginEmailInput) loginEmailInput.placeholder = 'name@example.com';
        }
      });
    });
  }

  // Quick fill button for Login
  if (quickFillLoginBtn) {
    quickFillLoginBtn.addEventListener('click', () => {
      if (currentLoginRole === 'admin') {
        if (loginEmailInput) loginEmailInput.value = 'admin@stackly.com';
        if (loginPassInput) loginPassInput.value = 'admin123';
      } else {
        if (loginEmailInput) loginEmailInput.value = 'client@stackly.com';
        if (loginPassInput) loginPassInput.value = 'client123';
      }
    });
  }

  // Signup Role Cards
  const signupRoleCards = document.querySelectorAll('#signup-role-slot .role-card');
  const signupCustomerFields = document.querySelector('#signup-customer-fields');
  const signupAdminFields = document.querySelector('#signup-admin-fields');
  const signupHeading = document.querySelector('#signup-main-heading');
  const signupDesc = document.querySelector('#signup-main-desc');
  const signupSubmitBtn = document.querySelector('#signup-submit-btn');

  if (signupRoleCards.length) {
    signupRoleCards.forEach(card => {
      card.addEventListener('click', () => {
        signupRoleCards.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');

        currentSignupRole = card.getAttribute('data-role');

        if (currentSignupRole === 'admin') {
          if (signupCustomerFields) signupCustomerFields.style.display = 'none';
          if (signupAdminFields) signupAdminFields.style.display = 'block';
          if (signupHeading) signupHeading.innerHTML = 'Atelier Staff <em style="font-family: var(--font-serif); font-style: italic; color: var(--accent-gold);">Onboarding</em>';
          if (signupDesc) signupDesc.textContent = 'Register authorized management credentials for Maison operations, inventory control, and salon management.';
          if (signupSubmitBtn) signupSubmitBtn.innerHTML = 'Authorize & Register Admin <i class="fa-solid fa-shield-halved"></i>';
        } else {
          if (signupAdminFields) signupAdminFields.style.display = 'none';
          if (signupCustomerFields) signupCustomerFields.style.display = 'block';
          if (signupHeading) signupHeading.innerHTML = 'Join the <em style="font-family: var(--font-serif); font-style: italic; color: var(--accent-gold);">Privileged Circle</em>';
          if (signupDesc) signupDesc.textContent = 'Join our private client circle for bespoke formulations and priority salon bookings.';
          if (signupSubmitBtn) signupSubmitBtn.innerHTML = 'Create VIP Client Profile <i class="fa-solid fa-sparkles"></i>';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Password Visibility Toggle
   -------------------------------------------------------------------------- */
function initPasswordVisibilityToggle() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-with-icon-wrapper').querySelector('input');
      const icon = btn.querySelector('i');

      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      } else {
        input.type = 'password';
        if (icon) {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Dynamic Real-Time Field Validation (Email format & 6+ char Password)
   -------------------------------------------------------------------------- */
function initDynamicValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  function setFeedback(input, feedbackEl, isValid, message, statusIconEl = null) {
    if (!input || !feedbackEl) return;
    if (isValid === true) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      feedbackEl.className = 'field-feedback success active';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message || 'Valid'}</span>`;
      if (statusIconEl) {
        statusIconEl.className = 'input-status-icon success active';
        statusIconEl.innerHTML = '<i class="fa-solid fa-check"></i>';
      }
    } else if (isValid === false) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      feedbackEl.className = 'field-feedback error active';
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${message}</span>`;
      if (statusIconEl) {
        statusIconEl.className = 'input-status-icon error active';
        statusIconEl.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
      }
    } else {
      input.classList.remove('is-valid', 'is-invalid');
      if (message) {
        feedbackEl.className = 'field-feedback hint active';
        feedbackEl.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
      } else {
        feedbackEl.className = 'field-feedback';
        feedbackEl.innerHTML = '';
      }
      if (statusIconEl) {
        statusIconEl.className = 'input-status-icon';
        statusIconEl.innerHTML = '';
      }
    }
  }

  // 1. Login Form Fields
  const loginEmail = document.querySelector('#login-email');
  const loginEmailFeedback = document.querySelector('#login-email-feedback');
  const loginEmailStatus = document.querySelector('#login-email-status');

  if (loginEmail && loginEmailFeedback) {
    loginEmail.addEventListener('input', () => {
      const val = loginEmail.value.trim();
      if (!val) {
        setFeedback(loginEmail, loginEmailFeedback, null, '', loginEmailStatus);
      } else if (!emailRegex.test(val)) {
        setFeedback(loginEmail, loginEmailFeedback, false, 'Please enter a valid email format (e.g. name@domain.com)', loginEmailStatus);
      } else {
        setFeedback(loginEmail, loginEmailFeedback, true, 'Valid email address format', loginEmailStatus);
      }
    });

    loginEmail.addEventListener('blur', () => {
      const val = loginEmail.value.trim();
      if (!val) {
        setFeedback(loginEmail, loginEmailFeedback, null, '', loginEmailStatus);
      } else if (!emailRegex.test(val)) {
        setFeedback(loginEmail, loginEmailFeedback, false, 'Please enter a valid email address.', loginEmailStatus);
      }
    });
  }

  const loginPass = document.querySelector('#login-password');
  const loginPassFeedback = document.querySelector('#login-password-feedback');

  if (loginPass && loginPassFeedback) {
    loginPass.addEventListener('input', () => {
      const val = loginPass.value;
      if (!val) {
        setFeedback(loginPass, loginPassFeedback, null, 'Must be at least 6 characters.');
      } else if (val.length < 6) {
        setFeedback(loginPass, loginPassFeedback, false, `Password must be at least 6 characters (${val.length}/6 entered)`);
      } else {
        setFeedback(loginPass, loginPassFeedback, true, `Password requirement satisfied (${val.length} characters)`);
      }
    });

    loginPass.addEventListener('focus', () => {
      if (!loginPass.value) {
        setFeedback(loginPass, loginPassFeedback, null, 'Must be at least 6 characters.');
      }
    });

    loginPass.addEventListener('blur', () => {
      if (!loginPass.value) {
        setFeedback(loginPass, loginPassFeedback, null, '');
      }
    });
  }

  // 2. Customer Signup Fields
  const regEmail = document.querySelector('#reg-email');
  const regEmailFeedback = document.querySelector('#reg-email-feedback');
  const regEmailStatus = document.querySelector('#reg-email-status');

  if (regEmail && regEmailFeedback) {
    regEmail.addEventListener('input', () => {
      const val = regEmail.value.trim();
      if (!val) {
        setFeedback(regEmail, regEmailFeedback, null, '', regEmailStatus);
      } else if (!emailRegex.test(val)) {
        setFeedback(regEmail, regEmailFeedback, false, 'Please enter a valid email format.', regEmailStatus);
      } else {
        setFeedback(regEmail, regEmailFeedback, true, 'Valid email format', regEmailStatus);
      }
    });
  }

  const regPass = document.querySelector('#reg-password');
  const regPassFeedback = document.querySelector('#reg-password-feedback');

  if (regPass && regPassFeedback) {
    regPass.addEventListener('input', () => {
      const val = regPass.value;
      if (!val) {
        setFeedback(regPass, regPassFeedback, null, 'At least 6 characters required.');
      } else if (val.length < 6) {
        setFeedback(regPass, regPassFeedback, false, `Password must be at least 6 characters (${val.length}/6 entered)`);
      } else {
        setFeedback(regPass, regPassFeedback, true, `Password requirement satisfied (${val.length} characters)`);
      }
    });
  }

  // 3. Admin Signup Fields
  const regAdminEmail = document.querySelector('#reg-admin-email');
  const regAdminEmailFeedback = document.querySelector('#reg-admin-email-feedback');
  const regAdminEmailStatus = document.querySelector('#reg-admin-email-status');

  if (regAdminEmail && regAdminEmailFeedback) {
    regAdminEmail.addEventListener('input', () => {
      const val = regAdminEmail.value.trim();
      if (!val) {
        setFeedback(regAdminEmail, regAdminEmailFeedback, null, '', regAdminEmailStatus);
      } else if (!emailRegex.test(val)) {
        setFeedback(regAdminEmail, regAdminEmailFeedback, false, 'Please enter a valid corporate email format.', regAdminEmailStatus);
      } else {
        setFeedback(regAdminEmail, regAdminEmailFeedback, true, 'Valid corporate email format', regAdminEmailStatus);
      }
    });
  }

  const regAdminPass = document.querySelector('#reg-admin-password');
  const regAdminPassFeedback = document.querySelector('#reg-admin-password-feedback');

  if (regAdminPass && regAdminPassFeedback) {
    regAdminPass.addEventListener('input', () => {
      const val = regAdminPass.value;
      if (!val) {
        setFeedback(regAdminPass, regAdminPassFeedback, null, 'At least 6 characters required.');
      } else if (val.length < 6) {
        setFeedback(regAdminPass, regAdminPassFeedback, false, `Passcode must be at least 6 characters (${val.length}/6 entered)`);
      } else {
        setFeedback(regAdminPass, regAdminPassFeedback, true, `Passcode requirement satisfied (${val.length} characters)`);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Auth Form Validation, Redirection & LocalStorage Session
   -------------------------------------------------------------------------- */
function initAuthForm() {
  const loginForm = document.querySelector('#auth-login-form');
  const registerForm = document.querySelector('#auth-register-form');
  const feedbackBox = document.querySelector('#auth-alert-box');

  const showAuthFeedback = (msg, type = 'error') => {
    if (!feedbackBox) return;
    feedbackBox.innerHTML = msg;
    feedbackBox.className = `auth-alert-message ${type}`;
    feedbackBox.style.display = 'block';
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const clearAuthFeedback = () => {
    if (!feedbackBox) return;
    feedbackBox.style.display = 'none';
    feedbackBox.textContent = '';
  };

  // ------------------------------------------------------------------------
  // LOGIN SUBMIT HANDLER
  // ------------------------------------------------------------------------
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAuthFeedback();

      const emailInput = loginForm.querySelector('#login-email');
      const passInput = loginForm.querySelector('#login-password');
      const emailFeedback = document.querySelector('#login-email-feedback');
      const passFeedback = document.querySelector('#login-password-feedback');
      const emailStatus = document.querySelector('#login-email-status');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passInput ? passInput.value : '';

      let hasError = false;

      // Dynamic Email Validation Check
      if (!emailVal) {
        if (emailInput) {
          emailInput.classList.remove('is-valid');
          emailInput.classList.add('is-invalid');
        }
        if (emailFeedback) {
          emailFeedback.className = 'field-feedback error active';
          emailFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Email address is required.</span>';
        }
        if (emailStatus) {
          emailStatus.className = 'input-status-icon error active';
          emailStatus.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
        }
        hasError = true;
      } else if (!emailRegex.test(emailVal)) {
        if (emailInput) {
          emailInput.classList.remove('is-valid');
          emailInput.classList.add('is-invalid');
        }
        if (emailFeedback) {
          emailFeedback.className = 'field-feedback error active';
          emailFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Please provide a valid email format (e.g. name@domain.com)</span>';
        }
        if (emailStatus) {
          emailStatus.className = 'input-status-icon error active';
          emailStatus.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
        }
        hasError = true;
      } else {
        if (emailInput) {
          emailInput.classList.remove('is-invalid');
          emailInput.classList.add('is-valid');
        }
        if (emailFeedback) {
          emailFeedback.className = 'field-feedback success active';
          emailFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Valid email address</span>';
        }
        if (emailStatus) {
          emailStatus.className = 'input-status-icon success active';
          emailStatus.innerHTML = '<i class="fa-solid fa-check"></i>';
        }
      }

      // Dynamic 6-character Password MUST Check
      if (!passVal) {
        if (passInput) {
          passInput.classList.remove('is-valid');
          passInput.classList.add('is-invalid');
        }
        if (passFeedback) {
          passFeedback.className = 'field-feedback error active';
          passFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Password is required.</span>';
        }
        hasError = true;
      } else if (passVal.length < 6) {
        if (passInput) {
          passInput.classList.remove('is-valid');
          passInput.classList.add('is-invalid');
        }
        if (passFeedback) {
          passFeedback.className = 'field-feedback error active';
          passFeedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>Password must be at least 6 characters (${passVal.length}/6 entered).</span>`;
        }
        hasError = true;
      } else {
        if (passInput) {
          passInput.classList.remove('is-invalid');
          passInput.classList.add('is-valid');
        }
        if (passFeedback) {
          passFeedback.className = 'field-feedback success active';
          passFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Password requirement satisfied (${passVal.length} characters)</span>`;
        }
      }

      if (hasError) {
        if (!emailVal || !emailRegex.test(emailVal)) {
          if (emailInput) emailInput.focus();
        } else if (!passVal || passVal.length < 6) {
          if (passInput) passInput.focus();
        }
        return;
      }

      // Dynamic Authentication Success with ANY valid email and 6+ character password!
      const isAdmin = currentLoginRole === 'admin' || emailVal.toLowerCase().includes('admin');
      
      // Check if user previously registered in localStorage
      let registeredUsers = [];
      try {
        registeredUsers = JSON.parse(localStorage.getItem('letoile_registered_users') || '[]');
      } catch (err) { registeredUsers = []; }

      const existingProfile = registeredUsers.find(u => u.email.toLowerCase() === emailVal.toLowerCase());

      // Derive dynamic display name from email or stored profile
      let displayName;
      if (existingProfile && existingProfile.name) {
        displayName = existingProfile.name;
      } else {
        const rawName = emailVal.split('@')[0].replace(/[._\-+]/g, ' ');
        displayName = rawName.split(' ')
          .filter(Boolean)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ') || (isAdmin ? 'Maison Director' : 'VIP Client');
      }

      const authenticatedUser = {
        role: isAdmin ? 'admin' : (existingProfile?.role || 'customer'),
        name: displayName,
        email: emailVal,
        title: isAdmin ? 'Maison Director' : 'VIP Client',
        tier: existingProfile?.tier || 'Diamond Privilege',
        points: existingProfile?.points || 3450,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('letoile_user', JSON.stringify(authenticatedUser));

      const targetDashboard = isAdmin ? 'admin-dashboard.html' : 'customer-dashboard.html';

      showAuthFeedback(`
        <i class="fa-solid fa-circle-check"></i> 
        Authentication successful! Welcome, <strong>${escapeHTML(authenticatedUser.name)}</strong>. 
        Redirecting to your <strong>${isAdmin ? 'Admin Command Center' : 'VIP Client Sanctuary'}</strong>...
      `, 'success');

      setTimeout(() => {
        window.location.href = targetDashboard;
      }, 1000);
    });
  }

  // ------------------------------------------------------------------------
  // SIGNUP SUBMIT HANDLER (With Customer vs Admin validation)
  // ------------------------------------------------------------------------
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAuthFeedback();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

      if (currentSignupRole === 'admin') {
        // ADMIN SIGNUP FIELDS
        const adminName = registerForm.querySelector('#reg-admin-name');
        const adminEmail = registerForm.querySelector('#reg-admin-email');
        const adminDept = registerForm.querySelector('#reg-admin-dept');
        const adminKey = registerForm.querySelector('#reg-admin-key');
        const adminPass = registerForm.querySelector('#reg-admin-password');
        const adminAgree = registerForm.querySelector('#reg-admin-agree');

        if (!adminName.value.trim()) {
          showAuthFeedback('Please enter your executive staff full name.');
          adminName.focus();
          return;
        }

        if (!adminEmail.value.trim() || !emailRegex.test(adminEmail.value.trim())) {
          showAuthFeedback('Please enter a valid Maison corporate email address.');
          adminEmail.focus();
          return;
        }

        if (!adminKey.value.trim()) {
          showAuthFeedback('Please enter the Maison Master Security Passkey (e.g. MAISON-2026-KEY).');
          adminKey.focus();
          return;
        }

        if (!adminPass.value || adminPass.value.length < 6) {
          showAuthFeedback('Administrative passcode must be at least 6 characters.');
          adminPass.focus();
          return;
        }

        if (!adminAgree.checked) {
          showAuthFeedback('You must acknowledge the Maison Confidentiality & Access Protocol.');
          return;
        }

        const newAdminUser = {
          role: 'admin',
          name: adminName.value.trim(),
          email: adminEmail.value.trim(),
          department: adminDept ? adminDept.value : 'General Management',
          title: adminDept ? adminDept.options[adminDept.selectedIndex].text : 'Maison Director',
          loginTime: new Date().toISOString()
        };

        // Clear active session so user logs in on login page
        localStorage.removeItem('letoile_user');

        let registeredUsers = [];
        try {
          registeredUsers = JSON.parse(localStorage.getItem('letoile_registered_users') || '[]');
        } catch (err) { registeredUsers = []; }
        registeredUsers = registeredUsers.filter(u => u.email.toLowerCase() !== newAdminUser.email.toLowerCase());
        registeredUsers.push(newAdminUser);
        localStorage.setItem('letoile_registered_users', JSON.stringify(registeredUsers));

        sessionStorage.setItem('letoile_signup_flash', JSON.stringify({
          role: 'admin',
          email: newAdminUser.email,
          name: newAdminUser.name,
          message: `Maison Admin Account created successfully for <strong>${escapeHTML(newAdminUser.name)}</strong>! Please enter your passcode to sign in.`
        }));

        showAuthFeedback(`
          <i class="fa-solid fa-circle-check"></i> 
          Maison Admin Account created successfully! Redirecting to login page...
        `, 'success');

        setTimeout(() => {
          const loginSection = document.querySelector('#login-view-section');
          const registerSection = document.querySelector('#register-view-section');
          if (loginSection && registerSection) {
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            window.location.hash = 'login';
            checkSignupFlash();
          } else {
            window.location.href = 'login.html#login';
          }
        }, 500);

      } else {
        // CUSTOMER SIGNUP FIELDS
        const custName = registerForm.querySelector('#reg-name');
        const custEmail = registerForm.querySelector('#reg-email');
        const custPass = registerForm.querySelector('#reg-password');
        const custSkin = registerForm.querySelector('#reg-skin-focus');
        const custSalon = registerForm.querySelector('#reg-salon');
        const custAgree = registerForm.querySelector('#reg-customer-agree');

        if (!custName.value.trim()) {
          showAuthFeedback('Please enter your full name.');
          custName.focus();
          return;
        }

        if (!custEmail.value.trim() || !emailRegex.test(custEmail.value.trim())) {
          showAuthFeedback('Please enter a valid email address.');
          custEmail.focus();
          return;
        }

        if (!custPass.value || custPass.value.length < 6) {
          showAuthFeedback('Password must be at least 6 characters.');
          custPass.focus();
          return;
        }

        if (!custAgree.checked) {
          showAuthFeedback('Please accept the Maison Terms of Service and Privacy Policy.');
          return;
        }

        const newCustomerUser = {
          role: 'customer',
          name: custName.value.trim(),
          email: custEmail.value.trim(),
          skinFocus: custSkin ? custSkin.value : 'Radiance & Anti-Aging',
          preferredSalon: custSalon ? custSalon.value : 'Paris Place Vendome',
          tier: 'Diamond Privilege',
          points: 500, // Welcome points
          loginTime: new Date().toISOString()
        };

        // Clear active session so user logs in on login page
        localStorage.removeItem('letoile_user');

        let registeredUsers = [];
        try {
          registeredUsers = JSON.parse(localStorage.getItem('letoile_registered_users') || '[]');
        } catch (err) { registeredUsers = []; }
        registeredUsers = registeredUsers.filter(u => u.email.toLowerCase() !== newCustomerUser.email.toLowerCase());
        registeredUsers.push(newCustomerUser);
        localStorage.setItem('letoile_registered_users', JSON.stringify(registeredUsers));

        sessionStorage.setItem('letoile_signup_flash', JSON.stringify({
          role: 'customer',
          email: newCustomerUser.email,
          name: newCustomerUser.name,
          message: `VIP Client Profile created successfully for <strong>${escapeHTML(newCustomerUser.name)}</strong>! Please enter your password to sign in.`
        }));

        showAuthFeedback(`
          <i class="fa-solid fa-circle-check"></i> 
          VIP Client Profile created successfully! Redirecting to login page...
        `, 'success');

        setTimeout(() => {
          const loginSection = document.querySelector('#login-view-section');
          const registerSection = document.querySelector('#register-view-section');
          if (loginSection && registerSection) {
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            window.location.hash = 'login';
            checkSignupFlash();
          } else {
            window.location.href = 'login.html#login';
          }
        }, 500);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. Switch Between Login & Register Views
   -------------------------------------------------------------------------- */
function initAuthViewToggle() {
  const showRegisterLink = document.querySelector('#switch-to-register');
  const showLoginLink = document.querySelector('#switch-to-login');
  const loginSection = document.querySelector('#login-view-section');
  const registerSection = document.querySelector('#register-view-section');
  const feedbackBox = document.querySelector('#auth-alert-box');

  if (showRegisterLink && loginSection && registerSection) {
    showRegisterLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (feedbackBox) feedbackBox.style.display = 'none';
      loginSection.style.display = 'none';
      registerSection.style.display = 'block';
      window.location.hash = 'register';
    });
  }

  if (showLoginLink && loginSection && registerSection) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (feedbackBox) feedbackBox.style.display = 'none';
      registerSection.style.display = 'none';
      loginSection.style.display = 'block';
      window.location.hash = 'login';
    });
  }

  // Check URL hash on load
  if (window.location.hash === '#register' && loginSection && registerSection) {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
  }

  window.addEventListener('hashchange', () => {
    if (!loginSection || !registerSection) return;
    if (window.location.hash === '#register') {
      if (feedbackBox) feedbackBox.style.display = 'none';
      loginSection.style.display = 'none';
      registerSection.style.display = 'block';
    } else {
      registerSection.style.display = 'none';
      loginSection.style.display = 'block';
    }
  });
}

/* --------------------------------------------------------------------------
   6. Signup Flash Notice & Auto-Fill Handler
   -------------------------------------------------------------------------- */
function checkSignupFlash() {
  const flashData = sessionStorage.getItem('letoile_signup_flash');
  if (!flashData) return;

  try {
    const flash = JSON.parse(flashData);
    sessionStorage.removeItem('letoile_signup_flash');

    const loginSection = document.querySelector('#login-view-section');
    const registerSection = document.querySelector('#register-view-section');
    if (loginSection && registerSection) {
      registerSection.style.display = 'none';
      loginSection.style.display = 'block';
      if (window.location.hash === '#register') {
        window.location.hash = 'login';
      }
    }

    if (flash.role === 'admin') {
      const adminRoleCard = document.querySelector('#login-role-slot .role-card[data-role="admin"]');
      if (adminRoleCard) adminRoleCard.click();
    } else {
      const custRoleCard = document.querySelector('#login-role-slot .role-card[data-role="customer"]');
      if (custRoleCard) custRoleCard.click();
    }

    const emailInput = document.querySelector('#login-email');
    if (emailInput && flash.email) {
      emailInput.value = flash.email;
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      const emailFeedback = document.querySelector('#login-email-feedback');
      if (emailFeedback) {
        emailFeedback.className = 'field-feedback success active';
        emailFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Ready to sign in with your credentials</span>';
      }
      const emailStatus = document.querySelector('#login-email-status');
      if (emailStatus) {
        emailStatus.className = 'input-status-icon success active';
        emailStatus.innerHTML = '<i class="fa-solid fa-check"></i>';
      }
    }

    const feedbackBox = document.querySelector('#auth-alert-box');
    if (feedbackBox && flash.message) {
      feedbackBox.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        ${flash.message}
      `;
      feedbackBox.className = 'auth-alert-message success';
      feedbackBox.style.display = 'block';
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const passInput = document.querySelector('#login-password');
    if (passInput) {
      setTimeout(() => passInput.focus(), 250);
    }
  } catch (err) {
    console.error('Error applying signup flash:', err);
  }
}

/* --------------------------------------------------------------------------
   5. Google Sign-in & Forgot Password Demo Handlers
   -------------------------------------------------------------------------- */
function initOAuthAndRecoveryDemos() {
  const googleBtn = document.querySelector('.btn-google-auth');
  const forgotPassLink = document.querySelector('.forgot-password-link');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // Demo auto-login with Google
      const googleUser = {
        role: currentLoginRole || 'customer',
        name: 'Clara Delacroix (Google Verified)',
        email: 'clara.delacroix@gmail.com',
        title: currentLoginRole === 'admin' ? 'Maison Director' : 'VIP Client',
        tier: 'Diamond Privilege',
        points: 3450
      };

      localStorage.setItem('letoile_user', JSON.stringify(googleUser));

      setTimeout(() => {
        window.location.href = currentLoginRole === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
      }, 1000);
    });
  }

  if (forgotPassLink) {
    forgotPassLink.addEventListener('click', (e) => {
      e.preventDefault();
      const loginEmail = document.querySelector('#login-email')?.value.trim();
      const targetEmail = (loginEmail && loginEmail.includes('@')) ? loginEmail : 'client@stackly.com';
      showAuthFeedback(`Password recovery link dispatched to <strong>${escapeHTML(targetEmail)}</strong>.`, 'success');
    });
  }
}
