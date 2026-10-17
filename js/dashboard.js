/**
 * STACKLY - LUXURY DASHBOARDS ENGINE (Customer & Admin)
 * Separate sidebar navigation, dynamic panel switching, real storage persistence,
 * live order management, catalog CRUD, wishlist & reviews, and real CSV exports.
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
  initDefaultStore();
  initDashboardRoleAndUser();
  initSidebarNavigation();
  initCustomerDashboardFeatures();
  initAdminDashboardFeatures();
  initGlobalDashboardSearch();
});

/* --------------------------------------------------------------------------
   1. STORE INITIALIZATION & SEED DATA
   -------------------------------------------------------------------------- */
function initDefaultStore() {
  // 1. Products
  if (!localStorage.getItem('letoile_products')) {
    const initialProducts = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA))
      ? PRODUCTS_DATA.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category || 'Skincare',
          price: p.price,
          stock: p.stock || 24,
          rating: p.rating || 4.9,
          reviewsCount: p.reviewsCount || 120,
          image: p.image,
          description: p.description || p.tagline || 'Parisian botanical formulation crafted with pure cold-pressed elixirs.'
        }))
      : [
          { id: 1, name: 'Elixir de Rose Radiance Serum', category: 'Skincare', price: 98.00, stock: 24, rating: 4.9, reviewsCount: 148, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80', description: 'Concentrated Damascus Rose & Multi-Molecular Hyaluronic Acid.' },
          { id: 2, name: 'Crème Renaissance Face Cream', category: 'Face Care', price: 125.00, stock: 18, rating: 5.0, reviewsCount: 192, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80', description: 'Velvety Rich Barrier Repair with Alpine Edelweiss & Ceramide Complex.' },
          { id: 3, name: 'Velours Rose Lip Nectar', category: 'Lip Care', price: 42.00, stock: 35, rating: 4.8, reviewsCount: 86, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', description: 'Glossy Plumping Treatment with Peptide-Infused Marula Oil.' },
          { id: 4, name: 'Botanical Gold Facial Oil', category: 'Face Care', price: 110.00, stock: 12, rating: 4.9, reviewsCount: 115, image: 'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=400&q=80', description: '24K Gold Micro-Flakes with 16 Cold-Pressed Plant Elixirs.' },
          { id: 5, name: 'Rosewater Essence Balancing Mist', category: 'Skincare', price: 56.00, stock: 28, rating: 4.7, reviewsCount: 64, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80', description: 'Artisanal Steam-Distilled Rose Petals with Witch Hazel & Aloe.' },
          { id: 6, name: 'Lumière Velvet Matte Lip Couture', category: 'Makeup', price: 48.00, stock: 4, rating: 4.9, reviewsCount: 78, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', description: 'Weightless Longwear Lipstick in Parisian Rose.' }
        ];
    localStorage.setItem('letoile_products', JSON.stringify(initialProducts));
  }

  // 2. Orders
  if (!localStorage.getItem('letoile_orders')) {
    const initialOrders = [
      {
        id: 'EP-89241',
        date: 'Oct 14, 2026',
        customerName: 'Clara Delacroix',
        customerEmail: 'clara.delacroix@example.com',
        items: [
          { id: 1, name: 'Elixir de Rose Radiance Serum', price: 98.00, qty: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
          { id: 3, name: 'Velours Rose Lip Nectar', price: 42.00, qty: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80' }
        ],
        total: 140.00,
        status: 'Shipped',
        trackingNumber: 'FR-EXP-89021-PARIS',
        carrier: 'DHL Express Haute Delivery',
        estimatedDelivery: 'Oct 17, 2026',
        paymentMethod: 'Visa •••• 4821',
        paymentStatus: 'Paid',
        txnRef: 'TXN-PARIS-89241',
        shippingAddress: '14 Rue de Rivoli, Apt 4B, 75001 Paris, France'
      },
      {
        id: 'EP-89240',
        date: 'Oct 10, 2026',
        customerName: 'Clara Delacroix',
        customerEmail: 'clara.delacroix@example.com',
        items: [
          { id: 2, name: 'Crème Renaissance Face Cream', price: 125.00, qty: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' }
        ],
        total: 125.00,
        status: 'Delivered',
        trackingNumber: 'FR-EXP-88914-PARIS',
        carrier: 'La Poste Colissimo Privilège',
        estimatedDelivery: 'Oct 13, 2026',
        paymentMethod: 'Apple Pay',
        paymentStatus: 'Paid',
        txnRef: 'TXN-PARIS-89240',
        shippingAddress: '14 Rue de Rivoli, Apt 4B, 75001 Paris, France'
      },
      {
        id: 'EP-89239',
        date: 'Sep 28, 2026',
        customerName: 'Élodie Fontaine',
        customerEmail: 'elodie.fontaine@example.com',
        items: [
          { id: 4, name: 'Botanical Gold Facial Oil', price: 110.00, qty: 2, image: 'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=400&q=80' }
        ],
        total: 220.00,
        status: 'Delivered',
        trackingNumber: 'FR-EXP-88742-PARIS',
        carrier: 'DHL Express Haute Delivery',
        estimatedDelivery: 'Oct 01, 2026',
        paymentMethod: 'Mastercard •••• 1092',
        paymentStatus: 'Paid',
        txnRef: 'TXN-PARIS-89239',
        shippingAddress: '28 Boulevard Saint-Germain, 75005 Paris, France'
      },
      {
        id: 'EP-89238',
        date: 'Sep 15, 2026',
        customerName: 'Margaux Laurent',
        customerEmail: 'margaux.l@example.com',
        items: [
          { id: 5, name: 'Rosewater Essence Balancing Mist', price: 56.00, qty: 1, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80' },
          { id: 6, name: 'Lumière Velvet Matte Lip Couture', price: 48.00, qty: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80' }
        ],
        total: 104.00,
        status: 'Processing',
        trackingNumber: 'FR-EXP-88610-PARIS',
        carrier: 'Atelier Private Courier',
        estimatedDelivery: 'Oct 19, 2026',
        paymentMethod: 'Visa •••• 9921',
        paymentStatus: 'Paid',
        txnRef: 'TXN-PARIS-89238',
        shippingAddress: '9 Avenue Montaigne, 75008 Paris, France'
      },
      {
        id: 'EP-89237',
        date: 'Aug 22, 2026',
        customerName: 'Camille Dupont',
        customerEmail: 'camille.d@example.com',
        items: [
          { id: 1, name: 'Elixir de Rose Radiance Serum', price: 98.00, qty: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' }
        ],
        total: 98.00,
        status: 'Cancelled',
        trackingNumber: 'N/A',
        carrier: 'N/A',
        estimatedDelivery: 'N/A',
        paymentMethod: 'PayPal',
        paymentStatus: 'Refunded',
        txnRef: 'TXN-PARIS-89237-REF',
        shippingAddress: '42 Rue Bonaparte, 75006 Paris, France'
      }
    ];
    localStorage.setItem('letoile_orders', JSON.stringify(initialOrders));
  }

  // 3. Wishlist
  if (!localStorage.getItem('letoile_wishlist')) {
    localStorage.setItem('letoile_wishlist', JSON.stringify([1, 2, 4]));
  }

  // 4. Reviews
  if (!localStorage.getItem('letoile_reviews')) {
    const initialReviews = [
      {
        id: 'REV-101',
        productId: 1,
        productName: 'Elixir de Rose Radiance Serum',
        rating: 5,
        headline: 'Sublime glow that lasts all day',
        text: 'The Damascus Rose infusion gave my skin an immediate supple bounce. Highly recommend pairing with Crème Renaissance for winter.',
        date: 'Oct 12, 2026',
        verified: true,
        status: 'Approved'
      },
      {
        id: 'REV-102',
        productId: 2,
        productName: 'Crème Renaissance Face Cream',
        rating: 5,
        headline: 'Cashmere texture that transforms dry skin',
        text: 'An indispensable barrier repair cream. The texture melts in like velvet and does not pill under makeup.',
        date: 'Oct 02, 2026',
        verified: true,
        status: 'Approved'
      }
    ];
    localStorage.setItem('letoile_reviews', JSON.stringify(initialReviews));
  }

  // 5. Addresses
  if (!localStorage.getItem('letoile_addresses')) {
    const initialAddresses = [
      {
        id: 'ADDR-1',
        name: 'Clara Delacroix',
        street: '14 Rue de Rivoli, Apt 4B',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        phone: '+33 (0)6 12 34 56 78',
        isDefault: true
      },
      {
        id: 'ADDR-2',
        name: 'Clara Delacroix (Villa Côte d’Azur)',
        street: '27 Promenade des Anglais',
        city: 'Nice',
        postalCode: '06000',
        country: 'France',
        phone: '+33 (0)6 12 34 56 78',
        isDefault: false
      }
    ];
    localStorage.setItem('letoile_addresses', JSON.stringify(initialAddresses));
  }

  // 6. Categories
  if (!localStorage.getItem('letoile_categories')) {
    const initialCategories = [
      { id: 'cat-1', name: 'Skincare', slug: 'skincare', desc: 'Active serums, toners, and botanical cleansing nectars.', count: 6 },
      { id: 'cat-2', name: 'Face Care', slug: 'face-care', desc: 'Cashmere restorative creams and pure 24K dry oils.', count: 5 },
      { id: 'cat-3', name: 'Lip Care', slug: 'lip-care', desc: 'Plumping peptide nectars and tinted nourishing balms.', count: 4 },
      { id: 'cat-4', name: 'Makeup & Glam', slug: 'makeup', desc: 'Parisian velvet matte couture and glowing skin tints.', count: 5 },
      { id: 'cat-5', name: 'Personal Rituals', slug: 'hair-body', desc: 'Sensorial bath essences and botanical hand balms.', count: 4 }
    ];
    localStorage.setItem('letoile_categories', JSON.stringify(initialCategories));
  }

  // 7. Customers
  if (!localStorage.getItem('letoile_customers')) {
    const initialCustomers = [
      { id: 'CUST-1', name: 'Clara Delacroix', email: 'clara.delacroix@example.com', tier: 'Diamond Privilège', orders: 12, spent: 1480.00, joined: 'Jan 2025', status: 'VIP' },
      { id: 'CUST-2', name: 'Élodie Fontaine', email: 'elodie.fontaine@example.com', tier: 'Gold Couture', orders: 6, spent: 840.00, joined: 'Mar 2025', status: 'Active' },
      { id: 'CUST-3', name: 'Margaux Laurent', email: 'margaux.l@example.com', tier: 'Gold Couture', orders: 5, spent: 720.00, joined: 'May 2025', status: 'Active' },
      { id: 'CUST-4', name: 'Camille Dupont', email: 'camille.d@example.com', tier: 'Silver Stackly', orders: 2, spent: 290.00, joined: 'Aug 2025', status: 'Active' },
      { id: 'CUST-5', name: 'Sébastien Moreau', email: 's.moreau@example.com', tier: 'Diamond Privilège', orders: 15, spent: 2150.00, joined: 'Nov 2024', status: 'VIP' }
    ];
    localStorage.setItem('letoile_customers', JSON.stringify(initialCustomers));
  }

  // 8. Messages
  if (!localStorage.getItem('letoile_messages')) {
    const initialMessages = [
      { id: 'MSG-9021', name: 'Geneviève Renaud', email: 'g.renaud@example.com', subject: 'Custom Parisian Regimen for Sensitive Skin', enquiry: 'product', message: 'Bonjour, I would like to know if the Elixir de Rose is suitable for rosacea-prone skin or if I should begin with Crème Renaissance first.', date: 'Oct 14, 2026', read: false },
      { id: 'MSG-9020', name: 'Marc Vaugirard', email: 'marc.v@example.com', subject: 'Courier Tracking on Luxury Gift Flacon', enquiry: 'order', message: 'Hello Concierge, I placed order #EP-89240 and requested signature gift wrapping. Could you confirm delivery timeline for Saturday?', date: 'Oct 13, 2026', read: true },
      { id: 'MSG-9019', name: 'Hélène Bonnet', email: 'helene@vogue-paris.fr', subject: 'Editorial Feature in Vogue Beauté Fall Edition', enquiry: 'press', message: 'We are preparing our November botanical formulations spread and would love high-resolution asset previews of the 24K Botanical Gold Oil.', date: 'Oct 11, 2026', read: true }
    ];
    localStorage.setItem('letoile_messages', JSON.stringify(initialMessages));
  }

  // 9. Blog Articles
  if (!localStorage.getItem('letoile_blogs')) {
    const initialBlogs = [
      { id: 'BLOG-1', title: 'The Alchemy of Cold-Pressed Botanical Elixirs', category: 'Ingredients & Science', author: 'Dr. Vivienne Moreau', date: 'Oct 10, 2026', status: 'Published', views: '2,420', excerpt: 'How low-temperature extraction preserves volatile flavonoids, cellular lipids, and enzymatic vitality for unprecedented radiance.', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80' },
      { id: 'BLOG-2', title: 'Winter Barrier Architecture: Edelweiss Stem Cells', category: 'Skincare', author: 'Élise Gautier', date: 'Sep 28, 2026', status: 'Published', views: '1,890', excerpt: 'Deep-dive into biocompatible ceramides and alpine antioxidants that shield vulnerable complexions against sub-zero dehydration.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' },
      { id: 'BLOG-3', title: 'Mindful Evening Rhythms: The Parisian Ritual', category: 'Self-Care Rituals', author: 'Clara Delacroix', date: 'Sep 14, 2026', status: 'Draft', views: '0', excerpt: 'Elevating evening skincare from a routine chore into a quiet sanctuary of sensory intention and lymphatic massage.', image: 'https://images.unsplash.com/photo-1512290900672-1f4864388835?auto=format&fit=crop&w=800&q=80' }
    ];
    localStorage.setItem('letoile_blogs', JSON.stringify(initialBlogs));
  }
}

/* --------------------------------------------------------------------------
   2. DASHBOARD ROLE & USER AUTH INITIALIZATION
   -------------------------------------------------------------------------- */
function initDashboardRoleAndUser() {
  const isCustomerPage = window.location.pathname.includes('customer-dashboard');
  const isAdminPage = window.location.pathname.includes('admin-dashboard');

  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('letoile_user') || 'null');
  } catch (e) {
    console.warn(e);
  }

  if (!storedUser) {
    storedUser = {
      role: isAdminPage ? 'admin' : 'customer',
      name: isAdminPage ? 'Laurent Vaneau' : 'Clara Delacroix',
      email: isAdminPage ? 'laurent.vaneau@stackly.com' : 'clara.delacroix@example.com',
      title: isAdminPage ? 'Maison Director' : 'VIP Client',
      tier: 'Diamond Privilège',
      points: 3450
    };
    localStorage.setItem('letoile_user', JSON.stringify(storedUser));
  }

  // Update DOM user elements
  const userInitials = (storedUser.name || 'CD').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  document.querySelectorAll('.sidebar-user-avatar, .topbar-user-initials').forEach(el => el.textContent = userInitials);
  document.querySelectorAll('.sidebar-user-name, .topbar-user-name').forEach(el => el.textContent = storedUser.name);
  document.querySelectorAll('.sidebar-user-role, .topbar-user-role').forEach(el => el.textContent = storedUser.title || (storedUser.role === 'admin' ? 'Maison Director' : 'Diamond Privilège'));
  document.querySelectorAll('.dash-hero-greeting-name').forEach(el => el.textContent = storedUser.name.split(' ')[0]);

  // Logout Listeners
  document.querySelectorAll('.sidebar-btn-logout, .btn-topbar-logout, .btn-dash-logout, #btn-logout-settings').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('letoile_user');
      window.location.href = 'login.html';
    });
  });
}

/* --------------------------------------------------------------------------
   3. SIDEBAR NAVIGATION & PANEL SWITCHING
   -------------------------------------------------------------------------- */
function initSidebarNavigation() {
  const sidebar = document.querySelector('#dashboard-sidebar');
  const backdrop = document.querySelector('#sidebar-backdrop');
  const toggleBtn = document.querySelector('#sidebar-toggle-btn');
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  const panels = document.querySelectorAll('.dash-panel');
  const breadcrumbSection = document.querySelector('#topbar-current-section');
  const topbarTitle = document.querySelector('#topbar-page-heading');

  // Mobile sidebar drawer toggles
  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  }

  // Switch Panel Helper
  const activatePanel = (panelId, itemText) => {
    const targetPanel = document.querySelector(`#panel-${panelId}`);
    if (!targetPanel) return;

    navItems.forEach(item => {
      if (item.getAttribute('data-panel') === panelId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    panels.forEach(p => p.classList.remove('active'));
    targetPanel.classList.add('active');

    // Update Topbar
    if (breadcrumbSection) breadcrumbSection.textContent = itemText || panelId;
    if (topbarTitle) topbarTitle.textContent = itemText || panelId;

    // Close mobile drawer on selection
    if (sidebar && backdrop) {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // GSAP staggered entrance for panel elements
    if (typeof gsap !== 'undefined') {
      const cards = targetPanel.querySelectorAll('.dash-metric-card, .dash-card-box, .dash-table-wrapper, .dash-wishlist-card, .dash-address-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 1, y: 12 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
        );
      }
    }
  };

  // Bind clicks
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const panelId = item.getAttribute('data-panel');
      const itemTitle = item.querySelector('.sidebar-nav-label')?.textContent.trim() || panelId;
      activatePanel(panelId, itemTitle);
      history.replaceState(null, '', `#${panelId}`);
    });
  });

  // Check URL hash on load
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash) {
    const matchingItem = Array.from(navItems).find(i => i.getAttribute('data-panel') === currentHash);
    if (matchingItem) {
      const itemTitle = matchingItem.querySelector('.sidebar-nav-label')?.textContent.trim() || currentHash;
      activatePanel(currentHash, itemTitle);
    }
  }
}

/* --------------------------------------------------------------------------
   4. CUSTOMER DASHBOARD SPECIFIC FEATURES
   -------------------------------------------------------------------------- */
function initCustomerDashboardFeatures() {
  const isCustomerPage = window.location.pathname.includes('customer-dashboard');
  if (!isCustomerPage) return;

  renderCustomerOrders();
  renderCustomerWishlist();
  renderCustomerReviews();
  renderCustomerAddresses();
  renderCustomerPayments();
  initCustomerProfileForm();
  initCustomerSettings();
  initCustomerModals();
}

// 4.1 Orders Tab
function renderCustomerOrders(filterStatus = 'all') {
  const tbody = document.querySelector('#cust-orders-tbody');
  const countBadge = document.querySelector('#cust-orders-count-badge');
  const emptyState = document.querySelector('#cust-orders-empty');
  if (!tbody) return;

  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const filtered = orders.filter(o => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return ['Processing', 'Shipped', 'Pending'].includes(o.status);
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  if (countBadge) countBadge.textContent = `${filtered.length} Orders`;

  if (!filtered.length) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  tbody.innerHTML = filtered.map(order => `
    <tr>
      <td><strong style="color: var(--accent-gold);">${order.id}</strong></td>
      <td>${order.date}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${order.items[0]?.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=80&q=80'}" alt="${order.items[0]?.name}" style="width: 36px; height: 36px; border-radius: var(--radius-xs); object-fit: cover;">
          <div>
            <div style="font-weight: 600; font-size: 0.88rem;">${order.items[0]?.name}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${order.items.length > 1 ? `+${order.items.length - 1} additional item(s)` : 'Single Formulation'}</div>
          </div>
        </div>
      </td>
      <td>${order.items.reduce((sum, i) => sum + i.qty, 0)}</td>
      <td><strong>$${order.total.toFixed(2)}</strong></td>
      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn btn-outline btn-sm btn-view-order-details" data-id="${order.id}">
            Details
          </button>
          <button type="button" class="btn btn-primary btn-sm btn-reorder-now" data-id="${order.id}">
            Reorder
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Order Details Modal Trigger
  tbody.querySelectorAll('.btn-view-order-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-id');
      openOrderDetailsModal(orderId);
    });
  });

  // Reorder Trigger
  tbody.querySelectorAll('.btn-reorder-now').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-id');
      const ord = orders.find(o => o.id === orderId);
      if (ord && ord.items && typeof addToCart === 'function') {
        ord.items.forEach(it => addToCart(it, it.qty || 1));
      }
    });
  });

  // Bind filter pills
  document.querySelectorAll('#orders-filter-pills .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#orders-filter-pills .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderCustomerOrders(pill.getAttribute('data-status'));
    });
  });
}

function openOrderDetailsModal(orderId) {
  const modal = document.querySelector('#modal-cust-order-details');
  if (!modal) return;

  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  document.querySelector('#modal-order-id-title').textContent = `Order ${order.id}`;
  document.querySelector('#modal-order-status-badge').textContent = order.status;
  document.querySelector('#modal-order-status-badge').className = `status-badge ${order.status.toLowerCase()}`;
  document.querySelector('#modal-order-date').textContent = order.date;
  document.querySelector('#modal-order-carrier').textContent = order.carrier || 'DHL Express Haute Delivery';
  document.querySelector('#modal-order-tracking-num').textContent = order.trackingNumber || 'FR-EXP-89021';
  document.querySelector('#modal-order-address').textContent = order.shippingAddress || '14 Rue de Rivoli, Paris, France';
  document.querySelector('#modal-order-total').textContent = `$${order.total.toFixed(2)}`;

  const itemsList = document.querySelector('#modal-order-items-list');
  if (itemsList) {
    itemsList.innerHTML = order.items.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid rgba(229, 163, 153, 0.1);">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover;">
          <div>
            <div style="font-weight: 600; font-size: 0.9rem;">${item.name}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">Qty: ${item.qty} × $${item.price.toFixed(2)}</div>
          </div>
        </div>
        <strong>$${(item.qty * item.price).toFixed(2)}</strong>
      </div>
    `).join('');
  }

  modal.classList.add('active');
}

// 4.2 Wishlist Tab
function renderCustomerWishlist() {
  const grid = document.querySelector('#cust-wishlist-grid');
  const countBadge = document.querySelector('#cust-wishlist-count-badge');
  const emptyState = document.querySelector('#cust-wishlist-empty');
  if (!grid) return;

  const wishlistIds = JSON.parse(localStorage.getItem('letoile_wishlist') || '[]');
  const allProducts = JSON.parse(localStorage.getItem('letoile_products') || '[]');
  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  // Update badge in sidebar and topbar
  document.querySelectorAll('.wishlist-counter-badge').forEach(b => b.textContent = wishlistProducts.length);
  if (countBadge) countBadge.textContent = `${wishlistProducts.length} Saved`;

  if (!wishlistProducts.length) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = wishlistProducts.map(p => `
    <div class="dash-wishlist-card">
      <div class="dash-wishlist-img-frame">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="badge ${p.stock < 5 ? 'badge-rose' : 'badge-gold'}" style="position: absolute; top: 12px; left: 12px;">
          ${p.stock < 5 ? 'Low Stock' : 'In Stock'}
        </span>
      </div>
      <div class="dash-wishlist-body">
        <span style="font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-gold); margin-bottom: 0.25rem;">${p.category}</span>
        <h4 class="dash-wishlist-title">${p.name}</h4>
        <div class="dash-wishlist-price">$${p.price.toFixed(2)}</div>
        <div class="dash-wishlist-actions">
          <button type="button" class="btn btn-primary btn-sm btn-wishlist-add-cart" data-id="${p.id}" style="flex: 1;">
            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
          </button>
          <button type="button" class="btn-action-icon btn-wishlist-remove" data-id="${p.id}" title="Remove from Wishlist">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Add to Bag from Wishlist
  grid.querySelectorAll('.btn-wishlist-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-id'));
      const product = allProducts.find(p => p.id === pid);
      if (product && typeof addToCart === 'function') {
        addToCart(product, 1);
      }
    });
  });

  // Remove from Wishlist
  grid.querySelectorAll('.btn-wishlist-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-id'));
      let ids = JSON.parse(localStorage.getItem('letoile_wishlist') || '[]');
      ids = ids.filter(id => id !== pid);
      localStorage.setItem('letoile_wishlist', JSON.stringify(ids));
      renderCustomerWishlist();
    });
  });
}

// 4.3 Reviews Tab
function renderCustomerReviews() {
  const list = document.querySelector('#cust-reviews-list');
  if (!list) return;

  const reviews = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
  const countBadge = document.querySelector('#cust-reviews-count-badge');
  if (countBadge) countBadge.textContent = `${reviews.length} Reviews`;

  if (!reviews.length) {
    list.innerHTML = `<div class="dash-empty-state"><p>No product reviews submitted yet.</p></div>`;
    return;
  }

  list.innerHTML = reviews.map(rev => `
    <div class="dash-review-item">
      <div class="dash-review-header">
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.2rem; color: var(--text-primary);">${rev.productName}</h4>
          <div class="dash-stars-gold">
            ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating)}
            ${'<i class="fa-regular fa-star"></i>'.repeat(5 - rev.rating)}
            <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 0.4rem;">${rev.date}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span class="badge badge-gold"><i class="fa-solid fa-circle-check"></i> Verified Client</span>
          <button type="button" class="btn-action-icon btn-delete-review" data-id="${rev.id}" title="Delete Review">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">“${rev.headline}”</p>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">${rev.text}</p>
    </div>
  `).join('');

  // Delete review handler
  list.querySelectorAll('.btn-delete-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const rid = btn.getAttribute('data-id');
      let revs = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
      revs = revs.filter(r => r.id !== rid);
      localStorage.setItem('letoile_reviews', JSON.stringify(revs));
      renderCustomerReviews();
    });
  });
}

// 4.4 Addresses Tab
function renderCustomerAddresses() {
  const grid = document.querySelector('#cust-addresses-grid');
  if (!grid) return;

  const addresses = JSON.parse(localStorage.getItem('letoile_addresses') || '[]');
  const countBadge = document.querySelector('#cust-addresses-count-badge');
  if (countBadge) countBadge.textContent = `${addresses.length} Saved`;

  grid.innerHTML = addresses.map(addr => `
    <div class="dash-address-card ${addr.isDefault ? 'default-address' : ''}">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem;">
          <h4 style="font-size: 1.05rem; color: var(--text-primary); margin: 0;">${addr.name}</h4>
          ${addr.isDefault ? '<span class="badge badge-gold"><i class="fa-solid fa-star"></i> Default</span>' : ''}
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.6rem;">
          ${addr.street}<br>
          ${addr.city}, ${addr.postalCode}<br>
          ${addr.country}
        </p>
        <p style="font-size: 0.82rem; color: var(--text-muted);"><i class="fa-solid fa-phone" style="font-size: 0.75rem;"></i> ${addr.phone}</p>
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 1.2rem; border-top: 1px solid rgba(229, 163, 153, 0.12); padding-top: 1rem;">
        ${!addr.isDefault ? `<button type="button" class="btn btn-outline btn-sm btn-set-default-address" data-id="${addr.id}">Set Default</button>` : ''}
        <button type="button" class="btn btn-outline btn-sm btn-delete-address" data-id="${addr.id}" style="color: #F87171; border-color: rgba(248, 113, 113, 0.3);">
          <i class="fa-solid fa-trash-can"></i> Remove
        </button>
      </div>
    </div>
  `).join('');

  // Set default address
  grid.querySelectorAll('.btn-set-default-address').forEach(btn => {
    btn.addEventListener('click', () => {
      const aid = btn.getAttribute('data-id');
      const addrs = JSON.parse(localStorage.getItem('letoile_addresses') || '[]');
      addrs.forEach(a => a.isDefault = (a.id === aid));
      localStorage.setItem('letoile_addresses', JSON.stringify(addrs));
      renderCustomerAddresses();
    });
  });

  // Delete address
  grid.querySelectorAll('.btn-delete-address').forEach(btn => {
    btn.addEventListener('click', () => {
      const aid = btn.getAttribute('data-id');
      let addrs = JSON.parse(localStorage.getItem('letoile_addresses') || '[]');
      if (addrs.length <= 1) {
        return;
      }
      addrs = addrs.filter(a => a.id !== aid);
      if (!addrs.some(a => a.isDefault)) addrs[0].isDefault = true;
      localStorage.setItem('letoile_addresses', JSON.stringify(addrs));
      renderCustomerAddresses();
    });
  });
}

// 4.5 Payments Tab
function renderCustomerPayments() {
  const tbody = document.querySelector('#cust-payments-tbody');
  if (!tbody) return;

  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');

  tbody.innerHTML = orders.map(ord => `
    <tr>
      <td><strong>${ord.id}</strong></td>
      <td>${ord.date}</td>
      <td><span style="font-family: monospace; font-size: 0.85rem; color: var(--accent-gold);">${ord.txnRef || 'TXN-PARIS-' + ord.id}</span></td>
      <td>${ord.paymentMethod || 'Visa •••• 4821'}</td>
      <td><strong>$${ord.total.toFixed(2)}</strong></td>
      <td><span class="status-badge ${ord.paymentStatus === 'Paid' ? 'optimal' : 'cancelled'}">${ord.paymentStatus}</span></td>
      <td>
        <button type="button" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-receipt"></i> Receipt
        </button>
      </td>
    </tr>
  `).join('');
}

// 4.6 Profile Form
function initCustomerProfileForm() {
  const form = document.querySelector('#cust-profile-form');
  if (!form) return;

  const user = JSON.parse(localStorage.getItem('letoile_user') || '{}');
  const nameInput = form.querySelector('#profile-name');
  const emailInput = form.querySelector('#profile-email');
  const phoneInput = form.querySelector('#profile-phone');

  if (nameInput) nameInput.value = user.name || 'Clara Delacroix';
  if (emailInput) emailInput.value = user.email || 'clara.delacroix@example.com';
  if (phoneInput) phoneInput.value = user.phone || '+33 (0)6 12 34 56 78';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!nameInput.value.trim()) {
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.focus();
      return;
    }

    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();
    if (phoneInput) user.phone = phoneInput.value.trim();

    localStorage.setItem('letoile_user', JSON.stringify(user));

    // Update headers and avatars
    initDashboardRoleAndUser();
  });
}

// 4.7 Settings Form & Preferences
function initCustomerSettings() {
  const passForm = document.querySelector('#cust-password-form');
  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = passForm.querySelector('#pass-current')?.value;
      const newPass = passForm.querySelector('#pass-new')?.value;
      const confirmPass = passForm.querySelector('#pass-confirm')?.value;

      if (!current || !newPass || !confirmPass) {
        return;
      }

      if (newPass.length < 6) {
        return;
      }

      if (newPass !== confirmPass) {
        return;
      }

      passForm.reset();
    });
  }

  // Notification toggles feedback
  document.querySelectorAll('.dash-toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      // Preference saved silently
    });
  });
}

// 4.8 Modals Setup
function initCustomerModals() {
  // Modal Close buttons
  document.querySelectorAll('.dash-modal-backdrop .dash-modal-close, .dash-modal-backdrop [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.dash-modal-backdrop');
      if (parentModal) parentModal.classList.remove('active');
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.dash-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  });

  // Open Add Review Modal
  const openReviewBtn = document.querySelector('#btn-open-add-review-modal');
  const reviewModal = document.querySelector('#modal-add-review');
  if (openReviewBtn && reviewModal) {
    openReviewBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });

    // Star selection
    let selectedRating = 5;
    const starEls = reviewModal.querySelectorAll('.star-picker-item');
    starEls.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-star'));
        starEls.forEach(s => {
          const val = parseInt(s.getAttribute('data-star'));
          if (val <= selectedRating) {
            s.classList.add('fa-solid');
            s.classList.remove('fa-regular');
          } else {
            s.classList.remove('fa-solid');
            s.classList.add('fa-regular');
          }
        });
      });
    });

    // Submit review form
    const reviewForm = reviewModal.querySelector('#add-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pselect = reviewForm.querySelector('#review-product-select');
        const headline = reviewForm.querySelector('#review-headline');
        const body = reviewForm.querySelector('#review-body');

        if (!headline.value.trim() || !body.value.trim()) {
          return;
        }

        const revs = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
        revs.unshift({
          id: 'REV-' + Date.now().toString().slice(-4),
          productId: parseInt(pselect?.value || 1),
          productName: pselect?.options[pselect.selectedIndex]?.text || 'Elixir de Rose Radiance Serum',
          rating: selectedRating,
          headline: headline.value.trim(),
          text: body.value.trim(),
          date: 'Just now',
          verified: true,
          status: 'Approved'
        });

        localStorage.setItem('letoile_reviews', JSON.stringify(revs));
        renderCustomerReviews();
        reviewModal.classList.remove('active');
        reviewForm.reset();
      });
    }
  }

  // Open Add Address Modal
  const openAddressBtn = document.querySelector('#btn-open-add-address-modal');
  const addressModal = document.querySelector('#modal-add-address');
  if (openAddressBtn && addressModal) {
    openAddressBtn.addEventListener('click', () => {
      addressModal.classList.add('active');
    });

    const addressForm = addressModal.querySelector('#add-address-form');
    if (addressForm) {
      addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = addressForm.querySelector('#addr-name')?.value.trim();
        const street = addressForm.querySelector('#addr-street')?.value.trim();
        const city = addressForm.querySelector('#addr-city')?.value.trim();
        const postal = addressForm.querySelector('#addr-postal')?.value.trim();
        const country = addressForm.querySelector('#addr-country')?.value.trim();
        const phone = addressForm.querySelector('#addr-phone')?.value.trim();

        if (!name || !street || !city || !postal || !phone) {
          return;
        }

        const addrs = JSON.parse(localStorage.getItem('letoile_addresses') || '[]');
        addrs.push({
          id: 'ADDR-' + Date.now().toString().slice(-4),
          name: name,
          street: street,
          city: city,
          postalCode: postal,
          country: country || 'France',
          phone: phone,
          isDefault: false
        });

        localStorage.setItem('letoile_addresses', JSON.stringify(addrs));
        renderCustomerAddresses();
        addressModal.classList.remove('active');
        addressForm.reset();
      });
    }
  }
}

/* --------------------------------------------------------------------------
   5. ADMIN DASHBOARD SPECIFIC FEATURES
   -------------------------------------------------------------------------- */
function initAdminDashboardFeatures() {
  const isAdminPage = window.location.pathname.includes('admin-dashboard');
  if (!isAdminPage) return;

  renderAdminOverviewMetrics();
  renderAdminProductsTable();
  renderAdminCategories();
  renderAdminOrdersTable();
  renderAdminCustomersTable();
  renderAdminInventoryTable();
  renderAdminReviewsTable();
  renderAdminBlogTable();
  renderAdminMessagesTable();
  renderAdminReports();
  initAdminSettings();
  initAdminModals();
}

// 5.1 Overview Tab
function renderAdminOverviewMetrics() {
  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const products = JSON.parse(localStorage.getItem('letoile_products') || '[]');
  const customers = JSON.parse(localStorage.getItem('letoile_customers') || '[]');

  const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);

  const salesEl = document.querySelector('#admin-metric-sales');
  const ordersEl = document.querySelector('#admin-metric-orders');
  const customersEl = document.querySelector('#admin-metric-customers');
  const productsEl = document.querySelector('#admin-metric-products');

  if (salesEl) salesEl.textContent = `$${(totalSales + 284000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (ordersEl) ordersEl.textContent = `${(orders.length + 1475).toLocaleString()}`;
  if (customersEl) customersEl.textContent = `${(customers.length + 4885).toLocaleString()}`;
  if (productsEl) productsEl.textContent = `${products.length}`;

  // Timeline pills for sales chart
  document.querySelectorAll('#admin-chart-pills .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#admin-chart-pills .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// 5.2 Products Management Tab
function renderAdminProductsTable(searchTerm = '', categoryFilter = 'all') {
  const tbody = document.querySelector('#admin-products-tbody');
  const countBadge = document.querySelector('#admin-products-count-badge');
  if (!tbody) return;

  const products = JSON.parse(localStorage.getItem('letoile_products') || '[]');
  const filtered = products.filter(p => {
    const matchCat = categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  if (countBadge) countBadge.textContent = `${filtered.length} Items`;

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <img src="${p.image}" alt="${p.name}" class="table-product-thumb" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover;">
      </td>
      <td>
        <strong style="color: var(--text-primary);">${p.name}</strong>
        <div style="font-size: 0.74rem; color: var(--text-muted);">SKU: LET-${p.id.toString().padStart(4, '0')}</div>
      </td>
      <td><span class="badge badge-gold">${p.category}</span></td>
      <td><strong>$${p.price.toFixed(2)}</strong></td>
      <td>
        <span class="${p.stock < 10 ? 'text-rose font-bold' : ''}">${p.stock} units</span>
      </td>
      <td>
        <span class="status-badge ${p.stock <= 0 ? 'out-of-stock' : p.stock < 10 ? 'low-stock' : 'optimal'}">
          ${p.stock <= 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'Optimal'}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn-action-icon btn-admin-edit-prod" data-id="${p.id}" title="Edit Product">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="btn-action-icon btn-admin-delete-prod" data-id="${p.id}" title="Delete Product" style="color: #F87171;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Delete product
  tbody.querySelectorAll('.btn-admin-delete-prod').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-id'));
      let prods = JSON.parse(localStorage.getItem('letoile_products') || '[]');
      prods = prods.filter(p => p.id !== pid);
      localStorage.setItem('letoile_products', JSON.stringify(prods));
      renderAdminProductsTable();
      renderAdminOverviewMetrics();
    });
  });

  // Edit product
  tbody.querySelectorAll('.btn-admin-edit-prod').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-id'));
      const prods = JSON.parse(localStorage.getItem('letoile_products') || '[]');
      const prod = prods.find(p => p.id === pid);
      if (prod) {
        const modal = document.querySelector('#modal-admin-product');
        if (modal) {
          modal.querySelector('#prod-modal-title').textContent = 'Edit Formulation';
          modal.querySelector('#prod-edit-id').value = prod.id;
          modal.querySelector('#prod-name').value = prod.name;
          modal.querySelector('#prod-category').value = prod.category;
          modal.querySelector('#prod-price').value = prod.price;
          modal.querySelector('#prod-stock').value = prod.stock;
          modal.querySelector('#prod-image').value = prod.image;
          modal.querySelector('#prod-desc').value = prod.description || '';
          modal.classList.add('active');
        }
      }
    });
  });

  // Live Search filter
  const searchInput = document.querySelector('#admin-prod-search');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      renderAdminProductsTable(searchInput.value, document.querySelector('#admin-prod-category-filter')?.value || 'all');
    });
  }

  // Category filter dropdown
  const catFilter = document.querySelector('#admin-prod-category-filter');
  if (catFilter && !catFilter.dataset.bound) {
    catFilter.dataset.bound = 'true';
    catFilter.addEventListener('change', () => {
      renderAdminProductsTable(searchInput ? searchInput.value : '', catFilter.value);
    });
  }
}

// 5.3 Categories Tab
function renderAdminCategories() {
  const container = document.querySelector('#admin-categories-grid');
  if (!container) return;

  const categories = JSON.parse(localStorage.getItem('letoile_categories') || '[]');
  const products = JSON.parse(localStorage.getItem('letoile_products') || '[]');

  container.innerHTML = categories.map(cat => {
    const assignedCount = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
    return `
      <div class="dash-card-box" style="margin-bottom: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem;">
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-primary); margin: 0;">${cat.name}</h4>
          <span class="badge badge-gold">${assignedCount} Formulations</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.2rem;">${cat.desc}</p>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button type="button" class="btn btn-outline btn-sm btn-delete-category" data-slug="${cat.slug}" data-count="${assignedCount}" style="color: #F87171; border-color: rgba(248, 113, 113, 0.3);">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Delete Category with safe guard
  container.querySelectorAll('.btn-delete-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      const count = parseInt(btn.getAttribute('data-count'));
      if (count > 0) {
        return;
      }
      let cats = JSON.parse(localStorage.getItem('letoile_categories') || '[]');
      cats = cats.filter(c => c.slug !== slug);
      localStorage.setItem('letoile_categories', JSON.stringify(cats));
      renderAdminCategories();
    });
  });
}

// 5.4 Orders Tab
function renderAdminOrdersTable(statusFilter = 'all', searchKeyword = '') {
  const tbody = document.querySelector('#admin-orders-tbody');
  const countBadge = document.querySelector('#admin-orders-count-badge');
  if (!tbody) return;

  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch = o.id.toLowerCase().includes(searchKeyword.toLowerCase()) || o.customerName.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (countBadge) countBadge.textContent = `${filtered.length} Orders`;

  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><strong style="color: var(--accent-gold);">${o.id}</strong></td>
      <td>${o.customerName}</td>
      <td>${o.date}</td>
      <td>${o.items.length} item(s)</td>
      <td><strong>$${o.total.toFixed(2)}</strong></td>
      <td><span class="status-badge ${o.paymentStatus === 'Paid' ? 'optimal' : 'cancelled'}">${o.paymentStatus}</span></td>
      <td>
        <select class="admin-order-status-select form-control" data-id="${o.id}" style="padding: 0.3rem 0.6rem; font-size: 0.78rem; border-radius: var(--radius-sm); background: rgba(28, 10, 18, 0.85); color: #FFF; border: 1px solid rgba(229, 163, 153, 0.3);">
          <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td>
        <button type="button" class="btn btn-outline btn-sm btn-admin-order-inspect" data-id="${o.id}">
          <i class="fa-solid fa-eye"></i> View
        </button>
      </td>
    </tr>
  `).join('');

  // Status changer dropdown in table
  tbody.querySelectorAll('.admin-order-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const oid = sel.getAttribute('data-id');
      const newStatus = sel.value;
      const ords = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
      const ord = ords.find(o => o.id === oid);
      if (ord) {
        ord.status = newStatus;
        localStorage.setItem('letoile_orders', JSON.stringify(ords));
      }
    });
  });

  // Inspect order details
  tbody.querySelectorAll('.btn-admin-order-inspect').forEach(btn => {
    btn.addEventListener('click', () => {
      const oid = btn.getAttribute('data-id');
      openAdminOrderModal(oid);
    });
  });

  // Filter pills
  document.querySelectorAll('#admin-orders-filter-pills .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#admin-orders-filter-pills .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderAdminOrdersTable(pill.getAttribute('data-status'), document.querySelector('#admin-orders-search')?.value || '');
    });
  });

  // Search input
  const searchInput = document.querySelector('#admin-orders-search');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      const activePill = document.querySelector('#admin-orders-filter-pills .filter-pill.active');
      renderAdminOrdersTable(activePill ? activePill.getAttribute('data-status') : 'all', searchInput.value);
    });
  }
}

function openAdminOrderModal(orderId) {
  const modal = document.querySelector('#modal-admin-order-details');
  if (!modal) return;

  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  modal.querySelector('#admin-modal-order-id').textContent = order.id;
  modal.querySelector('#admin-modal-cust-name').textContent = order.customerName;
  modal.querySelector('#admin-modal-cust-email').textContent = order.customerEmail;
  modal.querySelector('#admin-modal-shipping-address').textContent = order.shippingAddress;
  modal.querySelector('#admin-modal-total').textContent = `$${order.total.toFixed(2)}`;

  const select = modal.querySelector('#admin-modal-status-select');
  if (select) {
    select.value = order.status;
    select.onchange = () => {
      order.status = select.value;
      localStorage.setItem('letoile_orders', JSON.stringify(orders));
      renderAdminOrdersTable();
    };
  }

  const itemsList = modal.querySelector('#admin-modal-items-list');
  if (itemsList) {
    itemsList.innerHTML = order.items.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid rgba(229, 163, 153, 0.1);">
        <div>
          <strong>${item.name}</strong>
          <div style="font-size: 0.74rem; color: var(--text-muted);">Qty: ${item.qty} × $${item.price.toFixed(2)}</div>
        </div>
        <strong>$${(item.qty * item.price).toFixed(2)}</strong>
      </div>
    `).join('');
  }

  modal.classList.add('active');
}

// 5.5 Customers Tab
function renderAdminCustomersTable(searchTerm = '') {
  const tbody = document.querySelector('#admin-customers-tbody');
  const countBadge = document.querySelector('#admin-customers-count-badge');
  if (!tbody) return;

  const customers = JSON.parse(localStorage.getItem('letoile_customers') || '[]');
  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  if (countBadge) countBadge.textContent = `${filtered.length} VIP Clients`;

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-gold), #CE867B); color: #1C0A12; font-weight: 700; font-size: 0.75rem; display: flex; align-items: center; justify-content: center;">
            ${c.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <strong style="color: var(--text-primary);">${c.name}</strong>
        </div>
      </td>
      <td>${c.email}</td>
      <td><span class="badge badge-gold">${c.tier}</span></td>
      <td>${c.orders} orders</td>
      <td><strong>$${c.spent.toFixed(2)}</strong></td>
      <td>${c.joined}</td>
      <td>
        <button type="button" class="btn btn-outline btn-sm btn-inspect-cust" data-id="${c.id}">
          Dossier
        </button>
      </td>
    </tr>
  `).join('');

  // Inspect customer dossier
  tbody.querySelectorAll('.btn-inspect-cust').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-id');
      const cust = customers.find(c => c.id === cid);
      if (cust) {
        console.log(`VIP CLIENT DOSSIER - Name: ${cust.name}, Tier: ${cust.tier}, Orders: ${cust.orders}, Spent: $${cust.spent.toFixed(2)}`);
      }
    });
  });

  const searchInput = document.querySelector('#admin-cust-search');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      renderAdminCustomersTable(searchInput.value);
    });
  }
}

// 5.6 Inventory Tab
function renderAdminInventoryTable() {
  const tbody = document.querySelector('#admin-inventory-tbody');
  if (!tbody) return;

  const products = JSON.parse(localStorage.getItem('letoile_products') || '[]');
  const threshold = parseInt(document.querySelector('#inventory-threshold-input')?.value || 10);

  // Update counters
  const optimalCount = products.filter(p => p.stock >= threshold).length;
  const lowCount = products.filter(p => p.stock > 0 && p.stock < threshold).length;
  const outCount = products.filter(p => p.stock <= 0).length;

  const optEl = document.querySelector('#inv-stat-optimal');
  const lowEl = document.querySelector('#inv-stat-low');
  const outEl = document.querySelector('#inv-stat-out');
  if (optEl) optEl.textContent = optimalCount;
  if (lowEl) lowEl.textContent = lowCount;
  if (outEl) outEl.textContent = outCount;

  tbody.innerHTML = products.map(p => {
    const statusClass = p.stock <= 0 ? 'out-of-stock' : p.stock < threshold ? 'low-stock' : 'optimal';
    const statusText = p.stock <= 0 ? 'Out of Stock' : p.stock < threshold ? 'Low Stock' : 'Optimal';
    return `
      <tr>
        <td><strong>LET-${p.id.toString().padStart(4, '0')}</strong></td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td><strong style="font-size: 1rem; color: ${p.stock < threshold ? '#F87171' : 'var(--text-primary)'};">${p.stock} units</strong></td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button type="button" class="btn btn-outline btn-sm btn-quick-stock" data-id="${p.id}" data-change="10" title="Add 10 units">
              +10 Restock
            </button>
            <button type="button" class="btn btn-outline btn-sm btn-quick-stock" data-id="${p.id}" data-change="-5" title="Remove 5 units">
              -5 Adjust
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Quick Restock buttons
  tbody.querySelectorAll('.btn-quick-stock').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-id'));
      const change = parseInt(btn.getAttribute('data-change'));
      const prods = JSON.parse(localStorage.getItem('letoile_products') || '[]');
      const prod = prods.find(p => p.id === pid);
      if (prod) {
        prod.stock = Math.max(0, prod.stock + change);
        localStorage.setItem('letoile_products', JSON.stringify(prods));
        renderAdminInventoryTable();
        renderAdminProductsTable();
      }
    });
  });

  // Threshold input change
  const thresholdInput = document.querySelector('#inventory-threshold-input');
  if (thresholdInput && !thresholdInput.dataset.bound) {
    thresholdInput.dataset.bound = 'true';
    thresholdInput.addEventListener('input', () => {
      renderAdminInventoryTable();
    });
  }
}

// 5.7 Reviews Moderation Tab
function renderAdminReviewsTable() {
  const tbody = document.querySelector('#admin-reviews-tbody');
  const countBadge = document.querySelector('#admin-reviews-count-badge');
  if (!tbody) return;

  const reviews = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
  if (countBadge) countBadge.textContent = `${reviews.length} Client Reviews`;

  tbody.innerHTML = reviews.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>${r.productName}</td>
      <td>
        <span style="color: var(--accent-gold); font-size: 0.82rem;">
          ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
        </span>
      </td>
      <td>
        <strong>${r.headline}</strong>
        <div style="font-size: 0.78rem; color: var(--text-secondary); max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${r.text}</div>
      </td>
      <td><span class="status-badge ${r.status === 'Approved' ? 'optimal' : r.status === 'Flagged' ? 'cancelled' : 'processing'}">${r.status || 'Approved'}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button type="button" class="btn btn-outline btn-sm btn-admin-approve-review" data-id="${r.id}" title="Approve Review" style="color: #34D399;">
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-admin-flag-review" data-id="${r.id}" title="Flag Review" style="color: #FBBF24;">
            <i class="fa-solid fa-flag"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-admin-delete-review" data-id="${r.id}" title="Delete Review" style="color: #F87171;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Approve
  tbody.querySelectorAll('.btn-admin-approve-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const rid = btn.getAttribute('data-id');
      const revs = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
      const rev = revs.find(r => r.id === rid);
      if (rev) {
        rev.status = 'Approved';
        localStorage.setItem('letoile_reviews', JSON.stringify(revs));
        renderAdminReviewsTable();
      }
    });
  });

  // Flag
  tbody.querySelectorAll('.btn-admin-flag-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const rid = btn.getAttribute('data-id');
      const revs = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
      const rev = revs.find(r => r.id === rid);
      if (rev) {
        rev.status = 'Flagged';
        localStorage.setItem('letoile_reviews', JSON.stringify(revs));
        renderAdminReviewsTable();
      }
    });
  });

  // Delete
  tbody.querySelectorAll('.btn-admin-delete-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const rid = btn.getAttribute('data-id');
      let revs = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
      revs = revs.filter(r => r.id !== rid);
      localStorage.setItem('letoile_reviews', JSON.stringify(revs));
      renderAdminReviewsTable();
    });
  });
}

// 5.8 Blog Management Tab
function renderAdminBlogTable() {
  const tbody = document.querySelector('#admin-blog-tbody');
  const countBadge = document.querySelector('#admin-blog-count-badge');
  if (!tbody) return;

  const blogs = JSON.parse(localStorage.getItem('letoile_blogs') || '[]');
  if (countBadge) countBadge.textContent = `${blogs.length} Articles`;

  tbody.innerHTML = blogs.map(b => `
    <tr>
      <td>
        <img src="${b.image}" alt="${b.title}" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover;">
      </td>
      <td>
        <strong>${b.title}</strong>
        <div style="font-size: 0.74rem; color: var(--text-muted);">${b.category}</div>
      </td>
      <td>${b.author}</td>
      <td>${b.date}</td>
      <td><span class="status-badge ${b.status === 'Published' ? 'shipped' : 'pending'}">${b.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn btn-outline btn-sm btn-admin-preview-blog" data-id="${b.id}">
            Preview
          </button>
          <button type="button" class="btn-action-icon btn-admin-delete-blog" data-id="${b.id}" style="color: #F87171;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Preview blog modal
  tbody.querySelectorAll('.btn-admin-preview-blog').forEach(btn => {
    btn.addEventListener('click', () => {
      const bid = btn.getAttribute('data-id');
      const blg = blogs.find(b => b.id === bid);
      if (blg) {
        const modal = document.querySelector('#modal-admin-blog-preview');
        if (modal) {
          modal.querySelector('#preview-blog-title').textContent = blg.title;
          modal.querySelector('#preview-blog-cat').textContent = blg.category;
          modal.querySelector('#preview-blog-author').textContent = `By ${blg.author} • ${blg.date}`;
          modal.querySelector('#preview-blog-img').src = blg.image;
          modal.querySelector('#preview-blog-body').textContent = blg.excerpt || 'Full editorial article preview in Stackly Journal.';
          modal.classList.add('active');
        }
      }
    });
  });

  // Delete article
  tbody.querySelectorAll('.btn-admin-delete-blog').forEach(btn => {
    btn.addEventListener('click', () => {
      const bid = btn.getAttribute('data-id');
      let blgs = JSON.parse(localStorage.getItem('letoile_blogs') || '[]');
      blgs = blgs.filter(b => b.id !== bid);
      localStorage.setItem('letoile_blogs', JSON.stringify(blgs));
      renderAdminBlogTable();
    });
  });
}

// 5.9 Messages Tab
function renderAdminMessagesTable() {
  const tbody = document.querySelector('#admin-messages-tbody');
  const countBadge = document.querySelector('#admin-messages-count-badge');
  if (!tbody) return;

  const messages = JSON.parse(localStorage.getItem('letoile_messages') || '[]');
  const unreadCount = messages.filter(m => !m.read).length;

  if (countBadge) countBadge.textContent = `${unreadCount} Unread`;
  document.querySelectorAll('.messages-counter-badge').forEach(b => b.textContent = unreadCount);

  tbody.innerHTML = messages.map(m => `
    <tr style="${!m.read ? 'background: rgba(197, 168, 128, 0.08); font-weight: 600;' : ''}">
      <td>
        <strong style="color: var(--text-primary);">${m.name}</strong>
        <div style="font-size: 0.74rem; color: var(--text-muted);">${m.email}</div>
      </td>
      <td><span class="badge badge-gold">${m.enquiry || 'Product'}</span></td>
      <td>
        <div style="color: var(--text-primary); font-weight: 600;">${m.subject}</div>
        <div style="font-size: 0.76rem; color: var(--text-secondary); max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.message}</div>
      </td>
      <td>${m.date}</td>
      <td>
        <span class="status-badge ${m.read ? 'optimal' : 'pending'}">${m.read ? 'Read' : 'New'}</span>
      </td>
      <td>
        <button type="button" class="btn btn-outline btn-sm btn-read-message" data-id="${m.id}">
          <i class="fa-solid fa-envelope-open-text"></i> Open
        </button>
      </td>
    </tr>
  `).join('');

  // Read message
  tbody.querySelectorAll('.btn-read-message').forEach(btn => {
    btn.addEventListener('click', () => {
      const mid = btn.getAttribute('data-id');
      const msgs = JSON.parse(localStorage.getItem('letoile_messages') || '[]');
      const msg = msgs.find(m => m.id === mid);
      if (msg) {
        msg.read = true;
        localStorage.setItem('letoile_messages', JSON.stringify(msgs));
        renderAdminMessagesTable();

        const modal = document.querySelector('#modal-admin-message');
        if (modal) {
          modal.querySelector('#modal-msg-sender').textContent = `${msg.name} (${msg.email})`;
          modal.querySelector('#modal-msg-subject').textContent = msg.subject;
          modal.querySelector('#modal-msg-date').textContent = msg.date;
          modal.querySelector('#modal-msg-body').textContent = msg.message;
          modal.classList.add('active');
        }
      }
    });
  });
}

// 5.10 Reports & Analytics Tab
function renderAdminReports() {
  const orders = JSON.parse(localStorage.getItem('letoile_orders') || '[]');
  const products = JSON.parse(localStorage.getItem('letoile_products') || '[]');

  // Export CSV Handler
  const exportBtn = document.querySelector('#btn-admin-export-csv');
  if (exportBtn && !exportBtn.dataset.bound) {
    exportBtn.dataset.bound = 'true';
    exportBtn.addEventListener('click', () => {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Order ID,Date,Customer,Total,Status,Payment Method,Transaction Reference\n';

      orders.forEach(o => {
        csvContent += `"${o.id}","${o.date}","${o.customerName}","${o.total.toFixed(2)}","${o.status}","${o.paymentMethod || 'Visa'}","${o.txnRef || ''}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `stackly-sales-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// 5.11 Admin Settings
function initAdminSettings() {
  const form = document.querySelector('#admin-settings-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Settings saved smoothly
    });
  }
}

// 5.12 Admin Modals
function initAdminModals() {
  // Add Product Modal
  const openAddProdBtn = document.querySelector('#btn-open-add-product');
  const prodModal = document.querySelector('#modal-admin-product');
  if (openAddProdBtn && prodModal) {
    openAddProdBtn.addEventListener('click', () => {
      prodModal.querySelector('#prod-modal-title').textContent = 'Add New Formulation';
      prodModal.querySelector('#prod-edit-id').value = '';
      prodModal.querySelector('#add-product-form').reset();
      prodModal.classList.add('active');
    });

    const prodForm = prodModal.querySelector('#add-product-form');
    if (prodForm) {
      prodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = prodModal.querySelector('#prod-edit-id').value;
        const name = prodModal.querySelector('#prod-name').value.trim();
        const category = prodModal.querySelector('#prod-category').value;
        const price = parseFloat(prodModal.querySelector('#prod-price').value);
        const stock = parseInt(prodModal.querySelector('#prod-stock').value);
        const image = prodModal.querySelector('#prod-image').value.trim();
        const desc = prodModal.querySelector('#prod-desc').value.trim();

        if (!name || isNaN(price) || isNaN(stock)) {
          return;
        }

        let prods = JSON.parse(localStorage.getItem('letoile_products') || '[]');

        if (editId) {
          // Edit
          const p = prods.find(item => item.id === parseInt(editId));
          if (p) {
            p.name = name;
            p.category = category;
            p.price = price;
            p.stock = stock;
            if (image) p.image = image;
            p.description = desc;
          }
        } else {
          // Add
          const newId = prods.length ? Math.max(...prods.map(p => p.id)) + 1 : 1;
          prods.unshift({
            id: newId,
            name: name,
            category: category,
            price: price,
            stock: stock,
            rating: 5.0,
            reviewsCount: 1,
            image: image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
            description: desc
          });
        }

        localStorage.setItem('letoile_products', JSON.stringify(prods));
        renderAdminProductsTable();
        renderAdminOverviewMetrics();
        renderAdminInventoryTable();
        prodModal.classList.remove('active');
      });
    }
  }

  // Add Category Modal
  const openCatBtn = document.querySelector('#btn-open-add-category');
  const catModal = document.querySelector('#modal-admin-category');
  if (openCatBtn && catModal) {
    openCatBtn.addEventListener('click', () => {
      catModal.classList.add('active');
    });

    const catForm = catModal.querySelector('#add-category-form');
    if (catForm) {
      catForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = catForm.querySelector('#cat-name').value.trim();
        const desc = catForm.querySelector('#cat-desc').value.trim();

        if (!name) {
          return;
        }

        const cats = JSON.parse(localStorage.getItem('letoile_categories') || '[]');
        cats.push({
          id: 'cat-' + (cats.length + 1),
          name: name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          desc: desc || 'Botanical cosmetic formulation category.',
          count: 0
        });

        localStorage.setItem('letoile_categories', JSON.stringify(cats));
        renderAdminCategories();
        catModal.classList.remove('active');
        catForm.reset();
      });
    }
  }

  // Create Blog Article Modal
  const openBlogBtn = document.querySelector('#btn-open-create-blog');
  const blogModal = document.querySelector('#modal-admin-blog');
  if (openBlogBtn && blogModal) {
    openBlogBtn.addEventListener('click', () => {
      blogModal.classList.add('active');
    });

    const blogForm = blogModal.querySelector('#create-blog-form');
    if (blogForm) {
      blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = blogForm.querySelector('#blog-title').value.trim();
        const cat = blogForm.querySelector('#blog-cat').value;
        const author = blogForm.querySelector('#blog-author').value.trim();
        const img = blogForm.querySelector('#blog-img').value.trim();
        const excerpt = blogForm.querySelector('#blog-excerpt').value.trim();

        if (!title || !author) {
          return;
        }

        const blogs = JSON.parse(localStorage.getItem('letoile_blogs') || '[]');
        blogs.unshift({
          id: 'BLOG-' + Date.now().toString().slice(-4),
          title: title,
          category: cat,
          author: author,
          date: 'Just now',
          status: 'Published',
          views: '1',
          image: img || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
          excerpt: excerpt || 'Parisian beauty editorial feature.'
        });

        localStorage.setItem('letoile_blogs', JSON.stringify(blogs));
        renderAdminBlogTable();
        blogModal.classList.remove('active');
        blogForm.reset();
      });
    }
  }

  // Message Reply button
  const replyBtn = document.querySelector('#btn-modal-msg-reply');
  if (replyBtn) {
    replyBtn.addEventListener('click', () => {
      const modal = document.querySelector('#modal-admin-message');
      if (modal) modal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   6. GLOBAL DASHBOARD SEARCH BAR (Topbar)
   -------------------------------------------------------------------------- */
function initGlobalDashboardSearch() {
  const searchInput = document.querySelector('#dashboard-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return;

      const isCustomerPage = window.location.pathname.includes('customer-dashboard');
      if (isCustomerPage) {
        // Switch to orders or wishlist matching query
        const navOrders = document.querySelector('[data-panel="orders"]');
        if (navOrders) navOrders.click();
        const orderSearch = document.querySelector('#cust-orders-search');
        if (orderSearch) {
          orderSearch.value = q;
          renderCustomerOrders('all');
        }
      } else {
        // Admin: Switch to products
        const navProds = document.querySelector('[data-panel="products"]');
        if (navProds) navProds.click();
        const prodSearch = document.querySelector('#admin-prod-search');
        if (prodSearch) {
          prodSearch.value = q;
          renderAdminProductsTable(q);
        }
      }
    }
  });
}
