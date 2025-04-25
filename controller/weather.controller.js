// controllers/weatherController.js
const { getWeatherByLocation } = require('./../models/weather.model.js');

const getWeather = async (req, res) => {
  try {
    // Log all request info for debugging
    console.log('Full request URL:', req.url);
    console.log('Query string:', req.url.split('?')[1]);
    console.log('Query object:', req.query);
    
    // Try accessing location in different ways
    const location = req.query.location || req.query['location'];
    
    console.log('Location parameter extracted:', location);
    
    if (!location || location === 'undefined' || location === 'null') {
      return res.status(400).json({ 
        error: 'Location parameter is required',
        receivedQuery: req.query,
        receivedLocation: location
      });
    }
    
    const weatherData = await getWeatherByLocation(location);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather controller error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data', message: error.message });
  }
};

module.exports = {
  getWeather
};