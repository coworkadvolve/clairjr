const toursMenu = {
    introTitle: 'Our Tours',
    intro:
      'Ancient Trails is not just a tourism organisation. But it is a unique opportunity to explore the roots of Indian culture and the worldwide richness of our Indian heritage.',
    columns: [
      {
        title: 'Heritage Tours',
        icon: 'temple',
        links: [
          ['Kerala Tour', './assets/thumb-kerala.png'],
          ['Vaishnavdevi', './assets/thumb-vaishnav.png'],
          ['White Spiti', './assets/thumb-spiti.png'],
          ['Kashmir', './assets/thumb-kashmir.png'],
        ],
      },
      {
        title: 'Cultural Tours',
        icon: 'culture',
        links: [
          ['Kashmir', './assets/thumb-kashmir-green.png'],
          ['Kerala Tour', './assets/thumb-temple.png'],
          ['Vaishnavdevi', './assets/thumb-vaishnav.png'],
          ['White Spiti', './assets/thumb-spiti.png'],
        ],
      },
      {
        title: 'Short Trails',
        icon: 'mountain',
        links: [
          ['Kerala Tour', './assets/thumb-kerala.png'],
          ['Vaishnavdevi', './assets/thumb-vaishnav.png'],
          ['White Spiti', './assets/thumb-spiti.png'],
          ['Kashmir', './assets/thumb-kashmir.png'],
        ],
      },
      {
        title: 'Customised Tours',
        icon: 'custom',
        feature: 'feature-image',
        caption: '',
      },
      {
        title: 'Specialised Tours',
        icon: 'binoculars',
        feature: 'wide-feature',
        caption: '',
      },
    ],
};

const destinationsMenu = {
  introTitle: 'Explore Destinations',
  intro:
    'From timeless heritage in India to iconic landmarks around the world, find your next adventure.',
  buttonLabel: 'View all destinations',
  illustration: './assets/dest-illustration.png',
  india: [
    ['North India', 'Jammu & Kashmir, Himachal Pradesh, Uttarakhand, Punjab...', './assets/dest-north.png'],
    ['West India', 'Rajasthan, Gujarat, Maharashtra, Goa...', './assets/dest-west.png'],
    ['South India', 'Kerala, Tamil Nadu, Karnataka, Andhra Pradesh...', './assets/dest-south.png'],
    ['East India', 'West Bengal, Odisha, Assam, Sikkim...', './assets/dest-east.png'],
    ['Central India', 'Madhya Pradesh, Chhattisgarh, Jharkhand...', './assets/dest-central.png'],
  ],
  international: [
    ['Asia', 'Nepal, Bhutan, Sri Lanka, Thailand, Japan...', './assets/dest-asia.png'],
    ['Europe', 'France, Italy, Greece, Spain, Switzerland...', './assets/dest-europe.png'],
    ['Middle East', 'UAE, Jordan, Egypt, Oman, Turkey...', './assets/dest-middle-east.png'],
    ['Africa', 'Morocco, South Africa, Kenya, Tanzania...', './assets/dest-africa.png'],
    ['Americas', 'USA, Canada, Brazil, Peru, Mexico...', './assets/dest-americas.png'],
  ],
  cities: [
    ['Delhi', './assets/city-delhi.png'],
    ['Jaipur', './assets/city-jaipur.png'],
    ['Varanasi', './assets/city-varanasi.png'],
    ['Agra', './assets/city-agra.png'],
    ['Dubai', './assets/city-dubai.png'],
    ['Paris', './assets/city-paris.png'],
    ['Cairo', './assets/city-cairo.png'],
    ['Rome', './assets/city-rome.png'],
  ],
};

const navShell = document.querySelector('.nav-shell');
const navLinks = [...document.querySelectorAll('.nav-link')];
const homeLink = document.querySelector('[data-menu="home"]');
const toursLink = document.querySelector('[data-menu="tours"]');
const destinationsLink = document.querySelector('[data-menu="destinations"]');
const megaPanel = document.querySelector('#megaPanel');
const menuContent = document.querySelector('#menuContent');
const storyTitle = document.querySelector('.story-card h2');
const storyParagraphs = [...document.querySelectorAll('.story-card p')];
const mobileToggle = document.querySelector('#mobileToggle');
let closeTimer;
let hasAnimated = false;
let currentMegaType = 'tours';
const closeDelay = 450;
let closeWatchActive = false;
const mobileMenuQuery = window.matchMedia('(max-width: 700px)');

const iconSvg = {
  temple: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 8 11 18h26L24 8Z" />
      <path d="M15 19v17M22 19v17M29 19v17M36 19v17" />
      <path d="M10 36h28M13 40h22" />
      <path d="M24 15v-5" />
    </svg>
  `,
  culture: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="17" cy="18" r="5" />
      <circle cx="31" cy="18" r="5" />
      <path d="M15 25c-4 2-6 5-6 10h15c0-5-3-8-9-10Z" />
      <path d="M33 25c4 2 6 5 6 10H24c0-5 3-8 9-10Z" />
      <path d="M24 10c4 3 4 7 0 11-4-4-4-8 0-11Z" />
    </svg>
  `,
  mountain: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m7 35 12-20 8 13 5-8 9 15H7Z" />
      <path d="m19 15 2 7 4-3M32 20l1 5 3-2" />
      <path d="M12 38h28" />
    </svg>
  `,
  custom: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 15a5 5 0 1 0 0 .1" />
      <path d="M34 33a5 5 0 1 0 0 .1" />
      <path d="M15 20c3 7 8 10 15 10" />
      <path d="M30 15h8v8" />
      <path d="M30 23 38 15" />
    </svg>
  `,
  binoculars: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 18h8l3 16H10l2-16Z" />
      <path d="M28 18h8l2 16H25l3-16Z" />
      <path d="M20 20h8M18 15l3-5M30 15l-3-5" />
      <circle cx="16" cy="34" r="5" />
      <circle cx="32" cy="34" r="5" />
    </svg>
  `,
  india: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 9 29 8l8 7-5 8 3 8-9 8-6-5-7 3-4-8 5-7-3-7 5-6Z" />
      <path d="M20 18h9M18 25h12M22 32h5" />
    </svg>
  `,
  globe: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" />
      <path d="M9 24h30M24 9c5 5 7 10 7 15s-2 10-7 15c-5-5-7-10-7-15s2-10 7-15Z" />
    </svg>
  `,
  pin: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 42s12-12 12-23a12 12 0 0 0-24 0c0 11 12 23 12 23Z" />
      <circle cx="24" cy="19" r="4" />
    </svg>
  `,
  compass: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" />
      <path d="m30 14-4 12-8 8 4-12 8-8Z" />
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="12" y="14" width="24" height="22" rx="3" />
      <path d="M17 10v8M31 10v8M12 21h24M18 27h4M26 27h4" />
    </svg>
  `,
  headset: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 28v-5a12 12 0 0 1 24 0v5" />
      <path d="M12 28c0 4 3 6 7 6v-12c-4 0-7 2-7 6ZM36 28c0 4-3 6-7 6v-12c4 0 7 2 7 6Z" />
      <path d="M29 38h-6" />
    </svg>
  `,
};

function formatColumnTitle(title) {
  const lastSpace = title.lastIndexOf(' ');
  if (lastSpace === -1) return title;
  return `${title.slice(0, lastSpace)}<br>${title.slice(lastSpace + 1)}`;
}

function renderToursMenu() {
  const data = toursMenu;
  megaPanel.className = 'mega-panel tours-menu';
  storyTitle.textContent = data.introTitle;
  storyParagraphs[0].textContent = data.intro.split('. ')[0] + '.';
  storyParagraphs[1].textContent = data.intro.split('. ').slice(1).join('. ') || data.intro;
  document.querySelector('.plan-link span:first-child').textContent = 'Plan your trip';
  document.querySelector('.story-image').src = './assets/menu-v2-illustration.png';

  menuContent.innerHTML = data.columns
    .map((column) => {
      if (column.feature) {
        const imageSrc =
          column.feature === 'feature-image'
            ? './assets/menu-v2-palace.png'
            : './assets/menu-v2-tiger.png';
        return `
          <section class="menu-column">
            <div class="column-heading">
              <span class="category-icon" aria-hidden="true">${iconSvg[column.icon]}</span>
              <h3>${formatColumnTitle(column.title)}</h3>
            </div>
            <div class="rule"></div>
            <a class="${column.feature}" href="#">
              <img src="${imageSrc}" alt="" />
              <span class="feature-arrow" aria-hidden="true">→</span>
            </a>
            ${column.caption ? `<div class="feature-caption">${column.caption}</div>` : ''}
          </section>
        `;
      }

      return `
        <section class="menu-column">
          <div class="column-heading">
            <span class="category-icon" aria-hidden="true">${iconSvg[column.icon]}</span>
            <h3>${formatColumnTitle(column.title)}</h3>
          </div>
          <div class="rule"></div>
          <div class="tour-list">
            ${column.links
              .map(
                ([label, image]) => `
                  <a class="tour-link" href="#">
                    <img class="tour-thumb" src="${image}" alt="" />
                    <span>${label}</span>
                  </a>
                `,
              )
              .join('')}
          </div>
          <a class="more-link" href="#">And more +</a>
        </section>
      `;
    })
    .join('');
}

function destinationList(items) {
  return items
    .map(
      ([title, desc, image]) => `
        <a class="destination-row" href="#">
          <img src="${image}" alt="" />
          <span>
            <strong>${title}</strong>
            <small>${desc}</small>
          </span>
          <b aria-hidden="true">›</b>
        </a>
      `,
    )
    .join('');
}

function renderDestinationsMenu() {
  const data = destinationsMenu;
  megaPanel.className = 'mega-panel destinations-menu';
  storyTitle.textContent = data.introTitle;
  storyParagraphs[0].textContent = data.intro.split(', find')[0] + ',';
  storyParagraphs[1].textContent = 'find your next adventure.';
  document.querySelector('.plan-link span:first-child').textContent = data.buttonLabel;
  document.querySelector('.story-image').src = data.illustration;

  menuContent.innerHTML = `
    <section class="destination-section">
      <div class="destination-heading">
        <span class="category-icon" aria-hidden="true">${iconSvg.india}</span>
        <span><strong>India</strong><small>Explore Incredible India</small></span>
      </div>
      <div class="destination-list">${destinationList(data.india)}</div>
      <a class="destination-more" href="#">View all Indian states <span aria-hidden="true">→</span></a>
    </section>

    <section class="destination-section">
      <div class="destination-heading">
        <span class="category-icon" aria-hidden="true">${iconSvg.globe}</span>
        <span><strong>International</strong><small>Discover the World</small></span>
      </div>
      <div class="destination-list">${destinationList(data.international)}</div>
      <a class="destination-more" href="#">View all countries <span aria-hidden="true">→</span></a>
    </section>

    <section class="destination-section top-cities-section">
      <div class="destination-heading">
        <span class="category-icon" aria-hidden="true">${iconSvg.pin}</span>
        <span><strong>Top Cities</strong><small>Popular Cities Worldwide</small></span>
      </div>
      <div class="city-grid">
        ${data.cities
          .map(
            ([title, image]) => `
              <a class="city-card" href="#">
                <img src="${image}" alt="" />
                <span>${title}</span>
              </a>
            `,
          )
          .join('')}
      </div>
      <a class="destination-more" href="#">View all cities <span aria-hidden="true">→</span></a>
    </section>
  `;
}

function openMegaMenu(type = 'tours') {
  if (mobileMenuQuery.matches) {
    closeMegaMenu(true);
    return;
  }
  clearTimeout(closeTimer);
  startCloseWatch();
  currentMegaType = type;
  navLinks.forEach((item) => item.classList.remove('active'));
  const activeLink = type === 'destinations' ? destinationsLink : toursLink;
  if (type === 'destinations') {
    renderDestinationsMenu();
  } else {
    renderToursMenu();
  }
  activeLink.classList.add('active');
  navShell.classList.add('has-mega-open');
  megaPanel.hidden = false;
  megaPanel.classList.remove('closing');
  megaPanel.classList.add('open');
  if (!hasAnimated) {
    megaPanel.classList.add('first-open');
    hasAnimated = true;
    setTimeout(() => megaPanel.classList.remove('first-open'), 900);
  }
}

function pointInRect(point, rect, padding = 0) {
  return (
    point.x >= rect.left - padding &&
    point.x <= rect.right + padding &&
    point.y >= rect.top - padding &&
    point.y <= rect.bottom + padding
  );
}

function isPointerInMegaZone(event) {
  if (megaPanel.hidden) return false;
  const point = { x: event.clientX, y: event.clientY };
  const navRect = navShell.getBoundingClientRect();
  const panelRect = megaPanel.getBoundingClientRect();
  const bridgeRect = {
    left: Math.min(navRect.left, panelRect.left),
    right: Math.max(navRect.right, panelRect.right),
    top: navRect.top,
    bottom: panelRect.bottom,
  };

  return (
    pointInRect(point, navRect, 10) ||
    pointInRect(point, panelRect, 10) ||
    pointInRect(point, bridgeRect, 6)
  );
}

function startCloseWatch() {
  if (closeWatchActive) return;
  closeWatchActive = true;
  document.addEventListener('pointermove', handlePointerMove);
}

function stopCloseWatch() {
  closeWatchActive = false;
  document.removeEventListener('pointermove', handlePointerMove);
}

function handlePointerMove(event) {
  if (mobileMenuQuery.matches || megaPanel.hidden) {
    stopCloseWatch();
    return;
  }
  if (isPointerInMegaZone(event)) {
    clearTimeout(closeTimer);
    return;
  }
  closeMegaMenu();
}

function closeMegaMenu(immediate = false) {
  clearTimeout(closeTimer);
  if (immediate) {
    megaPanel.hidden = true;
    megaPanel.classList.remove('open', 'closing', 'first-open');
    navShell.classList.remove('has-mega-open');
    toursLink.classList.remove('active');
    destinationsLink.classList.remove('active');
    homeLink.classList.add('active');
    stopCloseWatch();
    return;
  }
  closeTimer = setTimeout(() => {
    megaPanel.classList.remove('open', 'first-open');
    megaPanel.classList.add('closing');
    setTimeout(() => {
      if (!megaPanel.classList.contains('open')) {
        megaPanel.hidden = true;
        megaPanel.classList.remove('closing');
        navShell.classList.remove('has-mega-open');
        toursLink.classList.remove('active');
        destinationsLink.classList.remove('active');
        homeLink.classList.add('active');
        stopCloseWatch();
      }
    }, 260);
  }, closeDelay);
}

function bindMegaLink(link, type) {
  link.addEventListener('mouseenter', () => openMegaMenu(type));
  link.addEventListener('focus', () => openMegaMenu(type));
  link.addEventListener('click', (event) => {
    if (mobileMenuQuery.matches) {
      closeMegaMenu(true);
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      return;
    }
    event.preventDefault();
    openMegaMenu(type);
  });
}

bindMegaLink(toursLink, 'tours');
bindMegaLink(destinationsLink, 'destinations');

megaPanel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
megaPanel.addEventListener('mouseleave', closeMegaMenu);
megaPanel.addEventListener('focusin', () => openMegaMenu(currentMegaType));
megaPanel.addEventListener('focusout', closeMegaMenu);

navLinks
  .filter((link) => link !== toursLink)
  .filter((link) => link !== destinationsLink)
  .forEach((link) => {
    link.addEventListener('mouseenter', closeMegaMenu);
    link.addEventListener('focus', closeMegaMenu);
    link.addEventListener('click', closeMegaMenu);
  });

mobileToggle.addEventListener('click', () => {
  navShell.classList.toggle('open');
  closeMegaMenu(true);
});

mobileMenuQuery.addEventListener('change', (event) => {
  if (event.matches) closeMegaMenu(true);
});

renderToursMenu();
