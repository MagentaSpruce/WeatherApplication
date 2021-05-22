'use strict';
import { setLocationObject, getHomeLocation } from './dataFunctions.js';
import CurrentLocation from "./CurrentLocation.js";
import { addSpinner, displayError } from '../js/domFunctions.js';



const currentLocation = new CurrentLocation();

const initApp = () => {
    // add listeners
    const geoButton = document.getElementById('getLocation');
    geoButton.addEventListener('click', getGeoWeather);
    const homeButton = document.getElementById("home");
    homeButton.addEventListener('click', loadWeather);

    // set up

    // load weather
    loadWeather();
}

document.addEventListener('DOMContentLoaded', initApp);

const getGeoWeather = e => {
    if (e) {
        if(e.type === 'click'){
            // add spinner
            const mapIcon = document.querySelector('.fa-map-marker-alt');
            addSpinner(mapIcon);
        }
    } 
    if (!navigator.geolocation) geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

const geoError = (errObj) => {
    const errMsg = errObj ? errObj : "Geolocation not supported";
    displayError(errMsg, errMsg);
}

// if geolocation succeeds, a position is given.
const geoSuccess = position => {
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    // set location object
    setLocationObject(currentLocation, myCoordsObj);
    console.log(currentLocation);
 
    // update data and display
    updateDataAndDisplay(currentLocation);
};

const loadWeather = e => {
    const savedLocation = getHomeLocation();
}

const updateDataAndDisplay = async locationObj => {
    // const weatherJson = await getWeatherFromCoords(locationObj);
    // if (weatherJson) updateDisplay(weatherJson, locationObj); 
};