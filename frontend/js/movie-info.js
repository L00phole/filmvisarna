const FILMS_URL = "/json/films.json";
const IMG_URL = "/images"
const main = document.getElementById("main");

getMovies(FILMS_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);

        showMovies(data);
    })

}

function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, moviehtml, shortDescription, images} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <a href ="${moviehtml}">
        <img src="${images}" alt="${title}"></a>
        <div class="title">
            <h3>${title}</h3>
        </div>

        <div class="overview">
            <h3>Description</h3>
            ${shortDescription}
        </div>
        `

        main.appendChild(movieEl);
    });
}
