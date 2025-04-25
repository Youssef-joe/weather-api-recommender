const fetch = require("node-fetch");

async function getWeatherByLocation(location) {
    try {
        const apiKey = process.env.OPEN_AI_API_KEY
        const url = `https://api.opengeo.io/weather?location=${encodeURIComponent(location)}&apiKey=${apiKey}`

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`weather api error ${response.statusText}`)
        }
        const data = await response.json();
        return data

    } catch(error) {
        console.error("error fetching weather data", error);
        throw new Error(error.message ? error.message : error);

    }
}

module.exports = {
    getWeatherByLocation
}