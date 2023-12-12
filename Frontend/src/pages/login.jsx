import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login(){
  const navigate = useNavigate();
  const [id, setid] = useState('');
  // eslint-disable-next-line 
  const [password, setPassword] = useState('');
// eslint-disable-next-line 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('/ruta_a_tu_script_de_login', {
            id,
            password
        });

        if (response.status === 200) {
            alert('Inicio de sesión exitoso');
            navigate('/ruta_post_login');
        } else {
            alert('No se pudo iniciar sesión');
        }
    } catch (error) {
        console.error('Hubo un error al iniciar sesión', error);
    }
};

  return (
    <form className="login-form">
        <input className="login-input" value={id} onChange={e => setid(e.target.value)} placeholder="Rut" />
        <input className="login-input" type={'text'} value={password} placeholder="Contraseña"  />
        <input type="submit" className="login-submit" value="Login" />
    </form>
);
}

export default Login;
