import React, { useState } from 'react';
import { CreditCard, Banknote, Truck, ArrowRight } from 'lucide-react';
import StripePayment from './payments/StripePayment';
import BankTransfer from './payments/BankTransfer';
import CashOnDelivery from './payments/CashOnDelivery';
import './PaymentMethods.css'; // Asegúrate de importar el CSS

const paymentMethods = [
  {
    id: 'card',
    title: 'Tarjeta de Crédito/Débito',
    description: 'Pago seguro con tarjeta a través de Stripe',
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: 'transfer',
    title: 'Transferencia Bancaria',
    description: 'Transferencia directa a nuestra cuenta',
    icon: <Banknote className="w-6 h-6" />,
  },
  {
    id: 'cod',
    title: 'Pago Contra Entrega',
    description: 'Paga cuando recibas tu pedido',
    icon: <Truck className="w-6 h-6" />,
  },
];

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedMethod('');
  };

  const renderPaymentDetails = () => {
    switch (selectedMethod) {
      case 'card':
        return <StripePayment onBack={handleBack} />;
      case 'transfer':
        return <BankTransfer onBack={handleBack} />;
      case 'cod':
        return <CashOnDelivery onBack={handleBack} />;
      default:
        return null;
    }
  };

  if (showDetails) {
    return renderPaymentDetails();
  }

  return (
    <div className="payment-methods-container">
      <div className="payment-methods-form">
        <h2 className="payment-methods-title">Selecciona tu Método de Pago</h2>
        
        <div className="space-y-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method ${
                selectedMethod === method.id ? 'selected' : ''
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className={`payment-method-icon ${
                selectedMethod === method.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {method.icon}
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="payment-method-title">{method.title}</h3>
                <p className="payment-method-description">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button
          className="payment-methods-button"
          onClick={() => selectedMethod && handleMethodSelect(selectedMethod)}
          disabled={!selectedMethod || loading}
        >
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <>
              Continuar con el pago
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
