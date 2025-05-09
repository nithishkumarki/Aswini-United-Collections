import React, { useState, useEffect } from 'react';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
     const refreshOrders = () => {
        fetch('http://localhost:4000/allOrders')
            .then((response) => response.json())
            .then((data) => setOrders(data));
    };

    const deleteOrder = (name) => {
        fetch(`http://localhost:4000/deleteorder/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }), // Send the ID in the request body if needed
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Order deleted!');
                refreshOrders(); // Refresh after deletion
            }
        });
    };


    const OrderCard=(props)=>{
        return(

            <div className="order-card">
                <h3>{props.name}</h3>
                <p>{props.email}</p>
                <p>{props.address}</p>
                <p>{props.city}</p>
                <p>{props.state}</p>
                <p>{props.pincode}</p>
                <button onClick={()=>deleteOrder(props.name)} className="order-button">DeleteOrder</button>
                <hr />
            </div>
        )
    }

    useEffect(() => {
        fetch('http://localhost:4000/allOrders')
            .then((response) => response.json())
            .then((data) => setOrders(data));
          
    }, []);
   


    return (
        <div className="orders">

            {orders.map((order, index) => (
                <OrderCard
                    key={index}
                    name={order.name}
                    email={order.email}
                    address={order.address}
                    city={order.city}
                    state={order.state}
                    pincode={order.pincode}
                />
               
            ))}
        </div>
    );
}

export default Orders;