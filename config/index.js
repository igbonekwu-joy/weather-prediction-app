const envFound = require('dotenv').config()
if(!envFound) throw new Error("Cannot find .env file")

module.exports= {
    port: process.env.PORT, 
    openWeatherApiKey: process.env.OPENWEATHER_API_KE
}