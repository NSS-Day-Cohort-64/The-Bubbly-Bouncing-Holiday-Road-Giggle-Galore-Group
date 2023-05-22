import { setAttractionId } from "../TransientState.js"

const handleAttractionChoice = (event) => {
    if (event.target.id === "attractSelect") {
        setAttractionId(parseInt(event.target.value))
    }
}

export const attractionList = async () => {
     const fetchResponse = await fetch(
        "http://holidayroad.nss.team/bizarreries"
    )
    const attractions = await fetchResponse.json()

    document.addEventListener("change", handleAttractionChoice)

  let optionsHTML = attractions.map((attraction) => {
    return `<option value="${attraction.id}">${attraction.name}</option>`;
  });

  let dropdownHTML = `<select id="attractSelect">
                          <option>Select your attraction</option>
                          ${optionsHTML.join("")}
                        </select>`;

  return dropdownHTML;
}