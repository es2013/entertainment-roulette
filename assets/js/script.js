let searchButtonEl = document.querySelector("button");

let movieTable = {
    "hot": ["Holes", "National+Lampoons+Vacation", "The+heat+of+the+night", "The+Good+the+Bad+and the+Ugly", "Avengers", "Mamma+Mia", "Sisterhood+of+traveling+pants", "Little+Miss+Sunshine", "500+Days+of Summer", "Parent+Trap", "Weekend+at+Bernies", "Spiderman", "Booksmart", "Jaws"],
    "cold": ["Frozen", "Snowpiercer", "Love+Actually", "The+Holiday”, “The+Nightmare+Before+Christmas”, “Knives+Out”, “About+Time”, “Titanic”, “Elf”, “The+Day+After+Tomorrow"],
    "perfect": ["Sandlot", "Almost+Famous", "The+Royal+Tenenbaums", "School+of+rock", "Casino+Royale", "Anchorman", "Up", "Inside-Out", "Boyhood", "Pleasanton", "Remember+the+Titans", "La+La+Land", "Ferris+Bueller", "Palm+Springs", "Forgetting+Sarah+Marshall", "Selena"]
}
//identify ranges for temperature
let coldTempMax = 59
let perfectTempMax = 79;

//call the displayCity function when button is clicked

let appID = "d1dfd9b71c61f4f9b6151a02ee936efa"

function getWeather() {
    //defaultn to SB for testing purposes
    searchCity = 'Santa Barbara'
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
                tempTitle = `${temp} Brr its cold..why you don't grab some hot cocoa and watch...`
                movieTitle = getRandomMovie('cold');
            } else if (temp <= perfectTempMax) {
                tempTitle = `${temp} ºF Weather looks perfect...why don't you enjoy....`
                movieTitle = getRandomMovie('perfect');
            } else {
                tempTitle = `${temp} ºF today! Here's is a movie for this hot weather`
                movieTitle = getRandomMovie('hot');
            }
            //update content for other html fields using ID and textContent to replace values
            $("#temp-title").text(tempTitle);
            populateMovie(movieTitle);
        })
};

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
            console.log(movieData);
            $('#movie-title').text(movieData.Title);
            posterEl = document.createElement('img');
            $('.movie-info').append(posterEl);
            $(posterEl).attr('src', movieData.Poster);
        })

}


