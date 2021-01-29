let hotGirlSummer = ["Holes", "National Lampoons Vacation", "The heat of the night", "The Good the Bad and the Ugly", "Avengers", "Mamma Mia", "Sisterhood of traveling pants", "Little Miss Sunshine", "500 Days of Summer", "Parent Trap", "Weekend at Bernies", "Spiderman","Booksmart", "Jaws"]
let BrrrItsColdInHere = []
let PerfectDay = []
let searchButtonEl = document.querySelector("button");

//When I enter my city into the search bar I will fetch the current weather from OpenWeatherAPI

function searchWeather(city){
    let currentWeather = document.querySelector('#current-weather').empty()
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f38f6a7de25e9c5bfba8b768dc8d3f45&units=imperial`)
    .then(response => response.json())
    .then(response => {
        //Check for correct city spelling and if correct run function
        if (response.message === "city not found"){
            alert("City not found, please check your spelling and try again.")
        }else{
            let weatherCard = document.querySelector("#weather-container").addClass('card');
            const cityName = document.querySelector('<h3>').addClass('card-title').text(`${response.name}`)
            const date = $('<h3>').addClass('card-title').text(new Date().toLocaleDateString())
            const icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
            const temp = $('<p>').addClass('card-text').text(`temperature: ${response.main.temp} °F`)
            const humidity = $('<p>').addClass('card-text').text(`humidity: ${response.main.humidity} %`)
            const wind = $('<p>').addClass('card-text').text(`wind-speed: ${response.wind.speed} mph`)
            weatherCard.append(cityName, date, icon, temp, humidity, wind)