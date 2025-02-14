import request from 'request';

const API_KEY = "38f9264b8e345e5059d64b5e08c19663";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&units=metric&lang=fr&q=";

export function getWeatherData(city, callback) {
  const url = BASE_URL + city;

  request({ url, headers: { 'User-Agent': 'Mozilla/5.0' } }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("En-têtes de la réponse:", response.headers);

      const weatherData = JSON.parse(body);
      const formattedData = {
        city: weatherData.name || null,
        temperature: weatherData.main?.temp ?? null,
        humidity: weatherData.main?.humidity ?? null,
        windSpeed: weatherData.wind?.speed ? (weatherData.wind.speed * 3.6).toFixed(1) : null,
        clouds: weatherData.clouds?.all ?? null,
        description: weatherData.weather?.[0]?.description ?? null,
        unit: '°C'
      };
      callback(null, formattedData);
    } else {
      callback(null, null);
    }
  });
}

getWeatherData("Sousse", (error, data) => {
  if (data) {
    console.log(`
Météo à ${data.city}:
------------------------
Température: ${data.temperature}${data.unit}
Humidité: ${data.humidity}%
Vitesse du vent: ${data.windSpeed} km/h
Couverture nuageuse: ${data.clouds}%
Conditions: ${data.description}
    `);
  }
});
