#Weather Application

This weather application is built using HTML, SASS and JS with the Open Weather Map API and a mobile first design. This project can easily be cross utilized to meet a variety of project needs/purposes.

Constructing this project has helped me to better learn and practice the following:
1) Using fa-spin class on font-awesome icons
2) @mixin _ {}
3) flex-grow
4) background-blend-mode: overlay
5) CSS animations
6) DOMContentLoaded
7) .nextElementSibling
 

 done for night

A general walkthrough of the unfactored JS code - strictly functionality only - can be found below. For a complete look at the refactored and finalized code please see the relevant file in the WeatherApplication directory.

First the initapp() function is constructed. Next the CurrentLocation class is created and exported into currentLoc. Next event handlers are added to the buttons, starting with the getLocation button.
```JavaScript
const initApp = () => {
    // add listeners
    const geoButton = document.getElementById('getLocation');
    geoButton.addEventListener('click', getGeoWeather);

    // set up

    // load weather
}

export default class CurrentLocation {
    constructor(){
        this._name = 'Current Location';
        this._lat = null;
        this._long = null;
        this._unit = 'imperial';
    }

    getName() {
        return this._name;
    }

    setName(name){
        this._name = name;
    }

    getLat(){
        return this._lat;
    }

    setLat(lat){
        this._lat = lat;
    }

    getLon(){
        return this._long;
    }

    setLon(lon){
        this.setLat._lon = lon;
    }

    getUnit(){
        return this._unit;
    }

    setUnit(unit){
        this._unit = unit;
    }

    toggleUnit(){
        this._unit = this._unit === 'imperial' ? 'metric' : 'imperial';
    }
}

const getGeoWeather = e => {
    if (e) {
        if(e.type === 'click'){
            // add spinner
            const mapIcon = document.querySelector('.fa-map-marker-alt');
            addSpinner(mapIcon);
        }
    } 
```
