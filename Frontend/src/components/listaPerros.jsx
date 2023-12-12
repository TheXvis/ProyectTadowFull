import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaPerros = () => {
    const [perros, setPerros] = useState([]);

    useEffect(() => {
        const fetchPerros = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/verPerros');
                setPerros(response.data);
            } catch (error) {
                console.error('Hubo un error al obtener los perros', error);
            }
        };

        fetchPerros();
    }, []);

    return (
        <div className="lista-perros">
            <h1>Lista de Perros</h1>
            {perros.map(perro => (
                <div key={perro.id}>
                    <h2>{perro.nombre}</h2>
                    <p>Edad: {perro.edad}</p>
                    <p>Raza: {perro.raza}</p>
                    <p>Descripción: {perro.descripcion}</p>
                    <img src={perro.url } alt={perro.nombre}/>
                    <Link to={`/boxDogs/${perro.id}`}>
                        <button className='boton'>Seleccionar</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ListaPerros;