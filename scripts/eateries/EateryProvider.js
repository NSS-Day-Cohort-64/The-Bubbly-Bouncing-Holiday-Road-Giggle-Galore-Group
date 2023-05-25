import { setEateriesId } from "../TransientState.js";
// function sets var to element in main using query then checks if it exsists before setting the innerhtml of the element.
// sets empty div then selects details button and add event listener of click to it then invokes showEateryDetails func with
// argument of a param
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
//function selects element in dom, fetches the eatery that was selected then creates ul and var that is a array of strings/keys
// uses forEach method on the array of keys then checks if the selected eatery hasownproperty of each key, sets var to html
// list items that have the desired keys and appends the ul with list items then appends the list to eaterydetails
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
// function checks if change events id is eatSelect, sets the event's value attribute to var, invokes setter function with var
// sets the selected option's text to var and invokes displayEatery function with arguments of the variables
const handleEatChoice = (event) => {
  if (event.target.id === "eatSelect") {
    const selectedEateryId = event.target.value;
    setEateriesId(parseInt(selectedEateryId));

    const selectedEatery = event.target.options[event.target.selectedIndex].text;
    displaySelectedEatery(selectedEatery, selectedEateryId);
  }
};
//function fetches eateries data, adds event listener for change event and passes callback function, maps of each eatery and puts
// the name as a opton in a dropdown via join method then returns dropdown
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
