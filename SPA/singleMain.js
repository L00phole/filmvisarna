// An example of creating a Single Page Application (SPA)
// by using hash links and listening to hash changes
// (note: an alternative if you don't want hash links is
// the HTML5 history api, bit it si slighly more complex)

function reactOnHashChange() {
  let pageToDisplay = location.hash || 'start';
  pageToDisplay = pageToDisplay.replace('#', '');
  // if the hash starts with film call the film function
  // with the number after '-' as a parameter
  if (pageToDisplay.indexOf('film') === 0) {
    let filmId = +pageToDisplay.split('-')[1];
    film(filmId);
    return;
  }
  // call a function that has the same name as the page to display
  window[pageToDisplay]();
}


let films, shows, auditoriums, bookings;
async function readJson() {
  let rawData = await fetch('/SPA/movies.json')
  films = await rawData.json();
}

// Start page
function start() {
  $('main').html(` 
    <h1>Här ska första sidan vara.</h1>
  `);
}

// Products page
function products() {
  $('main').html(`
    
  `);
  // List the films
  let html = '';
  for (let film of films) {
    html += `<div class="movie"><p><a href="#film-${film.id}"><h3><img id="Dune" src="${film.images}" alt="" width="200px" height="auto" ><br><b>${film.title}<b/></h3>${film.shortDescription}<br></a></p></div>`
  }
  $('main').append(html);
}

// About us page
function aboutus() {
  $('main').html(`
    <div id="navigation"></div>
  <div class="content-container">
    <div class="image right">
       <img src="/frontend/images/filmvisarna.jpg" alt="image of grand entré" width="300px" height="auto"/>
    </div>
  <h2>Om Filmvisarna</h2>
    <p>
       It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </p>
    <p>
       It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </p>
    <div class="image left">
       <img src="/frontend/images/filmvisarna1.jpg" alt="image of cinema hall" width="300px" height="auto"/>
    </div>
    <div class="text">
    <h4>What is Lorem Ipsum?</h4>
    <p>
       It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </p>
  </div>
 </div>
  `);
}

function bottom() {
  $('main').html(` 
    <h1>TEST TEST</h1>
  `);
}


// Show info about a film
function film(id) {
  let film = films.find(x => x.id == id);
  $('main').html(`
    <iframe class="movie-trailer" src="${film.youtubeTrailers}" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
  
    <div class="container__block">
  <img class="about-movie-poster" src="${film.images}" alt="${film.title}" width="350px"  heigth="auto">


  <div class="container__media">

    <div id="content">
      <h3><b>${film.title}</B></h3><br>
      <p><b>År: </b>${film.productionYear}</p><br>
      <p><b>Speltid: </b>${film.length} min.</p><br>
      <p><b>Genre: </b>${film.genre}</p><br>
      <p><b>Utgivare: </b>${film.distributor}</p><br>
      <p><b>Språk: </b>${film.language}</p><br>
      <p><b>Undertext: </b>${film.subtitles}</p><br>
      <p><b>Skapad av: </b>${film.director}</p><br>
      <p><b>Skådespelare: </b>${film.actors}</p><br>
      <p><b>Handling: </b>${film.description}</p><br>
      <p><b>Recensioner: </b></p>
      <p><b><em>${film.reviews[0].source}</em></b></p>
      <p><em>${film.reviews[0].quote}</em></p>
      <p>Betyg: ${film.reviews[0].stars}/5</p>
      <p><b><a href="${film.reviews[0].sourceLink}"><u>Läs hela recensionen här.</u></a></b></p><br>
      <p><b><em>${film.reviews[1].source}</em></b></p>
      <p><em>${film.reviews[1].quote}</em></p>
      <p>Betyg: ${film.reviews[1].stars}/5</p>
      <p><b><a href="${film.reviews[1].sourceLink}"><u>Läs hela recensionen här.</u></a></b></p><br>
      <p><b><em>${film.reviews[2].source}</em></b></p>
      <p><em>${film.reviews[2].quote}</em></p>
      <p>Betyg: ${film.reviews[2].stars}/5</p>
      <p><b><a href="${film.reviews[2].sourceLink}"><u>Läs hela recensionen här.</u></a></b></p><br>
    </div>
  </div>
  <div class="container__content dropdown">
    <button>
      <h><b>Boka Visning</b></h>
    </button>


    <div class="dropdown__content">
      <div id="filmSchedule"></div>

    </div>
    
  </div>

  `);
}
// Listen to the hash change event
window.onhashchange = reactOnHashChange;
// And also call reactOnHashChange on initial page load
reactOnHashChange();
//From movie.js
let data = {};

async function readJSON(filmTitle) {
  // Read json and put in the data variable
  for (let type of ['shows', 'auditoriums', 'bookings']) {
    data[type] = await JSON._load('frontend/json' + type + '.json');
  }

  populateFilmShowSchedule(filmTitle);
}

// Populates a component with a filmschedule for the given title.
function populateFilmShowSchedule(filmTitle) {
  let container = document.getElementById('filmSchedule');

  let showsH = document.createElement('h1');
  showsH.innerHTML = "Visningar";
  container.append(showsH);

  let filmSchedule = document.createElement('div');
  filmSchedule.setAttribute('class', 'filmScheduleDiv');
  container.appendChild(filmSchedule);

  // Iterate over the shows
  for (let show of data['shows']) {
    // If show['film'] is the same as the given argument for filmTitle
    // create elements for displaying data for the show.
    if (show['film'] == filmTitle) {
      // Creates div component to display show data in, and sets attributes
      // for class and id
      let showDataDiv = document.createElement('div');
      showDataDiv.setAttribute('class', 'showDataDiv')
      showDataDiv.setAttribute('id', 'showDataDiv_' + show.id);

      let date = document.createElement('span');
      date.innerHTML = show['date'];
      date.setAttribute('class', 'filmScheduleSpan');
      let time = document.createElement('span')
      time.innerHTML = show['time'];
      time.setAttribute('class', 'filmScheduleSpan');
      date.appendChild(time);
      let auditorium = document.createElement('span')
      auditorium.innerHTML = show['auditorium']
      auditorium.setAttribute('class', 'filmScheduleSpan');

      showDataDiv.appendChild(date);
      showDataDiv.appendChild(auditorium);
      showDataDiv.style.backgroundColor = "darkgrey";

      filmSchedule.appendChild(showDataDiv);

      // Add click event to to showDataDiv, the event redirects to the page
      // for the selected show.
      $('#showDataDiv_' + show.id).on("click", function () {
        window.location.assign(`${window.location['origin']}/show.html?id=${show.id}`);
      });
    }
  }

  container.style.alignContent = "center";
  container.style.textAlign = "center";
}

