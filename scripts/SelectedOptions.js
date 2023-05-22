async function fetchDataFromMultipleAPIs() {
    try {
      const apiUrls = [
        'http://holidayroad.nss.team/eateries',
        'http://holidayroad.nss.team/bizarreries',
        `http://localhost:8088/itineraries`,
        'https://developer.nps.gov/api/v1/parks?api_key=SB14CPSabSBvnka022NtJOwYUqNocKf5ghvFyYhI'
      ];
  
      const responses = await Promise.all(apiUrls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(response => response.json()));
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  