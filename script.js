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
    });
  }

  function displayCityWeather(arrayOfWeather) {
    $("#cityInfo").text(arrayOfWeather.name);
    $("#temparature").text("Temparature: " + arrayOfWeather.main.temp);
    $("#humidity").text("Humidity: " + arrayOfWeather.main.humidity);
    $("#wind-speed").text("Wind-Speed: " + arrayOfWeather.wind.speed);
    // $("#uv-index").text("UV Index: " + arrayOfWeather.main.temp);
  }

  function getFiveDay(fiveDayForecast) {
    var newQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + fiveDayForecast + "&appid=1595add4d1ccc2ce38dfcf973ec248ec&units=imperial&cnt=5";

    $.ajax({
      url: newQueryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displayFiveDay(response)
    });
  }

  function displayFiveDay(forecast){
      for (var i = 0; i < forecast.list.length; i++){
          var newDivRow = $("<div>")
          newDivRow.addClass("row forecast-rows")
          $("#new-rows").append(newDivRow)

          console.log(forecast.length)

        //   var secondDivRow = $("<div>")
        //   secondDivRow.addClass("row")
        //   newDivRow.append(secondDivRow)

          var newDiv = $("<div>")
          newDiv.addClass("card text-white bg-primary mb-3")
          newDiv.css("max-width", "18rem")
          newDivRow.append(newDiv)

          var cardBodyDiv = $("<div>");
          cardBodyDiv.addClass("card-body");
          newDiv.append(cardBodyDiv)

          var cardTitle = $("<h5>");
          cardTitle.addClass("card-title")
          cardTitle.text(moment(parseInt(forecast.list[i].dt)).format("L"));
          cardBodyDiv.append(cardTitle);

          var forecastTemp = $("<p>")
          var forecastHumid = $("<p>")

          forecastTemp.addClass("card-text")
          forecastHumid.addClass("card-text")

          forecastTemp.text("Temp: " + forecast.list[i].main.temp)
          cardBodyDiv.append(forecastTemp)
          
          forecastHumid.text("Humidity: " + forecast.list[i].main.humidity + "%")
          cardBodyDiv.append(forecastHumid)


          
          

      }
  }

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var userCityInput = $("#inputCity").val();
    console.log(userCityInput);

    var newLI = $("<li>");

    newLI.text($("#inputCity").val());
    newLI.addClass("list-group-item disabled");

    $(".list-group").append(newLI);

    getCity(userCityInput);
    getFiveDay(userCityInput);
  });
});
