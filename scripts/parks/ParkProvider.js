import { setParksId } from "../TransientState.js";

const displaySelectedPark = (parkName, parkId) => {
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
