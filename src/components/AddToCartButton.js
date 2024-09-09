
import React from 'react';

function AddToCartButton({ product }) {
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Prodotto aggiunto al carrello');
    };

    return <button onClick={addToCart}>Aggiungi al Carrello</button>;
}

export default AddToCartButton;
