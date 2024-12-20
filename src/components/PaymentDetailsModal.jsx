import React, { useState, useEffect } from 'react';
import SuccessModal from './SuccessModal';

function PaymentDetailsModal({ isOpen, onClose, onBack, formData }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [holderName, setHolderName] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setCardNumber('');
            setExpiry('');
            setCvv('');
            setHolderName('');
            setErrors({});
        }
    }, [isOpen]);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleConfirmPayment = () => {
        if (validateForm()) { // Only proceed if validation passes
            // Simulate payment processing (replace with your actual logic)
            setTimeout(() => {
                setShowSuccessModal(true);
            }, 1000);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        onClose(); // Close the main modal as well
    };


    const formatCardNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        return cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        setErrors({ ...errors, expiry: '' });

        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }

        setExpiry(value);
    };
    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvv(value);
    };

    const handleHolderNameChange = (e) => {
        setHolderName(e.target.value);
    };

    const validateForm = () => {
        let newErrors = {};
        const cardNumberCleaned = cardNumber.replace(/\s/g, '');

        if (!cardNumber) {
            newErrors.cardNumber = 'Card number is required';
        } else if (cardNumberCleaned.length < 16 || cardNumberCleaned.length > 19) {
            newErrors.cardNumber = 'Card number is invalid';
        }

        if (!expiry) {
            newErrors.expiry = 'Expiry date is required';
        } else if (expiry.length !== 5) {
            newErrors.expiry = 'Expiry date is invalid (MM/YY)';
        } else {
            const month = parseInt(expiry.slice(0, 2), 10);

            if (month < 1 || month > 12) {
                newErrors.expiry = 'Invalid month (01-12)';
            }
        }

        if (!cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (cvv.length < 3 || cvv.length > 4) {
            newErrors.cvv = 'CVV is invalid';
        }

        if (!holderName) {
            newErrors.holderName = 'Holder name is required';
        } else if (/\d/.test(holderName)) {
            newErrors.holderName = 'Holder name cannot contain numbers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-3/4 h-2/3">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onBack} className="text-blue-500">&larr;</button>
                    <h2 className="text-xl font-bold">Make Payment</h2>
                    <button onClick={onClose} className="text-gray-500">&times;</button>
                </div>

                <div className="flex gap-4 mb-6 justify-center">
                    <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex justify-center items-center">1</div>
                    <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex justify-center items-center">2</div>
                    <div className="rounded-full bg-gray-300 text-gray-600 w-8 h-8 flex justify-center items-center">3</div>
                </div>

                <div className="flex gap-6 mb-6 justify-center mt-16">
                    <div className="bg-gray-200 p-4 rounded-lg flex justify-center items-center w-1/4">
                        <p className="text-center text-gray-700">Card Preview</p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="border rounded p-2 w-full"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Expiry (MM/YY)"
                                className="border rounded p-2 w-full"
                                value={expiry}
                                onChange={handleExpiryChange}
                                maxLength={5}
                            />
                            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

                            <input
                                type="text"
                                placeholder="CVV"
                                className="border rounded p-2 w-full"
                                value={cvv}
                                onChange={handleCvvChange}
                                maxLength={4}
                            />
                            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                        </div>

                        <input
                            type="text"
                            placeholder="Holder Name"
                            className="border rounded p-2 w-full"
                            value={holderName}
                            onChange={handleHolderNameChange}
                        />
                        {errors.holderName && <p className="text-red-500 text-sm">{errors.holderName}</p>}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="saveCard" />
                            <label htmlFor="saveCard" className="text-gray-700">
                                Save this credit card
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleConfirmPayment}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Confirm
                </button>
                <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />
            </div>
        </div>
    );
}

export default PaymentDetailsModal;