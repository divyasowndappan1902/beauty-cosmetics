/**
 * STACKLY - PRODUCTS ENGINE
 * Product database, catalog rendering, product detail view, gallery switcher, wishlist management
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Elixir de Rose Radiance Serum',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 98.00,
    oldPrice: 120.00,
    rating: 4.9,
    reviewsCount: 148,
    badge: 'Bestseller',
    badgeType: 'badge-bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Concentrated Damascus Rose & Multi-Molecular Hyaluronic Acid',
    description: 'An ethereal, fast-absorbing elixir that quenches dehydrated skin, accelerates cellular renewal, and imparts an unmistakable Parisian lit-from-within glow. Infused with hand-harvested Damascus Rose petals and bio-fermented peptides.',
    benefits: [
      'Delivers 72-hour continuous multi-layer hydration',
      'Visibly refines skin texture and plumps fine expression lines',
      'Fortifies the natural moisture barrier against environmental stressors',
      'Calms redness with cold-pressed botanical antioxidants'
    ],
    ingredients: 'Damask Rose Flower Distillate, Aqua (Water), Sodium Hyaluronate (Multi-Weight Micro & Macro), Niacinamide (5%), Camellia Sinensis (White Tea) Leaf Extract, Palmitoyl Tripeptide-5, Squalane (Olive-Derived), Rosa Canina (Rosehip) Seed Oil, Glycerin, Phenethyl Alcohol (Botanical Preservative).',
    howToUse: 'After gentle cleansing and toning, dispense 3 to 4 drops into the palms of your hands. Gently press into face, neck, and décolletage in upward sweeping motions. Follow with Crème Renaissance for locked-in nourishment. Suitable for morning and evening rituals.',
    size: '50 ml / 1.7 fl. oz.'
  },
  {
    id: 2,
    name: 'Crème Renaissance Restorative Face Cream',
    category: 'Face Care',
    categorySlug: 'face-care',
    price: 125.00,
    oldPrice: 145.00,
    rating: 5.0,
    reviewsCount: 192,
    badge: 'Award Winner',
    badgeType: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f4864388835?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Velvety Rich Barrier Repair with Alpine Edelweiss & Ceramide Complex',
    description: 'An indulgent, cashmere-soft cream engineered to replenish skin firmness and revitalize dry, mature, or fatigued complexions. Formulated with rare Swiss Alpine Edelweiss stem cells and biocompatible lipid ceramides.',
    benefits: [
      'Deeply reinforces lipid lipid matrices and restores elasticity',
      'Improves cellular bounce and firmness in as early as 14 days',
      'Rich buttery texture that melts into the skin without greasy residue',
      '100% clean, vegan, and formulated without synthetic fragrances'
    ],
    ingredients: 'Edelweiss Meristem Cell Culture, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Jojoba Esters, Centella Asiatica Extract, Tocopherol (Vitamin E).',
    howToUse: 'Warm a pearl-sized amount between fingertips to activate botanical lipids. Gently massage onto face and neck using upward rhythmic lymphatic motions. Use as the final nourishing seal in your evening routine.',
    size: '60 ml / 2.0 fl. oz.'
  },
  {
    id: 3,
    name: 'Velours Rose Hydrating Lip Nectar',
    category: 'Lip Care',
    categorySlug: 'lip-care',
    price: 42.00,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 86,
    badge: 'Trending',
    badgeType: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Glossy Plumping Treatment with Peptide-Infused Marula Oil',
    description: 'A hybrid lip treatment and glass-finish gloss that cushions lips in decadent hydration. Features plumping bio-peptides, Moroccan argan oil, and cold-pressed wild berries for smooth, pillow-soft lips with a delicate sheer blush veil.',
    benefits: [
      'Non-sticky, mirror-sheen finish with lasting cushion',
      'Visibly volumizes lips and softens dry vertical contours',
      'Infused with subtle organic Madagascar vanilla and rose notes',
      'Can be worn solo or layered atop your favorite lip color'
    ],
    ingredients: 'Ricinus Communis Seed Oil, Polyhydroxystearic Acid, Sclerocarya Birrea (Marula) Kernel Oil, Palmitoyl Oligopeptide, Argania Spinosa Kernel Oil, Rosa Moschata Seed Oil, Natural Aroma.',
    howToUse: 'Glide applicator over clean lips throughout the day whenever hydration or shine is desired. For an overnight restorative lip mask, apply a generous layer before sleep.',
    size: '12 ml / 0.4 fl. oz.'
  },
  {
    id: 4,
    name: 'Botanical Gold Illuminating Facial Oil',
    category: 'Face Care',
    categorySlug: 'face-care',
    price: 110.00,
    oldPrice: 135.00,
    rating: 4.9,
    reviewsCount: 115,
    badge: 'Pure Organic',
    badgeType: 'badge-clean',
    image: 'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: '24K Gold Micro-Flakes with 16 Cold-Pressed Plant Elixirs',
    description: 'An opulent dry oil infusion featuring pure suspended 24-karat gold flakes and 16 cold-pressed super-seed botanicals including Evening Primrose, Pomegranate seed, and Camellia Japonica. Imparts a luminous candlelit sheen.',
    benefits: [
      'Lightweight, fast-absorbing botanical oil blend',
      'Suspended 24K gold flakes melt effortlessly to bestow instant luminosity',
      'Rich in Essential Fatty Acids Omega 3, 6, and 9',
      'Perfect primer under makeup or nighttime radiance sealant'
    ],
    ingredients: 'Simmondsia Chinensis (Jojoba) Seed Oil, Camellia Japonica Seed Oil, Squalane, Punica Granatum Seed Oil, Oenothera Biennis Oil, Aurum (24K Gold Flakes), Helianthus Annuus Seed Oil, Citrus Aurantium Dulcis Peel Oil.',
    howToUse: 'Shake gently to disperse the golden flakes. Massage 2–3 drops onto face, or blend a single drop into your foundation for a glowing, runway-ready finish.',
    size: '30 ml / 1.0 fl. oz.'
  },
  {
    id: 5,
    name: 'Rosewater Essence Balancing Mist',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 56.00,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 64,
    badge: 'Pure Botanical',
    badgeType: 'badge-clean',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Artisanal Steam-Distilled Rose Petals with Witch Hazel & Aloe',
    description: 'A micro-fine refreshing face mist crafted from hand-harvested organic centifolia roses. Rebalances pH, calms surface irritation, and sets makeup with an invigorating botanical floral aroma.',
    benefits: [
      'Micro-atomizer delivers an ultra-fine, cloud-like mist',
      'Instantly hydrates and resets tired or dull skin',
      'Soothes sensitive or post-sun complexions',
      'Alcohol-free and non-drying formulation'
    ],
    ingredients: 'Organic Rosa Damascena Hydrosol, Hamamelis Virginiana Water, Aloe Barbadensis Leaf Juice, Glycerin, Sodium PCA, Gluconolactone, Sodium Benzoate.',
    howToUse: 'Hold bottle 8 to 10 inches from face with eyes closed. Mist generously before applying serums, after makeup application, or anytime throughout the day for an immediate sensorial refresh.',
    size: '100 ml / 3.4 fl. oz.'
  },
  {
    id: 6,
    name: 'Lumière Velvet Matte Lip Couture',
    category: 'Makeup',
    categorySlug: 'makeup',
    price: 48.00,
    oldPrice: 55.00,
    rating: 4.9,
    reviewsCount: 132,
    badge: 'Haute Makeup',
    badgeType: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Featherlight Cashmere Color in Parisian Rose Noir',
    description: 'An iconic luxury lipstick combining the intense pigment payoff of a classic matte with the weightless comfort of a whipped lip silk. Enriched with wild French lavender and smoothing botanical waxes.',
    benefits: [
      'Up to 10 hours of transfer-resistant, comfortable wear',
      'Velvety powdery-matte finish that never flakes or cakes',
      'Encased in an architectural brushed champagne gold bullet',
      'Dermatologically tested and enriched with Vitamin E'
    ],
    ingredients: 'Dimethicone, Synthetic Wax, Mica, Lavandula Angustifolia Flower Extract, Cera Microcristallina, Caprylic/Capric Triglyceride, Iron Oxides (CI 77491, CI 77492), Red 7 Lake.',
    howToUse: 'Define Cupid’s bow and lip contours using the angled bullet tip, then sweep rich color across lips. Blot with tissue for a stained editorial finish, or layer for full intensity.',
    size: '3.8 g / 0.13 oz.'
  },
  {
    id: 7,
    name: 'Whipped Shea & Gold Body Soufflé',
    category: 'Body Care',
    categorySlug: 'body-care',
    price: 84.00,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 77,
    badge: 'Indulgence',
    badgeType: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Decadent Whipped Body Cream with Moroccan Argan & Warm Vanilla',
    description: 'A whipped, soufflé-textured body treatment that melts on contact with skin to provide deep, velvety moisture. Lightly scented with toasted tonka bean, amber resin, and Moroccan cedar.',
    benefits: [
      'Relieves dry and rough elbows, knees, and décolletage',
      'Sinks in effortlessly without oily residue',
      'Leaves limbs subtly scented with warm amber notes',
      'Rich in Fair-Trade African raw Shea Butter'
    ],
    ingredients: 'Butyrospermum Parkii (Shea) Butter, Aqua, Argania Spinosa Kernel Oil, Theobroma Cacao Seed Butter, Cetearyl Alcohol, Vanilla Planifolia Fruit Extract, Amber Resin Extract.',
    howToUse: 'Smooth generously over slightly damp skin after your shower or bath. Concentrate on dry areas like heels and elbows.',
    size: '250 ml / 8.4 fl. oz.'
  },
  {
    id: 8,
    name: 'Pure Botanical Foaming Cleanser',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 52.00,
    oldPrice: 62.00,
    rating: 4.9,
    reviewsCount: 110,
    badge: 'Gentle Pure',
    badgeType: 'badge-clean',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    tagline: 'Sulfate-Free Cloud Foam with Chamomile & Marine Algae',
    description: 'A transformative jelly-to-foam cleanser that lifts makeup, SPF, and impurities while respecting the skin’s delicate acid mantle. Infused with soothing blue chamomile and mineral-dense French marine algae.',
    benefits: [
      'Gentle sulfate-free surfactant system preserves skin barrier',
      'Lifts waterproof makeup and surface sebum without stripping',
      'Leaves skin balanced, soft, and remarkably supple',
      'Ophthalmologist tested; gentle around delicate eyes'
    ],
    ingredients: 'Aqua, Decyl Glucoside, Chamomilla Recutita (Matricaria) Extract, Laminaria Digitata (Marine Algae) Extract, Glycerin, Coco-Betaine, Citric Acid, Lavandula Angustifolia Oil.',
    howToUse: 'Pump 1–2 doses into damp hands and lather into a rich cloud foam. Massage across damp face for 60 seconds, then rinse with lukewarm water. Pat dry with a plush towel.',
    size: '150 ml / 5.1 fl. oz.'
  }
];

/* --------------------------------------------------------------------------
   Wishlist State Management
   -------------------------------------------------------------------------- */
function getWishlist() {
  const saved = localStorage.getItem('letoile_wishlist');
  return saved ? JSON.parse(saved) : [1, 4]; // Sample initial items
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
    isAdded = true;
  }

  localStorage.setItem('letoile_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  return isAdded;
}

function updateWishlistUI() {
  const wishlist = getWishlist();
  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id, 10);
    const icon = btn.querySelector('i');
    if (wishlist.includes(id)) {
      btn.classList.add('active');
      if (icon) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      }
    } else {
      btn.classList.remove('active');
      if (icon) {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Bestseller / Catalog Card Renderer
   -------------------------------------------------------------------------- */
function renderProductCard(product, delay = 0) {
  return `
    <div class="product-card" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="product-image-wrapper">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </a>
        <div class="product-badge-tag">
          <span class="badge ${product.badgeType}">${product.badge}</span>
        </div>
        <a href="product.html?id=${product.id}" class="product-quick-view-btn">
          View Details
        </a>
      </div>
      <div class="product-content">
        <span class="product-category-label">${product.category}</span>
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <span class="count">(${product.reviewsCount})</span>
        </div>
        <div class="product-footer-row">
          <div class="product-price-box">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function initProductCards() {
  const container = document.querySelector('.bestseller-product-grid');
  if (container) {
    // Render top 4 to 8 bestseller products
    container.innerHTML = PRODUCTS_DATA.map((p, idx) => renderProductCard(p, (idx % 4) * 100)).join('');
  }

  // Attach Wishlist & Add to Cart events
  attachProductInteractions();
}

function attachProductInteractions() {
  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id, 10);
      toggleWishlist(id);
    });
  });

  document.querySelectorAll('.instant-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id, 10);
      const product = PRODUCTS_DATA.find(p => p.id === id);
      if (product && typeof addToCart === 'function') {
        addToCart(product, 1);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Product Details Page Logic
   -------------------------------------------------------------------------- */
function initProductDetailPage() {
  const detailContainer = document.querySelector('.product-detail-view');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10) || 1;
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  // Populate Breadcrumb
  const currentBreadcrumb = document.querySelector('.breadcrumbs .current');
  if (currentBreadcrumb) {
    currentBreadcrumb.textContent = product.name;
  }

  // Populate Header & Info
  document.title = `${product.name} | Stackly`;
  const nameEl = document.querySelector('.pdp-title');
  const priceEl = document.querySelector('.pdp-price');
  const oldPriceEl = document.querySelector('.pdp-old-price');
  const badgeEl = document.querySelector('.pdp-badge');
  const ratingEl = document.querySelector('.pdp-rating-stars');
  const reviewsCountEl = document.querySelector('.pdp-reviews-count');
  const taglineEl = document.querySelector('.pdp-tagline');
  const descEl = document.querySelector('.pdp-desc');
  const sizeEl = document.querySelector('.pdp-size');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = `$${product.oldPrice.toFixed(2)}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }
  if (badgeEl) {
    badgeEl.textContent = product.badge;
    badgeEl.className = `badge ${product.badgeType}`;
  }
  if (reviewsCountEl) reviewsCountEl.textContent = `(${product.reviewsCount} verified reviews)`;
  if (taglineEl) taglineEl.textContent = product.tagline;
  if (descEl) descEl.textContent = product.description;
  if (sizeEl) sizeEl.textContent = product.size;

  // Benefits List
  const benefitsList = document.querySelector('.pdp-benefits-list');
  if (benefitsList && product.benefits) {
    benefitsList.innerHTML = product.benefits.map(b => `
      <li><i class="fa-solid fa-check text-gold"></i> <span>${b}</span></li>
    `).join('');
  }

  // Tab Contents
  const ingredientsTab = document.querySelector('#tab-ingredients-content');
  const howToUseTab = document.querySelector('#tab-howtouse-content');
  const fullDescTab = document.querySelector('#tab-desc-content');

  if (ingredientsTab) ingredientsTab.textContent = product.ingredients;
  if (howToUseTab) howToUseTab.textContent = product.howToUse;
  if (fullDescTab) fullDescTab.textContent = product.description;

  // Gallery Switching
  const mainImg = document.querySelector('.pdp-main-image');
  const thumbContainer = document.querySelector('.pdp-thumbnails');
  if (mainImg && thumbContainer && product.gallery) {
    mainImg.src = product.gallery[0];
    mainImg.alt = product.name;

    thumbContainer.innerHTML = product.gallery.map((imgUrl, index) => `
      <button type="button" class="pdp-thumb-btn ${index === 0 ? 'active' : ''}" data-src="${imgUrl}">
        <img src="${imgUrl}" alt="${product.name} view ${index + 1}">
      </button>
    `).join('');

    thumbContainer.querySelectorAll('.pdp-thumb-btn').forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbContainer.querySelectorAll('.pdp-thumb-btn').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.style.opacity = '0.5';
        setTimeout(() => {
          mainImg.src = thumb.dataset.src;
          mainImg.style.opacity = '1';
        }, 150);
      });
    });
  }

  // Quantity Stepper
  let currentQty = 1;
  const qtyVal = document.querySelector('.pdp-qty-val');
  const qtyDec = document.querySelector('.pdp-qty-decrease');
  const qtyInc = document.querySelector('.pdp-qty-increase');

  if (qtyDec && qtyInc && qtyVal) {
    qtyDec.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    });

    qtyInc.addEventListener('click', () => {
      if (currentQty < 10) {
        currentQty++;
        qtyVal.textContent = currentQty;
      }
    });
  }

  // Add to Bag CTA
  const addToBagBtn = document.querySelector('.pdp-add-to-bag-btn');
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        addToCart(product, currentQty);
      }
    });
  }

  // PDP Wishlist Button
  const pdpWishlistBtn = document.querySelector('.pdp-wishlist-toggle');
  if (pdpWishlistBtn) {
    pdpWishlistBtn.dataset.id = product.id;
    pdpWishlistBtn.addEventListener('click', () => {
      const isAdded = toggleWishlist(product.id);
      const icon = pdpWishlistBtn.querySelector('i');
      if (isAdded) {
        pdpWishlistBtn.classList.add('active');
        if (icon) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
        }
      } else {
        pdpWishlistBtn.classList.remove('active');
        if (icon) {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
        }
      }
    });
  }

  // Tab Switcher
  const tabBtns = document.querySelectorAll('.pdp-tab-nav-btn');
  const tabPanes = document.querySelectorAll('.pdp-tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(target);
      if (activePane) activePane.classList.add('active');
    });
  });

  // Render Related Products (Excluding current)
  const relatedGrid = document.querySelector('.related-products-grid');
  if (relatedGrid) {
    const related = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map((p, idx) => renderProductCard(p, idx * 100)).join('');
    attachProductInteractions();
  }

  // Interactive Review Submission Demo
  initReviewFormDemo(product);
}

function initReviewFormDemo(product) {
  const reviewForm = document.querySelector('.pdp-new-review-form');
  const reviewsList = document.querySelector('.pdp-reviews-stream');
  if (!reviewForm || !reviewsList) return;

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = reviewForm.querySelector('#review-author-name');
    const commentInput = reviewForm.querySelector('#review-comment');
    const ratingInput = reviewForm.querySelector('input[name="rating"]:checked') || { value: '5' };

    if (!nameInput.value.trim() || !commentInput.value.trim()) {
      return;
    }

    const newReview = document.createElement('div');
    newReview.className = 'customer-review-card';
    newReview.style.opacity = '1';
    newReview.innerHTML = `
      <div class="review-header">
        <div class="review-stars text-gold">
          ${'<i class="fa-solid fa-star"></i>'.repeat(parseInt(ratingInput.value, 10))}
        </div>
        <span class="review-date">Just now</span>
      </div>
      <h4 class="review-author-title">${escapeHTML(nameInput.value.trim())} <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span></h4>
      <p class="review-body">${escapeHTML(commentInput.value.trim())}</p>
    `;

    reviewsList.prepend(newReview);
    reviewForm.reset();
  });
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initProductCards();
  initProductDetailPage();
  updateWishlistUI();
});
