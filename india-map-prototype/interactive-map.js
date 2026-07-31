const filters = [
  { value: 'All', label: 'All Destinations' },
  { value: 'Heritage', label: 'Heritage' },
  { value: 'Nature', label: 'Nature' },
  { value: 'Spiritual', label: 'Spiritual' },
  { value: 'Adventure', label: 'Adventure' },
];

let destinations = [
  {
    id: 'leh',
    name: 'Leh',
    state: 'Ladakh',
    category: 'Adventure',
    x: 49.2,
    y: 15.4,
    description: 'High-altitude passes, monasteries, stark valleys, and slow mornings wrapped in Himalayan light.',
    bestTime: 'May - Sep',
    places: '10+ Places',
    tours: 'Road Trips',
    image: './assets/thumb-kashmir.png',
    thumbX: '51%',
    thumbY: '13%',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    category: 'Heritage',
    x: 39.8,
    y: 28.8,
    description: 'The Pink City of India, known for royal palaces, vibrant bazaars, historic forts, and rich cultural heritage.',
    bestTime: 'Oct - Mar',
    places: '12+ Places',
    tours: 'Popular Tours',
    image: './assets/menu-story-photo.png',
    thumbX: '39%',
    thumbY: '30%',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    category: 'Heritage',
    x: 34.4,
    y: 40.6,
    description: 'A romantic lake city with marble palaces, quiet ghats, old bazaars, and sunset views over the Aravallis.',
    bestTime: 'Sep - Mar',
    places: '9+ Places',
    tours: 'Popular Tours',
    image: './assets/thumb-kerala.png',
    thumbX: '33%',
    thumbY: '44%',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Spiritual',
    x: 58.8,
    y: 39.6,
    description: 'Ancient ghats, temple bells, river rituals, and winding lanes along one of India’s most sacred cities.',
    bestTime: 'Nov - Feb',
    places: '15+ Places',
    tours: 'Popular Tours',
    image: './assets/city-varanasi.png',
    thumbX: '58%',
    thumbY: '43%',
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho',
    state: 'Madhya Pradesh',
    category: 'Heritage',
    x: 50.4,
    y: 48.7,
    description: 'A UNESCO temple town celebrated for sculptural detail, sandstone architecture, and calm garden paths.',
    bestTime: 'Oct - Mar',
    places: '8+ Places',
    tours: 'Popular Tours',
    image: './assets/thumb-temple.png',
    thumbX: '50%',
    thumbY: '52%',
  },
  {
    id: 'ellora',
    name: 'Ellora',
    state: 'Maharashtra',
    category: 'Heritage',
    x: 38.8,
    y: 57.4,
    description: 'Rock-cut caves and monumental shrines carved into basalt cliffs across Buddhist, Hindu, and Jain traditions.',
    bestTime: 'Jun - Mar',
    places: '6+ Places',
    tours: 'Cave Circuits',
    image: './assets/menu-v2-palace.png',
    thumbX: '37%',
    thumbY: '61%',
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    category: 'Adventure',
    x: 45.1,
    y: 70.4,
    description: 'Boulder hills, temple ruins, riverside trails, and wide-open landscapes from the Vijayanagara empire.',
    bestTime: 'Oct - Feb',
    places: '14+ Places',
    tours: 'Popular Tours',
    image: './assets/menu-palace-feature.png',
    thumbX: '44%',
    thumbY: '74%',
  },
  {
    id: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    category: 'Spiritual',
    x: 46.2,
    y: 85.8,
    description: 'A temple city anchored by Meenakshi Amman Temple, flower markets, festive streets, and old Tamil culture.',
    bestTime: 'Oct - Mar',
    places: '7+ Places',
    tours: 'Temple Visits',
    image: './assets/thumb-vaishnav.png',
    thumbX: '44%',
    thumbY: '89%',
  },
];

let selectedId = 'jaipur';
let activeFilter = 'All';
let editing = false;

const pinLayer = document.querySelector('#pinLayer');
const mapWrap = document.querySelector('.map-wrap');
const mapZoomLayer = document.querySelector('#mapZoomLayer');
const filtersNode = document.querySelector('#filters');
const destinationList = document.querySelector('#destinationList');
const detailCard = document.querySelector('#detailCard');
const editToggle = document.querySelector('#editToggle');
const addPin = document.querySelector('#addPin');
const zoomIn = document.querySelector('#zoomIn');
const zoomOut = document.querySelector('#zoomOut');
const resetMap = document.querySelector('#resetMap');
const editorCard = document.querySelector('#editorCard');
const editorTitle = document.querySelector('#editorTitle');
const xSlider = document.querySelector('#xSlider');
const ySlider = document.querySelector('#ySlider');
const xValue = document.querySelector('#xValue');
const yValue = document.querySelector('#yValue');
const pinSizeSlider = document.querySelector('#pinSizeSlider');
const pinIconSlider = document.querySelector('#pinIconSlider');
const pinBorderSlider = document.querySelector('#pinBorderSlider');
const pinSizeValue = document.querySelector('#pinSizeValue');
const pinIconValue = document.querySelector('#pinIconValue');
const pinBorderValue = document.querySelector('#pinBorderValue');
const copyJson = document.querySelector('#copyJson');
const popularOrder = ['jaipur', 'udaipur', 'varanasi', 'hampi', 'khajuraho', 'varanasi', 'hampi', 'khajuraho'];

const detailIcons = {
  heritage: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 5 9h14l-7-5Z" />
      <path d="M7 10v8M11 10v8M15 10v8M19 10v8" />
      <path d="M5 18h14M6 21h12" />
    </svg>
  `,
  attraction: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="6" width="14" height="14" rx="2" />
      <path d="M8 3v6M16 3v6M5 11h14" />
    </svg>
  `,
  places: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.2 3.7 4.2.9-2.9 3.2.4 4.3L12 13.3l-3.9 1.8.4-4.3-2.9-3.2 4.2-.9L12 3Z" />
      <circle cx="12" cy="18.5" r="1.5" />
    </svg>
  `,
  time: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="13" r="7" />
      <path d="M12 9v4l3 2M9 2h6M12 2v3M5 5l2 2M19 5l-2 2" />
    </svg>
  `,
  tours: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M3.5 19c.6-3.5 2.1-5.2 4.5-5.2s3.9 1.7 4.5 5.2" />
      <path d="M11.5 19c.6-3.5 2.1-5.2 4.5-5.2s3.9 1.7 4.5 5.2" />
    </svg>
  `,
};

const mapZoom = {
  min: 1,
  max: 3.2,
  scale: 1,
  x: 0,
  y: 0,
};

const mapDrag = {
  active: false,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
};

const pinStyle = {
  size: 38,
  icon: 17,
  border: 3,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function applyMapZoom() {
  const viewport = mapWrap.getBoundingClientRect();
  const baseWidth = mapZoomLayer.offsetWidth;
  const baseHeight = mapZoomLayer.offsetHeight;
  const offsetX = mapZoomLayer.offsetLeft;
  const offsetY = mapZoomLayer.offsetTop;
  const scaledWidth = baseWidth * mapZoom.scale;
  const scaledHeight = baseHeight * mapZoom.scale;
  const minX = Math.min(0, viewport.width - offsetX - scaledWidth);
  const minY = Math.min(0, viewport.height - offsetY - scaledHeight);

  mapZoom.x = clamp(mapZoom.x, minX, 0);
  mapZoom.y = clamp(mapZoom.y, minY, 0);
  mapZoomLayer.style.setProperty('--map-scale', mapZoom.scale.toFixed(4));
  mapZoomLayer.style.setProperty('--map-x', `${mapZoom.x.toFixed(2)}px`);
  mapZoomLayer.style.setProperty('--map-y', `${mapZoom.y.toFixed(2)}px`);
}

function zoomMapAt(clientX, clientY, nextScale) {
  const viewport = mapWrap.getBoundingClientRect();
  const pointerX = clientX - viewport.left;
  const pointerY = clientY - viewport.top;
  const offsetX = mapZoomLayer.offsetLeft;
  const offsetY = mapZoomLayer.offsetTop;
  const previousScale = mapZoom.scale;
  const scale = clamp(nextScale, mapZoom.min, mapZoom.max);

  if (scale === previousScale) return;

  const imageX = (pointerX - offsetX - mapZoom.x) / previousScale;
  const imageY = (pointerY - offsetY - mapZoom.y) / previousScale;

  mapZoom.scale = scale;
  mapZoom.x = pointerX - offsetX - imageX * scale;
  mapZoom.y = pointerY - offsetY - imageY * scale;
  applyMapZoom();
}

function resetMapZoom() {
  mapZoom.scale = 1;
  mapZoom.x = 0;
  mapZoom.y = 0;
  applyMapZoom();
}

function applyPinStyle() {
  document.documentElement.style.setProperty('--pin-size', `${pinStyle.size}px`);
  document.documentElement.style.setProperty('--pin-icon-size', `${pinStyle.icon}px`);
  document.documentElement.style.setProperty('--pin-border', `${pinStyle.border}px`);
  pinSizeSlider.value = pinStyle.size;
  pinIconSlider.value = pinStyle.icon;
  pinBorderSlider.value = pinStyle.border;
  pinSizeValue.textContent = `${pinStyle.size}px`;
  pinIconValue.textContent = `${pinStyle.icon}px`;
  pinBorderValue.textContent = `${pinStyle.border}px`;
}

function getSelected() {
  return destinations.find((destination) => destination.id === selectedId) || destinations[0];
}

function getVisible() {
  if (activeFilter === 'All') return destinations;
  return destinations.filter((destination) => destination.category === activeFilter);
}

function selectDestination(id) {
  selectedId = id;
  detailCard.hidden = false;
  detailCard.classList.remove('is-open');
  render();
  requestAnimationFrame(() => detailCard.classList.add('is-open'));
}

function renderFilters() {
  if (!filtersNode) return;

  filtersNode.innerHTML = filters
    .map(
      (filter) =>
        `<button class="filter-button ${filter.value === activeFilter ? 'active' : ''}" data-filter="${filter.value}" type="button">${filter.label}</button>`,
    )
    .join('');

  filtersNode.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      render();
    });
  });
}

function renderPins() {
  pinLayer.innerHTML = getVisible()
    .map(
      (destination) => `
        <button
          class="pin ${destination.id === selectedId ? 'active' : ''}"
          data-id="${destination.id}"
          style="--x: ${destination.x}%; --y: ${destination.y}%"
          type="button"
        >
          <span class="pin-icon" aria-hidden="true">
            <img src="./assets/museum-pin.png" alt="" />
          </span>
        </button>
      `,
    )
    .join('');

  pinLayer.querySelectorAll('.pin').forEach((pin) => {
    pin.addEventListener('click', () => selectDestination(pin.dataset.id));
  });
}

function renderDestinationList() {
  const visibleDestinations = getVisible();
  const popularDestinations =
    activeFilter === 'All'
      ? popularOrder
          .map((id) => visibleDestinations.find((destination) => destination.id === id))
          .filter(Boolean)
      : visibleDestinations.slice(0, 5);

  destinationList.innerHTML = popularDestinations
    .map(
      (destination) => `
        <button class="destination-button ${destination.id === selectedId ? 'active' : ''}" data-id="${destination.id}" type="button">
          <span class="destination-thumb" style="background-image: linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.14)), url('${destination.image || './assets/india-destinations-map.png'}')"></span>
          <span>
            <strong>${destination.name}</strong>
            <small>${destination.state}</small>
          </span>
          <span class="destination-pin">⌖</span>
        </button>
      `,
    )
    .join('');

  destinationList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => selectDestination(button.dataset.id));
  });
}

function renderDetail() {
  const destination = getSelected();
  const heroStyle = destination.image
    ? `style="background-image: linear-gradient(180deg, rgba(30, 16, 6, 0.02), rgba(30, 16, 6, 0.18)), url('${destination.image}')"`
    : '';

  detailCard.innerHTML = `
    <div class="detail-hero" ${heroStyle}>
      <button class="close-card" type="button" aria-label="Close">×</button>
    </div>
    <div class="detail-body">
      <div class="detail-head">
        <div>
          <h2>${destination.name}</h2>
          <p class="state">${destination.state}</p>
        </div>
        <span class="tag">${detailIcons.heritage}${destination.category}</span>
      </div>
      <p class="description">${destination.description}</p>
      <div class="stats">
        <div class="stat-item"><span class="stat-icon">${detailIcons.attraction}</span>Top Attraction</div>
        <div class="stat-item"><span class="stat-icon">${detailIcons.places}</span>${destination.places}</div>
        <div class="stat-item"><span class="stat-icon">${detailIcons.time}</span>Best Time</div>
        <div class="stat-item"><span class="stat-icon">${detailIcons.attraction}</span>${destination.bestTime}</div>
        <div class="stat-item"><span class="stat-icon">${detailIcons.tours}</span>${destination.tours}</div>
      </div>
      <button class="cta" type="button"><span>Explore ${destination.name}</span><span aria-hidden="true">→</span></button>
    </div>
  `;

  detailCard.querySelector('.close-card').addEventListener('click', () => {
    detailCard.hidden = true;
  });
}

function renderEditor() {
  const destination = getSelected();
  editorCard.classList.toggle('hidden', !editing);
  editToggle.classList.toggle('active', editing);
  editToggle.textContent = editing ? 'Preview Mode' : 'Edit Pins';

  editorTitle.textContent = destination.name;
  xSlider.value = destination.x;
  ySlider.value = destination.y;
  xValue.textContent = `${destination.x.toFixed(1)}%`;
  yValue.textContent = `${destination.y.toFixed(1)}%`;
  applyPinStyle();
}

function updateSelected(updates) {
  destinations = destinations.map((destination) =>
    destination.id === selectedId ? { ...destination, ...updates } : destination,
  );
  render();
}

function render() {
  renderFilters();
  renderPins();
  renderDestinationList();
  renderDetail();
  renderEditor();
}

editToggle.addEventListener('click', () => {
  editing = !editing;
  render();
});

zoomIn?.addEventListener('click', () => {
  const rect = mapWrap.getBoundingClientRect();
  zoomMapAt(rect.left + rect.width / 2, rect.top + rect.height / 2, mapZoom.scale * 1.18);
});

zoomOut?.addEventListener('click', () => {
  const rect = mapWrap.getBoundingClientRect();
  zoomMapAt(rect.left + rect.width / 2, rect.top + rect.height / 2, mapZoom.scale / 1.18);
});

resetMap?.addEventListener('click', resetMapZoom);

addPin.addEventListener('click', () => {
  const next = destinations.length + 1;
  const pin = {
    id: `custom-${Date.now()}`,
    name: `New Pin ${next}`,
    state: 'Custom Location',
    category: 'Heritage',
    x: 50,
    y: 50,
    description: 'Use the sliders to place this pin, then rename it in your data.',
    bestTime: 'Anytime',
    places: '0 Places',
    tours: 'Draft',
    thumbX: '50%',
    thumbY: '50%',
  };

  destinations = [...destinations, pin];
  selectedId = pin.id;
  activeFilter = 'All';
  editing = true;
  render();
});

xSlider.addEventListener('input', (event) => {
  updateSelected({ x: Number(event.target.value) });
});

ySlider.addEventListener('input', (event) => {
  updateSelected({ y: Number(event.target.value) });
});

pinSizeSlider.addEventListener('input', (event) => {
  pinStyle.size = Number(event.target.value);
  applyPinStyle();
});

pinIconSlider.addEventListener('input', (event) => {
  pinStyle.icon = Number(event.target.value);
  applyPinStyle();
});

pinBorderSlider.addEventListener('input', (event) => {
  pinStyle.border = Number(event.target.value);
  applyPinStyle();
});

copyJson.addEventListener('click', async () => {
  await navigator.clipboard.writeText(JSON.stringify(destinations, null, 2));
  copyJson.textContent = 'Copied JSON';
  window.setTimeout(() => {
    copyJson.textContent = 'Copy Pin JSON';
  }, 1400);
});

mapWrap.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    const factor = direction > 0 ? 1.16 : 1 / 1.16;
    zoomMapAt(event.clientX, event.clientY, mapZoom.scale * factor);
  },
  { passive: false },
);

mapWrap.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;
  mapDrag.active = true;
  mapDrag.startX = event.clientX;
  mapDrag.startY = event.clientY;
  mapDrag.originX = mapZoom.x;
  mapDrag.originY = mapZoom.y;
  mapWrap.classList.add('is-dragging');
  mapWrap.setPointerCapture(event.pointerId);
});

mapWrap.addEventListener('pointermove', (event) => {
  if (!mapDrag.active) return;
  mapZoom.x = mapDrag.originX + event.clientX - mapDrag.startX;
  mapZoom.y = mapDrag.originY + event.clientY - mapDrag.startY;
  applyMapZoom();
});

function endMapDrag(event) {
  if (!mapDrag.active) return;
  mapDrag.active = false;
  mapWrap.classList.remove('is-dragging');
  if (mapWrap.hasPointerCapture(event.pointerId)) {
    mapWrap.releasePointerCapture(event.pointerId);
  }
}

mapWrap.addEventListener('pointerup', endMapDrag);
mapWrap.addEventListener('pointercancel', endMapDrag);
mapWrap.addEventListener('lostpointercapture', () => {
  mapDrag.active = false;
  mapWrap.classList.remove('is-dragging');
});

window.addEventListener('resize', applyMapZoom);

render();
applyMapZoom();
applyPinStyle();
