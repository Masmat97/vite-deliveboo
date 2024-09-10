<template>
  <div class="cart-container">
    <h1>Carrello</h1>
    <div v-if="cart.length === 0" class="empty-cart">
      <p>Il carrello è vuoto</p>
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.dish.id" class="cart-item">
        <img :src="item.dish.image" class="cart-item-image" alt="Product image">
        <div class="cart-item-details">
          <h5>{{ item.dish.name }}</h5>
          <p>Prezzo: {{ item.dish.price }} €</p>
          <p>Quantità: {{ item.quantity }}</p>
          <button @click="decrementQuantity(item.dish.id)">-</button>
          <button @click="incrementQuantity(item.dish.id)">+</button>
          <button @click="removeItemFromCart(item)">Rimuovi</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total: {{ cartTotal }} €</p>
        <button @click="clearCart" class="btn btn-warning mt-auto">Svuota Carrello</button>
        <button @click="goToCheckout" class="btn btn-primary mt-auto">Procedi al pagamento</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['cart', 'restaurantId'],
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
    }
  },
  methods: {
    clearCart() {
      localStorage.removeItem('cart');
      this.cart = [];
    },
    goToCheckout() {
      if (this.cart.length === 0) {
        alert('Il carrello è vuoto! Aggiungi alcuni piatti prima di procedere al checkout.');
        return;
      }
      window.location.href = 'http://127.0.0.1:8000/checkout'; // Naviga all'URL del backend Laravel
    },
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    addItemToCart(item) {
      if (this.cart.length > 0 && this.cart[0].dish.restaurantId !== item.dish.restaurantId) {
        const answer = window.confirm('Sei sicuro di voler cambiare ristorante? I precedenti piatti saranno tolti dal carrello.');
        if (!answer) {
          return;
        }
        localStorage.removeItem('cart');
        this.cart = [];
        this.updateCart();
      }
    },
    removeItemFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
      }
    },
    incrementQuantity(id) {
      const item = this.cart.find(item => item.dish.id === id);
      if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
      }
    },
    decrementQuantity(id) {
      const item = this.cart.find(item => item.dish.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
      }
    }
  },
  mounted() {
    this.updateCart();
  }
}
</script>
