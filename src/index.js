let currenttime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currenttime.getDay()];

let minutes = currenttime.getMinutes();
minutes = ("0" + minutes).slice(-2);

let hours = currenttime.getHours();
hours = ("0" + hours).slice(-2);

let currentdate = document.querySelector("#current-time");
currentdate.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed);

  document.querySelector("h1").innerHTML = response.data.name;
  let celciusTemp = document.querySelector("#celciusTemp");
  celciusTemp.innerHTML = `${temperature}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${speed}km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
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

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSubmit);

searchCity("Sydney");
