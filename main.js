/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n\r\n\r\n\r\nconst form = document.querySelector(\"#weather-form\");\r\nconst cityInput = document.querySelector(\"#city-input\");\r\nconst searchButton = document.querySelector(\"#search-button\");\r\nconst message = document.querySelector(\"#message\");\r\n\r\nconst weatherResult = document.querySelector(\"#weather-result\");\r\nconst cityName = document.querySelector(\"#city-name\");\r\nconst temperature = document.querySelector(\"#temperature\");\r\nconst conditions = document.querySelector(\"#conditions\");\r\nconst humidity = document.querySelector(\"#humidity\");\r\nconst wind = document.querySelector(\"#wind\");\r\nconst unitToggle = document.querySelector(\"#unit-toggle\");\r\n\r\nconst API_KEY = \"K5K9P9PKG2X2GNWRCJDW5TD7K\";\r\n\r\nlet currentWeather = null;\r\nlet currentAddress = \"\";\r\nlet isFahrenheit = false;\r\n\r\nform.addEventListener(\"submit\", async (event) => {\r\n  event.preventDefault();\r\n\r\n  const city = cityInput.value.trim();\r\n\r\n  if (!city) {\r\n    showMessage(\"Please enter a city name.\");\r\n    return;\r\n  }\r\n\r\n  if (API_KEY === \"YOUR_API_KEY\") {\r\n    showMessage(\"Please add your Visual Crossing API key.\");\r\n    return;\r\n  }\r\n\r\n  searchButton.disabled = true;\r\n  unitToggle.disabled = true;\r\n  weatherResult.hidden = true;\r\n  showMessage(\"Loading weather...\");\r\n\r\n  try {\r\n    const url =\r\n      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;\r\n\r\n    const response = await fetch(url);\r\n\r\n    if (!response.ok) {\r\n      if (response.status === 400) {\r\n        throw new Error(\"City not found. Check the spelling and try again.\");\r\n      }\r\n\r\n      if (response.status === 401 || response.status === 403) {\r\n        throw new Error(\"The API key is invalid or access is denied.\");\r\n      }\r\n\r\n      throw new Error(\r\n        `Weather request failed (${response.status}). Please try again.`\r\n      );\r\n    }\r\n\r\n    const weatherData = await response.json();\r\n\r\n    if (!weatherData.currentConditions) {\r\n      throw new Error(\"Weather information is unavailable for this city.\");\r\n    }\r\n\r\n    currentWeather = weatherData.currentConditions;\r\n    currentAddress = weatherData.resolvedAddress || city;\r\n    isFahrenheit = false;\r\n\r\n    displayWeather();\r\n\r\n    showMessage(\"\");\r\n    weatherResult.hidden = false;\r\n    unitToggle.disabled = false;\r\n  } catch (error) {\r\n    currentWeather = null;\r\n    weatherResult.hidden = true;\r\n\r\n    showMessage(\r\n      error.message === \"Failed to fetch\"\r\n        ? \"Unable to connect. Check your internet connection and try again.\"\r\n        : error.message || \"Something went wrong. Please try again.\"\r\n    );\r\n  } finally {\r\n    searchButton.disabled = false;\r\n  }\r\n});\r\n\r\nunitToggle.addEventListener(\"click\", () => {\r\n  if (!currentWeather) return;\r\n\r\n  isFahrenheit = !isFahrenheit;\r\n  displayWeather();\r\n});\r\n\r\nfunction displayWeather() {\r\n  const celsius = currentWeather.temp;\r\n\r\n  const displayedTemperature = isFahrenheit\r\n    ? (celsius * 9) / 5 + 32\r\n    : celsius;\r\n\r\n  cityName.textContent = currentAddress;\r\n\r\n  temperature.textContent =\r\n    `${displayedTemperature.toFixed(1)} °${isFahrenheit ? \"F\" : \"C\"}`;\r\n\r\n  conditions.textContent =\r\n    `Conditions: ${currentWeather.conditions}`;\r\n\r\n  humidity.textContent =\r\n    `Humidity: ${currentWeather.humidity}%`;\r\n\r\n  wind.textContent =\r\n    `Wind speed: ${currentWeather.windspeed} km/h`;\r\n\r\n  unitToggle.textContent = isFahrenheit ? \"Show °C\" : \"Show °F\";\r\n\r\n  // Change the page background based on the weather icon.\r\n  const weather = (currentWeather.icon || \"\").toLowerCase();\r\n\r\n  document.body.classList.remove(\r\n    \"sunny\",\r\n    \"cloudy\",\r\n    \"rainy\",\r\n    \"snowy\",\r\n    \"windy\",\r\n    \"foggy\"\r\n  );\r\n\r\n  if (weather.includes(\"rain\") || weather.includes(\"showers\")) {\r\n    document.body.classList.add(\"rainy\");\r\n  } else if (weather.includes(\"snow\") || weather.includes(\"sleet\")) {\r\n    document.body.classList.add(\"snowy\");\r\n  } else if (weather.includes(\"fog\")) {\r\n    document.body.classList.add(\"foggy\");\r\n  } else if (weather.includes(\"wind\")) {\r\n    document.body.classList.add(\"windy\");\r\n  } else if (weather.includes(\"cloud\")) {\r\n    document.body.classList.add(\"cloudy\");\r\n  } else if (weather.includes(\"clear\")) {\r\n    document.body.classList.add(\"sunny\");\r\n  } else {\r\n    document.body.classList.add(\"cloudy\");\r\n  }\r\n}\r\n\r\nfunction showMessage(text) {\r\n  message.textContent = text;\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;