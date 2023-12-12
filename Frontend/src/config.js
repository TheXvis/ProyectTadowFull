const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const perroController = require('./controllers/dogController');

mongoose.connect('mongodb+srv://charly:miservidor@cluster0.0rukqzn.mongodb.net/?retryWrites=true&w=majority');

const app = express();
app.use(bodyParser.json());

app.post('/perros', perroController.crearPerro);
app.get('/perros', perroController.verPerros);

app.listen(80, () => {
    console.log('Servidor en funcionamiento en el puerto 300');
});