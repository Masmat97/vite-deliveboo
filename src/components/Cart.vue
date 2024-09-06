<template>
    <div class="cart-container">
      <h2>Il tuo Carrello</h2>
      <div v-if="cart.length > 0" class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <h4>{{ item.name }}</h4>
          <p>Prezzo: {{ item.price }} €</p>
          <p>Quantità: {{ item.quantity }}</p>
        </div>
        <div class="checkout">
          <router-link to="/checkout" class="btn btn-primary">Procedi al pagamento</router-link>
        </div>
      </div>
      <div v-else class="empty-cart">
        <p>Il carrello è vuoto.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
    data() {
      return {
        cart: []
      };
    },
    mounted() {
      this.loadCart();
    },
    methods: {
      loadCart() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .cart-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
  }
  
  .checkout {
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
  }
  
  .empty-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .empty-cart p {
    font-size: 1.5rem;
    color: #555;
  }
  </style>
  