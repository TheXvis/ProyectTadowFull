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
        <div className="container">
            <h1 className="text-center my-4">Lista de Perros</h1>
            <div className="row">
                {perros.map(perro => (
                    <div className="col-md-4 mb-4" key={perro.id}>
                        <div className="card">
                            <img src={perro.url} className="card-img-top" alt={perro.nombre}/>
                            <div className="card-body">
                                <h5 className="card-title">{perro.nombre}</h5>
                                <p className="card-text">Edad: {perro.edad}</p>
                                <p className="card-text">Raza: {perro.raza}</p>
                                <p className="card-text">Descripción: {perro.descripcion}</p>
                                <Link to={`/boxDogs/${perro.id}`} className="btn btn-primary">Seleccionar</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaPerros;