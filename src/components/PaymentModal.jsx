import React, { useState, useEffect } from 'react';

function PaymentModal({ isOpen, onClose, onGoToPayment, formData, setFormData, previousFormData }) {
    const initialValues = { firstname: "", lastname: "", email: "", phone: "", address: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    const [isPreFilling, setIsPreFilling] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsPreFilling(true);
            setFormValues(formData);
            setFormErrors({});
            setHasBeenSubmitted(false);
            setIsPreFilling(false);
        }
    }, [isOpen, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "firstname" || name === "lastname") {
            setFormValues({ ...formValues, [name]: value.replace(/\d+/g, "") }); // Remove digits from names
        } else if (name === "phone") {
            let sanitizedValue = value.replace(/[^0-9+]/g, ""); // Allow only digits and +
            if (!sanitizedValue.startsWith("+")) {
                sanitizedValue = "+" + sanitizedValue; // Add + if not present
            }
            setFormValues({ ...formValues, [name]: sanitizedValue.substring(0, 12) }); // Limit length to 12
        } else {
            setFormValues({ ...formValues, [name]: value }); // Handle other inputs normally
        }
    
        if (hasBeenSubmitted) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };
    

    const handleSub = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setHasBeenSubmitted(true);

        if (Object.keys(errors).length === 0) {
            onGoToPayment(formValues);
        }
    };

    const validate = (values) => {
        if (isPreFilling) return {};
        const errors = {};
        if (!values.firstname) errors.firstname = "First Name is required!";
        if (!values.lastname) errors.lastname = "Last Name is required!";
        if (!values.email) errors.email = "Email is required!";
        if (!values.phone) errors.phone = "Phone number is required!";
        else if (values.phone.length < 12) errors.phone = "Phone number must be 12 digits including +!";
        if (!values.address) errors.address = "Address is required!";
        return errors;
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-3/4">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onClose} className="text-blue-500">&larr;</button>
                    <h2 className="text-xl font-bold">Make Payment</h2>
                    <button onClick={onClose} className="text-gray-500">&times;</button>
                </div>

                <div className="flex gap-4 mb-6 justify-center">
                    <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex justify-center items-center">1</div>
                    <div className="rounded-full bg-gray-300 text-white w-8 h-8 flex justify-center items-center">2</div>
                    <div className="rounded-full bg-gray-300 text-gray-600 w-8 h-8 flex justify-center items-center">3</div>
                </div>

                <form onSubmit={handleSub}>
                    <div className="flex gap-24">
                        <div className='w-full'>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                className="border rounded p-2 w-full mb-4"
                                value={formValues.firstname}
                                onChange={handleChange}
                            />
                            <p className="text-red-500 text-sm">{formErrors.firstname}</p>
                        </div>
                        <div className='w-full'>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                className="border rounded p-2 w-full mb-4"
                                value={formValues.lastname}
                                onChange={handleChange}
                            />
                            <p className="text-red-500 text-sm">{formErrors.lastname}</p>
                        </div>
                    </div>
                    <div className="flex gap-24">
                        <div className='w-full'>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Mobile Phone"
                                className="border rounded p-2 w-full mb-4"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                            <p className="text-red-500 text-sm">{formErrors.phone}</p>
                        </div>
                        <div className='w-full'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="border rounded p-2 w-full mb-4"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <p className="text-red-500 text-sm">{formErrors.email}</p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address for Delivery"
                            className="border rounded p-2 w-full mb-4"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                        <p className="text-red-500 text-sm">{formErrors.address}</p>
                    </div>

                    <h3 className="font-medium mb-2">Select Method Of Payment</h3>
                    <div className="border rounded p-4 mb-6">
                        <div className="flex items-center mb-2">
                            <input type="radio" name="payment" id="card" defaultChecked className="mr-2" />
                            <label htmlFor="card" className="flex items-center">Credit Card or Debit</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input type="radio" name="payment" id="paypal" className="mr-2" />
                            <label htmlFor="paypal" className="flex items-center">Paypal</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" name="payment" id="bank" className="mr-2" />
                            <label htmlFor="bank" className="flex items-center">Bank Transfer</label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Go to Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;