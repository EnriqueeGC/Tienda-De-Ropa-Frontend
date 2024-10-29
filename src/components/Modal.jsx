import './Modal.css';
import React, { useState, useEffect } from 'react';

const Modal = ({ cliente = null, usuario = null, onClose, rolId }) => {
    // Detectar si estamos manejando un cliente o un usuario
    const entidad = cliente || usuario;

    // Estados iniciales basados en si es cliente o usuario
    const [nombre, setNombre] = useState(entidad?.NOMBRE || '');
    const [apellido, setApellido] = useState(entidad?.APELLIDO || '');
    const [direccion, setDireccion] = useState(entidad?.DIRECCION || '');
    const [correoElectronico, setCorreoElectronico] = useState(entidad?.CORREOELECTRONICO || '');
    const [telefono, setTelefono] = useState(entidad?.TELEFONO || '');
    const [nombreUsuario, setNombreUsuario] = useState(entidad?.NOMBREUSUARIO || '');
    const [contrasena, setContrasena] = useState(entidad?.CONTRASENA || '');
    const [rolID, setRol] = useState(entidad?.ROLID || '');

    useEffect(() => {
        // Actualizamos los valores cuando cambia el cliente o usuario
        if (entidad) {
            setNombre(entidad.NOMBRE || '');
            setApellido(entidad.APELLIDO || '');
            setDireccion(entidad.DIRECCION || '');
            setCorreoElectronico(entidad.CORREOELECTRONICO || '');
            setTelefono(entidad.TELEFONO || '');
            setNombreUsuario(entidad.NOMBREUSUARIO || '');
            setContrasena(entidad.CONTRASENA || '');
            setRol(entidad.ROLID || '');
        }
    }, [entidad]);

    const handleGuardarCambios = async () => {
        try {
            const updatedEntidad = {
                nombre,
                apellido,
                direccion,
                correoElectronico,
                telefono,
                nombreUsuario,
                contrasena,
              //  ...(rolId === 1 && { rol }) // Solo enviar 'rol' si es admin
                rolID
            };
            console.log(updatedEntidad);

            // Diferente URL dependiendo si es cliente o usuario
            const endpoint = cliente
                ? `https://tienda-de-ropa-v6h4.onrender.com/api/users/updateUserById/${cliente.USUARIOID}`
                : `https://tienda-de-ropa-v6h4.onrender.com/api/users/updateUserById/${usuario.USUARIOID}`;

            const response = await fetch(endpoint, {
                method: 'PUT', // Método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEntidad) // Convertir los datos en JSON
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }

            onClose(); // Cierra el modal después de la actualización exitosa
        } catch (error) {
            console.error('Error al actualizar los datos', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{cliente ? 'Modificar Cliente' : 'Modificar Usuario'}</h2>

                <div className="modal-columns">
                    <div className="modal-column">
                        <label>Nombre:</label>
                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

                        <label>Apellido:</label>
                        <input value={apellido} onChange={(e) => setApellido(e.target.value)} />

                        <label>Dirección:</label>
                        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                        <label>Correo Electrónico:</label>
                        <input value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
                    </div>

                    <div className="modal-column">
                        <label>Teléfono:</label>
                        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                        <label>Nombre de Usuario:</label>
                        <input value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />

                        <label>Contraseña:</label>
                        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

                        {parseInt(rolId) === 1 && (
                            <>
                                <label>Rol ({rolID}):</label>
                                <select value={rolID} onChange={(e) => setRol(e.target.value)}>
                                    <option value="1">Administrador</option>
                                    <option value="2">Empleado</option>
                                    <option value="3">Cliente</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={handleGuardarCambios}>Guardar cambios</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
