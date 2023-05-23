import { setParksId } from "../TransientState.js"


export const parksList = async () => {
    const fetchResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI")
    const parks = await fetchResponse.json()
    const parksDataObj = parks.data
    let html = ""
    html += `<select id ="ParkSelect">`
    html += `<option value= "0"> Select a National Park </option>`

    for (const park of parksDataObj) {
        html += `<option value = "${park.id}"> ${park.fullName}</option>`
    }
    html += "</select>"
    return html
}



const handleParkChoice = (event) => {
    if (event.target.id === "ParkSelect") {
        setParksId(event.target.value)
        const selectedPark = event.target.options[event.target.selectedIndex].text;
        const selectedParkId = event.target.value
        displaySelectedPark(selectedPark, selectedParkId);
    }
}


document.addEventListener("change",handleParkChoice)
  
  
  ///////////////
  
  const displaySelectedPark = (ParkName, ParkId) => {
    const ParkNameContainer = document.querySelector("#ParkNameContainer");
    if (ParkNameContainer) {
      ParkNameContainer.innerHTML = `
        <p>${ParkName}</p>
        <button class="details-button" data-Park-id="${ParkId}">Details</button>
        <div class="details-container" id="ParkDetailsContainer"></div>
      `;
  
      const detailsButton = ParkNameContainer.querySelector(".details-button");
      detailsButton.addEventListener("click", async () => {
        await showParkDetails(ParkId);
      });
    }
  };
  
  
  
  const showParkDetails = async (ParkId) => {
    const ParkDetailsContainer = document.querySelector("#ParkDetailsContainer");
    if (ParkDetailsContainer) {
      ParkDetailsContainer.innerHTML = ""; // Clear the container
  
      try {
        // Fetch Park details using the ParkId
        const response = await fetch(`https://developer.nps.gov/api/v1/parks${ParkId}?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI`);
        const ParkDetails = await response.json();
        const dataArr = ParkDetails.data
       const myPark = dataArr[ParkId]
  
        // Create an unordered list with Park details
        const detailsList = document.createElement("ul");
  
        // Specify the desired keys to display
        const keysToDisplay = ["description", "fullName", "parkCode"];
  
        // Iterate through the desired keys and create list items
        keysToDisplay.forEach((key) => {
          if (myPark.hasOwnProperty(key)) {
            const listItemHTML = `<li><strong>${key.toUpperCase()}:</strong> ${myPark[key]}</li>`;
            detailsList.innerHTML += listItemHTML;
          }
        });
  
        // Append the details list to the container
        ParkDetailsContainer.appendChild(detailsList);
      } catch (error) {
        console.error(error);
      }
    }
  };

