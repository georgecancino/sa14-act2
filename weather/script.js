const form = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const currentTimeContainer = document.querySelector('#current-time');
const currentWeatherContainer = document.querySelector('#current-weather-info');
const forecastContainer = document.querySelector('#forecast-info');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city.trim() !== '') {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeatherData(city) {
    const apiKey = '961f4a527b0f448ead963048242803';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentTime();
            displayCurrentWeather(data);
            displayForecast(data.forecast.forecastday);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}

function displayCurrentTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedTime = now.toLocaleDateString('en-US', options);
    currentTimeContainer.textContent = `Current Time: ${formattedTime}`;
}

function displayCurrentWeather(data) {
    const current = data.current;
    currentWeatherContainer.innerHTML = `
        <h3>${data.location.name}</h3>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <img src="https:${current.condition.icon}" alt="Weather Icon">
    `;
}

function displayForecast(forecastData) {
    forecastContainer.innerHTML = '';
    forecastData.forEach(day => {
        const date = new Date(day.date);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const forecastHtml = `
            <div>
                <p>${formattedDate}</p>
                <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                <p>${day.day.avgtemp_c}°C</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastHtml;
    });
}
