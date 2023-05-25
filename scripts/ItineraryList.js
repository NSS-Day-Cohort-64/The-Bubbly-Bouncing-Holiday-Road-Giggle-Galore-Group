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
      <div> <button id= "directButton"> Get Directions</button>
      `;
  
      ordersHTML += orderElement.outerHTML;
    }
  
    return ordersHTML;
  };
  
  const handleDirections = async (clickEvent) => {
    if (clickEvent.target.id === 'directButton') {
      await getParkDirections()
    }
  }

  const getParkDirections = async() => {
    const response = await fetch(`https://graphhopper.com/api/1/geocode?q=${parkFullName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocode = await response.json()
    const firstHit = geocode.hits[0]
    const parkLat = firstHit.point.lat
    const parkLng = firstHit.point.lng
    const parkLocation = `${parkLat},${parkLng}`

    const responsee = await fetch(`https://graphhopper.com/api/1/geocode?q=${eateryBusinessName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocodee = await responsee.json()
    const eatHit = geocodee.hits[0]
    const eatLat = eatHit.point.lat
    const eatLng = eatHit.point.lng
    const eateryLocation = `${eatLat},${eatLng}`
    
    const responseee = await fetch(`https://graphhopper.com/api/1/geocode?q=${attractionName}&locale=us&debug=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
    const geocodeee = await responseee.json()
    const attractHit = geocodeee.hits[0]
    const attractLat = attractHit.point.lat
    const attractLng = attractHit.point.lng
    const attractLocation = `${attractLat},${attractLng}`

     await directions(parkLat,parkLng,eatLat,eatLng)
  }

  
  const directions = async (startingLat,startingLng,endingLat,endingLng) => {
  const response = await fetch(`https://graphhopper.com/api/1/route?point=${startingLat},${startingLng}&point=${endingLat},${endingLng}&vehicle=car&locale=us&instructions=true&calc_points=true&key=18ddaec7-41f3-4433-91c3-33acd1099232`)
  const directionsData = await response.json()
  const directText = directionsData.paths[0].instructions


  let directHTML = ""
  let stepNumber = 0
  const directLoop = directText.forEach( text => {
   stepNumber ++;
    directHTML += `step ${stepNumber}: ${text.text}`
  });


  const myDirect = document.querySelector("#directionsHTML")
  myDirect.innerHTML = directHTML

}
  

