import { saveItinerary } from "./TransientState.js";

const handleSaveItineraryClick = (clickEvent) => {
    if(clickEvent.target.id === 'save') {
        saveItinerary()
    }
}

export const saveItineraryButton = () => {
    document.addEventListener("click", handleSaveItineraryClick)
    return `<div>
    <button id="save">Save Itinerary</button>
    </div>`
}
  
  const itineraryList = () => {
    const response = fetch()
  }