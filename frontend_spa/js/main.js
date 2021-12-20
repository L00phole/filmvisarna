let films, shows, auditoriums, bookings

// A global variable to store all data in
let data = {};

async function readJSON() {
  // Read json and put in the data variable
  for (let type of ['films', 'shows', 'auditoriums', 'bookings']) {
    data[type] = await JSON._load(type + '.json');
  }

  // Calls function to create a show schedule for n(4) given weeks.
  //createShowSchedule(4);
}

// A helper to find things by id (films, shows etc.)
function findById(type, id) {
  return data[type].find(x => x.id === id);
}

// HTML elements to display on every page
document.getElementById('navigation').innerHTML = getNavbarHtml();
document.getElementById('bottom').innerHTML = getFooterHtml();

readJSON();

let images = 1;

function nextimg(n) {
  displayimg(images += n)
}

function currentSlide(n) {
  displayimg(images = n)
}

function displayimg(n) {
  let i;
  let image = document.getElementsByClassName("image");

  if (n > image.length) {
    images = 1;
  }

  if (n < 1) {
    images = image.length;
  }

  for (i = 0; i < image.length; i++) {
    image[i].style.display = "none";
  }

  //image[images - 1].style.display = "block";
}

document.querySelector('body').addEventListener('click', function (event) {
  let aTag = event.target.closest('a');

  // do nothing if not click on an a-tag
  if (!aTag) { return; }

  let href = aTag.getAttribute('href');

  // if external link open in new tab and follow
  if (href.indexOf('http') === 0) {
    aTag.setAttribute('target', '_blank');
    return;
  }

  // event also contains methods
  // like preventDefault -> prevent the default behavior
  event.preventDefault();

  // Using HTML5 history
  // Add the href value in our url
  history.pushState(null, null, href);

  // Call the router
  router();
});

function router() {
  let route = location.pathname;

  route = route === '/index.html' ? '/' : route;

  route = route.slice(1) || 'start';

  route = route.split('-').map((x, i) => i > 0 ? x[0].toUpperCase() + x.slice(1) : x).join('');

  routes[route]();
}

function routerWithParam(param) {
  let route = location.pathname;

  route = route === '/index.html' ? '/' : route;

  route = route.slice(1) || 'start';

  route = route.split('-').map((x, i) => i > 0 ? x[0].toUpperCase() + x.slice(1) : x).join('');

  routes[route](param);
}

router();

// Call the router on navigation back/forward
window.addEventListener('popstate', router);
