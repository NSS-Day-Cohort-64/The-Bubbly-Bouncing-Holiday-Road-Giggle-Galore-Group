// export const eateries = async () => {
//     const fetchResponse = await fetch(
//         "http://holidayroad.nss.team/eateries"
//     )
//     const eateries = await fetchResponse.json()
//     let selectedHTML = ""
//     for (const eatery of eateries) {
//         selectedHTML += `<div>
//         ${eatery.businessName}
//         </div>`
//     }
// return selectedHTML
// }

// export const eateries = async () => {
//     const fetchResponse = await fetch("http://holidayroad.nss.team/eateries");
//     const eateries = await fetchResponse.json();
  
//     let selectedHTML = "";
//     for (const eatery of eateries) {
//       selectedHTML += `<div>
//           ${eatery.businessName}
//         </div>`;
//     }
  
//     return selectedHTML;
//   };
  
//   export const displaySelectedEatery = (eateryName) => {
//     const eateryNameContainer = document.querySelector("#eateryNameContainer");
//     eateryNameContainer.textContent = eateryName;
//   };