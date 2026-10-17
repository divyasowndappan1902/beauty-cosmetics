/**
 * STACKLY - BLOG & EDITORIAL JOURNAL ENGINE
 * Article database, category filtering, pagination / load-more handling
 */

const ARTICLES_DATA = [
  {
    id: 1,
    title: 'The Art of the Parisian Double Cleanse: A Sensorial Nighttime Ritual',
    category: 'Skincare',
    categorySlug: 'skincare',
    readTime: '5 min read',
    date: 'October 12, 2026',
    author: 'Clara Delacroix, Head Aesthetician',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover why French dermatologists insist that true cellular renewal begins with an oil-first dissolvent followed by an ultra-gentle micro-foam.',
    featured: true
  },
  {
    id: 2,
    title: 'Demystifying Active Botanicals: Niacinamide vs. Vitamin C Synergy',
    category: 'Ingredients',
    categorySlug: 'ingredients',
    readTime: '6 min read',
    date: 'October 8, 2026',
    author: 'Dr. Éloïse Vane, Phytochemistry Lead',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Separating myth from molecular science: how to layer these two powerhouse brighteners without flushing or destabilizing your lipid barrier.',
    featured: false
  },
  {
    id: 3,
    title: 'The "Clean Girl" Aesthetic Evolves: Paris Fashion Week’s Dewy Sculpt',
    category: 'Beauty Trends',
    categorySlug: 'beauty-trends',
    readTime: '4 min read',
    date: 'October 3, 2026',
    author: 'Sophie Laurent, Editorial Stylist',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Backstage at the Grand Palais: how master makeup artists swapped matte powders for high-refractive botanical dry oils and sheared cream blushes.',
    featured: false
  },
  {
    id: 4,
    title: 'Why Botanical Squalane is Superior to Heavy Petroleum Emollients',
    category: 'Ingredients',
    categorySlug: 'ingredients',
    readTime: '7 min read',
    date: 'September 28, 2026',
    author: 'Dr. Éloïse Vane, Phytochemistry Lead',
    image: 'https://images.unsplash.com/photo-1608248597359-216a908a8e1b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'An investigative look into bio-fermented olive squalane and its uncanny bio-compatibility with human sebum.',
    featured: false
  },
  {
    id: 5,
    title: 'How to Master the Velvet Blurred Lip: A Five-Step Masterclass',
    category: 'Makeup',
    categorySlug: 'makeup',
    readTime: '4 min read',
    date: 'September 22, 2026',
    author: 'Mathieu Roy, Celebrity Makeup Artist',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Achieve that effortless, Parisian just-kissed flush using a finger-tapping technique and rose-scented velvet pigments.',
    featured: false
  },
  {
    id: 6,
    title: 'Lymphatic Drainage with Gua Sha: Techniques That Visibly Lift the Face',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    readTime: '6 min read',
    date: 'September 15, 2026',
    author: 'Clara Delacroix, Head Aesthetician',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Step-by-step guidance on angle, pressure, and meridian points to banish morning puffiness and redefine cheekbone contour.',
    featured: false
  },
  {
    id: 7,
    title: 'The Circadian Clock of Skin: Why Your Evening Routine Matters Most',
    category: 'Skincare',
    categorySlug: 'skincare',
    readTime: '5 min read',
    date: 'September 9, 2026',
    author: 'Dr. Éloïse Vane, Phytochemistry Lead',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    excerpt: 'While you sleep, transepidermal water loss peaks and cellular mitosis accelerates. Here is how to synchronize your regimen.',
    featured: false
  },
  {
    id: 8,
    title: 'Minimalist Beauty: How to Curate a 4-Product Capsule Routine',
    category: 'Beauty Tips',
    categorySlug: 'beauty-tips',
    readTime: '5 min read',
    date: 'August 30, 2026',
    author: 'Sophie Laurent, Editorial Stylist',
    image: 'https://images.unsplash.com/photo-1512290900672-1f4864388835?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Strip away the 12-step overload. Discover the essential four formulas that deliver 95% of your skin’s biological requirements.',
    featured: false
  },
  {
    id: 9,
    title: 'Cold-Climate Radiance: Protecting Skin from Autumn Winds and Dry Air',
    category: 'Beauty Trends',
    categorySlug: 'beauty-trends',
    readTime: '4 min read',
    date: 'August 24, 2026',
    author: 'Clara Delacroix, Head Aesthetician',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Expert lipid replenishment tactics to stop micro-chapping and moisture evaporation before temperature drops take their toll.',
    featured: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initBlogPage();
  initHomeBlogPreview();
});

function initHomeBlogPreview() {
  const homeContainer = document.querySelector('.home-journal-grid');
  if (!homeContainer) return;

  const previewArticles = ARTICLES_DATA.slice(0, 3);
  homeContainer.innerHTML = previewArticles.map((art, idx) => `
    <article class="article-card" data-aos="fade-up" data-aos-delay="${idx * 150}">
      <div class="article-img-wrap">
        <a href="blog.html">
          <img src="${art.image}" alt="${art.title}" class="article-img" loading="lazy">
        </a>
      </div>
      <div class="article-body">
        <div class="article-meta">
          <span class="article-tag">${art.category}</span>
          <span>•</span>
          <span>${art.readTime}</span>
        </div>
        <h3 class="article-title">
          <a href="blog.html">${art.title}</a>
        </h3>
        <p class="article-excerpt">${art.excerpt}</p>
        <a href="blog.html" class="btn-text">Read Article <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>
  `).join('');
}

function initBlogPage() {
  const gridContainer = document.querySelector('.blog-articles-grid');
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const loadMoreBtn = document.querySelector('.blog-load-more-btn');
  const emptyMessage = document.querySelector('.blog-empty-state');

  if (!gridContainer) return;

  let activeCategory = 'all';
  let visibleCount = 6;

  function renderArticles() {
    let filtered = ARTICLES_DATA;
    if (activeCategory !== 'all') {
      filtered = ARTICLES_DATA.filter(a => a.categorySlug === activeCategory);
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyMessage) emptyMessage.style.display = 'block';
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';

    const visibleList = filtered.slice(0, visibleCount);

    gridContainer.innerHTML = visibleList.map((art, idx) => `
      <article class="article-card" data-aos="fade-up" data-aos-delay="${(idx % 3) * 100}">
        <div class="article-img-wrap">
          <a href="#article-${art.id}">
            <img src="${art.image}" alt="${art.title}" class="article-img" loading="lazy">
          </a>
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span class="article-tag">${art.category}</span>
            <span>•</span>
            <span>${art.date}</span>
          </div>
          <h3 class="article-title">
            <a href="#article-${art.id}">${art.title}</a>
          </h3>
          <p class="article-excerpt">${art.excerpt}</p>
          <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
            <a href="#article-${art.id}" class="btn-text">Read Article <i class="fa-solid fa-arrow-right"></i></a>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${art.readTime}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Update Load More Button visibility
    if (loadMoreBtn) {
      if (visibleCount >= filtered.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
      }
    }
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      visibleCount = 6; // reset pagination
      renderArticles();
    });
  });

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 3;
      renderArticles();
    });
  }

  // Initial render
  renderArticles();
}
