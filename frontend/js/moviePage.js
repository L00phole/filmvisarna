let movie;

async function startProgram() {
  if (location.pathname.includes('moviePage')) {
    await readJson();
    renderTitle();
    renderTrailer();
  }
}
// read the json file and creates a variable called movie with the data from the json
async function readJson() {
  let rawData = await fetch('/frontend/json/films.json')
  movie = await rawData.json();
}

function renderTitle() {
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
      <iframe src="${movie.youtubeTrailers}" frameborder="0"></iframe>
      `
    }).join('');
}

startProgram();
