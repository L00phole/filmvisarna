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
  // Populate show schedule with the show data from the file shows.json
  populateShowSchedule();
}

// A helper to find things by id (films, shows etc.)
function findById(type, id) {
  return data[type].find(x => x.id === id);
}

readJSON();

let images = 1;
displayimg(images);

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

  image[images - 1].style.display = "block";
}
