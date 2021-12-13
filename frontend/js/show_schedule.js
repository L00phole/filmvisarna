// A function that creates a schedule for shows, 3 shows in 2 auditoriums
// will be scheduled for each day.
// Param weeks: integer, the number of weeks to create a schedule for
async function createShowSchedule(weeks) {
    // Number of days to make a schedule for
    let days = 7 * weeks;

    // 3 shows in each of the 2 auditoriums
    let totalShows = days * (3 * 2);

    // Variable that holds the number of films
    let numOfFilms = data['films'].length;
    let filmIdGen = 1;

    // Date object that is initialized with the current date
    let date = new Date(2021, 11, 22);
    // The first show each day starts at 18.00
    date.setHours(18);
    date.setMinutes(0);

    // Array to store shows in
    let shows = [];
    //let shows = [data['shows'][0]];
    //console.log(shows);
    for (let showId = 1; showId <= totalShows; showId++) {

        let auditorium = "";
        // Shows with an even id will be shown at "Stora Salongen"
        if (showId % 2 == 0) {
            auditorium = "Stora Salongen";
        }
        // Shows with an uneven id will be shown at "Lilla Salongen"
        else {
            auditorium = "Lilla Salongen";
        }

        // Find the title of the film with the id matching filmIdGen
        let film = data['films'].find((film => film.id === filmIdGen));
        // If filmIdGen has the same value as the total number of films, 
        // filmIdGen will be set to 1 again, else increment it by 1.
        if (filmIdGen == numOfFilms) {
            filmIdGen = 1;
        }
        else {
            filmIdGen++;
        }

        // If the hour of the date object is less than 18 it is set to 18,
        // and the minutes is set to 0.
        if (date.getHours() < 18) {
            date.setHours(18);
            date.setMinutes(00);
        }
        // Assign two variables the date and time as strings
        //let dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        let dateString = date.toISOString().slice(0, 10);
        let time = `${date.getHours()}:${date.getMinutes()}`;
        if (date.getMinutes() == 0) {
            time = `${date.getHours()}:${date.getMinutes()}0`;
        }

        // Create an object with the show data and add it to the array of shows.
        let show = {
            "id": showId,
            "auditorium": auditorium,
            "film": film.title,
            "date": dateString,
            "time": time
        }
        shows.push(show);

        // If the showId is an even number the hour and minutes of the date
        // object is incremented by 2 and 30 (this needs to be adapting with
        // considerations of the movie lengths).
        if (showId % 2 == 0) {
            date.setHours(date.getHours() + 2);
            date.setMinutes(date.getMinutes() + 30);
        }
    }
    // Overwrite data['shows'] with the new schedule.
    // Beware that if the date is initialized with a different
    // date given as argument, the whole schedule might change.
    // If a static schedule is required, write the "shows" object
    // to the "shows.json" file and don't run this function when
    // the web site is launched.
    data['shows'] = shows;
    // Save data['shows'] to shows.json
    await JSON._save('shows.json', data['shows']);

    populateShowSchedule();
}

const showSelectedDateSchedule = (value) => {
    // Finds the shows with selected date
    let shows = data['shows'].filter(show => show.date == value);

    // Containers to store info about the shows
    let showInfoContainer = document.getElementById('showSchedule');
    document.getElementById('showInfo').innerHTML = "";
    let showInfo = document.getElementById('showInfo');
    // Iterates over the shows and creates div elements to store
    // info about them.
    for (let show of shows) {
        let showDiv = document.createElement('div');
        showDiv.innerHTML += `
            ${show.film}
            </br>
            Tid: ${show.time}
            </br>
            Salong: ${show.auditorium}
        `;
        showDiv.style.border = "solid 1px";
        showDiv.style.borderRadius = "5px";
        showDiv.style.padding = "5px";
        showDiv.style.marginTop = "8px";
        showInfo.appendChild(showDiv);

        // Add an on click event to the recently created div,
        // redirect to the clicked movies' seat booking page
        showDiv.setAttribute('id', 'showDiv_' + show.id);
        $('#showDiv_' + show.id).on("click", function () {
            // Assigns the window location the current location and adds show.html with
            // a show id parameter.
            window.location.assign(`${window.location}show.html?id=${show.id}`);
        });
        // Adds mouseenter and mouseleave events with some styling functionality
        $('#showDiv_' + show.id).on("mouseenter", function () {
            document.getElementById('showDiv_' + show.id).style.textDecoration = "underline";
            document.getElementById('showDiv_' + show.id).style.cursor = "pointer";
        });
        $('#showDiv_' + show.id).on("mouseleave", function () {
            document.getElementById('showDiv_' + show.id).style.textDecoration = "";
        });
    }

    showInfoContainer.appendChild(showInfo);
};

// A function that populates a component that displays a show schedule
function populateShowSchedule() {
    // Gets the unique dates from the 'date' field of data['shows']
    let dates = new Set(data['shows'].map(data => data.date));

    // The container component for dates
    let dateContainer = document.getElementById('dateSelect');
    // Iterates through the set of dates and adds an option element to the container
    // with every date
    for (let date of dates) {
        let option = document.createElement('option', date);
        option.innerHTML = date;
        dateContainer.appendChild(option);
    }

    const value = dates.values().next().value;
    dateContainer.value = value;
    showSelectedDateSchedule(value);
}

// Function reacting on changes of the dateSelect component
$('#dateSelect').on('change', (e) => {
    showSelectedDateSchedule(e.target.value);
});
