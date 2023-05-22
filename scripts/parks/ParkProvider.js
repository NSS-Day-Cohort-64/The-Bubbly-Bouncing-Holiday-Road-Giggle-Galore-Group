

export const parksList = async () => {
    const fetchResponse = await fetch("https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI")
    const parks = await fetchResponse.json()
    const parksDataObj = parks.data
    let html = ""
    html += `<select id ="parks">`
    html += `<option value= "0"> Select a National Park </option>`

    for (const park of parksDataObj) {
        html += `<option value = "${park.id}"> ${park.fullName}</option>`
    }
    html += "</select>"
    return html
}





/*import { setPaint } from "./transient.js"

export const getPaint = async () => {
    const response = await fetch("http://localhost:8088/paints")
    const paints = await response.json()

    let html = "<h2>paint</h2>"

    html += '<select id="paint">'
    html += '<option value="0">Select a paint</option>'

    const arrayOfOptions = paints.map( (paint) => {
            return `<option value="${paint.id}">${paint.color}</option>`
        }
    )

    html += arrayOfOptions.join("")
    html += "</select>"
    return html
}



const paintHandler = function (event) {
    if(event.target.id === 'paint' )
    setPaint(event.target.value)
}

document.addEventListener("change", paintHandler)*/