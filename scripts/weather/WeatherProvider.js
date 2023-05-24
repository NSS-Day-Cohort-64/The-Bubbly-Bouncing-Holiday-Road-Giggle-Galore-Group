// import { showParkDetails } from "../parks/ParkProvider";

// const kelvinToFahrenheit = (kelvin) => {
//   return ((kelvin - 273.15) * 9) / 5 + 32;
// };

// export const displayWeather = async (parkId) => {
//   const parkNameContainer = document.querySelector("#parkNameContainer");
//   if (parkNameContainer) {
//     parkNameContainer.innerHTML = `
//       <div class="weather-container" id="parkWeatherContainer"></div>
//     `;

//     const detailsButton = parkNameContainer.querySelector(".details-button");
//     detailsButton.addEventListener("click", async () => {
//       await showParkDetails(parkId);
//     });

//     const parkWeatherContainer = parkNameContainer.querySelector("#parkWeatherContainer");
//     if (parkWeatherContainer) {
//       try {
//         // Fetch park details
//         const parkResponse = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`);
//         const parkData = await parkResponse.json();
//         const selectedPark = parkData.data.find((park) => park.id === parkId);

//         // Fetch weather forecast
//         const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedPark.latitude}&lon=${selectedPark.longitude}&appid=d99932f2c9cf25401818e1989a19790b`);
//         const weatherData = await weatherResponse.json();
//         const forecastList = weatherData.list;

//         // Extract the forecasts for the first five days
//         const forecastByDay = {};
//         forecastList.forEach((item) => {
//           const date = new Date(item.dt_txt).toLocaleDateString();
//           if (!forecastByDay[date]) {
//             forecastByDay[date] = {
//               date: date,
//               description: item.weather[0].description,
//               minTemp: kelvinToFahrenheit(item.main.temp_min),
//               maxTemp: kelvinToFahrenheit(item.main.temp_max)
//             };
//           } else {
//             const dayForecast = forecastByDay[date];
//             if (item.main.temp_min < dayForecast.minTemp) {
//               dayForecast.minTemp = kelvinToFahrenheit(item.main.temp_min);
//             }
//             if (item.main.temp_max > dayForecast.maxTemp) {
//               dayForecast.maxTemp = kelvinToFahrenheit(item.main.temp_max);
//             }
//           }
//         });

//         // Display the weather forecast for the first five days
//         let weatherHTML = "<h3>Weather Forecast:</h3>";
//         Object.values(forecastByDay).slice(0, 5).forEach((dayForecast) => {
//           const { date, description, minTemp, maxTemp } = dayForecast;
//           weatherHTML += `<p>${date}: ${description} (Low: ${minTemp.toFixed(1)}°F, High: ${maxTemp.toFixed(1)}°F)</p>`;
//         });
//         parkWeatherContainer.innerHTML = weatherHTML;
//       } catch (error) {
//         console.error("An error occurred while fetching park details or weather data:", error);
//       }
//     }
//   }
// };
