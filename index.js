var inputvalue = document.querySelector('#city');
var btn = document.querySelector('#submitBtn');
var cityOutput = document.querySelector('#cityoutput');
var descriptionOutput = document.querySelector('#description');
var tempOutput = document.querySelector('#temp');
var windOutput = document.querySelector('#wind');
var apiKey = '29ddb833a35ae8af78bcc9f3faa5b77e'; // Replace with your new API key

function convertKelvinToCelsius(val) {
    return (val - 273.15).toFixed(2);
}

btn.addEventListener('click', function () {
    var cityName = inputvalue.value;
    if (cityName.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            cityOutput.textContent = data.name;
            descriptionOutput.textContent = data.weather[0].description;
            tempOutput.textContent = `Temperature: ${convertKelvinToCelsius(data.main.temp)} °C`;
            windOutput.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was an issue fetching weather data. Please try again.');
        });
});
