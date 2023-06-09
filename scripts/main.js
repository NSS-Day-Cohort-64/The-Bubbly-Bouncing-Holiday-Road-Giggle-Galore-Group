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
   <h1>Start Your Journey</h1>

    <article class="main-content">
        <aside id="parkWeatherContainer" class="weather">
            <h3>Weather Forecast:</h3>
           
        </aside>

        
        <div class="middle-section">
        
            
                <div class="dropboxes">
                    <section class="parks">
                    ${parks}
                        <section class="selected-parks">
                        
                            <div id="parkNameContainer"></div>
                        </section>
                    </section>
                        
                    <section class="eateries">
                        ${eateryHTML}
                        <section class="selected-eats">
                    
                            <div id="eateryNameContainer"></div>
                        </section>
                        
                    </section>
                        
                    <section class="attractions">
                        ${attractionHTML}

                        <section class="selected-attractions">
                            <div id="attractionNameContainer"></div>
                        </section>
                    </section>
                </div>
            
            <div class="buttons">
                    <div class="button">${saveButton}</div></section>
                <section>
                  <h2> directions </h2>
                  <div class = "directions">
                  <p id = "directionsHTML"></p>
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
