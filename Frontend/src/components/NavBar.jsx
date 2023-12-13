import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to ="/"> 
            <img className='image-navbar' src="/image.jpg" alt="Pagina de Inicio" ></img>
        </Link>
          <Link to="/crear-perro"><button style={{marginLeft:"-600px", marginTop:"-15px"}}className='boton'>Crear Perro</button></Link>
          <Link to="/lista-perros"><button style={{marginLeft:"-1250px", marginTop:"-15px"}}className='boton'>Lista de Perros</button></Link>
          
    </nav>
  );
};

export default Navbar;