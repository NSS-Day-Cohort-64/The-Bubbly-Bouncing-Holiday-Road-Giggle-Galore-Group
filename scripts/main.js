import { eateryList } from "./eateries/EateryProvider.js";

const container = document.querySelector("#mainContainer");

const render = async () => {
  const eateryHTML = await eateryList();

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
                    
                    </section>
                        
                    <section class="eateries">
                        ${eateryHTML}
                    </section>
                        
                    <section class="attractions">
                        
                    </section>
            </div>
            
                <section class="selected-options">
                    <h2>selected</h2>
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
