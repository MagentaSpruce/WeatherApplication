'use strict';
import CurrentLocation from "./CurrentLocation.js";
import { addSpinner } from '../js/domFunctions.js';

const currentLoc = new CurrentLocation();

const initApp = () => {
    // add listeners
    const geoButton = document.getElementById('getLocation');
    geoButton.addEventListener('click', getGeoWeather);

    // set up

    // load weather
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
    // if (!navigator.geolocation) geoError();
    // navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}