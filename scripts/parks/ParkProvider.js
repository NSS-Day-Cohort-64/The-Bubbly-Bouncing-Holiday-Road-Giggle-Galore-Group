import { setParksId } from "../TransientState.js";

export const parksList = async () => {
  try {
    const fetchResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI");
    const parks = await fetchResponse.json();
    const parksDataObj = parks.data;
    let html = "<select id='parks'>";
    html += "<option value='0'>Select a National Park</option>";

    for (const park of parksDataObj) {
      html += `<option value="${park.id}">${park.fullName}</option>`;
    }
    html += "</select>";
    return html;
  } catch (error) {
    console.error(error);
    return ""; // Return an empty string if there's an error
  }
};

const displaySelectedParks = (parkName, parkId) => {
  const parkNameContainer = document.querySelector("#parkNameContainer");
  if (parkNameContainer) {
    parkNameContainer.innerHTML = `
      <p>${parkName}</p>
      <button class="details-button" data-park-id="${parkId}">Details</button>
      <div class="details-container" id="parkDetailsContainer"></div>
    `;

    const detailsButton = parkNameContainer.querySelector(".details-button");
    detailsButton.addEventListener("click", async () => {
      await showParkDetails(parkId);
    });
  }
};

const showParkDetails = async (parkId) => {
  const parkDetailsContainer = document.querySelector("#parkDetailsContainer");
  if (parkDetailsContainer) {
    parkDetailsContainer.innerHTML = ""; // Clear the container

    try {
      const response = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`);
      const parkDetails = await response.json();

      // Create an unordered list with park details
      const detailsList = document.createElement("ul");

      // Specify the desired keys to display
      const keysToDisplay = ["description", "states", "directionsInfo"];

      // Iterate through the desired keys and create list items
      keysToDisplay.forEach((key) => {
        if (parkDetails.hasOwnProperty(key)) {
          const listItemHTML = `<li><strong>${key.toUpperCase()}:</strong> ${parkDetails[key]}</li>`;
          detailsList.innerHTML += listItemHTML;
        }
      });

      // Append the details list to the container
      parkDetailsContainer.appendChild(detailsList);
    } catch (error) {
      console.error(error);
    }
  }
};

document.addEventListener("change", (changeEvent) => {
  if (changeEvent.target.id === "parks") {
    const selectedParkId = changeEvent.target.value;
    setParksId(selectedParkId);

    const selectedParkName = changeEvent.target.options[changeEvent.target.selectedIndex].text;
    displaySelectedParks(selectedParkName, selectedParkId);
  }
});
