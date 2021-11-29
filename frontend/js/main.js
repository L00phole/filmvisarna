let films, shows, auditoriums, bookings

// A global variable to store all data in
let data = {};

async function readJSON() {
  // Read json and put in the data variable
  for (let type of ['films', /*'shows',*/ 'auditoriums', 'bookings']) {
    data[type] = await JSON._load(type + '.json');
  }

  // Calls function to create a show schedule for n(4) given weeks.
  createShowSchedule(4);
}

// A helper to find things by id (films, shows etc.)
function findById(type, id) {
  return data[type].find(x => x.id === id);
}

readJSON();
