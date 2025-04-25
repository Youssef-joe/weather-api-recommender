const express = require('express');
const router = express.Router();
const { getActivitiesByWeather, getAllActivities } = require('./../controller/activity.controller.js');

router.get('/recommendations', getActivitiesByWeather);
router.get('/all', getAllActivities);

module.exports = router;