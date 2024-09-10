<script>
import { eventBus } from '@/eventBus';

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
    goToCheckout() {
  if (this.cart.length === 0) {
    alert('Il carrello è vuoto! Aggiungi alcuni piatti prima di procedere al checkout.');
    return;
  }
  router.push('/checkout'); // navigate to the checkout page
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
    this.cart = []; // Reset the cart prop
    this.updateCart(); // Update the cart prop
  }
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
    incrementQuantity(id) {
      const item = this.cart.find(item => item.id === id);
      if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    },
    decrementQuantity(id) {
      const item = this.cart.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    },
    leavePage(event) {
    if (this.cart.length > 0) {
      event.preventDefault();
      alert('Il carrello non è vuoto! Sei sicuro di voler lasciare la pagina? I piatti del carrello andranno persi a meno che non si proceda con il checkout.');
    }
  }
  },
  mounted() {
    eventBus.on('go-to-checkout', this.goToCheckout); // listen for the 'go-to-checkout' event
  this.updateCart();
  eventBus.on('cart-updated', this.updateCart);
  window.addEventListener('beforeunload', this.leavePage);
},

beforeDestroy() {
  eventBus.off('cart-updated', this.updateCart);
  window.removeEventListener('beforeunload', this.leavePage);
  }
}
</script>
          
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
          <button @click="decrementQuantity(item.id)">-</button>
          <button @click="incrementQuantity(item.id)">+</button>
          <button @click="removeItemFromCart(item)">Rimuovi</button>
        </div>
      </div>
      <div class="cart-summary">
        <p>Total: {{ cartTotal }} €</p>
        <RouterLink :to="{ name: 'checkout' }" class="btn btn-primary mt-auto">Vai al Checkout
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