$(document).ready(function () {
  function getCity(userCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&appid=1595add4d1ccc2ce38dfcf973ec248ec&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displayCityWeather(response);
      getUvIndex(response);
    });
  }

  function displayCityWeather(arrayOfWeather) {
    $("#cityInfo").text(arrayOfWeather.name);
    $("#temparature").text("Temparature: " + arrayOfWeather.main.temp);
    $("#humidity").text("Humidity: " + arrayOfWeather.main.humidity);
    $("#wind-speed").text("Wind-Speed: " + arrayOfWeather.wind.speed);
    // $("#uv-index").text("UV Index: " + uvIndex.main.temp);
  }

  function getFiveDay(fiveDayForecast) {
    var newQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      fiveDayForecast +
      "&appid=1595add4d1ccc2ce38dfcf973ec248ec&units=imperial&cnt=5";

    $.ajax({
      url: newQueryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displayFiveDay(response);
    });
  }

  function getUvIndex(uvIndex) {
    var uvQueryURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvIndex.coord.lat + "&lon=" + uvIndex.coord.lon + "&appid=1595add4d1ccc2ce38dfcf973ec248ec";

      $.ajax({
          url: uvQueryURL,
          method: "GET",
      }).then(function(response){
          console.log(response)
          $("#uv-index").text("UV Index: " + response.value)
      })
  }

  function displayFiveDay(forecast) {
    var day = 0;
    for (var i = 0; i < forecast.list.length; i++) {
      var newDivRow = $("<div>");
      newDivRow.addClass("row forecast-rows");
      $("#new-rows").append(newDivRow);

      var newDiv = $("<div>");
      newDiv.addClass("card text-white bg-primary mb-3");
      newDiv.css("max-width", "18rem");
      newDiv.attr("id", day++);
      newDivRow.append(newDiv);

      var cardBodyDiv = $("<div>");
      cardBodyDiv.addClass("card-body");
      newDiv.append(cardBodyDiv);

      var cardTitle = $("<h5>");
      cardTitle.addClass("card-title");
      cardTitle.text(moment(parseInt(forecast.list[i].dt * 1000)).format("L"));
      cardBodyDiv.append(cardTitle);

      var forecastTemp = $("<p>");
      var forecastHumid = $("<p>");

      forecastTemp.addClass("card-text");
      forecastHumid.addClass("card-text");

      forecastTemp.text("Temp: " + forecast.list[i].main.temp);
      cardBodyDiv.append(forecastTemp);

      forecastHumid.text("Humidity: " + forecast.list[i].main.humidity + "%");
      cardBodyDiv.append(forecastHumid);
    }
  }

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    $(".forecast-rows").empty();

    var userCityInput = $("#inputCity").val();
    console.log(userCityInput);

    var newLI = $("<li>");

    newLI.text($("#inputCity").val());
    newLI.addClass("list-group-item disabled");

    $(".list-group").append(newLI);

    getCity(userCityInput);
    getFiveDay(userCityInput)
  });
});
