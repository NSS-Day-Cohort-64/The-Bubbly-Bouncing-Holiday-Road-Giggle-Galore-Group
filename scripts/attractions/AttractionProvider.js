import { setAttractionId } from "../TransientState.js"
let attractions;
export const attractionList = async () => {
  const fetchResponse = await fetch(
    "http://holidayroad.nss.team/bizarreries"
  )
  attractions = await fetchResponse.json()

  document.addEventListener("change", handleAttractionChoice)

  let optionsHTML = attractions.map((attraction) => {
    return `<option value="${attraction.id}">${attraction.name}</option>`;
  });

  let dropdownHTML =
    `<select id="attractSelect">
   <option>Select your attraction</option> ${optionsHTML.join("")}
    </select>`;

  return dropdownHTML;
}


const handleAttractionChoice = (event) => {
  if (event.target.id === "attractSelect") {
    setAttractionId(parseInt(event.target.value))
    const selectedAttraction = event.target.options[event.target.selectedIndex].text;
    const selectedAttractionId = event.target.value
    displaySelectedAttraction(selectedAttraction, selectedAttractionId);
  }
}




///////////////

const displaySelectedAttraction = (attractionName, attractionId) => {
  const attractionNameContainer = document.querySelector("#attractionNameContainer");
  if (attractionNameContainer) {
    attractionNameContainer.innerHTML = `
      <p>${attractionName}</p>
      <button class="details-button" data-attraction-id="${attractionId}">Details</button>
      <div class="details-container" id="attractionDetailsContainer"></div>
    `;

    const detailsButton = attractionNameContainer.querySelector(".details-button");
    detailsButton.addEventListener("click", async () => {
      await showattractionDetails(attractionId);
    });
  }
};



const showattractionDetails = async (attractionId) => {
  const attractionDetailsContainer = document.querySelector("#attractionDetailsContainer");
  if (attractionDetailsContainer) {
    attractionDetailsContainer.innerHTML = ""; // Clear the container

    try {
      // Fetch attraction details using the attractionId
      const response = await fetch(`http://holidayroad.nss.team/bizarreries/${attractionId}`);
      const attractionDetails = await response.json();

      // Create an unordered list with attraction details
      const detailsList = document.createElement("ul");

      // Specify the desired keys to display
      const keysToDisplay = ["description", "state", "city"];

      // Iterate through the desired keys and create list items
      keysToDisplay.forEach((key) => {
        if (attractionDetails.hasOwnProperty(key)) {
          const listItemHTML = `<li><strong>${key.toUpperCase()}:</strong> ${attractionDetails[key]}</li>`;
          detailsList.innerHTML += listItemHTML;
        }
      });

      // Append the details list to the container
      attractionDetailsContainer.appendChild(detailsList);
    } catch (error) {
      console.error(error);
    }
  }
};