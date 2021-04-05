// Getting the Current Date and Time

function switchDate() {
  let dateToday = document.querySelector("li #currentDate p");
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;

}

let date = new Date();
let hours = date.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

switchDate();

// City Input Displayed and Temperature Change

function switchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searched-input");
  let apiKey = "3719f2615e58e78c75e87773957510b9";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);

}

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", switchCity);

   

function displayTemp (response) {

    document.querySelector("#searchedCity").innerHTML = response.data.name;

    document.querySelector("#tempNow").innerHTML = Math.round(response.data.main.temp) + `&#8451;`;

    document.querySelector("#currentHumidity").innerHTML = response.data.main.humidity;

    document.querySelector("#description").innerHTML = response.data.weather[0].description;

    document.querySelector("#currentWind").innerHTML = Math.round(response.data.wind.speed);

    celTemp = response.data.main.temp;

    getForecast(response.data.coord);

}

// Forecast Display

 function getForecast(coordinates) {
  let apiKey = "3719f2615e58e78c75e87773957510b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

    }

 function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day]; }

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weeklyForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if(index < 5) {
    forecastHTML = forecastHTML + 
    `
    <div class="col">
     <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="70" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"><strong>${Math.round(forecastDay.temp.max)}°</strong></span>
          <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
          </div></div>`;
    }
     });

      forecastHTML = forecastHTML + "</div>";
      forecastElement.innerHTML = forecastHTML;

      }


//Temperature Celsius Button

function convertToC(event) {
  event.preventDefault();

  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = Math.round(celTemp) + `&#8451`; 
 
}

let changeC = document.querySelector("#tempButtonC");
changeC.addEventListener("click", convertToC);

let celTemp = null;

//(Temperature Fahrenheit Button)

function convertToF(event) {
  event.preventDefault();

  let tempNow = document.querySelector("#tempNow");
  let convertingToF = (celTemp * 9) / 5 + 32;
  tempNow.innerHTML = Math.round(convertingToF)  + `&#8457`; 
 
}

let changeF = document.querySelector("#tempButtonF");
changeF.addEventListener("click", convertToF);

// Current Location Button and Temperature Change

function showCurrentLocation(position) {

let longitude = position.coords.longitude;
let latitude = position.coords.latitude;
let geoApiKey = "3719f2615e58e78c75e87773957510b9";
let geoUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
axios.get(`${geoUrl}&appid=${geoApiKey}`).then(geoCitySwitch);
}

function geoCitySwitch(response) {

let cityName = response.data.name;
let h2 = document.querySelector("#searchedCity");
searchedCity.innerHTML = `${cityName}`;

let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
let apiKeyWeather = "3719f2615e58e78c75e87773957510b9";

axios.get(`${apiUrlWeather}&appid=${apiKeyWeather}`).then(displayTemp);

}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", getCurrentPosition);

getCurrentPosition();