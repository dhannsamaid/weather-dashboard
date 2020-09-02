$(document).ready(function() {

    // add event listener to submit city search button
    $("#submit").on("click", function(event) {
        
        event.preventDefault();

        // set up weatherAPI call
        let url = "https://api.openweathermap.org/data/2.5/forecast?"

        let city2search = $("#city-search-field").val();
        url += "&q=" + city2search;

        // add APIkey
        let key = "a8399274d821a66647513527414df9b0";
        url += "&appid=" + key;

        $.ajax({
            method : 'GET',
            url : url,
            SameSite : 'none',
        }).then(function(response) {
            $("#5day").empty();
            
            // 5 days of weather 
            for(let i=0; i<5; i++) {
                let data = response.list[i];
                displayData(data);
            }
        })
    });

    function formatDate(date) {
        let ymd = date.split(" ")[0];
        let ymdSplit = ymd.split("-");
        let month = ymdSplit[1];
        let day = ymdSplit[2];
        let formattedDate = `${month}/${day}`;
        return formattedDate;
    }

    function getIconUrl(iconCode) {
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        return iconUrl;
    }

    function displayData(data) {
        let date = data.dt_txt;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let icon = data.weather[0].icon;
        let iconUrl = getIconUrl(icon);
        date = formatDate(date);

        let dayCast = $("<div>");
        dayCast.append( $("<h4>").text(date) );
        dayCast.append( $("<img>").attr("src", iconUrl) );
        dayCast.append( $("<p>").text("Temp: " + temp) );
        dayCast.append( $("<p>").text("Humidity: " + humidity + "%") );

        $("#5day").append(dayCast);
    }

});