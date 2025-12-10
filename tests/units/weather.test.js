const route = require('../../routes/weather');
const request = require('supertest');

describe('/ GET', () => {
    let app;

    beforeAll(() => {
        app = require('../../index');
        app.set('view engine', 'ejs');
        app.use('/', route);
    });

    it('should render weather page with the correct title', async () => {
        // Test implementation goes here
        const spy = jest.spyOn(app.response, 'render');

        await request(app).get('/');

        expect(spy).toHaveBeenCalledWith('index', expect.objectContaining({ title: 'Weather App' }));
    });
});