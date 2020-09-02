$(document).ready(function() {






    // add event listener to submit city search button
    $("#submit").on("click", function(event) {
        
        event.preventDefault();

        // set up weatherAPI call
        let url = "https://api.openweathermap.org/data/2.5/onecall?"

        //add APIkey
        let key = "a8399274d821a66647513527414df9b0";
        url += "appid=" + key;

        //get daily forecasts
        url += "&part=daily";

        let city2search = $("#city-search-field").val();
        url += "&q=" + city2search;

        $.ajax({
            method : 'GET',
            url : url,
        }).then(function(response) {
            console.log(response);
        })



    });

});