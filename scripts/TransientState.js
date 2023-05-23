const transientState = {
    "parksId": "",
    "eateriesId": 0,
    "attractionsId": 0,
}

export const setParksId = (chosenParks) => {
    transientState.parksId = chosenParks
    console.log(transientState)
    
}

/* export const getParksDetails = async (parkId) => {
  const fetchResponse = await fetch(`https://developer.nps.gov/api/v1/parks/${parkId}?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`)
  const parkDetails = await fetchResponse.json()
  return parkDetails
} */

export const setEateriesId = (chosenEateries) => {
    transientState.eateriesId = chosenEateries
    console.log(transientState)
}

export const setAttractionId = (chosenAttraction) => {
    transientState.attractionsId = chosenAttraction
    console.log(transientState)
}

export const saveItinerary = async () => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }

    const response = await fetch("http://localhost:8088/itineraries", postOptions)

    const customEvent = new CustomEvent("newItineraryCreated")
    document.dispatchEvent(customEvent)
}
