async function selectedShow(showId) {
    showData = await JSON._load('shows.json');
    let showInfoDiv = document.getElementById('show');
    let showInfo = showData.find(show => show.id == showId);

    let film = document.createElement('p')
    film.innerHTML = showInfo.film;
    showInfoDiv.appendChild(film);

    let auditorium = document.createElement('p')
    auditorium.innerHTML = showInfo.auditorium;
    showInfoDiv.appendChild(auditorium);

    let date = document.createElement('p')
    date.innerHTML = showInfo.date;
    showInfoDiv.appendChild(date);

    let time = document.createElement('p')
    time.innerHTML = showInfo.time;
    showInfoDiv.appendChild(time);
}

let urlParam = new URLSearchParams(window.location.search);
let url = new URL(window.location.href);
let urlSearchParamsId = url.searchParams.get('id');
selectedShow(urlSearchParamsId);
