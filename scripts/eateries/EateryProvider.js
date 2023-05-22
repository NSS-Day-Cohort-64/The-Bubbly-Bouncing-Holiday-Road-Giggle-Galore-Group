import { setEateriesId } from "../TransientState.js"

const handleEatChoice = (event) => {
    if (event.target.id === "eatSelect") {
        setEateriesId(parseInt(event.target.value))
    }
}

export const eateryList = async () => {
    const fetchResponse = await fetch("http://holidayroad.nss.team/eateries")
    const eats = await fetchResponse.json()

    document.addEventListener("change", handleEatChoice)

  let optionsHTML = eats.map((eat) => {
    return `<option value="${eat.id}">${eat.businessName}</option>`;
  });

  let dropdownHTML = `<select id="eatSelect">
                          <option>Select your eatery</option>
                          ${optionsHTML.join("")}
                        </select>`;

  return dropdownHTML;
}