
import React, { useState, useEffect } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Recupera i dati del carrello dal localStorage
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h2>Carrello</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} x ${item.price}
                        <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
                    </li>
                ))}
            </ul>
            <h3>Totale: ${calculateTotal().toFixed(2)}</h3>
            <button onClick={() => window.location.href = '/checkout'}>Procedi al Pagamento</button>
        </div>
    );
}

export default Cart;
