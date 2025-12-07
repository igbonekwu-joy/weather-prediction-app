const express = require('express');
const app = express();
const weather = require('./routes/weather');
const { port } = require('./config');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/', weather);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});