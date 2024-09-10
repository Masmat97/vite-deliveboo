<template>
  <div class="cart-container">
    <h1>Checkout</h1>
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
          <button @click="removeFromCart(item.dish.id)">Rimuovi</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total: {{ cartTotal }} €</p>
        <button class="btn btn-primary" @click="proceedToPayment">Procedi al pagamento</button>
        <button class="btn btn-danger" @click="emptyCart">Svuota carrello</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';

export default {
  name: 'Checkout',
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
    proceedToPayment() {
      if (this.cart.length === 0) {
        alert('Il carrello è vuoto! Aggiungi alcuni piatti prima di procedere al checkout.');
        return;
      }
      window.location.href = 'http://127.0.0.1:8000/checkout'; // Naviga all'URL del checkout Laravel
    },
    removeFromCart(id) {
      const updatedCart = this.cart.filter(item => item.dish.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      this.updateCart();
      eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
    },
    incrementQuantity(id) {
      const item = this.cart.find(item => item.dish.id === id);
      if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    },
    decrementQuantity(id) {
      const item = this.cart.find(item => item.dish.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    },
    emptyCart() {
      localStorage.removeItem('cart');
      this.cart = [];
      eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
    }
  },
  mounted() {
    this.updateCart();
    eventBus.on('cart-updated', this.updateCart);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCart);
  },
  beforeRouteLeave(to, from, next) {
    if (this.cart.length > 0) {
      const confirmLeave = confirm("Sei sicuro? Il carrello sarà svuotato.");
      if (confirmLeave) {
        this.emptyCart();
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
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
