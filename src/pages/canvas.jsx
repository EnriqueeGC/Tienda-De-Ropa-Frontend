/*import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import './CategoriesManagment.css';
import ModalSubcategory from '../components/ModalSubcategory';

const CategoriesManagment = ({ rolId }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [isEditing, setIsEditing] = useState(null); // Estado para saber cuál categoría se está editando
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar categoría
    const [newCategoryName, setNewCategoryName] = useState(''); // Estado para el nombre de la nueva categoría
    const [editingCategoryName, setEditingCategoryName] = useState(''); // Estado para el nombre al editar

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/categories/getAll');
                if (!response.ok) throw new Error('Error al obtener las categorías');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };

        fetchCategorias();
    }, []);

   



    return (
        <div className="container">
            
            

        
        </div>
    );
}

export default CategoriesManagment;
*/
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Esto asegura la compatibilidad de Chart.js con React

function App() {
    // Datos para el gráfico de barras
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="App">
            <h1>Mi gráfico de barras</h1>
            <Bar data={data} />
        </div>
    );
}

export default App;
