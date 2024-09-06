<template>
    <div class="cart-container">
      <h1>Carrello</h1>
      <div v-if="cart.length === 0" class="empty-cart">
        <p>Il carrello è vuoto</p>
      </div>
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" class="cart-item-image" alt="Product image">
          <div class="cart-item-details">
            <h5>{{ item.name }}</h5>
            <p>Prezzo: {{ item.price }} €</p>
            <p>Quantità: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Rimuovi</button>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total: {{ cartTotal }} €</p>
          <button class="btn btn-primary">Procedi al pagamento</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
    data() {
      return {
        cart: [],
      };
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      }
    },
    methods: {
      updateCart() {
        // Recupera il carrello dal localStorage
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      },
      removeFromCart(id) {
        // Filtra l'array del carrello per rimuovere l'elemento con l'ID specificato
        const updatedCart = this.cart.filter(item => item.id !== id);
        // Aggiorna il carrello nel localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Aggiorna lo stato del componente
        this.updateCart();
      }
    },
    mounted() {
      this.updateCart();
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
  }
  
  .empty-cart {
    text-align: center;
    padding: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .cart-item-details {
    flex: 1;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  