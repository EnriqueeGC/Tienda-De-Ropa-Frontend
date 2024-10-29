import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
    nombreUsuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Verificación activa de la contraseña
  useEffect(() => {
    if (formData.contrasena !== formData.confirmarContrasena) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmarContrasena: 'Las contraseñas no coinciden',
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmarContrasena: '',
      }));
    }
  }, [formData.contrasena, formData.confirmarContrasena]);

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'nombre':
        if (!value || value.length < 2) {
          errorMsg = 'El nombre debe tener al menos 2 caracteres';
        }
        break;
      case 'correoElectronico':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Por favor, incluye un "@" en la dirección de correo electrónico.';
        }
        break;
      case 'telefono':
        if (!/^\d+$/.test(value) || value.length < 8) {
          errorMsg = 'El teléfono debe tener al menos 8 dígitos y solo contener números.';
        }
        break;
      case 'nombreUsuario':
        if (!value || value.length < 1) {
          errorMsg = 'El nombre de usuario es requerido';
        }
        break;
      case 'contrasena':
        if (!value || value.length < 4) {
          errorMsg = 'La contraseña debe tener al menos 4 caracteres';
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar los datos del formulario
    setFormData({ ...formData, [name]: value });

    // Validar el campo actual en tiempo real
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    let validationErrors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    }

    // Verificación de contraseñas no coincidentes
    if (formData.contrasena !== formData.confirmarContrasena) {
      validationErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    // Si no hay contraseñas ingresadas
    if (!formData.contrasena || !formData.confirmarContrasena) {
      validationErrors.contrasena = 'La contraseña es obligatoria';
      validationErrors.confirmarContrasena = 'Debe confirmar su contraseña';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      try {
        const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage('Registro exitoso');
          alert('Registro exitoso');
          navigate('/login');
          setFormData({
            nombre: '',
            apellido: '',
            direccion: '',
            correoElectronico: '',
            telefono: '',
            nombreUsuario: '',
            contrasena: '',
            confirmarContrasena: '',
          });
        } else {
          setErrors({ general: 'Error en el registro' });
        }
      } catch (error) {
        console.error('Error de red:', error);
        setErrors({ general: 'Error al conectar con el servidor' });
      }
    }
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleSubmit}
        className="register-form">
        <h2>Registro</h2>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {errors.nombre && <p>{errors.nombre}</p>}

        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />
        {errors.apellido && <p>{errors.apellido}</p>}

        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
        {errors.direccion && <p>{errors.direccion}</p>}

        <input
          type="email"
          name="correoElectronico"
          value={formData.correoElectronico}
          onChange={handleChange}
          placeholder="Correo Electrónico"
        />
        {errors.correoElectronico && <p>{errors.correoElectronico}</p>}

        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        {errors.telefono && <p>{errors.telefono}</p>}

        <input
          type="text"
          name="nombreUsuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
        />
        {errors.nombreUsuario && <p>{errors.nombreUsuario}</p>}

        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        {errors.contrasena && <p>{errors.contrasena}</p>}

        <input
          type="password"
          name="confirmarContrasena"
          value={formData.confirmarContrasena}
          onChange={handleChange}
          placeholder="Confirmar Contraseña"
        />
        {errors.confirmarContrasena && <p>{errors.confirmarContrasena}</p>}

        <button type="submit">Registrar</button>
        <p>
          ¿Tienes cuenta?{' '}
          <span className="register-link" onClick={() => navigate('/login')}>
            Inicia Sesión aquí
          </span>
        </p>
      </form>

      {errors.general && <p>{errors.general}</p>}
      {successMessage && <p>{successMessage}</p>}

    </div>
  );
};

export default Register;
