// showId = id of the show to book
// seats should be an array of set numbers
async function book(showId, seats) {
  showId = parseInt(showId);
  seats = seats.map(x => parseInt(x));

  // Create a new booking
  let booking = {
    id: bookings.length + 1,
    showId,
    seats
  };

  // Add the booking to the existing bookings
  bookings.push(booking);

  // Save the booking to the bookings.json file
  await JSON._save('bookings', bookings);

  // Return the booking
  return booking;
}

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
