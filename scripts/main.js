import { attractionList } from "./attractions/AttractionProvider.js";
import { eateryList } from "./eateries/EateryProvider.js";
/* import { displayParkDetails } from "./parks/ParkDetails.js";
 */ import { parksList } from "./parks/ParkProvider.js";

const container = document.querySelector("#mainContainer");

const render = async () => {

  const eateryHTML = await eateryList()
  const parks = await parksList()
  const attractionHTML = await attractionList();
  
  
  const composedHTML = `
    <h1>Holiday Road</h1>

    <article class="main-content">
        <aside class="weather">
            <h2>Weather</h2>
        </aside>

        <div class="middle-section">
            <div class="dropboxes">
                <h2>dropboxes</h2>
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
            
                <section class="selected-options">
                    <h2>selected</h2>
                    
                    <div id="parkDetailsButton"></div>
                    <div id="eateryNameContainer"></div>
                    <div id="attractionNameContainer"></div>
                   
                </section>
        </div>

            <aside class="itinerary-list">
                <h2>list</h2>
            </aside>
    </article>
  `;

  container.innerHTML = composedHTML;

};

render();
