let hotGirlSummer = ["Holes", "National Lampoons Vacation", "The heat of the night", "The Good the Bad and the Ugly", "Avengers", "Mamma Mia", "Sisterhood of traveling pants", "Little Miss Sunshine", "500 Days of Summer", "Parent Trap", "Weekend at Bernies", "Spiderman","Booksmart", "Jaws"]
let BrrrItsColdInHere = []
let PerfectDay = []
let searchButtonEl = document.querySelector("button");

//When I enter my city into the search bar I will fetch the current weather from OpenWeatherAPI




//call the displayCity function when button is clicked
searchButtonEl.addEventListener("click", );


let appID = "d1dfd9b71c61f4f9b6151a02ee936efa"

function getWeather() {
    // Use `.value` to capture the value of the input and store it in the variable
    var searchCity = document.querySelector('#city-input').value;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?&appid=${appID}&q=${searchCity}` + '&units=imperial'

    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //handle error for invalid city inputs
            if (data.cod == 404) {
                alert("Hmmm, sorry, I couldn't identify your city. Try a different city.");
                return;
             }
            let currentWeather = document.querySelector("#current-city");
            document.querySelector("#current-city").textContent = data.name;

            //update content for other html fields using ID and textContent to replace values
            document.querySelector("#temperature").textContent = " " + data.main.temp + " º F";
        })
    };