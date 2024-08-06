document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'd9d754cb7d04f4f14cd7d21d543defcc'; // Replace with your OpenWeatherMap API key
  const city = 'Manila,PH';
  const units = 'metric'; // Use 'imperial' for Fahrenheit

  const weatherIcon = document.getElementById('weather-icon');
  const weatherDescription = document.getElementById('weather-description');
  const weatherTemperature = document.getElementById('weather-temperature');
  const weatherForecast = document.getElementById('weather-forecast');

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const temperature = data.main.temp;

      weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">`;
      weatherDescription.textContent = weather.description;
      weatherTemperature.textContent = `${temperature}°${units === 'metric' ? 'C' : 'F'}`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });

  // Fetch weather forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`)
    .then(response => response.json())
    .then(data => {
      const forecast = data.list.slice(0, 5); // Get the next 5 forecast periods
      const forecastHtml = forecast.map(entry => {
        const date = new Date(entry.dt * 1000);
        const description = entry.weather[0].description;
        const temp = entry.main.temp;
        const icon = entry.weather[0].icon;
        return `
          <div class="forecast-item">
            <div>${date.toLocaleTimeString()}</div>
            <div><img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}"></div>
            <div>${description}</div>
            <div>${temp}°${units === 'metric' ? 'C' : 'F'}</div>
          </div>
        `;
      }).join('');
      weatherForecast.innerHTML = forecastHtml;
    })
    .catch(error => {
      console.error('Error fetching weather forecast:', error);
    });
});
