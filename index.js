const axios = require('axios');
const express = require('express');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather App' });
});

app.get('/check', (req, res) => {
    res.render('check', { title: 'Check Weather' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});