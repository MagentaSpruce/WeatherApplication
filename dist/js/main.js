"use strict";
import { setLocationObject, getHomeLocation, cleanText } from "./dataFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
import { addSpinner, displayError, updateScreenReaderConfirmation, displayApiError, setPlaceholderText } from "./domFunctions.js";

const currentLoc = new CurrentLocation();

const initApp = () => {
    // add listeners
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);

    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);

    const saveButton = document.getElementById("saveLocation");
    saveButton.addEventListener("click", saveLocation);

    const unitButton = document.getElementById('unit');
    unitButton.addEventListener('click', setUnitPref);

    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', refreshWeather);

    const locationEntry = document.getElementById('searchBar__form');
    locationEntry.addEventListener('submit', submitNewLocation);


    // set up
    setPlaceholderText();
  
    // load weather
    loadWeather();
};

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = event => {
    if (event) {
        if(event.type === "click"){
            // add spinner
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            addSpinner(mapIcon);
        }
    } 
    if (!navigator.geolocation) geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = errObj => {
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
};

// if geolocation succeeds, a position is given.
const geoSuccess = position => {
    //make our own object to hold the object data we want
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    // set location object
    setLocationObject(currentLoc, myCoordsObj);
    // console.log(currentLoc);
 
    // update data and display
    updateDataAndDisplay(currentLoc);
};

const loadWeather = event => {
    const savedLocation = getHomeLocation();
    if(!savedLocation && !event) return getGeoWeather(); 
    if(!savedLocation && event.type === "click"){
        displayError("No home location saved.",
        "Sorry. Please save a home location first."
        );
    } else if (savedLocation && !event){
        //When app is loaded w/saved loc & no btn click
        displayHomeLocationWeather(savedLocation);
    } else {
        //when button is clicked
        const homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};

const displayHomeLocationWeather = home => {
    if (typeof home === "string"){
        //parses string coming out of Local Stor
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        setLocationObject(currentLoc, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    }
}

const saveLocation = () => {
    //if cur loc has lat & lon
    if(currentLoc.getLat() && currentLoc.getLon()){
        const saveIcon = document.querySelector(".fa-save");
        addSpinner(saveIcon);
        const location = {
            name: currentLoc.getName(),
            lat: currentLoc.getLat(),
            lon: currentLoc.getLon(),
            unit: currentLoc.getUnit()
        };
        localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
       
        updateScreenReaderConfirmation(`Saved ${currentLoc.getName()} as home location.`);
    }
};

const setUnitPref = () => {
    const unitIcon = document.querySelector('.fa-chart-bar');
    addSpinner(unitIcon);
    currentLoc.toggleUnit();
    updateDataAndDisplay(currentLoc);
};

const refreshWeather = () => {
    const refreshIcon = document.querySelector('fa-sync-alt');
    addSpinner(refreshIcon);
    updateDataAndDisplay(currentLoc);
};

const submitNewLocation = async (event) => {
    event.preventDefault();
    const text = document.getElementById('searchBar__text').value;
    const entryText = cleanText(text);
    if(!entryText.length) return;
    const locationIcon = document.querySelector('.fa-search');
    addSpinner(locationIcon);
    const coordsData = await getCoordsFromApi(entryText, currentLoc.getUnit());
    if (coordsData.cod === 200){
        // work with api data
        //success
        const myCoordsObj = {};
        setLocationObject(currentLoc, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    } else {
        displayApiError(coordsData);
    }
}

const updateDataAndDisplay = async locationObj => {
    console.log(locationObj);
    // const weatherJson = await getWeatherFromCoords(locationObj);
    // if (weatherJson) updateDisplay(weatherJson, locationObj); 
};