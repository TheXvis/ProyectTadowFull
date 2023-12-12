const Perro = require('./perro');

exports.verPerros = (req, res) => {
    Perro.find({}, (err, perros) => {
      if (err) {
        res.status(500).send({ message: 'Error al obtener los perros' });
      } else {
        res.status(200).send({ perros });
      }
    });
  };


exports.crearPerro = (req, res) => {
    const { nombre, raza, edad } = req.body;
  
    const perro = new Perro({
      nombre,
      raza,
      edad
    });
  
    perro.save((err, perroGuardado) => {
      if (err) {
        res.status(500).send({ message: 'Error al guardar el perro' });
      } else {
        res.status(200).send({ perro: perroGuardado });
      }
    });
  };