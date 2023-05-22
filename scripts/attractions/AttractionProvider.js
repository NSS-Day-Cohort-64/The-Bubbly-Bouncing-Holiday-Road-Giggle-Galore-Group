export const attractionList = async () => {
    const fetchResponse = await fetch(
        "http://holidayroad.nss.team/bizarreries"
    )
    const attractions = await fetchResponse.json()
}