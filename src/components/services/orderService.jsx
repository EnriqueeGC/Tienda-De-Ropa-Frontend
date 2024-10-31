// services/orderService.js
import axios from 'axios';

export const createOrder = async (orderData) => {
    const response = await axios.post('https://tienda-de-ropa-v6h4.onrender.com/api/order/pedido', orderData);
    return response.data.id_pedido;
};
