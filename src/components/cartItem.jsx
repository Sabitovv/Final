import React from 'react';

function CartItem({ item, onQuantityChange, onRemove }) {
    const handleIncrement = () => {
        onQuantityChange(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onQuantityChange(item.id, item.quantity - 1);
        }
    };

    return (
        <div className="flex justify-between items-center border-b py-4">
            <div className="flex items-center">
                <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-500 mr-10">X</button>
                <img src={item.image} className="w-20 h-20 object-cover rounded mr-4" /> {/* Изображение */}
                <span className="font-medium">{item.name}</span>
            </div>
            <div className='flex items-center gap-40 custom:gap-80'>
                <div className="flex items-center border rounded bg-slate-300">
                    <button onClick={handleDecrement} className="px-2 text-blue-500">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={handleIncrement} className="px-2 text-blue-500">+</button>
                </div>
                <div className="flex items-center mt-2">
                    <span className="ml-auto font-medium w-12">${item.price * item.quantity}</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;






