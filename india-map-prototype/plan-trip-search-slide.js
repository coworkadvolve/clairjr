const mobileToggle = document.querySelector('#mobileToggle');
const navShell = document.querySelector('.nav-shell');
const planTripButton = document.querySelector('#planTripButton');
const tripSearch = document.querySelector('#tripSearch');
const tripFocusBackdrop = document.querySelector('#tripFocusBackdrop');
let closeTimer;
let fieldsLayoutTimer;
let fieldsReadyTimer;
let shrinkTimer;
const slideDuration = 680;
const fieldRevealDelay = 560;
const closeFieldDelay = 260;

function finishClose() {
  if (!tripSearch.classList.contains('active')) {
    tripFocusBackdrop.hidden = true;
    document.body.classList.remove('trip-search-closing');
    tripSearch.classList.remove('fields-ready');
    tripSearch.classList.remove('fields-layout');
    tripSearch.setAttribute('aria-hidden', 'true');
  }
}

function openTripSearch() {
  if (tripSearch.classList.contains('active')) return;

  window.clearTimeout(closeTimer);
  window.clearTimeout(fieldsLayoutTimer);
  window.clearTimeout(fieldsReadyTimer);
  window.clearTimeout(shrinkTimer);
  document.body.classList.remove('trip-search-closing');
  tripSearch.classList.remove('fields-ready');
  tripSearch.classList.remove('fields-layout');
  tripFocusBackdrop.hidden = false;

  requestAnimationFrame(() => {
    document.body.classList.add('trip-search-open');
    tripSearch.classList.add('active');
    tripSearch.setAttribute('aria-hidden', 'false');

    fieldsLayoutTimer = window.setTimeout(() => {
      if (tripSearch.classList.contains('active')) {
        tripSearch.classList.add('fields-layout');
        fieldsReadyTimer = window.setTimeout(() => {
          if (tripSearch.classList.contains('active')) {
            tripSearch.classList.add('fields-ready');
          }
        }, 40);
      }
    }, fieldRevealDelay);
  });
}

function closeTripSearch() {
  window.clearTimeout(closeTimer);
  window.clearTimeout(fieldsLayoutTimer);
  window.clearTimeout(fieldsReadyTimer);
  window.clearTimeout(shrinkTimer);
  document.body.classList.add('trip-search-closing');
  tripSearch.classList.remove('fields-ready');

  shrinkTimer = window.setTimeout(() => {
    tripSearch.classList.remove('fields-layout');
    document.body.classList.remove('trip-search-open');
    tripSearch.classList.remove('active');
    closeTimer = window.setTimeout(finishClose, slideDuration + 120);
  }, closeFieldDelay);
}

mobileToggle.addEventListener('click', () => {
  navShell.classList.toggle('open');
});

planTripButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!tripSearch.classList.contains('active')) {
    openTripSearch();
  }
});
tripFocusBackdrop.addEventListener('click', closeTripSearch);
tripSearch.addEventListener('submit', (event) => event.preventDefault());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && tripSearch.classList.contains('active')) {
    closeTripSearch();
  }
});
