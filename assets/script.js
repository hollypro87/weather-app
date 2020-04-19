var searchData = (".search-data")
var listOfCities = []
var city
var APIKey = "44b9b6b554c7e48d11ce4a78473fa25a";

function saveCities() {
    localStorage.setItem("cities", JSON.stringify(listOfCities));
}

function renderButtons() {
    $(".buttons-view").empty();
    for (var i = 0; i < listOfCities.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-default city-btn");
        a.attr("data-name", listOfCities[i]);
        a.text(listOfCities[i]);
        $(".buttons-view").prepend(a);
    }
}


$(document).ready(function () {
    if (localStorage.getItem("cities") !== null) {
        var savedCity = localStorage.getItem("cities");
        var pushCities = JSON.parse(savedCity)
        listOfCities = listOfCities.concat(pushCities)
    }

    renderButtons()

    function displayWeather() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".search-data").html("")

            var newDiv = $("<div class='cityWeather'>")
            newDiv.html("<h2>Current Weather</h2><br>")
            searchData.prepend(newDiv)

            var cityName = response.name
            var pOne = $("<p>").html("<h4>" + cityName + "</h4>");
            newDiv.append(pOne)

            var currentDate = moment().format("LLLL")
            var pDate = $("<p>").html("<i>" + currentDate + "</i>");
            newDiv.append(pDate)

            var windSpeed = response.wind.speed
            var pTwo = $("<p>").text("Wind Speed: " + windSpeed.toFixed(0) + " mph");
            newDiv.append(pTwo)

            var humidity = response.main.humidity
            var pThree = $("<p>").text("Humidity: " + humidity.toFixed(0) + " %");
            newDiv.append(pThree)

            var temperature = response.main.temp
            var pFour = $("<p>").text("Temperature: " + temperature.toFixed(0) + " F");
            newDiv.append(pFour)

            var iconImg = $("<img id = 'icon'>")
            $(".weather-icon").append(iconImg)
            var icon = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#icon').attr('src', iconurl);

            var lon = response.coord.lon
            var lat = response.coord.lat

            var uvIndexUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon

            $.ajax({
                url: uvIndexUrl,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value
                var pFive = $("<p id=uvIndex>").text("UV Index: " + uvIndex);
                newDiv.append(pFive)
            })

            if (listOfCities.includes(response.name) === false) {
                listOfCities.push(response.name)
            }

            renderButtons()
            saveCities()
            display5day()
        })
    };


    function display5day() {

        var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey

        $(".fiveDayHeader").html("<h3>5 Day Forecast</h3>")

        $.ajax({
            url: forcastURL,
            method: "GET"
        })
            .then(function (response) {

                var day1date = new Date(response.list[2].dt_txt)
                var day2date = new Date(response.list[10].dt_txt)
                var day3date = new Date(response.list[18].dt_txt)
                var day4date = new Date(response.list[26].dt_txt)
                var day5date = new Date(response.list[34].dt_txt)

                var day1temp = (response.list[2].main.temp * (9 / 5) - 459.67).toFixed(0)
                var day2temp = (response.list[10].main.temp * (9 / 5) - 459.67).toFixed(0)
                var day3temp = (response.list[18].main.temp * (9 / 5) - 459.67).toFixed(0)
                var day4temp = (response.list[26].main.temp * (9 / 5) - 459.67).toFixed(0)
                var day5temp = (response.list[34].main.temp * (9 / 5) - 459.67).toFixed(0)

                var day1hum = (response.list[2].main.humidity).toFixed(0)
                var day2hum = (response.list[10].main.humidity).toFixed(0)
                var day3hum = (response.list[18].main.humidity).toFixed(0)
                var day4hum = (response.list[26].main.humidity).toFixed(0)
                var day5hum = (response.list[34].main.humidity).toFixed(0)

                var day1icon = "http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png";
                var day2icon = "http://openweathermap.org/img/w/" + response.list[10].weather[0].icon + ".png";
                var day3icon = "http://openweathermap.org/img/w/" + response.list[18].weather[0].icon + ".png";
                var day4icon = "http://openweathermap.org/img/w/" + response.list[26].weather[0].icon + ".png";
                var day5icon = "http://openweathermap.org/img/w/" + response.list[34].weather[0].icon + ".png";

                $('.day1-icon').attr('src', day1icon);
                $('.day2-icon').attr('src', day2icon);
                $('.day3-icon').attr('src', day3icon);
                $('.day4-icon').attr('src', day4icon);
                $('.day5-icon').attr('src', day5icon);

                $(".day1").html("<br/>" + "<b>" + moment(day1date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day1temp + " F </br>" + "Humidity: " + day1hum + " %")
                $(".day2").html("<br/>" + "<b>" + moment(day2date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day2temp + " F </br>" + "Humidity: " + day2hum + " %")
                $(".day3").html("<br/>" + "<b>" + moment(day3date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day3temp + " F </br>" + "Humidity: " + day3hum + " %")
                $(".day4").html("<br/>" + "<b>" + moment(day4date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day4temp + " F </br>" + "Humidity: " + day4hum + " %")
                $(".day5").html("<br/>" + "<b>" + moment(day5date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day5temp + " F </br>" + "Humidity: " + day5hum + " %")
            })
    }

    $("#run-search").on("click", function () {
        city = $("#search-term").val();
        displayWeather()
        display5day()
    })


    $(document).on("click", ".city-btn", function () {
        city = $(this).attr("data-name");
        displayWeather()
        display5day()
    })


    $("#clear-search").on("click", function () {
        localStorage.clear("cities")
        listOfCities = []
        $(".buttons-view").empty()

        location.reload()
    })



})