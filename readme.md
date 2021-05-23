#Weather Application

This weather application is built using HTML, SASS and JS with the Open Weather Map API(https://openweathermap.org/) and a mobile first design. It uses serverless functions in order to keep hidden API keys. This project can easily be cross utilized to meet a variety of project needs/purposes.

Constructing this project has helped me to better learn and practice the following:
1) Using fa-spin class on font-awesome icons
2) @mixin _ {}
3) flex-grow
4) background-blend-mode: overlay
5) CSS animations
6) DOMContentLoaded
7) .nextElementSibling
8) Working with Local Storage
9) Google Dev Tools --> More Tools --> Sensors (for testing geolocations)
10) Using function expressions
11) encodedURL
12) Working with dates
13) Serverless functions

A general walkthrough of the unfactored JS code - strictly functionality only - can be found below. For a complete look at the refactored and finalized code please see the relevant file in the WeatherApplication directory.

First the initapp() function is constructed which will complete the initial app loading operations. Next the CurrentLocation class is created with many useful methods that acquire a users current location. 
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

document.addEventListener('DOMContentLoaded', initApp);
```


Animations are added to the button icons by way of the addSpinner() and animateButton() functions.
```JavaScript
export const addSpinner = (icon) => {
    animateButton(icon);
    setTimeout(animateButton, 1000, icon);
}

const animateButton = icon => {
    icon.classList.toggle('none');
    icon.nextElementSibling.classList.toggle('block');
    icon.nextElementSibling.classList.toggle('none');
}
```
const getGeoWeather = e => {
    if (e) {
        if(e.type === 'click'){
            // add spinner
            const mapIcon = document.querySelector('.fa-map-marker-alt');
            addSpinner(mapIcon);
        }
    } 
    
    
    To acquire the current location of the user, the getGeoWeather() function was created and gets called on its buttons click event.
   ```JavaScript
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

    geoButton.addEventListener('click', getGeoWeather);
   ```
   
   
   Next the geoSuccess and geoError functions are created. geoError() is constructed first. displayError() is created along with two helper functions, updateWeatherLocationHeader() and updateScreenReaderConfirmation. These are all 3 utilized by the geoError() function.
   ```JavaScript
   const geoError = (errObj) => {
    const errMsg = errObj ? errObj : "Geolocation not supported";
    displayError(errMsg, errMsg);
    
    
    export const displayError = (headerMsg, srMsg) => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
}

const updateWeatherLocationHeader = message => {
    const h2 = document.getElementById("currentForecast__location");
    h2.textContent = message;
}

const updateScreenReaderConfirmation = message => {
    document.getElementById('confirmation').textContent = message;
}
}
   ```
   
   
   A similar process is repeated for the geoSuccess() function with the myCoordsObj being created within which determines the latitude and longitude of the current location. Then the setLocationObject()  function is constructed in order to retreive the user location data as an object. 
   ```JavaScript
   const geoSuccess = position => {
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    // set location object
    setLocationObject(currentLocation, myCoordsObj);
 
    // update data and display
      updateDataAndDisplay(currentLocation);
}

export const setLocationObject = (locationObj, coordsObj) => {
    const { lat, lon, name, unit } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
}
   ```
   
   
   To update the data and UI display with the user location the updateDataAndDisplay() function is created.
   ```JavaScript
   const updateDataAndDisplay = async locationObj => {
     const weatherJson = await getWeatherFromCoords(locationObj);
     if (weatherJson) updateDisplay(weatherJson, locationObj); 
}
   ```
   
   
   To implement the home UI button first the element is selected and an add event listener added. Next the loadWeather() function is constructed which utilized the getHomeLocation() function. 
   ```JavaScript
    const homeButton = document.getElementById("home");
    homeButton.addEventListener('click', loadWeather);
    
const loadWeather = e => {
    const savedLocation = getHomeLocation();
    if(!savedLocation && !e) return getGeoWeather(); 
    if(!savedLocation && e.type === 'click'){
        displayError("No home location saved.",
        "Sorry. Please save a home location first."
        );
    } else if (savedLocation && !e){
        //When app is loaded w/saved loc & no btn click
        displayHomeLocationWeather(savedLocation);
    } else {
        //when button is clicked
        const homeIcon = document.querySelector('.fa-home');
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
}
   ```
   
   
   Following this, the displayHomeLocationWeather() function is assembled.
   ```JavaScript
   const displayHomeLocationWeather = home => {
    if (typeof home === 'string'){
        //parses string coming out of Local Stor
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        setLocationObject(currentLocation, myCoordsObj);
        updateDataAndDisplay(currentLocation);
    }
}
   ```
   
   
   The saveButton functionality is added next, first by selecting the element and adding a listener to it. Next, the saveLocation() function is created.
   ```JavaScript
       const saveButton = document.getElementById("saveLocation");
    saveButton.addEventListener('click', saveLocation);
    
    const saveLocation = () => {
    //if cur loc has lat & lon
    if(currentLocation.getLat() && currentLocation.getLon()){
        const saveIcon = document.querySelector('.fa-save');
        addSpinner(saveIcon);
        const location = {
            name: currentLocation.getName(),
            lat: currentLocation.getLat(),
            lon: currentLocation.getLon(),
            unit: currentLocation.getUnit()
        };
        localStorage.setItem('defaultWeatherLocation', JSON.stringify(location));
        updateScreenReaderConfirmation(`Saved ${currentLocation.getName()} as home location.`);
    }
}
   ```
   
   
   To add the functionality of the change units and refresh buttons, they are first selected and then their relevant functions created as for the previous buttons. 
   ```JavaScript
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
```


Too add the search bar functionality is added in similarly. Then the submitNewLocation() function is created.
```JavaScript
    const locationEntry = document.getElementById('searchBar__form');
    locationEntry.addEventListener('submit', submitNewLocation);
    
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
```


Next the displayApiError() function is created along with the toProperCase() function which can be utilized anywhere that word casing is important.
```JavaScript
export const displayApiError = statusCode => {
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(`${properMsg}. Please try again.`);
    console.log(error);
}

const toProperCase = (text) => {
    const words = text.split(" ");
    const properWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return properWords.join(" ");
}
```


The setPlaceholderText() function was created to dynamically set the placeholder text according to user screen width.
```JavaScript
export const setPlaceholderText = () => {
    const input = document.getElementById('searchBar__text');
    window.innerWidth < 400 ? (input.placeholder = "City, State, Country") : (input.placeholder = 'City, State, Country, or Zip Code')
}
```


To get data from the API the getCoordsFromApi() function was created.
```JavaScript
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
```


Now to be able to retrieve the API data the getWeatherFromCoords() function is created.
```JavaScript
  export const getWeatherFromCoords = async (locationObj) => {
      const lat = locationObj.getLat();
      const lon = locationObj.getLon();
      const units = locationObj.getUnit();
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  }
```


To display the fetched data from the API to the UI the updateDisplay() function was created along with the fadeDisplay() function to bring in the current forecast and six day forecast on to the UI screen. The clearDisplay() function was created to clean out old data on reloads/refresh.
```JavaScript
  export const updateDisplay = (weatherJson, locationObj) => {
      fadeDisplay();
      fadeDisplay();
  }

  const fadeDisplay = () => {
      const curentConditions = document.getElementById('currentForecast');
      curentConditions.classList.toggle("zero-vis");
      curentConditions.classList.toggle("fade-in");

      const sixDay = document.getElementById("dailyForecast");
      sixDay.classList.toggle("zero-vis");
      sixDay.classList.toggle("fade-in");
  }
```


The getWeatherClass() and setBgImage() functions were created to help with the UI display of fetched data.
```JavaScript
 const getWeatherClass = (icon) => {
      const firstTwoChars = icon.slice(0,2);
      const lastChar = icon.slice(2);
      const weatherLookup = {
          "09" : "snow",
          10: "rain",
          11: "rain",
          13: "snow",
          50: "fog"
      };
      let weatherClass;
      if(weatherLookup[firstTwoChars]){
          weatherClass = weatherLookup[firstTwoChars];
      } else if (lastChar === "d"){
          weatherClass = "clouds";
      } else {
          weatherClass = "night";
      }
      return weatherClass;
  };

  const setBGImage = (weatherClass) => {
      document.documentElement.classList.add(weatherClass);
      document.documentElement.classList.forEach(img => {
          if (img !== weatherClass) document.documentElement.classList.remove(img);
      });
  }
```


The buildScreenReaderWeather() function was created to assist with screen readers.
```JavaScript
  const buildScreenReaderWeather = (weatherJson, locationObj) => {
      const location = locationObj.getName();
      const unit = locationObj.getUnit();
      const tempUnit = unit === "imperial" ? "F" : "C";
      return `${weatherJson.current.weather[0].description} and ${Math.round(Number(weatherJson.current.temp))}°${tempUnit} in ${location}`;
  }
```


The createCurrentConditionsDivs() function was created to display the current conditions portion of the UI.
```JavaScript
  const createCurrentConditionsDivs = (weatherObj, unit) => {
      const tempUnit = unit === "imperial" ? "F" : "C";
      const windUnit = unit === "imperial" ? "mph" : "m/s";
      const icon = createMainImgDiv(weatherObj.current.weather[0].icon, weatherObj.current.weather[0].description);
      const temp = createElem("div", "temp", `${Math.round(Number(weatherObj.current.temp))}°`);
      const properDesc = toProperCase(weatherObj.current.weather[0].description);
      const desc = createElem("div", "desc", properDesc);
      const feels = createElem("div", "feels", `Feels like ${Math.round(Number(weatherObj.current.feels_like))}°`);
      const maxTemp = createElem("div", "maxtemp", `High ${Math.round(Number(weatherObj.daily[0].temp.max))}°`);
      const minTemp = createElem("div", "mintemp", `Low ${Math.round.Number(weatherObj.daily[0].temp.min)}°`);
      const humidity = createElem("div", "humidity", `Humidity ${weatherObj.current.humidity}%`);
      const wind = createElem("div", "wind", `Wind ${Math.round(Number(weatherObj.current.wind_speed))} ${windUnit}`);
      return [icon, temp, description, feels, maxTemp, minTemp, humidity, wind];
  };
```

***End Walkthrough - This walkthrough is left incomplete and will be refactored, remade, and updated within 45 days.

