export const eateryList = async () => {
    const fetchResponse = await fetch(
        "http://holidayroad.nss.team/eateries"
    )
    const eats = await fetchResponse.json()
}