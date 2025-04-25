const express = require('express');
const router = express.Router();
const { getWeather } = require('./../controller/weather.controller.js');

router.get('/', getWeather);

module.exports = router;