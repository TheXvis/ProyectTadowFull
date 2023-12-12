import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change to Routes
import ChatPage from './pages/ChatPage';
import Navbar  from './components/NavBar';
import './styles.css';
import RegistroPerro from './components/registrarPerro';
import ListaPerros from './components/listaPerros';
import HomePage from './pages/homePage';
import BoxDogs from './components/boxDogs';



function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="content-container">
        <h1 >Animal Tinder</h1>
        <Routes>
          <Route path="/" element={<HomePage/> }/>
          <Route path="/chat/:dogName" element={<ChatPage />} />
          <Route path='/crear-perro' element={<RegistroPerro/>} />
          <Route path='/lista-perros' element={<ListaPerros/>} />
          <Route path="/boxDogs/:id" element={<BoxDogs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
