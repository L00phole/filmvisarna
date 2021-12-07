let movies;

async function startProgram(){
if(location.pathname.includes('moviePage')){
    await readJson();
    render();
}
}

async function readJson(){
    let rawData = await fetch('/frontend/json/films.json')
    movies = await rawData.json();
}

function render(){
    console.log('Running render!');
    document.querySelector('.movie-description').innerHTML =
      movies.map(function (movie) {
        return `
          <div class="movie-description">
            <h4> title: ${movie.title}</h4>
          </div>
        `
    }).join('');
}

startProgram();
