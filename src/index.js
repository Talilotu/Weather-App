function formatDate(timestamp) {
  let currentTime = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let hours = currentTime.getHours();
  hours = ("0" + hours).slice(-2);

  let minutes = currentTime.getMinutes();
  minutes = ("0" + minutes).slice(-2);

  return `${day} ${hours}: ${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row-6">
        <div class="row">
          <div class="col">${formatDay(forecastDay.dt)}</div>
          <div class="col forecast-temp">${Math.round(
            forecastDay.temp.max
          )}°</div>
          <div class="col forecast-icon">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="weather-icon"
          height="60"
          />
        </div>
          <div class="col forecast-temp">${Math.round(
            forecastDay.temp.min
          )}°</div>
      </div>
    </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "f5098deaf242be7ff2c5af1ac2ce51ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  windSpeed = Math.round(response.data.wind.speed);
  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let speed = windSpeed;

  let icon = response.data.weather[0].icon;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let Temp = document.querySelector("#celsiusTemp");
  Temp.innerHTML = `${temperature}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${speed} km/h`;

  let currentDate = document.querySelector("#current-time");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "f5098deaf242be7ff2c5af1ac2ce51ad";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showcurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "f5098deaf242be7ff2c5af1ac2ce51ad";
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let locationUrl = `${weatherUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(locationUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showcurrentLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocation);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#celsiusTemp");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let convertFarenheit = document.querySelector("#c-symbol");
  let mph = Math.round(windSpeed / 1.609);
  let mphconversion = document.querySelector("#wind");

  farenheit.innerHTML = Math.round(farenheitTemp);
  convertFarenheit.innerHTML = "°F";
  mphconversion.innerHTML = `Wind: ${mph} mph`;
}

let farenheitButton = document.querySelector("#farenheit-temp");
farenheitButton.addEventListener("click", showFarenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsius = document.querySelector("#celsiusTemp");
  let convertFarenheit = document.querySelector("#c-symbol");
  let wSpeed = document.querySelector("#wind");

  celsius.innerHTML = Math.round(celsiusTemperature);
  convertFarenheit.innerHTML = "°C";
  wSpeed.innerHTML = `Wind: ${windSpeed} km/h`;
}

let celsiusButton = document.querySelector("#celsius-temp");
celsiusButton.addEventListener("click", showCelsiusTemp);

let celsiusTemperature = null;

searchCity("New Zealand");
