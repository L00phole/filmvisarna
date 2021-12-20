function getNavbarHtml() {
    return `
    <header>
        <div class="nav-container">

            <img class="logo" src="/images/logo.jpg" alt="logo"></ul>

            <nav class="nav-list">
                <ul>
                    <li><a href="/">Start</a></li>
                    <li><a href="/movies">Filmer</a></li>
                    <li><a href="/aboutUs">Om oss</a></li>
                    <li><a href="#bottom">kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `
}

function getFooterHtml() {
    return `
    <footer>
        <div id="bottom">
            <br>
            Filmvisarna &nbsp;|&nbsp; Vi finns här:
            <a title="Visa karta i ny flik..." target="_blank" href="https://goo.gl/maps/vvQBHrNetinJYCtLA">Någonstans i
                småland
                10</a>
            , 010-10 01 11 &nbsp;|&nbsp;
            <a title="Maila till oss.." href="mailto:info@filmvisarna.nu">info@Filmvisarna.nu</a>
        </div>
    </footer>
`
}

function renderMovieRefs(films) {
    let container = document.getElementById('moviesContainer');

    for (let film of films) {
        let movieDiv = document.createElement('div');
        movieDiv.setAttribute('class', 'movie');
        movieDiv.setAttribute('id', film.title);
        html = '';
        html += `
            <p>
                <h3>
                    <img id="Dune" src="${film.images}" alt="" width="200px" height="auto">
                    <br><b>${film.title}<b/>
                </h3>
                ${film.shortDescription}<br>
            </p>
        `
        movieDiv.innerHTML = html;

        // Add event listener to movie component
        movieDiv.addEventListener('click', () => {
            window.history.pushState(null, null, 'movie');
            routerWithParam(film.title);
        });

        container.appendChild(movieDiv);
    }
}