let FindButton = document.getElementById("cityFind");

let ForecastArr = [];
let City_Name = null;
let Country = null;
let Weather = null;
let IconId = null;
let WeatherIcon = null;
let Temperature = null;

let error = null;

function Forecast(CityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=aa72480049dc531be9c1bd6fc4d3d1f5`
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function(data) {
        console.log("NEWS", data);
        ForecastArr = data;
        City_Name = ForecastArr.name;
        Country = ForecastArr.sys.country;
        Weather = ForecastArr.weather[0].description;
        IconId = ForecastArr.weather[0].icon;
        WeatherIcon = `http://openweathermap.org/img/w/${IconId}.png`;
        Temperature = Math.floor(ForecastArr.main.temp - 273);
        WindSpeed = ForecastArr.wind.speed;

        const div = document.createElement("div");
        div.className = "forecastItem";
        div.innerHTML =
          '<ul class="list-group">' +
        '<li class="list-group-item">City: ' + City_Name + '</li><li class="list-group-item">Country: ' + Country + '</li><li class="list-group-item">Weather: ' + Weather + '<img src=' + WeatherIcon + ' alt=' + Weather + '>' + '</li><li class="list-group-item">Temperature: ' + Temperature +'&deg;C</li><li class="list-group-item">Wind: '+WindSpeed+'m/s</li>' + '</ul>';
        $('.forecastCard').append(div);
      });
    })
    .catch(function(err) {
      error = err;
      console.log("Fetch Error :-S", err);
    });
}


let localForecastArr = [];
let localCity_Name = null;
let localCountry = null;
let localWeather = null;
let localIconId = null;
let localWeatherIcon = null;
let localTemperature = null;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: ", Math.round(position.coords.latitude * 100) / 100, "Longitude: ", Math.round(position.coords.longitude * 100) / 100);

  let latitude = Math.round(position.coords.latitude * 100) / 100;
  let longitude = Math.round(position.coords.longitude * 100) / 100;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aa72480049dc531be9c1bd6fc4d3d1f5`
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function(data) {
        console.log(data);

        localForecastArr = data;
        localCity_Name = localForecastArr.name;
        localCountry = localForecastArr.sys.country;
        localWeather = localForecastArr.weather[0].description;
        localIconId = localForecastArr.weather[0].icon;
        localWeatherIcon = `http://openweathermap.org/img/w/${localIconId}.png`;
        localTemperature = Math.floor(localForecastArr.main.temp - 273);
        localWindSpeed = localForecastArr.wind.speed;

        const localdiv = document.createElement("div");
        localdiv.className = "localWeatherCard";
        localdiv.innerHTML = '<div class="innerlocalWeatherCard"><p>Weather in Your region</p><ul class="list-group">' +
          '<li class="list-group-item">City: ' + localCity_Name + '</li><li class="list-group-item">Country: ' + localCountry + '</li><li class="list-group-item">Weather: ' + localWeather + '<img src=' + localWeatherIcon + ' alt=' + localWeather + '>' + '</li><li class="list-group-item">Temperature: ' + localTemperature + '&deg;C</li><li class="list-group-item">Wind: ' + localWindSpeed + 'm/s</li>' + '</ul></div>';
        $(".localWeatherCardContainer").append(localdiv);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

getLocation();

FindButton.addEventListener("click", () => {
  let FindInput = document.getElementById("cityName").value;

  const spinner = document.createElement("div");
  spinner.setAttribute("class", "spinner");
  spinner.innerHTML =
    '<div class="spinner-grow" style="width: 150px; height: 150px;" role="status">' +
    '<span class="sr-only">Loading...</span>' +
    "</div>";
  document.body.appendChild(spinner);
  function ForecastShow() {
    Forecast(FindInput);
    spinner.remove();    
  }
  setTimeout(ForecastShow, 1500);

  console.log("FindInput", FindInput);
});

