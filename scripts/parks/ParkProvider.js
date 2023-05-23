import { setParksId } from "../TransientState.js"

export const parksList = async () => {
  const fetchResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI")
  const parks = await fetchResponse.json()
  const parksDataObj = parks.data
  let html = ""
  html += `<select id="parks">`
  html += `<option value="0">Select a National Park</option>`

  for (const park of parksDataObj) {
    html += `<option value="${park.id}">${park.fullName}</option>`
  }
  html += "</select>"
  html += `<button id="parkDetailsButton" disabled>Get Park Details</button>`; // Add the button, initially disabled
  return html
}

document.addEventListener(
  "change",
  async (changeEvent) => {
    if (changeEvent.target.id === "parks") {
      setParksId(changeEvent.target.value)

      const parkId = changeEvent.target.value;
      if (parkId !== "0") {
        const parkDetailsButton = document.querySelector("#parkDetailsButton");
        parkDetailsButton.disabled = false; // Enable the button

        parkDetailsButton.addEventListener("click", async () => {
          try {
            const parkDetails = await fetchParkDetails(parkId);
            // Display the park details on the page as desired
          } catch (error) {
            console.error(error);
            // Handle the error case
          }
        });
      }
    }
  }
);

async function fetchParkDetails(parkId) {
  const fetchResponse = await fetch(`https://developer.nps.gov/api/v1/parks/${parkId}?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`);
  if (!fetchResponse.ok) {
    throw new Error("Failed to fetch park details");
  }
  const parkDetails = await fetchResponse.json();
  return parkDetails;
}
