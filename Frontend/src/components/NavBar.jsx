import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to ="/"> 
            <img className='image-navbar' src="/image.jpg" alt="Pagina de Inicio" ></img>
        </Link>
          <Link to="/"><button className='boton'>Inicio</button></Link>
          <Link to ="/chat/pepperoni"> <button className='boton'> Chatea random</button></Link>
          <Link to="/crear-perro"><button className='boton'>Crear Perro</button></Link>
          <Link to="/lista-perros"><button className='boton'>Lista de Perros</button></Link>
          
    </nav>
  );
};

export default Navbar;