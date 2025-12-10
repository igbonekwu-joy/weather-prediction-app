const route = require('../../routes/weather');
const request = require('supertest');
const app = require('../../index');
const express = require('express');
const { default: axios } = require('axios');
const { openWeatherApiKey} = require('../../config');

describe('weather route', () => {
    beforeAll(() => {
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use('/', route);
    });

    describe('/ GET', () => {
        it('should render weather page with the correct title', async () => {
            const spy = jest.spyOn(app.response, 'render');

            await request(app).get('/');

            expect(spy).toHaveBeenCalledWith('index', expect.objectContaining({ title: 'Weather App' }));
        });
    });
    
    describe('/ POST', () => {
        it('gets the weather data from api', async () => {
            const lat =  10;
            const lon = 20;

            const response = { weather: [{ main: 'Clouds' }], temp: 25 };

            axios.get = jest.fn().mockResolvedValue({ data: response });

            const res = await request(app)
                .post('/')
                .send({ lat, lon });

            expect(res.status).toBe(200);
            expect(res.body).toEqual(response);

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
            expect(axios.get).toHaveBeenCalledWith(url);
        });
    });

    describe('/check GET', () => {
        it('should render weather check page with the correct title', async () => {
            const spy = jest.spyOn(app.response, 'render');

            await request(app).get('/check');

            expect(spy).toHaveBeenCalledWith('check', expect.objectContaining({ title: 'Check Weather' }));
        });
    });

    describe('/check POST', () => {
        it('gets the weather forecast data from the api', async () => {
            const city = 'London';

            const response = { weather: [{ main: 'Clouds' }], temp: 25 };

            axios.get = jest.fn().mockResolvedValue({ data: response });

            const res = await request(app)
                .post('/check')
                .send({ city });

            expect(res.status).toBe(200);
            expect(res.body).toEqual(response);

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
            expect(axios.get).toHaveBeenCalledWith(url);
        });
    });
});