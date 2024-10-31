import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Asegura la compatibilidad de Chart.js con React

function App() {
    const [chartData, setChartData] = useState(null); // Estado para almacenar los datos del gráfico

    useEffect(() => {
        // Función para obtener los productos más vendidos desde el endpoint
        const fetchMostSoldProducts = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/mostSoldProducts/mostSoldProducts');
                if (!response.ok) throw new Error('Error al obtener los productos más vendidos');
                
                const data = await response.json();

                // Procesar los datos para el gráfico
                const labels = data.productosMasVendidos.map(product => product.NOMBRE_PRODUCTO);
                const values = data.productosMasVendidos.map(product => product.TOTAL_VENDIDO);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Productos Más Vendidos',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error al obtener los productos más vendidos:', error);
            }
        };

        fetchMostSoldProducts();
    }, []);

    return (
        <div className="App">
            <h1>Productos Más Vendidos</h1>
            {chartData ? (
                <Bar data={chartData} />
            ) : (
                <p>Cargando datos...</p> // Muestra un mensaje de carga mientras los datos se están obteniendo
            )}
        </div>
    );
}

export default App;