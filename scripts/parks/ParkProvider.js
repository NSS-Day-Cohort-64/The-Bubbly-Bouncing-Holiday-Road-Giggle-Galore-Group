export const parksList = async () => {
    const fetchResponse = await fetch(
        "https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI"
    )
    const parks = await fetchResponse.json()
}