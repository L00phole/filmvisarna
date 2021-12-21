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
let seatsToBook = [];
let showInfo = {};

//declare variables to set the different prices for each age-group
let ordPrice = 100;
let seniorPrice = 80;
let childPrice = 75;

// declare variables for calculation of the total price
let ordTotalPrice = 0;
let seniorTotalPrice = 0;
let childTotalPrice = 0;
let totalPrice = 0;

// Adds components to show data for the show with the given id
async function selectedShow(showId) {
    // Calls function to get data of the selected show.
    let showInfo = await getSelectedShowData(showId);
    let showInfoDiv = document.getElementById('showInfo');

    // Reads JSON file with auditorium data, gets the total number of
    // seats for the auditorium of the selected show. 
    let auditoriumData = data['auditoriums'].find(aud => aud.name == showInfo.auditorium);
    let auditoriumTotalSeats = auditoriumData.seats;

    // Creates components to display info about the selected show
    movieTitle.innerHTML = showInfo.film;

    let auditorium = document.createElement('p')
    auditorium.innerHTML = showInfo.auditorium;
    showInfoDiv.appendChild(auditorium);

    let dateAndTime = document.createElement('p')
    dateAndTime.innerHTML = showInfo.date + ", " + showInfo.time;
    showInfoDiv.appendChild(dateAndTime);

    // Gets the count of booked seats, and calculates the number of
    // available seats. Creates a component to display it.
    let occupiedSeats = await getSelectedShowOccupiedSeats(showId);
    availableSeatsCount = auditoriumTotalSeats - occupiedSeats.length;
    let availableSeats = document.createElement('p');
    availableSeats.innerHTML = `Antal lediga platser: ${availableSeatsCount}`;
    availableSeats.setAttribute('id', 'availableSeatsCount')
    showInfoDiv.appendChild(availableSeats);

    showInfoDiv.style.fontSize = "25px";

    let seats = freeSeats(auditoriumData, occupiedSeats);

    // Call function to render auditorium
    renderAuditorium(seats);
}

// Renders auditorium and sets classes to components
// async function renderAuditorium(auditoriumData, bookedSeats) {
async function renderAuditorium(seats) {
    // Declares a variable for the container of rows and seats
    let seatsDiv = document.getElementById('seats');
    // Runs a loop for each row, adds a div for each row
    for (let seatsRow of seats) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row')
        // Runs a nested loop for each seat in the row,
        // adds a div for each seat
        for (let seat of seatsRow) {
            let seatDiv = document.createElement('div');
            seatDiv.setAttribute('class', 'seat');
            if (seat == 'x') {
                seatDiv.setAttribute('class', 'seatOccupied');
            }
            else {
                seatDiv.setAttribute('id', seat);
            }
            row.appendChild(seatDiv);
        }
        // Adds the row to the container
        seatsDiv.appendChild(row);
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
            seatsToBook.push(this.id);
        }
        else {
            $(this).removeClass('seatSelected');
            selectedSeatsCount -= 1;
            seatsToSelect += 1;
            seatsToBook.splice(seatsToBook.indexOf(this.id));
        }
        updateSeatsToSelect();
    });
}

// Returns data from the show with the given id
async function getSelectedShowData(showId) {
    showInfo = data['shows'].find(show => show.id == showId);

    return showInfo;
}

// Returns an array with the booked seats for the show with the given show id
async function getSelectedShowOccupiedSeats(showId) {
    console.log(data['bookings']);
    let bookingsInfo = data['bookings'].filter(booking => booking.showId == showId);
    let bookedSeats = [];
    for (let bookingInfo of bookingsInfo) {
        bookedSeats = bookedSeats.concat([...bookingInfo.seats]);
    }

    return bookedSeats;
}

function initButtons() {
    // Add click event to the component with the given id with functionality
    // to keep track of the count of bookings for each category.
    $('#ordCategorySub').click(() => {
        if (ordTickets != 0 && seatsToSelect != 0) {
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
        if (seniorTickets != 0 && seatsToSelect != 0) {
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
        if (childTickets != 0 && seatsToSelect != 0) {
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

    $("#btn").click(function () {
        const infos = { showInfo, seatsToBook, totalPrice }

        book(showInfo.id, seatsToBook);
        JSON._save('booking-conf.json', { infos });
    });
}

// Update component to display how many seats that need to be selected
function updateSeatsToSelect() {
    document.getElementById('seatsToSelect').innerHTML = `Välj säten (${seatsToSelect})`;
    calcPrices();
}

async function calcPrices() {

    ordTotalPrice = ordTickets * ordPrice;
    seniorTotalPrice = seniorTickets * seniorPrice;
    childTotalPrice = childTickets * childPrice;

    totalPrice = ordTotalPrice + childTotalPrice + seniorTotalPrice;

    let totalPriceContainer = document.getElementById('total-price-container');
    totalPriceContainer.innerHTML = totalPrice;

    return totalPrice
}
