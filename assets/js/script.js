let searchButtonEl = document.querySelector("button");

//When I enter my city into the search bar I will fetch the current weather from OpenWeatherAPI


let movieTable = {
    "hot": ["Holes", "Lion+King", "the+hangover", "Grease", "Avengers", "end+of+the+world", "white+chicks", "Little+Miss+Sunshine", "500+Days+of+Summer", "Parent+Trap","the+emperor's+new+groove", "Weekend+at+Bernies", "the+dark+knight", "Booksmart", "Jaws","10+things+i+hate+about+you","the+cat+in+the+hat"],
    "cold": ["Frozen", "Snowpiercer", "Love+Actually", "The+Holiday”, “The+Nightmare+Before+Christmas”, “Knives+Out”, “About+Time”, “Titanic”, “Elf”, “The+Day+After+Tomorrow"],
    "perfect": ["Sandlot", "Almost+Famous", "The+Royal+Tenenbaums", "School+of+rock", "Casino+Royale", "Anchorman", "Up", "Inside-Out", "Boyhood", "Pleasanton", "Remember+the+Titans", "La+La+Land", "Ferris+Bueller", "Palm+Springs", "Forgetting+Sarah+Marshall", "Selena"]
}
//identify ranges for temperature
let coldTempMax = 59
let perfectTempMax = 79;

//call the displayCity function when button is clicked

let appID = "d1dfd9b71c61f4f9b6151a02ee936efa"




document.getElementById('search-button').addEventListener('click', function () {
    console.log('click')
    let searchCity = document.querySelector('#search-bar').value
    console.log(searchCity)
    localStorage.setItem("searchName", searchCity)
    getWeather(searchCity)
    //userSearch(searchCity)
})

function getWeather(searchCity) {

    document.querySelector('.section').empty

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
            let temp = data.main.temp;
            let tempTitle = "";
            if (temp <= coldTempMax) {
                tempTitle = `${temp}  ºF in ${searchCity}. Brr its cold..why you don't grab some hot cocoa and watch...`
                movieTitle = getRandomMovie('cold');
            } else if (temp <= perfectTempMax) {
                tempTitle = `${temp} ºF in ${searchCity}. Weather looks perfect! Lets sit  back and enjoy...`
                movieTitle = getRandomMovie('perfect');
            } else {
                tempTitle = `${temp} ºF in ${searchCity} today! Too hot in here...You shoudl watch..`
                
            }
            //update content for other html fields using ID and textContent to replace values
            $("#temp-title").text(tempTitle);
            populateMovie(movieTitle);
 });
}

//given the temperature string (hot, cold, or perfect) 
//choose a random movie from respective object in movieTable
function getRandomMovie(tempVal) {
    movieList = movieTable[tempVal];
    return movieList[Math.floor(Math.random() * movieList.length)];
}

function populateMovie(movieTitle) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=fc773945&t=${movieTitle}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (movieData) {
            $('.movie-info').empty();
            console.log(movieData);
            $('#movie-title').text(movieData.Title);
            posterEl = document.createElement('img');
            $('.movie-info').append(posterEl);
            $(posterEl).attr('src', movieData.Poster);
        })

}


