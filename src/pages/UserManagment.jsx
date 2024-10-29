// https://tienda-de-ropa-v6h4.onrender.com/api/users/updateUserById/${usuario.USUARIOID}
// https://tienda-de-ropa-v6h4.onrender.com/api/users/getUserById/${id}

import './UserManagment.css';
import Modal from '../components/Modal';
import { useState, useEffect } from 'react';


const GestionUsuario = ({ rolId }) => {
    const [usuario, setUsuario] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('id');
        
        // Solicitud para obtener el usuario por su ID
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/users/getUserById/${id}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error('Error al obtener el usuario', error);
            }
        };
        
        fetchUsuario();
    }, []);

    const handleModificar = () => {
        setMostrarModal(true); // Abre el modal
    };

    const handleCerrarModal = () => {
        setMostrarModal(false); // Cierra el modal
    };

    return (
        <div className="gestion-usuario">
            <h1>Información de mí cuenta</h1>
            
            {usuario && (
                <div className="usuario-info">
                    <div>
                        <strong>ID:</strong> {usuario.USUARIOID}
                    </div>
                    <div>
                        <strong>Nombre:</strong> {usuario.NOMBRE}
                    </div>
                    <div>
                        <strong>Apellido:</strong> {usuario.APELLIDO}
                    </div>
                    <div>
                        <strong>Dirección:</strong> {usuario.DIRECCION}
                    </div>
                    <div>
                        <strong>Correo Electrónico:</strong> {usuario.CORREOELECTRONICO}
                    </div>
                    <div>
                        <strong>Teléfono:</strong> {usuario.TELEFONO}
                    </div>
                    <div>
                        <strong>Nombre de Usuario:</strong> {usuario.NOMBREUSUARIO}
                    </div>
                    <button onClick={handleModificar}>Modificar tú Información</button>
                </div>
            )}

            {mostrarModal && (
                <Modal usuario={usuario} onClose={handleCerrarModal} rolId={rolId} />
            )}
        </div>
    );
};

export default GestionUsuario;

