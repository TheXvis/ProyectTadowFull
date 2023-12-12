const mongoose = require('mongoose');

const perroSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    
    nombre: {
      type: String,
      required: true
    },
    raza: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    }
  });
  
  const Perro = mongoose.model('Perro', perroSchema);
  
  module.exports = Perro;