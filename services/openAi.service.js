const fetch = require('node-fetch');

async function getWeatherData(location) {
  try {
    const apiKey = process.env.OPEN_AI_API_KEY;
    const url = `https://api.opengeo.io/weather?location=${encodeURIComponent(location)}&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenGeo API error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in OpenGeo service:', error);
    throw error;
  }
}

module.exports = { 
  getWeatherData 
};
