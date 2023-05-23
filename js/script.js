var lat;
var lon;
const apiKey = 'be54b35146f1d2f53bd09b1612c4abbf';
const apiCallGeolocator = city => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
const apiCallCurrentWeather = (latitude, longitude) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
const apiCallFiveDay = (latitude, longitude) => `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`
const searchBtnEl = document.getElementById('searchBtn');

//Variables for the currect city elements
const currentCityEl = document.getElementById('currentCity');
const currentTempEl = document.getElementById('currentTemp');
const currentWindEl = document.getElementById('currentWind');
const currentHumidityEl = document.getElementById('currentHumidity');

//Grabs the latitude and longitude of a searched city
const getLatLon = (city) => {
    return fetch(apiCallGeolocator(city))
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            //Saves lat and lon coordinates data to corresponding vars
            lat = data[0].lat;
            lon = data[0].lon;
            lat = Math.round(lat * 100) / 100;
            lon = Math.round(lon * 100) / 100;
            //Resolves the promise by outputting lat and lon in an array
            return([lat, lon])
        })
        .catch(err => console.log(err));
}

const fetchCurrentWeather = ([latitude, longitude]) => {
    //This makes an api call for the weather using the lat and lon from the previous promise
    return fetch(apiCallCurrentWeather(latitude, longitude))
        .then((res) => {
            return res.json();
        })
        .then(data => {
            //This promise is resolved with weather data for the city
            return data;
        })
        .catch(err => console.log(err));
}

//Combines the geolocation api and weather api into one. Takes a city as an input and outputs its current weather data as a promise.
const getCurrentWeatherData = (city) => {
    return getLatLon(city)
        .then(locationData => 
            fetchCurrentWeather(locationData))
        .catch(err => console.log(err))
}

const renderWeatherData = async () => {
    const cityToSearch = document.getElementById('cityToSearch').value;
    const data = await getCurrentWeatherData(cityToSearch);
    console.log(data)
    currentCityEl.textContent = data.name;
    currentTempEl.textContent = data.main.temp;
    currentWindEl.textContent = data.wind.speed;
    currentHumidityEl.textContent = data.main.humidity;
}

renderWeatherData();
searchBtnEl.addEventListener('click', () => renderWeatherData());

