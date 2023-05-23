
const eateryFunc = async () => {
const fetchResponse = await fetch("http://holidayroad.nss.team/eateries");
  const eats = await fetchResponse.json();

}



export const savedItineraries = async () => {
    const fetchResponse = await fetch(
        "http://localhost:8088/itineraries"
      );
      const orders = await fetchResponse.json();
      let ordersHTML = "";
      const ordersArray = orders.map((itinerary) => {
        
        ordersHTML += `<div>
               ${itinerary.parksId.fullName} ${itinerary.eateriesId.businessName} 
               ${itinerary.attractionsId.name}
                </div>`;
      });
      ordersHTML += ordersArray.join(" ");
      return ordersHTML;
    };