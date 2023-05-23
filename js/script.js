const apiKey = 'be54b35146f1d2f53bd09b1612c4abbf';
const apiCallGeolocator = city => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
const apiCallCurrentWeather = (latitude, longitude) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const apiCallFiveDay = (latitude, longitude) => `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const searchBtnEl = document.getElementById('searchBtn');

//Variables for the currect city elements
const currentCityEl = document.getElementById('currentCity');
const currentTempEl = document.getElementById('currentTemp');
const currentWindEl = document.getElementById('currentWind');
const currentHumidityEl = document.getElementById('currentHumidity');

const dayOneTempEl = document.getElementById('dayOneTemp');
const dayOneWindEl = document.getElementById('dayOneWind');
const dayOneHumidityEl = document.getElementById('dayOneHumidity');

//Grabs the latitude and longitude of a searched city
const getLatLon = (city) => {
    return fetch(apiCallGeolocator(city))
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            //Saves lat and lon coordinates data to corresponding vars
            let lat = data[0].lat;
            let lon = data[0].lon;
            lat = Math.round(lat * 100) / 100;
            lon = Math.round(lon * 100) / 100;
            //Resolves the promise by outputting lat and lon in an array
            return([lat, lon])
        })
        .catch(err => console.log(err));
};

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
};

const fetchFiveDayWeather = ([latitude, longitude]) => {
    return fetch(apiCallFiveDay(latitude, longitude))
        .then((res) => {
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
};

//Combines the geolocation api and weather api into one. Takes a city as an input and outputs its current weather data as a promise.
const getCurrentWeatherData = (city) => {
    return getLatLon(city)
        .then(locationData => 
            fetchCurrentWeather(locationData))
        .catch(err => console.log(err));
};

const getFiveDayWeatherData = (city) => {
    return getLatLon(city)
        .then(locationData =>
            fetchFiveDayWeather(locationData))
        .catch(err => console.log(err));
};

const renderWeatherData = async () => {
    const cityToSearch = document.getElementById('cityToSearch').value;
    const currentWeatherData = await getCurrentWeatherData(cityToSearch);
    console.log('Current Weather Data', currentWeatherData);
    currentCityEl.textContent = currentWeatherData.name;
    currentTempEl.textContent = currentWeatherData.main.temp;
    currentWindEl.textContent = currentWeatherData.wind.speed;
    currentHumidityEl.textContent = currentWeatherData.main.humidity;
    const fiveDayWeatherData = await getFiveDayWeatherData(cityToSearch);
    console.log('Forecast Data',fiveDayWeatherData);
    dayOneTempEl.textContent = fiveDayWeatherData.list[3].main.temp;
    dayOneWindEl.textContent = fiveDayWeatherData.list[3].wind.speed;
    dayOneHumidityEl.textContent = fiveDayWeatherData.list[3].main.humidity;
};

renderWeatherData();
searchBtnEl.addEventListener('click', () => renderWeatherData());

