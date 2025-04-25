const fetch = require('node-fetch');

async function getWeatherByLocation(location) {
  try {
    // Using WeatherAPI.com instead (free tier with registration)
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error('Weather API key is not set in environment variables (WEATHER_API_KEY)');
    }
    
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
    
    console.log(`Fetching weather data from: ${url.replace(apiKey, 'API_KEY_HIDDEN')}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Weather API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

module.exports = {
  getWeatherByLocation
};