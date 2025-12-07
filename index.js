const axios = require('axios');
const express = require('express');
const { port, openWeatherApiKey } = require('./config');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather App' });
});

app.get('/check', (req, res) => {
    res.render('check', { title: 'Check Weather' });
});

app.post('/check', async (req, res) => {
    const { city, scale } = req.body;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`;

     try {
        const response = await axios.get(url);
        const data = response.data;

        const today = new Date().toISOString().split("T")[0];

        const todaysWeather = data.list.filter(entry =>
            //get only today's weather
            entry.dt_txt.startsWith(today)
        );

        res.status(200).json(todaysWeather);
        
        todaysWeather.map(entry => {
            console.log("Time:", entry.dt_txt);
            console.log("Temperature:", entry.main.temp + "°C");
            console.log("Feels like:", entry.main.feels_like + "°C");
            console.log("Humidity:", entry.main.humidity + "%");
            console.log("Weather:", entry.weather[0].description);
            console.log("Chance of Rain:", entry.pop);
            console.log("---------------------------");
        });
    } catch (err) {
        console.error("Error fetching weather:", err.response?.data || err.message);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});