$(document).ready(function () {



    function getCity(userCity){
    
        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          userCity +
          "&appid=1595add4d1ccc2ce38dfcf973ec248ec&units=imperial";
    
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          displayCityWeather(response)
        });
    }


    function displayCityWeather(arrayOfWeather){

        $("#cityInfo").text(arrayOfWeather.name);
        $("#temparature").text("Temparature: " + arrayOfWeather.main.temp);
        $("#humidity").text("Humidity: " + arrayOfWeather.main.humidity);
        $("#wind-speed").text("Wind-Speed: " + arrayOfWeather.wind.speed);
        // $("#uv-index").text("UV Index: " + arrayOfWeather.main.temp);

    }



  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var userCityInput = $("#inputCity").val();
    console.log(userCityInput)

    var newLI = $("<li>")

    newLI.text($("#inputCity").val())
    newLI.addClass("list-group-item disabled")

    $(".list-group").append(newLI)

    getCity(userCityInput)

  });
});
