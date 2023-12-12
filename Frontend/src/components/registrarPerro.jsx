import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                alert('Perro registrado con éxito');
            } else {
                alert('No se pudo registrar el perro');
            }
        } catch (error) {
            console.error('Hubo un error al registrar el perro', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
            </label>
            <label>
                Edad:
                <input type="text" value={edad} onChange={e => setEdad(e.target.value)} />
            </label>
            <label>
                Raza:
                <input type="text" value={raza} onChange={e => setRaza(e.target.value)} />
            </label>
            <label>
                Descripción:
                <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </label>
            <br></br>
            <button type="button" onClick={obtenerImagenAleatoria}>Cambiar imagen</button>
            {imageUrl && <img src={imageUrl} alt="Imagen del perro" />}
            <button type="submit">Registrar</button>
        </form>
    );
}

export default RegistroPerro;