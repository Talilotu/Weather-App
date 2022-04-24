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
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed);

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

searchCity("Sydney");
