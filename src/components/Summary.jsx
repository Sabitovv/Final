import React from 'react';

function Summary({ subtotal }) {
    const shipping = 20;
    const total = subtotal + shipping;

return (
    <div className="mt-6 pt-4 border-t"> {/* Отступ и разделитель */}
        <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Shipping fee</span>
            <span>${shipping}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Coupon</span>
            <span>No</span>
        </div>
        <div className="flex justify-between font-medium text-lg"> {/* Итого */}
            <span>TOTAL</span>
            <span>${total}</span>
        </div>
    </div>
);
}

export default Summary;