const rp = require("request-promise");

module.exports = async function(city = "") {
    if(!city) {
        throw new Error("City name must not be empty");
    } 

    const KEY = "1e7a8a598f62a9bdbf2b1130c87744bd";
    const uri = "http://api.openweathermap.org/data/2.5/weather";

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: "imperial"
        },
        json: true
    }

    try {
        const data = await rp(options);
        const celsius = (data.main.temp - 32) * 5/9;
        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch(error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}