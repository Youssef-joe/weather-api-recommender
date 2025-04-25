const { getActivitiesByWeather, getAllActivities } = require("./../models/activity.model.js");

const getActivitiesByWeatherHandler = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    const data = await getActivitiesByWeather(location);
    res.json(data);
  } catch (error) {
    console.error('Activity controller error:', error);
    res.status(500).json({ error: 'Failed to fetch activity recommendations' });
  }
};

const getAllActivitiesHandler = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    const activities = await getAllActivities(location);
    res.json(activities);
  } catch (error) {
    console.error('Activity controller error:', error);
    res.status(500).json({ error: 'Failed to fetch all activities' });
  }
};

module.exports = {
  getActivitiesByWeather: getActivitiesByWeatherHandler,
  getAllActivities: getAllActivitiesHandler
};
