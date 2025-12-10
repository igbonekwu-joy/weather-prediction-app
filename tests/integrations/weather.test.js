const route = require('../../routes/weather');
const request = require('supertest');
const app = require('../../index');

describe('weather route', () => {
    describe('/ GET', () => {
        beforeAll(() => {
            app.set('view engine', 'ejs');
            app.use('/', route);
        });

        it('should render weather page with the correct title', async () => {
            const spy = jest.spyOn(app.response, 'render');

            await request(app).get('/');

            expect(spy).toHaveBeenCalledWith('index', expect.objectContaining({ title: 'Weather App' }));
        });
    });
    
    describe('/ POST', () => {
        it('get the weather data from api', async () => {
            const spy = jest.spyOn(app.response, 'render');

            await request(app).get('/');

            expect(spy).toHaveBeenCalledWith('index', expect.objectContaining({ title: 'Weather App' }));
        });
    });
});