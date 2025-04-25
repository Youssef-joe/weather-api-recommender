// models/activityModel.js
const { generateActivities } = require('./../services/recommendation.service');
const { getWeatherByLocation } = require('./../models/weather.model');

async function getActivitiesByWeather(location) {
  try {
    // Get current weather
    const weatherData = await getWeatherByLocation(location);
    
    // Format weather data for the AI service
    const weatherInfo = {
      condition: weatherData.current.condition.text,
      temperature: weatherData.current.temp_c,
      isDay: weatherData.current.is_day === 1,
      wind: weatherData.current.wind_kph,
      humidity: weatherData.current.humidity
    };
    
    // Generate activity recommendations based on weather
    const activities = await generateActivities(location, weatherInfo);
    
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