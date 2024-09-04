<template>
    <div>
      <h1>Carrello</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x ${{ item.price }}
          <button @click="removeFromCart(item.id)">Rimuovi</button>
        </li>
      </ul>
      <p>Totale: ${{ total }}</p>
    </div>
  </template>
  
  <script>
  import { useCart } from '../store/cartStore';
  
  export default {
    setup() {
      const { cart, total, addToCart, removeFromCart } = useCart();
  
      // Simulazione dell'aggiunta di prodotti 
      addToCart({ id: 1, name: 'Pizza Margherita', price: 10 });
  
      return { cart, total, removeFromCart };
    }
  };
  </script>
  