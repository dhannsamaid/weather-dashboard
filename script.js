$(document).ready(function() {

    let cityToSearch = ""

    let apikey = "a8399274d821a66647513527414df9b0";
    let currentEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";

    let recentSearches = [];
    if (localStorage.getItem('recentSearches')) {
        console.log('found stored searches');
        recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
        displayRecents();
    }

    // add event listener to submit city search button
    $("#submit").on("click", function(event) {
        event.preventDefault();
        currentWeatherCall($("#city-search-field").val());
    });

    // add event listener to recents
    $("#recent-searches").on('click', function(event) {
        let city = $(event.target).text();
        console.log(city);
        currentWeatherCall(city);
    })

    function currentWeatherCall(city) {

        // add default USA if no country
        cityToSearch = city.toLowerCase();
        let splitCity = [];
        if (cityToSearch.includes(",")) {
            splitCity = cityToSearch.split(",");
            splitCity = splitCity.map(word => word.trim());
            let lastWord = splitCity[splitCity.length - 1];
            if (!lastWord.includes('us')) {
                console.log('does not include us');
                splitCity.push('usa');
            }
            cityToSearch = splitCity.join(", ");
        }
        console.log(">>>>>" + cityToSearch);


        let url = `${currentEndpoint}${cityToSearch}&appid=${apikey}`

        $.ajax({
            method : 'GET',
            url : url,
        }).then(function(response) {
            console.log(response);
            displayCurrent(response);

            // save to recent
            saveToRecent(cityToSearch);

            // display recents
            displayRecents();
        })
    }

    function formatDate(date) {
        let ymd = date.split(" ")[0];
        let ymdSplit = ymd.split("-");
        let month = ymdSplit[1];
        let day = ymdSplit[2];
        let formattedDate = `${month}/${day}`;
        return formattedDate;
    }

    function getIconUrl(iconCode) {
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        return iconUrl;
    }


    function displayCurrent(data) {
        let humidity = data.main.humidity;
        let temp = data.main.temp - 273.15;
        let tempMax = data.main.temp_max - 273.15;
        let tempMin = data.main.temp_min - 273.15;
        let iconCode = data.weather[0].icon;
        let iconUrl = getIconUrl(iconCode);

        $("#current .tempSpan").html(temp.toFixed(2) + ' &deg;C');
        $("#minSpan").html(tempMin.toFixed(2) + ' &deg;C');
        $("#maxSpan").html(tempMax.toFixed(2) + ' &deg;C');
        $("#current img").attr("src", iconUrl);
        $("#current .humidSpan").text(humidity + "%");
    }



    function saveToRecent(city) {
        recentSearches.push(cityToSearch);
        if (recentSearches.length > 5) {
            recentSearches.shift();
        }
        let recentSearchesString = JSON.stringify(recentSearches)
        localStorage.setItem('recentSearches', recentSearchesString);

    }

    function displayRecents() {
        $("#recent-searches").empty();
        recentSearches.forEach(city => {
            let newEl = $("<li>");
            newEl.text(city);
            newEl.addClass("recent-search")
            $("#recent-searches").append(newEl);
        })
    }


//     function displayFiveDay(data) {
//         let date = data.dt_txt;
//         let temp = data.main.temp;
//         let humidity = data.main.humidity;
//         let icon = data.weather[0].icon;
//         let iconUrl = getIconUrl(icon);
//         date = formatDate(date);

//         let dayCast = $("<div>");
//         dayCast.addClass("card");
//         dayCast.append( $("<h4>").text(date) );
//         dayCast.append( $("<img>").attr("src", iconUrl) );
//         dayCast.append( $("<p>").text("Temp: " + temp) );
//         dayCast.append( $("<p>").text("Humidity: " + humidity + "%") );
        

//         $("#5day").append(dayCast);
//     }

});