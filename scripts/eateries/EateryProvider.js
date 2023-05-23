import { setEateriesId } from "../TransientState.js";

const displaySelectedEatery = (eateryName) => {
    const eateryNameContainer = document.querySelector("#eateryNameContainer");
    if (eateryNameContainer) {
      eateryNameContainer.textContent = eateryName;
    }
  };
  
  const handleEatChoice = (event) => {
    if (event.target.id === "eatSelect") {
      setEateriesId(parseInt(event.target.value));
  
      const selectedEatery = event.target.options[event.target.selectedIndex].text;
      displaySelectedEatery(selectedEatery);
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
