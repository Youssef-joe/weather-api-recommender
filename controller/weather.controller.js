const { getWeatherByLocation } = require("./../models/weather.model.js")

const getWeather = async (req,res) => {
    try {
        const { location } = req.body
        if (!location) {
            return res.status(400).json({
                error: "location parameter is required"
            })
        }
        const weatherData = await getWeatherByLocation(location);
        res.json(weatherData);
    } catch(error) {
        console.error("weather controller errors", error);
        res.status(500).json({
            message : "error fetching weather data",
        })

    }
}

module.exports = {
    getWeather
}