let movie, poster, titles;

// this function checks if the pathname contains moviePage and if it does starts the program if not then this doesent run. makes it so that
// you can write code for other html files without this taking up extra space.
async function startProgram() {
  if (location.pathname.includes('moviePage')) {
    await readJson();
    renderTitle();
    renderTrailer();
    // renderDescription();
  }
}
// read the json file and creates a variable called movie with the data from the json
async function readJson() {
  let rawData = await fetch('/frontend/json/films.json')
  movie = await rawData.json();
}

function renderTitle() {
  console.log('Running render!');
  document.querySelector('.movie-title-container').innerHTML =
    movie.map(function (movie) {
      return `
            <h4> title: ${movie.title}</h4>
        `
    }).join('');
}

// this like all the other render functions renders a specific part of a json file
function renderTrailer() {
  document.querySelector('.movie-trailer-container').innerHTML =
    movie.map(function (movie) {
      return `
      <iframe class="movie-trailer-moviePage" src="${movie.youtubeTrailers}" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `
    }).join('');
}

/*function renderDescription() {
  document.querySelector('.movie-description-container').innerHTML =
    movie.map(function (movie) {
      return `
      <img src="${movie.images}" alt="${movie.title} poster">
      <p><br> ${movie.actors} </p>
      <p> ${movie.description} </p>
      `
    }).join(''); 
}*/
// runns the program
startProgram();

const moviePoster = document.querySelector(".movie-poster-container")
moviePoster.addEventListener('click', e => {
  renderSpecificDescription();
})

// a function for the eventlistener moviePoster where when u press the poster the information shows up. this is only a test to understand how it is later going to work.
function renderSpecificDescription() {
  document.querySelector('.movie-description-container').innerHTML =
    movie.map(function (movie) {
      return `
      <img src="${movie.images}" alt="${movie.title} poster">
      <p><br> ${movie.actors} </p>
      <p> ${movie.description} </p>
      `
    }).join('');

}