let parkFullName;
let itineraries;
let eateryBusinessName;
let attractionName;
export const savedItineraries = async () => {
    const fetchResponse = await fetch("http://localhost:8088/itineraries");
     itineraries = await fetchResponse.json();
    let ordersHTML = "";
    document.addEventListener("click", handleDirections)
    for (const itinerary of itineraries) {
      const { attractionsId, eateriesId, parksId } = itinerary;
  
      // Fetch attraction details
      const attractionResponse = await fetch(`http://holidayroad.nss.team/bizarreries/${attractionsId}`);
      const attractionData = await attractionResponse.json();
       attractionName = attractionData.name;
  
      // Fetch eatery details
      const eateryResponse = await fetch(`http://holidayroad.nss.team/eateries/${eateriesId}`);
      const eateryData = await eateryResponse.json();
       eateryBusinessName = eateryData.businessName;
  
      // Fetch park details
      const parksResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI");
      const parksData = await parksResponse.json();
      const park = parksData.data.find((park) => park.id === parksId);
       parkFullName = park ? park.fullName : "Unknown Park";
  
      const orderElement = document.createElement("div");
      orderElement.classList.add("itineraryList");
      orderElement.innerHTML = `Itinerary #${itinerary.id}
      <ul>
        <li>Park: ${parkFullName}</li>
        <li>Eatery: ${eateryBusinessName}</li>
        <li>Attraction: ${attractionName}</li>
      </ul>
      <div> <button data id = "directButton"> Get Directions</button>
      `;
  
      ordersHTML += orderElement.outerHTML;
    }
  
    return ordersHTML;
  };
  
  const handleDirections = (clickEvent) => {
    if (clickEvent.target.id === 'directButton') {
      getParkDirections()
    }
  }

  const getParkDirections = async() => {
    const response = await fetch(`https://graphhopper.com/api/1/geocode?q=${parkFullName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocode = await response.json()
    const parkLat = geocode.hits
    const parkLng = geocode.hits

    const responsee = await fetch(`https://graphhopper.com/api/1/geocode?q=${eateryBusinessName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocodee = await responsee.json()
    
    const responseee = await fetch(`https://graphhopper.com/api/1/geocode?q=${attractionName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocodeee = await responseee.json()


  }

 
  

