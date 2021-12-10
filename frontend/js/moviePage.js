let movie, poster, titles;

async function startProgram() {
  if (location.pathname.includes('moviePage')) {
    await readJson();
    renderTitle();
    renderTrailer();
    renderDescription();
  }
}
// read the json file and creates a variable called movie with the data from the json
async function readJson() {
  let rawData = await fetch('/frontend/json/films.json')
  movie = await rawData.json();
}

function renderTitle(title) {
  console.log('Running render!');
  document.querySelector('.movie-title').innerHTML =
    movie.map(function (movie) {
      return `
            <h4> title: ${movie.title}</h4>
        `
    }).join('');
}


function renderTrailer() {
  document.querySelector('.movie-trailer-container').innerHTML =
    movie.map(function (movie) {
      return `
      <iframe class="movie-trailer-moviePage" src="${movie.youtubeTrailers}" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `
    }).join('');
}

function renderDescription() {
  document.querySelector('.movie-description-container').innerHTML =
    movie.map(function (movie) {
      return `
      <img src="${movie.images}" alt="${movie.title} poster">
      <p><br> ${movie.actors} </p>
      <p> ${movie.description} </p>
      `
    }).join('');
}

startProgram();
