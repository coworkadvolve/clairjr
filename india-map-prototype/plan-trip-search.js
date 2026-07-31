const mobileToggle = document.querySelector('#mobileToggle');
const navShell = document.querySelector('.nav-shell');
const planTripButton = document.querySelector('#planTripButton');
const tripSearch = document.querySelector('#tripSearch');
const tripFocusBackdrop = document.querySelector('#tripFocusBackdrop');

function openTripSearch() {
  document.body.classList.add('trip-search-open');
  tripFocusBackdrop.hidden = false;
  tripSearch.classList.add('active');
  tripSearch.setAttribute('aria-hidden', 'false');
}

function closeTripSearch() {
  document.body.classList.remove('trip-search-open');
  tripFocusBackdrop.hidden = true;
  tripSearch.classList.remove('active');
  tripSearch.setAttribute('aria-hidden', 'true');
}

mobileToggle.addEventListener('click', () => {
  navShell.classList.toggle('open');
});

planTripButton.addEventListener('click', openTripSearch);
tripFocusBackdrop.addEventListener('click', closeTripSearch);
tripSearch.addEventListener('submit', (event) => event.preventDefault());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && tripSearch.classList.contains('active')) {
    closeTripSearch();
  }
});
