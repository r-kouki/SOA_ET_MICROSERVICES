const API_KEY = "38f9264b8e345e5059d64b5e08c19663";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&units=metric&lang=fr&q=";

export async function getWeatherData(city) {
  try {
    const response = await fetch(BASE_URL + city);
    
    console.log("En-têtes de la réponse:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      return null;
    }

    const weatherData = await response.json();
    return {
      city: weatherData.name || null,
      temperature: weatherData.main?.temp ?? null,
      humidity: weatherData.main?.humidity ?? null,
      windSpeed: weatherData.wind?.speed ? (weatherData.wind.speed * 3.6).toFixed(1) : null,
      clouds: weatherData.clouds?.all ?? null,
      description: weatherData.weather?.[0]?.description ?? null,
      unit: '°C'
    };
  } catch {
    return null;
  }
}

(async () => {
  const data = await getWeatherData("Sousse");
  
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
})();
