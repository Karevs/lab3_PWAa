const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const cityName = document.querySelector('h2.city');
const img = document.querySelector('img');
const temperature = document.querySelector('p.temp');
const weatherDescription = document.querySelector('p.weather_description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=6fe28a6b56eaac0eaab4db05ce0b2588';
const API_UNITS = '&units=metric';
const API_LANG = '&lang=pl';

function getWeather() {
    const API_CITY = input.value;
    const URL = API_LINK + API_CITY +API_KEY+API_UNITS+API_LANG;

    axios.get(URL).then(response => {
        console.log(response.data);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        temperature.textContent = `${Math.floor(response.data.main.temp)}°C`;
        weatherDescription.textContent = `${response.data.weather[0].description}`;
        weatherDescription.classList.add('color')
        feelsLike.textContent = `${Math.floor(response.data.main.feels_like)}°C`;
        pressure.textContent = `${response.data.main.pressure}hPa`;
        humidity.textContent = `${response.data.main.humidity}%`;
        wind_speed.textContent = `${Math.round(response.data.wind.speed* 3.6)}km/h`;
        clouds.textContent = `${response.data.clouds.all}%`;
        errorMessage.textContent = '';

        
    }).catch(error => {
        errorMessage.textContent = `${error.response.data.message}`;

        [cityName, temperature, weatherDescription, feelsLike,pressure,humidity,wind_speed,clouds].forEach(element => {
            element.textContent = '';
        })
        img.src = '';
        
    
    }).finally(() => {
        input.value = '';
    })
    
}

const getWeatherByEnter = e => {
    if (e.key === 'Enter'){
        getWeather();
    }
}

button.addEventListener('click', getWeather);
input.addEventListener('keypress', getWeatherByEnter);




