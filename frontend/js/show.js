// declare variables to hold data for ticket counts
let ordTickets = 0;
let seniorTickets = 0;
let childTickets = 0;

let availableSeatsCount = 0;

// Adds components to show data for the show with the given id
async function selectedShow(showId) {
    // Calls function to get data of the selected show.
    let showInfo = await getSelectedShowData(showId);
    let showInfoDiv = document.getElementById('showInfo');

    // Reads JSON file with auditorium data, gets the total number of
    // seats for the auditorium of the selected show. 
    let auditoriumData = await JSON._load('auditoriums.json');
    let auditoriumTotalSeats = auditoriumData.find(aud => aud.name == showInfo.auditorium).seats;

    // Creates components to display info about the selected show
    let film = document.createElement('p')
    film.innerHTML = showInfo.film;
    film.style.fontSize = "40px";
    showInfoDiv.appendChild(film);

    let auditorium = document.createElement('p')
    auditorium.innerHTML = showInfo.auditorium;
    showInfoDiv.appendChild(auditorium);

    let dateAndTime = document.createElement('p')
    dateAndTime.innerHTML = showInfo.date + ", " + showInfo.time;
    showInfoDiv.appendChild(dateAndTime);

    // Gets the count of booked seats, and calculates the number of
    // available seats. Creates a component to display it.
    let bookedSeatsCount = await getSelectedShowBookedSeats(showId);
    availableSeatsCount = auditoriumTotalSeats - bookedSeatsCount.length;
    let availableSeats = document.createElement('p');
    availableSeats.innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    availableSeats.setAttribute('id', 'availableSeatsCount')
    showInfoDiv.appendChild(availableSeats);

    showInfoDiv.style.fontSize = "25px";
}

// Returns data from the show with the given id
async function getSelectedShowData(showId) {
    showData = await JSON._load('shows.json');
    let showInfo = showData.find(show => show.id == showId);

    return showInfo;
}

// Returns an array with the booked seats for the show with the given show id
async function getSelectedShowBookedSeats(showId) {
    bookings = await JSON._load('bookings.json');
    let bookingsInfo = bookings.filter(booking => booking.showId == showId);

    let bookedSeats = [];
    for (let bookingInfo of bookingsInfo) {
        bookedSeats = bookedSeats.concat([...bookingInfo.seats]);
    }

    return bookedSeats;
}

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#ordCategorySub').click(() => {
    if (ordTickets != 0) {
        ordTickets -= 1;
    }

    document.getElementById('ordCategoryCount').innerHTML = ordTickets;
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#ordCategoryAdd').click(() => {
    if (ordTickets < availableSeatsCount) {
        ordTickets += 1;
        availableSeatsCount -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('ordCategoryCount').innerHTML = ordTickets;
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#seniorCategorySub').click(() => {
    if (seniorTickets != 0) {
        seniorTickets -= 1;
    }

    document.getElementById('seniorCategoryCount').innerHTML = seniorTickets;
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#seniorCategoryAdd').click(() => {
    if (seniorTickets < availableSeatsCount) {
        seniorTickets += 1;
        availableSeatsCount -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('seniorCategoryCount').innerHTML = seniorTickets;
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#childCategorySub').click(() => {
    if (childTickets != 0) {
        childTickets -= 1;
    }

    document.getElementById('childCategoryCount').innerHTML = childTickets;
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#childCategoryAdd').click(() => {
    if (childTickets < availableSeatsCount) {
        childTickets += 1;
        availableSeatsCount -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('childCategoryCount').innerHTML = childTickets;
});

// Reads the show id from URLSearchParams and passes it with a call
// to the selectedShow function.
let urlParam = new URLSearchParams(window.location.search);
let url = new URL(window.location.href);
let urlSearchParamsId = url.searchParams.get('id');
selectedShow(urlSearchParamsId);
