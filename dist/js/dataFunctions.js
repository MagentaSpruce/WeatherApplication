export const setLocationObject = (locationObj, coordsObj) => { //cordsObj = what we received from gelocation of browser // locationObj is what we created with our CurrentLocation class
    const { lat, lon, name, unit } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
}

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
}

//eliminates spaces in the search field before, between, and after words (1 space b/t words)
export const cleanText = text => {
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
}