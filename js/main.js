/**
 * STACKLY - CORE JAVASCRIPT
 * Header scroll, mobile menu, mini-cart, search modal, toast notifications, newsletter validation
 */

// Globally suppress intrusive browser popup message dialogs
window.alert = function(msg) {
  console.log('[Popup alert suppressed]:', msg);
};
window.prompt = function(msg, defaultVal) {
  console.log('[Popup prompt suppressed]:', msg);
  return defaultVal || null;
};
window.confirm = function(msg) {
  console.log('[Popup confirm auto-accepted]:', msg);
  return true;
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initStickyHeader();
  initMobileNavigation();
  initMiniCart();
  initSearchModal();
  initNewsletterForms();
  initImageFallbackHandler();
  updateActiveNavLink();
  initNavAuthState();
});

/* --------------------------------------------------------------------------
   Sticky Header & Transparent Header Behavior
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   Active Navigation Link Detection
   -------------------------------------------------------------------------- */
function updateActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileOverlay) return;

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !hamburgerBtn.classList.contains('active');
    hamburgerBtn.classList.toggle('active', shouldOpen);
    mobileOverlay.classList.toggle('active', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      toggleMenu(false);
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   Global Toast Notification (All Popup Messages Removed)
   -------------------------------------------------------------------------- */
function showToast(message, iconClass = 'fa-solid fa-check') {
  // All popup messages removed
  const container = document.querySelector('.toast-container');
  if (container) {
    container.remove();
  }
}

/* --------------------------------------------------------------------------
   Mini-Cart Slide-out Drawer & State
   -------------------------------------------------------------------------- */
const DEFAULT_CART_ITEMS = [
  {
    id: 1,
    name: 'Elixir de Rose Radiance Serum',
    price: 98.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    name: 'Crème Renaissance Restorative Face Cream',
    price: 125.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80'
  }
];

function getCart() {
  const saved = localStorage.getItem('letoile_cart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return DEFAULT_CART_ITEMS;
    }
  }
  return DEFAULT_CART_ITEMS;
}

function saveCart(cart) {
  localStorage.setItem('letoile_cart', JSON.stringify(cart));
  renderCart();
}

function initMiniCart() {
  const cartTriggerBtns = document.querySelectorAll('.header-cart-btn, .open-cart-btn');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeBtn = document.querySelector('.cart-drawer-close');
  const checkoutBtn = document.querySelector('.cart-checkout-btn');

  if (!cartOverlay) return;

  const toggleCart = (open) => {
    const shouldOpen = open !== undefined ? open : !cartOverlay.classList.contains('active');
    cartOverlay.classList.toggle('active', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  cartTriggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCart(true);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCart(false));
  }

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      toggleCart(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartOverlay.classList.contains('active')) {
      toggleCart(false);
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Proceeding to luxury checkout (demo mode)
    });
  }

  // Initial render of cart
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const listContainer = document.querySelector('.cart-items-list');
  const badgeEls = document.querySelectorAll('.cart-count-badge');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  const freeShippingText = document.querySelector('.cart-free-shipping');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  badgeEls.forEach(badge => {
    badge.textContent = totalCount;
  });

  if (!listContainer) return;

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div class="cart-empty-view">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.5rem;">Your Shopping Bag is Empty</h4>
        <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">Indulge in our exquisite skincare and botanical formulations.</p>
        <a href="index.html#bestsellers" class="btn btn-outline btn-sm cart-drawer-close-link">Discover Bestsellers</a>
      </div>
    `;
    const closeLink = listContainer.querySelector('.cart-drawer-close-link');
    if (closeLink) {
      closeLink.addEventListener('click', () => {
        document.querySelector('.cart-drawer-overlay').classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (freeShippingText) freeShippingText.textContent = 'Complimentary luxury packaging on all orders.';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) {
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  if (freeShippingText) {
    const threshold = 150;
    if (subtotal >= threshold) {
      freeShippingText.innerHTML = `<i class="fa-solid fa-sparkles"></i> <strong>Congratulations!</strong> You qualify for Complimentary Express Shipping.`;
    } else {
      const remaining = (threshold - subtotal).toFixed(2);
      freeShippingText.innerHTML = `Add <strong>$${remaining}</strong> more to unlock Complimentary Express Shipping.`;
    }
  }

  listContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h5 class="cart-item-title">${item.name}</h5>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-actions">
          <div class="cart-qty-ctrl">
            <button type="button" class="cart-qty-btn decrease-qty" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button type="button" class="cart-qty-btn increase-qty" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="cart-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  // Event listeners for cart controls
  listContainer.querySelectorAll('.increase-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      updateCartQuantity(id, 1);
    });
  });

  listContainer.querySelectorAll('.decrease-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      updateCartQuantity(id, -1);
    });
  });

  listContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      removeFromCart(id);
    });
  });
}

function updateCartQuantity(id, delta) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart(cart);
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

function addToCart(product, quantity = 1) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
  }
  saveCart(cart);

  // Open the drawer to confirm
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  if (cartOverlay) {
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* --------------------------------------------------------------------------
   Global Search Modal & Live Filtering
   -------------------------------------------------------------------------- */
const SEARCHABLE_ITEMS = [
  { title: 'Elixir de Rose Radiance Serum', category: 'Skincare', url: 'product.html?id=1', price: '$98.00', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80' },
  { title: 'Crème Renaissance Restorative Face Cream', category: 'Skincare', url: 'product.html?id=2', price: '$125.00', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80' },
  { title: 'Velours Rose Hydrating Lip Nectar', category: 'Lip Care', url: 'product.html?id=3', price: '$42.00', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=150&q=80' },
  { title: 'Botanical Gold Illuminating Facial Oil', category: 'Face Care', url: 'product.html?id=4', price: '$110.00', image: 'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=150&q=80' },
  { title: 'Rosewater Essence Balancing Mist', category: 'Face Care', url: 'product.html?id=5', price: '$56.00', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=150&q=80' },
  { title: 'Lumière Velvet Matte Lip Couture', category: 'Makeup', url: 'product.html?id=6', price: '$48.00', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=150&q=80' },
  { title: 'The Secrets of Parisian Skincare Rituals', category: 'Article', url: 'blog.html', price: 'Skincare Guide', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=150&q=80' },
  { title: 'Niacinamide vs. Vitamin C: The Definitive Guide', category: 'Article', url: 'blog.html', price: 'Ingredients', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80' }
];

function initSearchModal() {
  const searchBtn = document.querySelector('.header-search-btn');
  const searchModal = document.querySelector('.search-modal');
  const closeBtn = document.querySelector('.search-modal-close');
  const searchInput = document.querySelector('.search-input');
  const resultsContainer = document.querySelector('.search-results-container');

  if (!searchBtn || !searchModal || !searchInput) return;

  const toggleSearch = (open) => {
    const shouldOpen = open !== undefined ? open : !searchModal.classList.contains('active');
    searchModal.classList.toggle('active', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
    if (shouldOpen) {
      setTimeout(() => searchInput.focus(), 150);
      renderSearchResults(searchInput.value);
    }
  };

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearch(true);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleSearch(false));
  }

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      toggleSearch(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      toggleSearch(false);
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim());
  });

  function renderSearchResults(query) {
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 1.5rem 0;">
          Start typing to search products, botanical ingredients, or journal articles...
        </p>
      `;
      return;
    }

    const filtered = SEARCHABLE_ITEMS.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 0; color: var(--text-muted);">
          <p>No results found for "<strong>${escapeHTML(query)}</strong>"</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <a href="${item.url}" class="search-result-item">
        <img src="${item.image}" alt="${item.title}" class="search-result-thumb">
        <div class="search-result-info">
          <h4>${item.title}</h4>
          <span>${item.category} • ${item.price}</span>
        </div>
      </a>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   Newsletter Subscription Validation
   -------------------------------------------------------------------------- */
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const feedback = form.querySelector('.form-feedback');

      if (!input) return;

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        if (feedback) {
          feedback.textContent = 'Please enter your email address.';
          feedback.className = 'form-feedback error';
        }
        input.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid email address (e.g., name@domain.com).';
          feedback.className = 'form-feedback error';
        }
        input.focus();
        return;
      }

      // Valid submission
      if (feedback) {
        feedback.textContent = 'Merci! You are now subscribed to our private beauty salon dispatches.';
        feedback.className = 'form-feedback success';
      }
      input.value = '';
    });
  });
}

/* --------------------------------------------------------------------------
   Image Graceful Fallback Handler
   -------------------------------------------------------------------------- */
function initImageFallbackHandler() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23F3ECE6"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="28" fill="%23C5A880">STACKLY</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239E948C">HAUTE BOTANIQUE</text></svg>';
    }, { once: true });
  });
}

/* --------------------------------------------------------------------------
   Utility: Escape HTML to avoid XSS
   -------------------------------------------------------------------------- */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   Luxury Color Palette Engine & Interactive Customizer
   -------------------------------------------------------------------------- */
const LUXURY_PALETTES = [
  {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian & Rose Gold',
    dots: ['#0D0A0D', '#181219', '#E5A399', '#D97384']
  },
  {
    id: 'wine-noir',
    name: 'Deep Luxury Wine & Rose Noir',
    dots: ['#1C0A12', '#27101A', '#E5A399', '#D97384']
  },
  {
    id: 'champagne',
    name: 'Classic Champagne & Ivory',
    dots: ['#FAF7F2', '#C5A880', '#8F5E52', '#191614']
  },
  {
    id: 'blush-rose',
    name: 'Soft Pastel Blush & Rose',
    dots: ['#FAF5F3', '#E2AAA0', '#D49A89', '#9C5751']
  },
  {
    id: 'emerald',
    name: 'Emerald & Antique Gold',
    dots: ['#F5F7F5', '#1C3B2E', '#C2A26F', '#12211B']
  },
  {
    id: 'french-nude',
    name: 'Minimalist French Nude',
    dots: ['#F8F6F2', '#A8866E', '#B89B7B', '#171513']
  }
];

function initThemeEngine() {
  let savedTheme = localStorage.getItem('letoile_theme');
  if (!savedTheme || savedTheme === 'wine-noir') {
    savedTheme = 'midnight-obsidian';
    localStorage.setItem('letoile_theme', 'midnight-obsidian');
  }
  applyTheme(savedTheme, false);
  renderThemeSwitcher(savedTheme);
}

function applyTheme(themeId, notify = false) {
  document.documentElement.setAttribute('data-theme', themeId);
  localStorage.setItem('letoile_theme', themeId);

  // Update active states in panel
  document.querySelectorAll('.theme-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeId);
  });

  // Update pill text
  const currentPalette = LUXURY_PALETTES.find(p => p.id === themeId);
  const pillLabel = document.querySelector('.theme-pill-label');
  if (pillLabel && currentPalette) {
    pillLabel.textContent = currentPalette.name;
  }
}

function renderThemeSwitcher(currentTheme) {
  if (document.querySelector('.theme-switcher-panel')) return;

  const current = LUXURY_PALETTES.find(p => p.id === currentTheme) || LUXURY_PALETTES[0];

  const pill = document.createElement('button');
  pill.type = 'button';
  pill.className = 'theme-switcher-pill';
  pill.setAttribute('aria-label', 'Toggle theme customizer');
  pill.innerHTML = `
    <i class="fa-solid fa-palette"></i>
    <span class="theme-pill-label">${current.name}</span>
  `;

  const panel = document.createElement('div');
  panel.className = 'theme-switcher-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Color Palette Customizer');
  panel.innerHTML = `
    <div class="theme-panel-header">
      <h4 class="theme-panel-title">Maison Palettes</h4>
      <button type="button" class="theme-panel-close" aria-label="Close palette panel"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="theme-options-list">
      ${LUXURY_PALETTES.map(p => `
        <button type="button" class="theme-option-btn ${p.id === currentTheme ? 'active' : ''}" data-theme="${p.id}">
          <div class="theme-option-info">
            <div class="theme-color-dots">
              ${p.dots.map(color => `<span class="color-dot" style="background-color: ${color};"></span>`).join('')}
            </div>
            <span>${p.name}</span>
          </div>
          <i class="fa-solid fa-circle-check theme-check-icon"></i>
        </button>
      `).join('')}
    </div>
  `;

  document.body.appendChild(pill);
  document.body.appendChild(panel);

  pill.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('active');
  });

  const closeBtn = panel.querySelector('.theme-panel-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => panel.classList.remove('active'));
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-dash-theme-trigger');
    if (trigger) {
      e.stopPropagation();
      panel.classList.toggle('active');
      return;
    }

    if (!panel.contains(e.target) && !pill.contains(e.target)) {
      panel.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      panel.classList.remove('active');
    }
  });

  panel.querySelectorAll('.theme-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.dataset.theme;
      applyTheme(themeId, false);
    });
  });
}

/* --------------------------------------------------------------------------
   Dynamic Navigation Auth State Indicator
   -------------------------------------------------------------------------- */
function initNavAuthState() {
  const storedUser = localStorage.getItem('letoile_user');
  if (!storedUser) return;

  try {
    const user = JSON.parse(storedUser);
    const loginBtn = document.querySelector('.btn-nav-login');
    const mobileLoginLinks = document.querySelectorAll('.mobile-nav-link[href="login.html"]');

    if (loginBtn && user) {
      const isAdmin = user.role === 'admin';
      loginBtn.href = isAdmin ? 'admin-dashboard.html' : 'customer-dashboard.html';
      const firstName = user.name ? user.name.split(' ')[0] : (isAdmin ? 'Admin' : 'Client');
      loginBtn.innerHTML = `
        <i class="${isAdmin ? 'fa-solid fa-shield-halved' : 'fa-solid fa-gem'}" style="color: var(--accent-gold);"></i>
        <span>${firstName}</span>
      `;
      loginBtn.setAttribute('title', isAdmin ? 'Maison Admin Command' : 'VIP Client Sanctuary');
    }

    if (mobileLoginLinks.length && user) {
      const isAdmin = user.role === 'admin';
      mobileLoginLinks.forEach(link => {
        link.href = isAdmin ? 'admin-dashboard.html' : 'customer-dashboard.html';
        link.innerHTML = `
          <span>${isAdmin ? 'Admin Dashboard' : 'Client Sanctuary'}</span>
          <i class="${isAdmin ? 'fa-solid fa-shield-halved' : 'fa-solid fa-gem'}" style="font-size: 0.9rem; color: var(--accent-gold);"></i>
        `;
      });
    }
  } catch (e) {
    console.error('Error reading auth state for nav', e);
  }
}

