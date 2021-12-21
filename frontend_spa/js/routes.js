let routes = {

    // Home page route
    async start() {
        let partial = await (await fetch('/partials/start.html')).text();
        document.querySelector('main').innerHTML = partial;
        populateShowSchedule();
        carousel();
    },

    // Movies page route
    async movies() {
        let partial = await (await fetch('/partials/movies.html')).text();
        document.querySelector('main').innerHTML = partial;
        renderMovieRefs(data['films']);
    },

    // Movie page route
    async movie(title) {
        let partial = await (await fetch('/partials/movie.html')).text();
        document.querySelector('main').innerHTML = partial;
        renderMovieDescription(title);
        populateFilmShowSchedule(title);
    },

    // About us page route
    async aboutUs() {
        let partial = await (await fetch('/partials/about.html')).text();
        document.querySelector('main').innerHTML = partial;
    },

    // Show page route
    async show(showId) {
        let partial = await (await fetch('/partials/show.html')).text();
        document.querySelector('main').innerHTML = partial;
        selectedShow(showId);
        initButtons();
    }

}