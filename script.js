$(document).ready(function () {


    function getCity(userCity){
    
        var queryURL =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          userCity +
          "&appid=1595add4d1ccc2ce38dfcf973ec248ec";
    
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          displayCityWeather(response)
        });
    }


    function displayCityWeather(arrayOfWeather){

        $("#cityInfo").text(arrayOfWeather.name)
    }


  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var userCityInput = $("#inputCity").val();
    console.log(userCityInput)

    getCity(userCityInput)

  });
});
