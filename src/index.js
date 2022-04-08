function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} , ${hour} : ${minute}`;
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector("#weather-description");
  let dateElement = document.querySelector(".current-date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "bea4f3a13d9c626697f2497a1cfb384d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "bea4f3a13d9c626697f2497a1cfb384d";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
searchCity("Tel-Aviv");
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);
