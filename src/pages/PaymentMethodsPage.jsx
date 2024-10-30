import React from 'react';
import { useLocation } from 'react-router-dom';
import StripePayment from './StripePayment';

const PaymentMethodsPage = () => {
    const location = useLocation();
    const totalAmount = location.state?.total || 0; // Obtiene el total del carrito desde el estado

    return (
        <div>
            <h1>Seleccione un Método de Pago</h1>
            <StripePayment cartTotal={totalAmount} />
            {/* Método de pago a contra entrega también se puede añadir aquí si es necesario */}
        </div>
    );
};

export default PaymentMethodsPage;
