// Make a booking
// showId = id of the show to book
// seats should be an array of set numbers
async function book(showId, seats) {

  let availableSeats = freeSeats(showId);

  // We have got an error from freeSeats, just return it
  if (typeof availableSeats === 'string') {
    return availableSeats;
  }

  // Flatten available seats to ONE array (instead of having separate rows)
  availableSeats = availableSeats.flat();

  // Check that all the seats we want to book are available
  for (let seat of seats) {
    if (!availableSeats.includes(seat)) {
      return "Could not perform booking. Seat " + seat + " not available";
    }
  }

  // Create a new booking
  let booking = {
    id: data.bookings.length + 1,
    showId,
    seats
  };

  // Add the booking to the existing bookings
  data.bookings.push(booking);

  // Save the booking to the bookings.json file
  await JSON._save('bookings', data.bookings);

  // Return the booking
  return booking;
}

// Find all free seats for a show
function freeSeats(showId) {
  // Find the show
  let show = findById('shows', showId);
  if (!show) { return 'Show does not exist!'; }

  // Find the auditorium
  let auditorium = data.auditoriums.find(x => x.name = show.auditorium);
  if (!auditorium) { return 'Invalid auditorium in show data!'; }

  // Loop through all bookings to get occupied seats
  let occupiedSeats = [];
  for (let booking of data.bookings) {
    // If it is not the same show then do nothing
    if (booking.showId != showId) { continue; }
    // Add the seats as occupied
    occupiedSeats.push(...booking.seats);
  }

  // Build an array with all seats in the auditorium
  // skapa html element av rows + seats
  // skapa en klass för upptagna säten(occupiedSeats), och en klass för lediga 
  // säten(availableSeats), klasserna 
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