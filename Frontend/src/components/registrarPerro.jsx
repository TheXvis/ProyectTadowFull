import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function RegistroPerro() {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [raza, setRaza] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const obtenerImagenAleatoria = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            setImageUrl(response.data.message);
        } catch (error) {
            console.error('Hubo un error al obtener la imagen aleatoria', error);
        }
    };

    useEffect(() => {
        obtenerImagenAleatoria();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/crearPerro', {
                nombre,
                edad,
                raza,
                descripcion,
                imageUrl
                
            });

            if (response.status === 201) {
                Swal.fire({
                    title: '¡Perro registrado con exito!',
                    icon: 'success',
                  });
            } else {
                alert('No se pudo registrar el perro');
            }
        } catch (error) {
            console.error('Hubo un error al registrar el perro', error);
        }
    };

    return (
<div className="container">
  <div className="row justify-content-center">
    <div className="col-6">
      
      <form className="form-background" onSubmit={handleSubmit}>
      <h1 className='text-center'>Registrar perro</h1>
        <div className="form-group">
          <label>Nombre:</label>
          <input className="form-control" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Edad:</label>
          <input className="form-control" type="text" value={edad} onChange={e => setEdad(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Raza:</label>
          <input className="form-control" type="text" value={raza} onChange={e => setRaza(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input className="form-control" type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="form-group text-center">
          
          {imageUrl && <img className="image" style={{marginTop:"10px"}}src={imageUrl} alt="Imagen del perro" />}
        </div>
        <div className="form-group text-center" style={{marginTop: "10px"}}>
          <button className="btn btn-primary mr-2" style={{marginRight: "10px"}}type="button"  onClick={obtenerImagenAleatoria}>Cambiar imagen</button>
          <button className="btn btn-primary" type="submit">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
}

export default RegistroPerro;