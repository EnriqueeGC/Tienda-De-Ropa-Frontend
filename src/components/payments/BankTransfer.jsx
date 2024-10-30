import React, { useState } from 'react';
import './BankTransfer.css';
export default function BankTransfer({ onBack }) {
    const [accountNumber] = useState('10240000100'); // Reemplaza con el número de cuenta real
    const [accountName] = useState('PequeñaWear'); // Reemplaza con el nombre de cuenta real
    const [bankName] = useState('Induistrial'); // Reemplaza con el nombre del banco real
    const [proofFile, setProofFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        setProofFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Lógica para manejar el envío del comprobante de pago
        setLoading(false);
        alert('Transferencia realizada con éxito');
    };
    return (
        <div className="bank-transfer-container">
            <div className="bank-transfer-form">
                <h2 className="title">Transferencia Bancaria</h2>
                {/* Información de la Cuenta */}
                <div className="account-details">
                    <p className="account-title">Detalles de la Cuenta</p>
                    <p><strong>Banco:</strong> {bankName}</p>
                    <p><strong>Nombre de la Cuenta:</strong> {accountName}</p>
                    <p><strong>Número de Cuenta:</strong> {accountNumber}</p>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label className="form-label">Subir Comprobante de Pago</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="loading-spinner" />
                        ) : (
                            'Enviar Comprobante'
                        )}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={onBack}
                    className="back-button"
                >
                    Volver a Métodos de Pago
                </button>
            </div>
        </div>
    );
}