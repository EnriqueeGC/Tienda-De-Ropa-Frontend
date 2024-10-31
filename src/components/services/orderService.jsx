// services/orderService.js
import axios from 'axios';

export const createOrder = async (orderData) => {
    const response = await axios.post('http://localhost:3000/api/order/pedido', orderData);
    return response.data.id_pedido;
};
