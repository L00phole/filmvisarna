// Declare variables to hold data for ticket counts
let ordTickets = 0;
let seniorTickets = 0;
let childTickets = 0;

// Declare variables to keep track of available seats, the number
// of seats the user needs to select, and the number of seats that
// has been selected
let availableSeatsCount = 0;
let seatsToSelect = 0;
let selectedSeatsCount = 0;

// Adds components to show data for the show with the given id
async function selectedShow(showId) {
    // Calls function to get data of the selected show.
    let showInfo = await getSelectedShowData(showId);
    let showInfoDiv = document.getElementById('showInfo');

    // Reads JSON file with auditorium data, gets the total number of
    // seats for the auditorium of the selected show. 
    let auditoriumData = await JSON._load('auditoriums.json');
    auditoriumData = auditoriumData.find(aud => aud.name == showInfo.auditorium);
    let auditoriumTotalSeats = auditoriumData.seats;

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

    renderAuditorium(auditoriumData);
}

// Renders auditorium and sets classes to components
function renderAuditorium(auditoriumData) {
    // Declares a variable for the container of rows and seats
    let seats = document.getElementById('seats');
    // Runs a loop for each row in the auditorium, adds a div for each row
    for (let i = 0; i < auditoriumData.seatsPerRow.length; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row')
        // Nested loop that runs as many times as there are seats in the row,
        // adds a div for each seat
        for (let j = 0; j < auditoriumData.seatsPerRow[i]; j++) {
            let seat = document.createElement('div');
            seat.setAttribute('class', 'seat');
            seat.setAttribute('id', `seat_${i}_${j}`);
            row.appendChild(seat);
        }
        // Adds the row to the container
        seats.appendChild(row);
    }

    // Add events to select and deselect seats
    $('.seat').click(function () {
        if ($(this).attr('class') == 'seat') {
            if (seatsToSelect < 1) {
                return;
            }
            $(this).addClass('seatSelected');
            selectedSeatsCount += 1;
            seatsToSelect -= 1;
        }
        else {
            $(this).removeClass('seatSelected');
            selectedSeatsCount -= 1;
            seatsToSelect += 1;
        }
        updateSeatsToSelect();
    });
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
        availableSeatsCount += 1;
        seatsToSelect -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('ordCategoryCount').innerHTML = ordTickets;
    updateSeatsToSelect();
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#ordCategoryAdd').click(() => {
    if (ordTickets < availableSeatsCount) {
        ordTickets += 1;
        availableSeatsCount -= 1;
        seatsToSelect += 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('ordCategoryCount').innerHTML = ordTickets;
    updateSeatsToSelect();
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#seniorCategorySub').click(() => {
    if (seniorTickets != 0) {
        seniorTickets -= 1;
        availableSeatsCount += 1;
        seatsToSelect -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('seniorCategoryCount').innerHTML = seniorTickets;
    updateSeatsToSelect();
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#seniorCategoryAdd').click(() => {
    if (seniorTickets < availableSeatsCount) {
        seniorTickets += 1;
        availableSeatsCount -= 1;
        seatsToSelect += 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('seniorCategoryCount').innerHTML = seniorTickets;
    updateSeatsToSelect();
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#childCategorySub').click(() => {
    if (childTickets != 0) {
        childTickets -= 1;
        availableSeatsCount += 1;
        seatsToSelect -= 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('childCategoryCount').innerHTML = childTickets;
    updateSeatsToSelect();
});

// Add click event to the component with the given id with functionality
// to keep track of the count of bookings for each category.
$('#childCategoryAdd').click(() => {
    if (childTickets < availableSeatsCount) {
        childTickets += 1;
        availableSeatsCount -= 1;
        seatsToSelect += 1;
        document.getElementById('availableSeatsCount').innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    }

    document.getElementById('childCategoryCount').innerHTML = childTickets;
    updateSeatsToSelect();
});

// Update component to display how many seats that need to be selected
function updateSeatsToSelect() {
    document.getElementById('seatsToSelect').innerHTML = `Välj säten (${seatsToSelect})`;
}

// Reads the show id from URLSearchParams and passes it with a call
// to the selectedShow function.
let urlParam = new URLSearchParams(window.location.search);
let url = new URL(window.location.href);
let urlSearchParamsId = url.searchParams.get('id');
selectedShow(urlSearchParamsId);
