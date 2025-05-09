import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CSS/OrderDetails.css';

function OrderDetails() {
  const { getTotalCartAmount, userData } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  };

  const RazorPayFunction = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const response = await fetch('http://localhost:4000/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: getTotalCartAmount() * 100 }),
    });

    const data = await response.json();

    const options = {
      key: 'rzp_test_OqKM3VAcZ1O5bK',
      amount: data.amount,
      currency: data.currency,
      name: 'AC',
      description: 'Test Transaction',
      order_id: data.id,
      handler: async function (response) {

        await fetch('http://localhost:4000/updateorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }); 
        
        
        
        alert('🎉 Order placed successfully!\nPayment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: userData.name || 'Test User',
        email: userData.email || 'test@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='orderDetails'>
      <div className="orderDetails-container">
        <h1>Order Details</h1>
        <div className="orderDetails-fields">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Enter your name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={changeHandler}
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={changeHandler}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={changeHandler}
            placeholder="State"
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={changeHandler}
            placeholder="Pincode"
          />
          <h3>Total Amount: ₹{getTotalCartAmount()}</h3>
          <button onClick={RazorPayFunction}>Razorpay</button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
