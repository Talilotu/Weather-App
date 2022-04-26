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

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed);
  console.log(response);
  let icon = response.data.weather[0].icon;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let celciusTemp = document.querySelector("#celciusTemp");
  celciusTemp.innerHTML = `${temperature}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${speed}km/h`;

  let currentDate = document.querySelector("#current-time");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
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

function farenheitTemperature(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#celciusTemp");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  farenheit.innerHTML = Math.round(farenheitTemp);
}

let farenheitButton = document.querySelector("#farenheit-temp");
farenheitButton.addEventListener("click", farenheitTemperature);

function celciusTemperature(event) {
  event.preventDefault();
  let celcius = document.querySelector("#celciusTemp");
  celcius.innerHTML = Math.round(celsiusTemperature);
}

let celciusButton = document.querySelector("#celcius-temp");
celciusButton.addEventListener("click", celciusTemperature);

let celsiusTemperature = null;

searchCity("Sydney");
