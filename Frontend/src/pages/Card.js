import React, { useState, useEffect } from 'react';
import { loremIpsum } from 'lorem-ipsum';
import { Link } from 'react-router-dom';

const Card = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');

  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [mostrarAceptados, setMostrarAceptados] = useState(true);
  const [mostrarRechazados, setMostrarRechazados] = useState(true);

  function generarDescripcion(){
    const descripcion = loremIpsum({
      count: 1, 
      units: 'paragraphs',
      format: 'html',
      paragraphLowerBound: 1, 
      paragraphUpperBound: 1, 
    })

    return descripcion;
  }

  const nombres = ['Fido', 'Luna', 'Rocky', 'Max', 'Bella', 'Charlie', 'Lucy', 'Duke', 'Daisy','Reyna', 'Fiodor', 
  'Dopa', 'Canela', 'Soldado', 'Cazador', 'Sol', 'Rey', 'Trueno','Camaron', 'Pequeño', 'Bestia', 'Manchitas', 'Salao', 
  'Sonrisa', 'Lucky', 'Razer', 'Esperanza', 'Pool', 'Doraemon', 'Satan', 'Teorema', 'Salazar', 'Vegeta', 'Matador'];

  const nameRandomImage = () => {

    const uniqueName = Math.floor(Math.random() * nombres.length);
    return nombres[uniqueName];
  };

  const fetchRandomImage = () => {

    setIsFetching(true);

    const uniqueName = nameRandomImage();
    
    // Hacer la solicitud a la API para obtener una imagen aleatoria
    fetch('https://dog.ceo/api/breeds/image/random')
      
    
      .then((response) => {
      if(!response.ok){
        throw new Error('Error al cargar la img');
      }
      return response.json();
      })
      .then((data) => {
        // Establecer la URL de la imagen en el estado
        setImageUrl(data.message);
        setImageName(uniqueName);
        
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
        fetchRandomImage();
      })
      .finally(() =>{
        setIsFetching(false);
      });
  };

  const aceptados = () =>{
    const descripcion = generarDescripcion();
    setAcceptedDogs([...acceptedDogs, {name: imageName, imageUrl, descripcion}]);
    fetchRandomImage();
  }

  const eliminarAceptado = (index) =>{
    const actualizarAceptados = [...acceptedDogs];
    actualizarAceptados.splice(index, 1);
    setAcceptedDogs(actualizarAceptados);
  }


  const rechazados = () =>{
    const descripcion = generarDescripcion();
    setRejectedDogs([...rejectedDogs, {name: imageName, imageUrl,descripcion}]);
    fetchRandomImage();
  }

  const eliminarRechazado = (index) =>{
    const actualizarRechazados = [...rejectedDogs];
    actualizarRechazados.splice(index, 1);
    setRejectedDogs(actualizarRechazados);
  }

  const cambiarEstado = (index, isAccepted) => {
    if (isAccepted) {
      const dogToMove = acceptedDogs[index];
      setAcceptedDogs(acceptedDogs.filter((_, i) => i !== index)); // Elimina el perro de la lista de aceptados
      setRejectedDogs([...rejectedDogs, dogToMove]); // Agrega el perro a la lista de rechazados
    } else {
      const dogToMove = rejectedDogs[index];
      setRejectedDogs(rejectedDogs.filter((_, i) => i !== index)); // Elimina el perro de la lista de rechazados
      setAcceptedDogs([...acceptedDogs, dogToMove]); // Agrega el perro a la lista de aceptados
    }
  };

  const toggleList = (listName) => {
  if (listName === 'aceptados') {
    setMostrarAceptados(!mostrarAceptados);
  } else if (listName === 'rechazados') {
    setMostrarRechazados(!mostrarRechazados);
  }
  };
  

  useEffect(() => {
    fetchRandomImage();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      
      <p>Nombre: {imageName}</p>
      {imageUrl && <img src={imageUrl} alt="Random Dog" />}

      <br/>
      <button className='boton' onClick={aceptados} disabled={isFetching}>Aceptar</button>
      <button className='boton2' onClick={rechazados} disabled={ isFetching}>Rechazar</button>

      <div className='aceptados'>
      <h2>Perros aceptados</h2>
      <button className='mboton' onClick={() => toggleList('aceptados')}>{mostrarAceptados ? 'Ocultar Aceptados' : 'Mostrar Aceptados'}</button>
      <ul>
        {mostrarAceptados && acceptedDogs.map((dog, index) =>(
          <li key={index}>
            <p>Nombre: {dog.name}</p>
            <img className='imagenlista' src={dog.imageUrl} alt="Perros aceptados"/>
            <button className='boton'  onClick={() =>cambiarEstado(index, true)} disabled={isFetching}>Cambiar</button>
            <button className='boton2' onClick={() =>eliminarAceptado(index)} disabled={ isFetching}>Eliminar</button>
            <Link to={`/chat/${dog.name}`}>
  <button className="boton3">Chatear</button>
</Link>
            <br/>
            <p>Descripcion: {dog.descripcion}</p>
            <br/>
            <br/>
          </li>
        ))}
      </ul>
      </div>

      <div className='rechazados'>
      <h2>Perros rechazados</h2>
      <button className='mboton' onClick={() => toggleList('rechazados')}>{mostrarRechazados ? 'Ocultar rechazados' : 'Mostrar rechazados'}</button>
      <ul>
        {mostrarRechazados && rejectedDogs.map((dog, index) =>(
          <li key={index}>
            <p>Nombre: {dog.name}</p>
            <img className='imagenlista' src={dog.imageUrl} alt="Perros rechazados"/>
            <button className='boton'  onClick={() =>cambiarEstado(index, false)} disabled={isFetching}>Cambiar</button>
            <button className='boton2' onClick={() =>eliminarRechazado(index)} disabled={ isFetching}>Eliminar</button>
            <br/>
            <p>Descripcion: {dog.descripcion}</p>
            <br/>
            <br/>
          </li>
        ))}
      </ul>
      </div>
    </div>
    

  );
};

export default Card