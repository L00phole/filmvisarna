let films, shows, auditoriums, bookings

// A global variable to store all data in
let data = {};

async function readJSON() {
  // Read json and put in the data variable
  for (let type of ['films', 'shows', 'auditoriums', 'bookings']) {
    data[type] = await JSON._load(type + '.json');
  }

  // Run start function
  createShowSchedule(4);
}

// A helper to find things by id (films, shows etc.)
function findById(type, id) {
  return data[type].find(x => x.id === id);
}

function selectedShow(show) {
  console.log("Gå till salong för visningen: ");
  console.log(show);
}

/*async function start() {
  // Calls function to create a show schedule for n(4) given weeks.
  createShowSchedule(4);
  //console.log(findById('auditoriums', 2));
  //console.log(await book(1, [30, 80, 81]));
  console.log(freeSeats(1));
  console.log(freeSeats(2));
  console.log(freeSeats(3));
  console.log(freeSeats(4));
}*/

readJSON();

let images =1;
displayimg(images);

function nextimg(n){
    displayimg(images += n)
}

function currentSlide(n){
    displayimg(images = n)
}

function displayimg(n){
    let i;
    let image = document.getElementsByClassName("image");

    if(n > image.length){
        images = 1;
    }

    if(n < 1){
        images = image.length;
    }

    for(i=0; i < image.length; i++){
        image[i].style.display = "none";
    }

    image[images - 1].style.display ="block";
}