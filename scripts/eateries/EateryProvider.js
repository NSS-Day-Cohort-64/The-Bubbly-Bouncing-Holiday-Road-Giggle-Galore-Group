import { setEateriesId } from "../TransientState.js";

const displaySelectedEatery = (eateryName, eateryId) => {
  const eateryNameContainer = document.querySelector("#eateryNameContainer");
  if (eateryNameContainer) {
    eateryNameContainer.innerHTML = `
      <p>${eateryName}</p>
      <button class="details-button" data-eatery-id="${eateryId}">Details</button>
      <div class="details-container" id="eateryDetailsContainer"></div>
    `;

    const detailsButton = eateryNameContainer.querySelector(".details-button");
    detailsButton.addEventListener("click", async () => {
      await showEateryDetails(eateryId);
    });
  }
};

const showEateryDetails = async (eateryId) => {
  const eateryDetailsContainer = document.querySelector("#eateryDetailsContainer");
  if (eateryDetailsContainer) {
    eateryDetailsContainer.innerHTML = ""; // Clear the container

    try {
      // Fetch eatery details using the eateryId
      const response = await fetch(`http://holidayroad.nss.team/eateries/${eateryId}`);
      const eateryDetails = await response.json();

      // Create an unordered list with eatery details
      const detailsList = document.createElement("ul");

      // Specify the desired keys to display
      const keysToDisplay = ["description", "state", "city"];

      // Iterate through the desired keys and create list items
      keysToDisplay.forEach((key) => {
        if (eateryDetails.hasOwnProperty(key)) {
          const listItemHTML = `<li><strong>${key.toUpperCase()}:</strong> ${eateryDetails[key]}</li>`;
          detailsList.innerHTML += listItemHTML;
        }
      });

      // Append the details list to the container
      eateryDetailsContainer.appendChild(detailsList);
    } catch (error) {
      console.error(error);
    }
  }
};

const handleEatChoice = (event) => {
  if (event.target.id === "eatSelect") {
    const selectedEateryId = event.target.value;
    setEateriesId(parseInt(event.target.value));

    const selectedEatery = event.target.options[event.target.selectedIndex].text;
    displaySelectedEatery(selectedEatery, selectedEateryId);
  }
};

export const eateryList = async () => {
  const fetchResponse = await fetch("http://holidayroad.nss.team/eateries");
  const eats = await fetchResponse.json();

  document.addEventListener("change", handleEatChoice);

  let optionsHTML = eats.map((eat) => {
    return `<option value="${eat.id}">${eat.businessName}</option>`;
  });

  let dropdownHTML = `<select id="eatSelect">
    <option>Select your eatery</option>
    ${optionsHTML.join("")}
  </select>`;

  return dropdownHTML;
};
