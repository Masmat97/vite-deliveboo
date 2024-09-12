<script>
import { eventBus } from '@/eventBus';

export default {
  name: 'Cart',
  props: ['cart', 'restaurant'],
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
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    removeItemFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    },
    incrementQuantity(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(cartItem => cartItem.dish.id === item.dish.id);
  if (existingItem) {
    existingItem.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    eventBus.emit('cart-updated');
  }
},

decrementQuantity(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(cartItem => cartItem.dish.id === item.dish.id);
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
    eventBus.emit('cart-updated');
  } else if (existingItem && existingItem.quantity === 1) {
    const index = cart.indexOf(existingItem);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    eventBus.emit('cart-updated');
  }
}
  },
  mounted() {
  this.updateCart();
  eventBus.on('cart-updated', this.updateCart);
  window.addEventListener('beforeunload', this.leavePage);
},
}
</script>
          
<template>
  <div class="cart-container">
    <h1>Carrello </h1>
    <!-- <p>Stai ordinando da: <h4>{{ restaurant.name }}</h4></p> -->

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
          <button class="btn btn-primary m-1" @click="decrementQuantity(item)">-</button>
          <button class="btn btn-primary m-1" @click="incrementQuantity(item)">+</button>
          <button class="btn btn-primary m-1" @click="removeItemFromCart(item)">Rimuovi</button>
        </div>
      </div>
      <div class="cart-summary">
        <p><b>Total: {{ cartTotal }} €</b></p>
        <RouterLink :to="{ name: 'checkout', params: { restaurant: restaurant } }" class="btn btn-primary mt-auto">Vai al Checkout
        </RouterLink>

      </div>
    </div>
  </div>
</template>


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