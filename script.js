// Set report generation date dynamically
document.getElementById('gen-date').textContent = new Date().toLocaleDateString('en-GB', {
  day: '2-digit', month: 'long', year: 'numeric'
});

// ── Sidebar Section Navigation ──
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.report-section');

function showSection(sectionId) {
  // Hide all sections, remove active class from nav links
  sections.forEach(s => s.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Highlight active link
  const targetLink = document.querySelector(`.nav-link[data-sec="${sectionId}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-sec');
    showSection(sectionId);
    history.pushState(null, null, `#${sectionId}`);
  });
});

// Navigate on page load if hash exists
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    showSection('executive-summary');
  }
});

// ── Clipboard Copying for Defanged IOCs ──
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');

copyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const textToCopy = btn.getAttribute('data-copy');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show toast
        toast.textContent = `Copied Defanged Observable: ${textToCopy}`;
        toast.classList.add('show');
        
        // Hide toast
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  });
});

// ── Interactive Taxonomy Category Filtering ──
const taxButtons = document.querySelectorAll('.tax-nav-btn');
const taxonomyCards = document.querySelectorAll('.taxonomy-card');

taxButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    taxButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const targetCat = btn.getAttribute('data-target');
    taxonomyCards.forEach(card => {
      if (targetCat === 'tax-all' || card.getAttribute('data-cat') === targetCat) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});

// ── Interactive Collection Log Filtering & Searching ──
const logSearchInput = document.getElementById('log-search');
const logFilterSelect = document.getElementById('log-filter-source');
const timelineItems = document.querySelectorAll('.timeline-item');

function filterCollectionLog() {
  const query = logSearchInput.value.toLowerCase().trim();
  const sourceFilter = logFilterSelect.value;

  timelineItems.forEach(item => {
    const titleText = item.querySelector('h4').textContent.toLowerCase();
    const metaText = item.querySelector('.tl-meta').textContent.toLowerCase();
    const descText = item.querySelector('p').textContent.toLowerCase();
    const itemSource = item.getAttribute('data-source'); // 'primary' or 'secondary'

    const matchesSearch = titleText.includes(query) || metaText.includes(query) || descText.includes(query);
    const matchesSource = sourceFilter === 'all' || itemSource === sourceFilter;

    if (matchesSearch && matchesSource) {
      item.classList.remove('filtered-out');
    } else {
      item.classList.add('filtered-out');
    }
  });
}

if (logSearchInput) logSearchInput.addEventListener('input', filterCollectionLog);
if (logFilterSelect) logFilterSelect.addEventListener('change', filterCollectionLog);

// ── Search Filter for Observables Table ──
const iocSearchInput = document.querySelector('#observables #ioc-search');
const iocRows = document.querySelectorAll('#ioc-table tbody tr');

if (iocSearchInput) {
  iocSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    iocRows.forEach(row => {
      const type = row.cells[0].textContent.toLowerCase();
      const val = row.cells[1].textContent.toLowerCase();
      const desc = row.cells[2].textContent.toLowerCase();
      
      if (type.includes(query) || val.includes(query) || desc.includes(query)) {
        row.classList.remove('filtered-out');
      } else {
        row.classList.add('filtered-out');
      }
    });
  });
}

// ── Lightbox Modal for Screenshots ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});
