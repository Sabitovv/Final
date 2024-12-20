import React from 'react';

function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) {
        return null; // Don't render if not open
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-1/3 text-center">
                <div className="rounded-full bg-green-500 text-white w-20 h-20 mx-auto flex justify-center items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Success</h2>
                <p className="text-gray-700 mb-4">Your payment has been processed successfully.</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Complete
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;