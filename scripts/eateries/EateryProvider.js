import { setEateriesId } from "../TransientState.js"

const handleEatsChoice = (event) => {
    if (event.target.id === "eateriesSelect") {
        setEateriesId(parseInt(event.target.value))
    }
}

export const eateryList = async () => {
   const fetchResponse = await fetch(
        "http://holidayroad.nss.team/eateries"
    )
    const eats = await fetchResponse.json()

    document.addEventListener("change", handleEatsChoice)

   let optionsHTML = eats.map((eat) => {
    return `<option value="${eat.id}">${eat.businessName}</option>`;
  });

  let dropdownHTML = `<select id="eateriesSelect">
                          <option>Eatery Choices</option>
                          ${optionsHTML.join("")}
                        </select>`;
                        
  return dropdownHTML;
}