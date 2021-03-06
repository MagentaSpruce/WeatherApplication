#Weather Application

This weather application is built using HTML, SASS and JS with the Open Weather Map API(https://openweathermap.org/) and a mobile first design. It uses serverless functions in order to keep hidden API keys. This project can easily be cross utilized to meet a variety of project needs/purposes.

Constructing this project has helped me to better learn and practice the following:
1) Using fa-spin class on font-awesome icons
2) Accessibility and screen reading attribute helpers like role, aria-labels, and title attributes.
3) @mixin _ {}
4) flex-grow
5) background-blend-mode: overlay
6) CSS animations
7) DOMContentLoaded
8) .nextElementSibling
9) Working with Local Storage
10) Google Dev Tools --> More Tools --> Sensors (for testing geolocations)
11) Using function expressions
12) encodedURL
13) Working with dates
14) Serverless functions
15) Netlify

A general walkthrough of the unfactored JS code - strictly functionality only - can be found below. For a complete look at the refactored and finalized code please see the relevant file in the WeatherApplication directory.

After the HTML & SCSS/CSS have been finished and made working then the content which was used inside the display for styling is commented out so that it can be rerendered inside of the sections dynamically eventually. 

First the initapp() function is constructed which will complete the initial app loading operations. Next the CurrentLocation class is created in the CurrentLocation.js file and then exported to main.js. The current location class contains all of the setters and getters for the constructor properties.
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

Next event listeners need to be added to the 6 buttons contained inside the app, starting with the geoButton. 
```JavaScript
const initApp() => {
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener('click', getGeoWeather);
    }
 ```
 
 Creating the getGeoWeather() function comes next. I will not read the code out throughout as this readme is not meant to be a JS tutorial. However were I to explain each function, which there are too many and this would go much too long, I would detail it out as thus:
 If there is an event and that event type is a click then the icon that has the map marker on it will have the addSpinner() function called on it (not yet created) which will cause the loading spinner icon to animate during data retreival. If the broswer supported geolocation is not present or enabled then the geoError() function is returned to the client (not yet created). However if the user does have browser geolocation present/enabled then the getCurrentPosition() function (not yet created) is called to render the users location, or, barring some error, that error returned instead. 
 ```JavaScript
   const getGeoWeather = (event) => {
    if (event && event.type === "click") {
      const mapIcon = document.querySelector(".fa-map-marker-alt");
      addSpinner(mapIcon);
    }
    if (!navigator.geolocation) return geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };
 ```
 
 In the domFunctions.js the addSpinner() function is created and imported into main.js. Animations are added to the button icons by way of the animateButton() function.
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


Next the geoError() function were constructed.
```JavaScript
 const geoError = (errObj) => {
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    displayError(errMsg, errMsg);
  };
```

Next the displayError() function was created inside of domFunctions.js to help the geoError() function. displayError() is imported into main.js.
```JavaScript
  export const displayError = (headerMsg, srMsg) => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
  };
  ```
  
  Following this the two helper functions inside if displayError() were created.
  ```JavaScript
  const updateWeatherLocationHeader = message => {
  document.getElementById('currentForecast__location');
  h1.textContent = message;
  };
  
  const updateScreenReaderConfirmation = message => {
  document.getElementById('confirmation').textContent = message;
  };
  ```


The next function to be created is the geoSuccess function now that geoError has been taken care of(for now!).
```JavaScript
  const geoSuccess = (position) => {
    const myCoordsObj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    setLocationObject(currentLoc, myCoordsObj);
    //update data and display
  };
  ```
  
  Before updating the data and display, the setLocationObject() function is created inside of dataFunctions.js and imported into main.js. This function takes the coordsObj which contains the data retrieved from the browser and the locationObj which was created above and uses the browser data to set the location object properties to match.
 ```JavaScript
 export const setLocationObject = (locationObj, coordsObj) => {
    const { lat, lon, name, unit } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
      locationObj.setUnit(unit);
    }
  };
  ```

To finish the geoSuccess() function the update and display functionality is added and called
```JavaScript
const updateDateAndDisplay = async(locationObj) => {
const weatherJson = await getWeatherFromCoords(locationObj);
if(weatherJson) updateDisplay(weatherJson, locationObj);
};
```

This takes care of the first navigation map icon button. Now a similar process is repeated for each button, starting with the home button icon being selected and listened to. 
```JavaScript
const initApp = () => {
    // add listeners
    const geoButton = document.getElementById('getLocation');
    geoButton.addEventListener('click', getGeoWeather);
    const homeButton = document.getElementById('home');
    homeButton.addEventListener('click', loadWeather);
    // set up

    // load weather
    loadWeather();
}
```

At this point the loadWeather() function was created which first checks to see if there is already a saved location from which to render data for.
```JavaScript
const loadWeather = event => {
    const savedLocation = getHomeLcation();
  }
 ```
 
 Next the getHomeLocation() function was created inside of the dataFunctions.js file and imported into main.js.
 ```JavaScript
 export const getHomeLocation = () => {
 return localStorage.getItem('defaultWeatherLocation');
 };
 ```

At this point the loadWeather() function can be finished.
```JavaScript
  const loadWeather = (event) => {
    const savedLocation = getHomeLocation();
    if (!savedLocation && !event) return getGeoWeather();
    if (!savedLocation && event.type === "click") {
      displayError(
        "No Home Location Saved.",
        "Sorry. Please save your home location first."
      );
    } else if (savedLocation && !event) {
      displayHomeLocationWeather(savedLocation);
    } else {
      const homeIcon = document.querySelector(".fa-home");
      addSpinner(homeIcon);
      displayHomeLocationWeather(savedLocation);
    }
  };
  ```
  
  Next the helper function displayHomeLocationWeather() needs to be created. First the response is checked to make sure it is in the string format. This string is then parsed and the data contained within used to create the myCoordsObj. The values from this are then set as the values for the currentLocation object by way of using the currentLoc variable. The new data is then displayed to the screen.
  ```JavaScript
    const displayHomeLocationWeather = (home) => {
    if (typeof home === "string") {
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
  };
  ```

At this point the first two navigation buttons functionality has been implemented. Next the save button will be dealt with.
```JavaScript
const initApp = () => {
  // add listeners
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);
  const homeButton = document.getElementById("home");
  homeButton.addEventListener("click", loadWeather);
  const saveButton = document.getElementById("saveLocation");
  saveButton.addEventListener("click", saveLocation);

  // set up
  setPlaceholderText();
  // load weather
  loadWeather();
};
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
      return `${weatherJson.current.weather[0].description} and ${Math.round(Number(weatherJson.current.temp))}??${tempUnit} in ${location}`;
  }
```


The createCurrentConditionsDivs() function was created to display the current conditions portion of the UI.
```JavaScript
  const createCurrentConditionsDivs = (weatherObj, unit) => {
      const tempUnit = unit === "imperial" ? "F" : "C";
      const windUnit = unit === "imperial" ? "mph" : "m/s";
      const icon = createMainImgDiv(weatherObj.current.weather[0].icon, weatherObj.current.weather[0].description);
      const temp = createElem("div", "temp", `${Math.round(Number(weatherObj.current.temp))}??`);
      const properDesc = toProperCase(weatherObj.current.weather[0].description);
      const desc = createElem("div", "desc", properDesc);
      const feels = createElem("div", "feels", `Feels like ${Math.round(Number(weatherObj.current.feels_like))}??`);
      const maxTemp = createElem("div", "maxtemp", `High ${Math.round(Number(weatherObj.daily[0].temp.max))}??`);
      const minTemp = createElem("div", "mintemp", `Low ${Math.round.Number(weatherObj.daily[0].temp.min)}??`);
      const humidity = createElem("div", "humidity", `Humidity ${weatherObj.current.humidity}%`);
      const wind = createElem("div", "wind", `Wind ${Math.round(Number(weatherObj.current.wind_speed))} ${windUnit}`);
      return [icon, temp, description, feels, maxTemp, minTemp, humidity, wind];
  };
```

***End Walkthrough - This walkthrough is left incomplete and will be refactored, remade, and updated within 45 days.

