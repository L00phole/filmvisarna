// showId = id of the show to book
// seats should be an array of set numbers
async function book(showId, seats) {
  showId = parseInt(showId);
  seats = seats.map(x => parseInt(x));

  // Create a new booking
  let booking = {
    id: data['bookings'].length + 1,
    showId,
    seats
  };

  // Add the booking to the existing bookings
  data['bookings'].push(booking);

  // Save the booking to the bookings.json file
  await JSON._save('bookings', data['bookings']);

  return booking
}
let bookingInfo;

// Find all free seats for a show
function freeSeats(auditorium, occupiedSeats) {
  // Build an array with all seats in the auditorium
  let seats = [], seatNumber = 1;
  for (seatsInARow of auditorium.seatsPerRow) {
    let row = [];
    seats.push(row);
    for (let i = 0; i < seatsInARow; i++) {
      row.push(occupiedSeats.includes(seatNumber) ? 'x' : seatNumber);
      seatNumber++;
    }
  }
  return seats;
}

async function startTicketRender() {
  await readJson();
  renderTicket();
}

// read the json file and creates a variable called movie with the data from the json
async function readJson() {
  let rawData = await fetch('/json/booking-conf.json')
  bookingInfo = await rawData.json();
}

function renderTicket() {
  console.log('Running render!');
  console.log(bookingInfo.title);
  document.querySelector('.bookingsContainer').innerHTML =
    bookingInfo.map(function (bookingInfo) {
      return `
            <h4> film: ${bookingInfo.film}</h4>
            <h4> salong: ${bookingInfo.auditorium}</h4>
            <h4> datum: ${bookingInfo.date}</h4>
            <h4> time: ${bookingInfo.time}</h4>
            <h4> booked seats: ${bookingInfo.seatsToBook}</h4>
            <h4> pris: ${bookingInfo.totalPrice}</h4>
        `
    }).join('');
}

