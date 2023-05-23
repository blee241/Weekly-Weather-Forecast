const apiKey = 'be54b35146f1d2f53bd09b1612c4abbf';
const apiCallGeolocator = city => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
const apiCallCurrentWeather = (latitude, longitude) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const apiCallFiveDay = (latitude, longitude) => `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const searchBtnEl = document.getElementById('searchBtn');

//Variables for the currect city elements and forecast elements
const currentCityEl = document.getElementById('currentCity');
const currentTempEl = document.getElementById('currentTemp');
const currentWindEl = document.getElementById('currentWind');
const currentHumidityEl = document.getElementById('currentHumidity');

const dayOneDateEl = document.getElementById('dayOneDate');
const dayOneTempEl = document.getElementById('dayOneTemp');
const dayOneWindEl = document.getElementById('dayOneWind');
const dayOneHumidityEl = document.getElementById('dayOneHumidity');

const dayTwoDateEl = document.getElementById('dayTwoDate');
const dayTwoTempEl = document.getElementById('dayTwoTemp');
const dayTwoWindEl = document.getElementById('dayTwoWind');
const dayTwoHumidityEl = document.getElementById('dayTwoHumidity');

const dayThreeDateEl = document.getElementById('dayThreeDate');
const dayThreeTempEl = document.getElementById('dayThreeTemp');
const dayThreeWindEl = document.getElementById('dayThreeWind');
const dayThreeHumidityEl = document.getElementById('dayThreeHumidity');

const dayFourDateEl = document.getElementById('dayFourDate');
const dayFourTempEl = document.getElementById('dayFourTemp');
const dayFourWindEl = document.getElementById('dayFourWind');
const dayFourHumidityEl = document.getElementById('dayFourHumidity');

const dayFiveDateEl = document.getElementById('dayFiveDate');
const dayFiveTempEl = document.getElementById('dayFiveTemp');
const dayFiveWindEl = document.getElementById('dayFiveWind');
const dayFiveHumidityEl = document.getElementById('dayFiveHumidity');

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
    currentCityEl.textContent = currentWeatherData.name + ' ' + unixToDate(currentWeatherData.dt);
    currentTempEl.textContent = currentWeatherData.main.temp;
    currentWindEl.textContent = currentWeatherData.wind.speed;
    currentHumidityEl.textContent = currentWeatherData.main.humidity;
    const fiveDayWeatherData = await getFiveDayWeatherData(cityToSearch);

    console.log('Forecast Data',fiveDayWeatherData);
    dayOneDateEl.textContent = unixToDate(fiveDayWeatherData.list[3].dt);
    dayOneTempEl.textContent = fiveDayWeatherData.list[3].main.temp;
    dayOneWindEl.textContent = fiveDayWeatherData.list[3].wind.speed;
    dayOneHumidityEl.textContent = fiveDayWeatherData.list[3].main.humidity;

    dayTwoDateEl.textContent = unixToDate(fiveDayWeatherData.list[11].dt);
    dayTwoTempEl.textContent = fiveDayWeatherData.list[11].main.temp;
    dayTwoWindEl.textContent = fiveDayWeatherData.list[11].wind.speed;
    dayTwoHumidityEl.textContent = fiveDayWeatherData.list[11].main.humidity;

    dayThreeDateEl.textContent = unixToDate(fiveDayWeatherData.list[18].dt);
    dayThreeTempEl.textContent = fiveDayWeatherData.list[18].main.temp;
    dayThreeWindEl.textContent = fiveDayWeatherData.list[18].wind.speed;
    dayThreeHumidityEl.textContent = fiveDayWeatherData.list[18].main.humidity;

    dayFourDateEl.textContent = unixToDate(fiveDayWeatherData.list[26].dt);
    dayFourTempEl.textContent = fiveDayWeatherData.list[26].main.temp;
    dayFourWindEl.textContent = fiveDayWeatherData.list[26].wind.speed;
    dayFourHumidityEl.textContent = fiveDayWeatherData.list[26].main.humidity;

    dayFiveDateEl.textContent = unixToDate(fiveDayWeatherData.list[34].dt);
    dayFiveTempEl.textContent = fiveDayWeatherData.list[34].main.temp;
    dayFiveWindEl.textContent = fiveDayWeatherData.list[34].wind.speed;
    dayFiveHumidityEl.textContent = fiveDayWeatherData.list[34].main.humidity;
};

const unixToDate = (unix) => {
    const date = new Date(unix * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${formattedMonth}/${formattedDay}/${year}`;
};

renderWeatherData();
searchBtnEl.addEventListener('click', () => renderWeatherData());

