import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './CustomerManagment.css'; // Archivo de estilos para la gestión de clientes
import Modal from '../components/Modal';

const GestionClientes = ({ rolId }) => {
    const [usuarios, setUsuarios] = useState([]);  // Lista de usuarios (puede ser clientes o empleados)
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState('clientes'); // Estado para controlar si se muestran clientes o empleados
    const [filtro, setFiltro] = useState(''); // Estado para el filtro de búsqueda

    // Función para obtener clientes
    const fetchClientes = async () => {
        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/users/getAllCustomers');
            if (!response.ok) {
                throw new Error('Error al obtener los clientes');
            }
            const data = await response.json();
            setUsuarios(data);  // Actualizamos la lista de usuarios
        } catch (error) {
            console.error('Error al obtener los clientes', error);
        }
    };

    // Función para obtener empleados
    const fetchEmpleados = async () => {
        try {
            const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/users/getAllEmployees');
            if (!response.ok) {
                throw new Error('Error al obtener los empleados');
            }
            const data = await response.json();
            setUsuarios(data);  // Actualizamos la lista de usuarios
        } catch (error) {
            console.error('Error al obtener los empleados', error);
        }
    };

    // Efecto que se ejecuta cuando cambia el tipo de usuario (clientes o empleados)
    useEffect(() => {
        if (tipoUsuario === 'clientes') {
            fetchClientes();
        } else if (tipoUsuario === 'empleados') {
            fetchEmpleados();
        }
    }, [tipoUsuario]);

    const handleModificar = (cliente) => {
        setClienteSeleccionado(cliente);
        setMostrarModal(true); // Abre el modal
    };

    const handleCerrarModal = () => {
        setMostrarModal(false); // Cierra el modal
        setClienteSeleccionado(null); // Limpia la selección
    };

    const handleEliminarUsuario = async (cliente) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            return;
        }

        if (!cliente.USUARIOID) {
            console.error('ID de usuario no válido');
            return;
        }

        try {
            const response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/users/deleteUserById/${cliente.USUARIOID}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            const data = await response.json();
            // Mostramos una alerta con el mensaje de la API
            window.alert(data.message);

            // Actualizar la lista de usuarios
            const nuevosUsuarios = usuarios.filter(u => u.USUARIOID !== cliente.USUARIOID);
            setUsuarios(nuevosUsuarios);
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
            window.alert('Error al eliminar el usuario');
        }
    };

    const usuariosFiltrados = usuarios.filter(usuario => {
        return (
            usuario.NOMBRE.toLowerCase().includes(filtro.toLowerCase()) ||
            usuario.APELLIDO.toLowerCase().includes(filtro.toLowerCase()) ||
            usuario.CORREOELECTRONICO.toLowerCase().includes(filtro.toLowerCase()) ||
            usuario.NOMBREUSUARIO.toLowerCase().includes(filtro.toLowerCase())
        );
    });


    return (
        <div className="gestion-usuarios">
            <h1>Gestión de Usuarios</h1>
            <div className="filtro-usuarios">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>
            {/* Botones para alternar entre empleados y clientes */}
            <div className='botones-seleccion'>
                {parseInt(rolId) === 1 && (
                    <button onClick={() => setTipoUsuario('empleados')}>
                        Mostrar Empleados
                    </button>
                )}
                <button onClick={() => setTipoUsuario('clientes')}>
                    Mostrar Clientes
                </button>
            </div>
            <div className='div-table'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dirección</th>
                            <th>Correo Electrónico</th>
                            <th>Teléfono</th>
                            <th>Nombre de Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map(usuario => (
                            <tr key={usuario.USUARIOID}>
                                <td>{usuario.USUARIOID}</td>
                                <td>{usuario.NOMBRE}</td>
                                <td>{usuario.APELLIDO}</td>
                                <td>{usuario.DIRECCION}</td>
                                <td>{usuario.CORREOELECTRONICO}</td>
                                <td>{usuario.TELEFONO}</td>
                                <td>{usuario.NOMBREUSUARIO}</td>
                                <td>
                                    <button onClick={() => handleModificar(usuario)}>
                                        <FaEdit />
                                    </button>

                                    {parseInt(rolId) === 1 && (
                                        <button className='action-Button' onClick={() => handleEliminarUsuario(usuario)}>
                                            <FaTrashAlt />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {mostrarModal && (
                <Modal cliente={clienteSeleccionado} onClose={handleCerrarModal} rolId={rolId} />
            )}
        </div>
    );
};

export default GestionClientes;
