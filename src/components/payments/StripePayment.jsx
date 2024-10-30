import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './StripePayment.css';

// Dentro de CheckoutForm
const CheckoutForm = ({ amount }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const id_pedido = location.state?.id_pedido; // Extraer id_pedido de location.state

        if (!stripe || !elements || !amount || !name || !id_pedido) {
            setLoading(false);
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const { data: { clientSecret } } = await axios.post('https://tienda-de-ropa-v6h4.onrender.com/api/payment/create-payment-intent', {
                amount: parseFloat(amount),
                id_pedido, // Pasar id_pedido en el cuerpo de la solicitud
            });

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: name,
                    },
                },
            });

            if (result.error) {
                alert('Error en el pago: ' + result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                alert('¡Pago exitoso!');
                // Opcionalmente, redirige a una página de confirmación
            }
        } catch (error) {
            alert('Error en el proceso de pago: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group mb-3">
                <label htmlFor="name">Nombre del cliente</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="amount">Monto ($)</label>
                <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount.toFixed(2)}
                    readOnly
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="card-element">Tarjeta de crédito o débito</label>
                <CardElement id="card-element" className="form-control" />
            </div>
            <button className="payment-button" disabled={!stripe || loading || !amount || !name}>
                {loading ? (
                    <>
                        <span className="loading-spinner" role="status" aria-hidden="true"></span>
                        Procesando...
                    </>
                ) : (
                    `Pagar $${amount.toFixed(2)}`
                )}
            </button>
        </form>
    );
};

const StripePayment = () => {
    const location = useLocation();
    const totalAmount = location.state?.total || 0;

    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            const { data } = await axios.get('https://tienda-de-ropa-v6h4.onrender.com/api/payment/config');
            setStripePromise(loadStripe(data.publishableKey));
        };
        fetchConfig();
    }, []);

    return (
        <div className="stripe-payment-container">
            <div className="stripe-payment-form">
                <h2 className="text-center mb-4">Pago con Tarjeta</h2>
                {stripePromise && (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm amount={totalAmount} />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default StripePayment;
