
import "./style.css";

const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const message = document.querySelector("#message");

const weatherResult = document.querySelector("#weather-result");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const conditions = document.querySelector("#conditions");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const unitToggle = document.querySelector("#unit-toggle");

const API_KEY = "K5K9P9PKG2X2GNWRCJDW5TD7K";

let currentWeather = null;
let currentAddress = "";
let isFahrenheit = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name.");
    return;
  }

  if (API_KEY === "YOUR_API_KEY") {
    showMessage("Please add your Visual Crossing API key.");
    return;
  }

  searchButton.disabled = true;
  unitToggle.disabled = true;
  weatherResult.hidden = true;
  showMessage("Loading weather...");

  try {
    const url =
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("City not found. Check the spelling and try again.");
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error("The API key is invalid or access is denied.");
      }

      throw new Error(
        `Weather request failed (${response.status}). Please try again.`
      );
    }

    const weatherData = await response.json();

    if (!weatherData.currentConditions) {
      throw new Error("Weather information is unavailable for this city.");
    }

    currentWeather = weatherData.currentConditions;
    currentAddress = weatherData.resolvedAddress || city;
    isFahrenheit = false;

    displayWeather();

    showMessage("");
    weatherResult.hidden = false;
    unitToggle.disabled = false;
  } catch (error) {
    currentWeather = null;
    weatherResult.hidden = true;

    showMessage(
      error.message === "Failed to fetch"
        ? "Unable to connect. Check your internet connection and try again."
        : error.message || "Something went wrong. Please try again."
    );
  } finally {
    searchButton.disabled = false;
  }
});

unitToggle.addEventListener("click", () => {
  if (!currentWeather) return;

  isFahrenheit = !isFahrenheit;
  displayWeather();
});

function displayWeather() {
  const celsius = currentWeather.temp;

  const displayedTemperature = isFahrenheit
    ? (celsius * 9) / 5 + 32
    : celsius;

  cityName.textContent = currentAddress;

  temperature.textContent =
    `${displayedTemperature.toFixed(1)} °${isFahrenheit ? "F" : "C"}`;

  conditions.textContent =
    `Conditions: ${currentWeather.conditions}`;

  humidity.textContent =
    `Humidity: ${currentWeather.humidity}%`;

  wind.textContent =
    `Wind speed: ${currentWeather.windspeed} km/h`;

  unitToggle.textContent = isFahrenheit ? "Show °C" : "Show °F";

  // Change the page background based on the weather icon.
  const weather = (currentWeather.icon || "").toLowerCase();

  document.body.classList.remove(
    "sunny",
    "cloudy",
    "rainy",
    "snowy",
    "windy",
    "foggy"
  );

  if (weather.includes("rain") || weather.includes("showers")) {
    document.body.classList.add("rainy");
  } else if (weather.includes("snow") || weather.includes("sleet")) {
    document.body.classList.add("snowy");
  } else if (weather.includes("fog")) {
    document.body.classList.add("foggy");
  } else if (weather.includes("wind")) {
    document.body.classList.add("windy");
  } else if (weather.includes("cloud")) {
    document.body.classList.add("cloudy");
  } else if (weather.includes("clear")) {
    document.body.classList.add("sunny");
  } else {
    document.body.classList.add("cloudy");
  }
}

function showMessage(text) {
  message.textContent = text;
}
