import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './components/cartItem';
import Summary from './components/Summary';
import PaymentModal from './components/PaymentModal';
import PaymentDetailsModal from './components/PaymentDetailsModal';

const initialFormData = { // Define initialFormData outside the component
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
};

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentDetailsModalOpen, setIsPaymentDetailsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData); // Initialize formData with initialFormData

    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData(initialFormData); // Reset form data to initial state
    };

    const handleCloseDetailsModal = () => {
      setIsPaymentDetailsModalOpen(false);
      setIsModalOpen(false); // Close the second modal completely
      setFormData(initialFormData); // Reset when closing the second modal
  };


    const handleGoToPayment = (updatedFormData) => {
        setFormData(updatedFormData);
        setIsModalOpen(false);
        setIsPaymentDetailsModalOpen(true);
    };

    const handleBackToPaymentModal = () => {
        setIsPaymentDetailsModalOpen(false);
        setIsModalOpen(true);
    };

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Nike Airmax 270 react', price: 499, quantity: 2, image: '' },
        { id: 2, name: 'Nike Airmax 270 react', price: 499, quantity: 2, image: '' }, // Removed the file path
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
      <div className="bg-gray-100 min-h-screen p-4 md:p-8">
        <button onClick={get}> click</button>
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mx-auto max-w-screen-l">
              <h1 className="text-2xl font-bold mb-4">Корзина</h1>
              <div className="hidden md:flex justify-between ml-12">
                  <h2 className="text-xl font-bold">PRODUCT</h2>
                  <div className="flex space-x-48 lg:space-x-96">
                      <h2 className="text-xl font-bold">QTY</h2>
                      <h2 className="text-xl font-bold">PRICE</h2>
                  </div>
              </div>
              {cartItems.map(item => (
                  <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                  />
              ))}
              <Summary subtotal={calculateSubtotal()} />
              <div className="flex justify-center mt-6">
                  <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                      Open Payment Modal
                  </button>
  
                  <PaymentModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      onGoToPayment={handleGoToPayment}
                      formData={formData}
                      setFormData={setFormData}
                      previousFormData={initialFormData}
                  />
  
                  <PaymentDetailsModal
                      isOpen={isPaymentDetailsModalOpen}
                      onClose={handleCloseDetailsModal}
                      onBack={handleBackToPaymentModal}
                      formData={formData}
                  />
              </div>
          </div>
      </div>
  );
}

export default App;