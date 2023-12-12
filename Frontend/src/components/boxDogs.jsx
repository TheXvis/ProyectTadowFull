import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoxDogs = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [interactionsLoaded, setInteractionsLoaded] = useState(false);

  const [perros, setPerros] = useState([]);
  const [index, setIndex] = useState(0);

  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);

  const [showAcceptedDogs, setShowAcceptedDogs] = useState(true);
  const [showRejectedDogs, setShowRejectedDogs] = useState(true);

useEffect(() => {
  const fetchPerros = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/verPerros');
      const perrosFiltrados = response.data.filter(perro => 
        perro.id !== Number(id) && 
        !likes.includes(perro.id) && 
        !dislikes.includes(perro.id) &&
        !acceptedDogs.map(dog => dog.id).includes(perro.id) &&
        !rejectedDogs.map(dog => dog.id).includes(perro.id)
      );
      const perrosAleatorios = perrosFiltrados.sort(() => Math.random() - 0.5);
      setPerros(perrosAleatorios);
    } catch (error) {
      console.error('Hubo un error al obtener los perros', error);
    }
  };

  fetchPerros();
}, [id, likes, dislikes, acceptedDogs, rejectedDogs]);

useEffect(() => {
  const fetchInteracciones = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/obtenerInteracciones/${id}`);
      const likes = response.data.likes.map(interaccion => interaccion.perro_candidato_id);
      const dislikes = response.data.dislikes.map(interaccion => interaccion.perro_candidato_id);
      setAcceptedDogs(perros.filter(perro => likes.includes(perro.id)));
      setRejectedDogs(perros.filter(perro => dislikes.includes(perro.id)));
      setInteractionsLoaded(true);
    } catch (error) {
      console.error('Hubo un error al obtener las interacciones', error);
    }
  };

  if (!interactionsLoaded) {
    fetchInteracciones();
  }
}, [id, perros, interactionsLoaded]);

const acceptDog = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/preferencias/' + id, {
      likes: [perros[index].id],
      dislikes: [],
    });
    setAcceptedDogs(prevAcceptedDogs => [...prevAcceptedDogs, perros[index]]);
    setPerros(perros.filter((_, i) => i !== index));
    setIndex(0);
  } catch (error) {
    console.error('Hubo un error al aceptar el perro', error);
  }
};

const removeAcceptedDog = async (index) => {
  try {
    const dog = acceptedDogs[index];
    await axios.delete(`http://127.0.0.1:8000/api/eliminarInteraccion/${id}/${dog.id}`);
    setAcceptedDogs(acceptedDogs.filter((_, i) => i !== index));
  } catch (error) {
    console.error('Hubo un error al eliminar la interaccion', error);
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
};

  const toggleAcceptedDogs = () => {
    setShowAcceptedDogs(!showAcceptedDogs);
  };

  const rejectDog = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/api/preferencias/' + id, {
            likes: [],
            dislikes: [perros[index].id],
        });
        setRejectedDogs([...rejectedDogs, perros[index]]);
        setPerros(perros.filter((_, i) => i !== index));
        setIndex(0);
    } catch (error) {
        console.error('Hubo un error al guardar el dislike', error);
    }
};

const removeRejectedDog = async (index) => {
  try {
    const dog = rejectedDogs[index];
    await axios.delete(`http://127.0.0.1:8000/api/eliminarInteraccion/${id}/${dog.id}`);
    setRejectedDogs(rejectedDogs.filter((_, i) => i !== index));
  } catch (error) {
    console.error('Hubo un error al eliminar la interaccion', error);
  }
};

  const toggleRejectedDogs = () => {
    setShowRejectedDogs(!showRejectedDogs);
  };

  const cambiarEstado = (index, isAccepted) => {
    if (isAccepted) {
      const dogToMove = acceptedDogs[index];
      setAcceptedDogs(acceptedDogs.filter((_, i) => i !== index));

      setRejectedDogs([...rejectedDogs, dogToMove]);
    } else {
      const dogToMove = rejectedDogs[index];
      setRejectedDogs(rejectedDogs.filter((_, i) => i !== index));
      setAcceptedDogs([...acceptedDogs, dogToMove]);
    }
  };


  return (
    <div>
      {perros.length > 0 ? (
        <div>
          <h2>{perros[index].nombre}</h2>
          <p>Edad: {perros[index].edad}</p>
          <p>Raza: {perros[index].raza}</p>
          <p>Descripción: {perros[index].descripcion}</p>
          <img src={perros[index].url} alt={perros[index].nombre} />
          <button className='boton' onClick={acceptDog}>Aceptar</button>
          <button className='boton2' onClick={rejectDog}>Rechazar</button>
        </div>
      ) : (
        <p>No hay más perros para mostrar.</p>
      )}
        <button className="mboton" onClick={toggleAcceptedDogs}>{showAcceptedDogs ? 'Ocultar Aceptados' : 'Mostrar Aceptados'}</button>
        {showAcceptedDogs && (
        <div className='aceptados'>
        <h2>Perros Aceptados:</h2>
        {acceptedDogs.map((perro, i) => (
            <div key={i}>
            <h3>{perro.nombre}</h3>
            <p>Edad: {perro.edad}</p>
            <p>Raza: {perro.raza}</p>
            <p>Descripción: {perro.descripcion}</p>
            <img src={perro.url} alt={perro.nombre} />
            <button className='boton2' onClick={() => removeAcceptedDog(i) }>Eliminar</button>
            <button className='boton' onClick={() => cambiarEstado(i, true)}>Mover a rechazados</button>
            </div>
        ))}
        </div>
        )}

        <button className="mboton" onClick={toggleRejectedDogs}>{showRejectedDogs ? 'Ocultar Rechazados' : 'Mostrar Rechazados'}</button>
        {showRejectedDogs && (
        <div className='rechazados'>
        <h2>Perros Rechazados:</h2>
        {rejectedDogs.map((perro, i) => (
            <div key={i}>
            <h3>{perro.nombre}</h3>
            <p>Edad: {perro.edad}</p>
            <p>Raza: {perro.raza}</p>
            <p>Descripción: {perro.descripcion}</p>
            <img src={perro.url} alt={perro.nombre} />
            <button className='boton2' onClick={() => removeRejectedDog(i)}>Eliminar</button>
            <button className='boton' onClick={() => cambiarEstado(i, false)}>Mover a aceptados</button>
            </div>
        ))}
        </div>
        )}
    </div>
  );
};

export default BoxDogs;