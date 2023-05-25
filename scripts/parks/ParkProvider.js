import { setParksId } from "../TransientState.js";

const kelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9) / 5 + 32;
};

const displaySelectedPark = async (parkName, parkId) => {
  const parkNameContainer = document.querySelector("#parkNameContainer");
  const parkWeatherContainer = document.querySelector("#parkWeatherContainer");
  
  if (parkNameContainer && parkWeatherContainer) {
    parkNameContainer.innerHTML = `
      <p>${parkName}</p>
      <button class="details-button" data-park-id="${parkId}">Details</button>
      <div class="details-container" id="parkDetailsContainer"></div>
    `;
    
    parkWeatherContainer.innerHTML = ""; // Clear previous weather data
    
    const detailsButton = parkNameContainer.querySelector(".details-button");
    detailsButton.addEventListener("click", async () => {
      await showParkDetails(parkId);
    });

    try {
      // Fetch park details
      const parkResponse = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`);
      const parkData = await parkResponse.json();
      const selectedPark = parkData.data.find((park) => park.id === parkId);

      // Fetch weather forecast
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedPark.latitude}&lon=${selectedPark.longitude}&appid=d99932f2c9cf25401818e1989a19790b`);
      const weatherData = await weatherResponse.json();
      const forecastList = weatherData.list;

      // Extract the forecasts for the first five days
      const forecastByDay = {};
      forecastList.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!forecastByDay[date]) {
          forecastByDay[date] = {
            date: date,
            description: item.weather[0].description,
            minTemp: kelvinToFahrenheit(item.main.temp_min),
            maxTemp: kelvinToFahrenheit(item.main.temp_max)
          };
        } else {
          const dayForecast = forecastByDay[date];
          if (item.main.temp_min < dayForecast.minTemp) {
            dayForecast.minTemp = kelvinToFahrenheit(item.main.temp_min);
          }
          if (item.main.temp_max > dayForecast.maxTemp) {
            dayForecast.maxTemp = kelvinToFahrenheit(item.main.temp_max);
          }
        }
      });

      // Display the weather forecast for the first five days
      let weatherHTML = "<h3>Weather Forecast:</h3>";
      Object.values(forecastByDay).slice(0, 5).forEach((dayForecast) => {
        const { date, description, minTemp, maxTemp } = dayForecast;
        weatherHTML += `<p>${date}: ${description} (Low: ${minTemp.toFixed(1)}°F, High: ${maxTemp.toFixed(1)}°F)</p>`;
      });
      parkWeatherContainer.innerHTML = weatherHTML;
    } catch (error) {
      console.error("An error occurred while fetching park details or weather data:", error);
    }
  }
};




export const showParkDetails = async (parkId) => {
  const parkDetailsContainer = document.querySelector("#parkDetailsContainer");
  if (parkDetailsContainer) {
    parkDetailsContainer.innerHTML = ""; // Clear the container

    try {
      // Fetch all parks data
      const response = await fetch(
        "https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI"
      );
      const parksData = await response.json();
      const parksDataObj = parksData.data;

      // Find the selected park details from the parksDataObj array
      const selectedPark = parksDataObj.find((park) => park.id === parkId);

      // Create an unordered list with park details
      const detailsList = document.createElement("ul");

      // Display the park description
      const descriptionListItem = document.createElement("li");
      descriptionListItem.innerHTML = `<strong>Description:</strong> ${selectedPark.description}`;
      detailsList.appendChild(descriptionListItem);

      // Display the activity names
      const activitiesListItem = document.createElement("li");
      const activityNames = selectedPark.activities
        .map((activity) => activity.name)
        .join(", ");
      activitiesListItem.innerHTML = `<strong>Activities:</strong> ${activityNames}`;
      detailsList.appendChild(activitiesListItem);

      // Append the details list to the container
      parkDetailsContainer.appendChild(detailsList);
    } catch (error) {
      console.error("An error occurred while fetching park details:", error);
    }
  }
};

const handleParkChoice = (event) => {
  if (event.target.id === "parkSelect") {
    const selectedParkId = event.target.value;
    setParksId(event.target.value);

    const selectedPark = event.target.options[event.target.selectedIndex].text;
    displaySelectedPark(selectedPark, selectedParkId);
  }
};

export const parksList = async () => {
  const fetchResponse = await fetch(
    "https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI"
  );
  const parks = await fetchResponse.json();
  const parksDataObj = parks.data;
  let optionsHTML = parksDataObj.map(
    (park) => `<option value="${park.id}">${park.fullName}</option>`
  );

  let dropdownHTML = `
    <select id="parkSelect">
      <option>Select a National Park</option>
      ${optionsHTML.join("")}
    </select>
  `;

  document.addEventListener("change", handleParkChoice);

  return dropdownHTML;
};
