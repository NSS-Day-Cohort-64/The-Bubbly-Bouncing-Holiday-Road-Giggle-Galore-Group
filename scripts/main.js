import { eateryList } from "./eateries/EateryProvider.js";
import { parksList } from "./parks/ParkProvider.js";

const container = document.querySelector("#mainContainer");

const render = async () => {
  
  const eateryHTML = await eateryList()
  const parks = await parksList()

    const composedHTML = `
        <h1>Holiday Road</h1>

        <div class="dropboxs">
            <section class="parks">
               ${parks}
            </section>
                
            <section class="eateries">
                ${eateryHTML}
            </section>
                
            <section class="attractions">
                
            </section>
            </div>
            <div class="bottom-section"
            <aside class="weather">
               
            </aside>

            <section class="selected-options">

            </section>
            <aside class="itinerary-list">
            
            </aside>
            </div>
       
    `;

  container.innerHTML = composedHTML;
};

render();
