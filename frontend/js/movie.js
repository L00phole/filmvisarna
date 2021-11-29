let films, shows, auditoriums, bookings

// A global variable to store all data in
let data = {};

async function readJSON(filmTitle) {
    // Read json and put in the data variable
    for (let type of ['films', 'shows', 'auditoriums', 'bookings']) {
        data[type] = await JSON._load(type + '.json');
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

    console.log(data['shows']);
    // Iterate over the shows
    for (let show of data['shows']) {
        // If show['film'] is the same as the given argument for filmTitle
        // create elements for displaying data for the show.
        if (show['film'] == filmTitle) {
            let showDataDiv = document.createElement('div');
            showDataDiv.setAttribute('class', 'showDataDiv')

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
            filmSchedule.appendChild(showDataDiv);
        }
    }

    container.style.alignContent = "center";
    container.style.textAlign = "center";
}