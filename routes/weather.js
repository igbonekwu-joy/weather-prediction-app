const express = require('express');
const router = express.Router();
const { openWeatherApiKey } = require('../config');
const axios = require('axios');


router.get('/', async (req, res) => {
    res.render('index', { title: 'Weather App' });
});

router.post('/', async (req, res) => {
    const { lat, lon } = req.body;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    res.status(200).json(data);
});

router.get('/check', (req, res) => {
    res.render('check', { title: 'Check Weather' });
});

router.post('/check', async (req, res) => {
    const { city } = req.body;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const today = new Date().toISOString().split("T")[0];

    const todaysWeather = data.list.filter(entry =>
        //get only today's weather
        entry.dt_txt.startsWith(today)
    );

    res.status(200).json(todaysWeather);
});

module.exports = router;