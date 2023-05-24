import { attractionList } from "./attractions/AttractionProvider.js";
import { eateryList } from "./eateries/EateryProvider.js";
import { parksList } from "./parks/ParkProvider.js";
import { saveItineraryButton } from "./SelectedOptions.js";
import { savedItineraries } from "./ItineraryList.js";




const container = document.querySelector("#mainContainer");

const render = async () => {

  const eateryHTML = await eateryList()
  const parks = await parksList()
  const attractionHTML = await attractionList();
  const saveButton = saveItineraryButton()
  const itineraryList = await savedItineraries()
  
  const composedHTML = `
    <h1>Holiday Road</h1>

    <article class="main-content">
        <aside class="weather">
            <h2>Weather</h2>
        </aside>

        
        <div class="middle-section">
        
            
                 <div class="dropboxes">
                    <section class="parks">
                    ${parks}
                    </section>
                        
                    <section class="eateries">
                        ${eateryHTML}
                    </section>
                        
                    <section class="attractions">
                        ${attractionHTML}
                    </section>
            </div>
            
            <div class="buttons">
                <section class="selected-options">
                    <h2>selected</h2>
                    <div id="parkNameContainer"></div>
                    <div id="eateryNameContainer"></div>
                    <div id="attractionNameContainer"></div>
                    </section>
                    <div class="button">${saveButton}</div>
                <section>
                  <h2> directions </h2>
                  <div class = "directions">
                  <p> hello there</p>
                  </div>
                </section>
                    </div>
        </div>

            <aside class="itinerary-list">
                <h2>list</h2>
                ${itineraryList}
            </aside>
    </article>
  `;

  container.innerHTML = composedHTML;
};
    
    document.addEventListener("newItineraryCreated", render)
render();
