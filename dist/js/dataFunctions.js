const WEATHER_API_KEY = "f604fe7e9c832f51efa69c074078e6ee";

export const setLocationObject = (locationObj, coordsObj) => {
    //cordsObj = what we received from gelocation of browser // locationObj is what we created with our CurrentLocation class
    const { lat, lon, name, unit } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
      locationObj.setUnit(unit);
    }
  };

  export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
  };

  export const getCoordsFromApi = async (entryText, units) => {
        //Looks for entries that start and end with numbers which we assume are zip codes
     const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
     //spaces turned into %20, lat/long changed, ect. Encodes URL.
    const encodedUrl = encodeURI(url);
    try {
      const dataStream = await fetch(encodedUrl);
      const jsonData = await dataStream.json();
      return jsonData;
    } catch (err) {
      console.error(err.stack);
    }   
  };


//eliminates spaces in the search field before, between, and after words (1 space b/t words)
export const cleanText = (text) => {
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
  };