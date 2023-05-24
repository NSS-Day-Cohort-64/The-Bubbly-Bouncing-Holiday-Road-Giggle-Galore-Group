

export const savedItineraries = async () => {
    const fetchResponse = await fetch("http://localhost:8088/itineraries");
    const itineraries = await fetchResponse.json();
    let ordersHTML = "";
  
    for (const itinerary of itineraries) {
      const { attractionsId, eateriesId, parksId } = itinerary;
  
      // Fetch attraction details
      const attractionResponse = await fetch(`http://holidayroad.nss.team/bizarreries/${attractionsId}`);
      const attractionData = await attractionResponse.json();
      const attractionName = attractionData.name;
  
      // Fetch eatery details
      const eateryResponse = await fetch(`http://holidayroad.nss.team/eateries/${eateriesId}`);
      const eateryData = await eateryResponse.json();
      const eateryBusinessName = eateryData.businessName;
  
      // Fetch park details
      const parksResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI");
      const parksData = await parksResponse.json();
      const park = parksData.data.find((park) => park.id === parksId);
      const parkFullName = park.fullName;
  
      const orderElement = document.createElement("div");
      orderElement.innerHTML = `Itinerary #${itinerary.id}
      <ul>
        <li>Park: ${parkFullName}</li>
        <li>Eatery: ${eateryBusinessName}</li>
        <li>Attraction: ${attractionName}</li>
      </ul>
      `;
  
      ordersHTML += orderElement.outerHTML;
    }
  
    return ordersHTML;
  };
  