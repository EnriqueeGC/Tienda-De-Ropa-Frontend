import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');
    
    try {
      const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          contrasena: contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar el token en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rolId', data.rolId);
        setMensajeError(''); // Limpiar errores si el inicio de sesión es exitoso
        alert('Inicio de sesión exitoso');
        // Redirigir al usuario a la página principal o ruta protegida
        window.location.href = '/';
      } else {
        setMensajeError(data.message); // Mostrar el mensaje de error recibido
      }
    } catch (err) {
      setMensajeError('Error en el servidor');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {mensajeError && <p className="error">{mensajeError}</p>}
        {mensajeExito && <p className="success">{mensajeExito}</p>}
        <p>
          ¿No tienes cuenta?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
