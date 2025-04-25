const { generateActivities } = require('./../services/recommendation.service.js');
const { getWeatherByLocation } = require('./../models/weather.model.js');

async function getActivitiesByWeather(location) {
  try {
    // Get current weather
    const weatherData = await getWeatherByLocation(location);
    
    // Generate activity recommendations based on weather
    const activities = await generateActivities(location, weatherData);
    
    return {
      weather: weatherData,
      activities: activities
    };
  } catch (error) {
    console.error('Error getting activities by weather:', error);
    throw error;
  }
}

async function getAllActivities(location) {
  try {
    // Generate various activities for the location regardless of weather
    const activities = await generateActivities(location, null, true);
    
    return activities;
  } catch (error) {
    console.error('Error getting all activities:', error);
    throw error;
  }
}

module.exports = {
  getActivitiesByWeather,
  getAllActivities
};