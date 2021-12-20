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
                window.history.pushState(null, null, 'show');
                routerWithParam(show.id);
            });
        }
    }

    container.style.alignContent = "center";
    container.style.textAlign = "center";
}

function renderMovieDescription(title) {
    let testContainer = document.getElementById('testContainer');
    let film = data['films'].find(x => x.title == title);
    testContainer.innerHTML = `
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
  `
}