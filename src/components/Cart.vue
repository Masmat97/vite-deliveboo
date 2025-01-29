<template>
  <div class="cart-container">
    <h1>Carrello</h1>
    <p v-if="cart.length > 0 && restaurantName">Stai ordinando da: <h4>{{ restaurantName }}</h4></p>
    
    <div v-if="cart.length === 0" class="empty-cart">
      <p>Il carrello è vuoto</p>
    </div>
    <div v-else>
      <div v-for="item in validCartItems" :key="item.dish.id" class="cart-item">
        <img v-if="item.dish" :src="item.dish.image" class="cart-item-image" alt="Product image">
        <div class="cart-item-details">
          <h5>{{ item.dish?.name || 'Nome non disponibile' }}</h5>
          <p>Prezzo: €{{ (Number(item.dish?.price) || 0).toFixed(2) }}</p>
          <p>Quantità: {{ item.quantity }}</p>
          <button type="button" class="btn btn-outline-primary" @click="decrementQuantity(item)">-</button>
          <button type="button" class="btn btn-outline-primary" @click="incrementQuantity(item)">+</button>
          <button type="button" class="btn btn-outline-danger" @click="removeItemFromCart(item)">Rimuovi</button>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <p><b>Totale: €{{ cartTotal }} </b></p>
      <router-link :to="{ name: 'checkout', params: { restaurant: restaurant } }" class="btn btn-primary mt-auto">Completa l'ordine</router-link>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';
import Swal from 'sweetalert2';

export default {
  name: 'Cart',
  data() {
    return {
      cart: [],
      restaurant: null,
    };
  },
  computed: {
    validCartItems() {
      return this.cart.filter(item => item.dish);
    },
    cartTotal() {
      return this.cart.reduce((total, item) => {
        const price = Number(item.dish?.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + (price * quantity);
      }, 0).toFixed(2);
    },
    restaurantName() {
      return this.restaurant?.name || 'N/A';
    }
  },
  methods: {
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.restaurant = JSON.parse(localStorage.getItem('restaurant')) || null;
    },
    removeItemFromCart(item) {
      Swal.fire({
        title: 'Rimuovere dal carrello?',
        text: `Rimuovere ${item.dish?.name || 'questo piatto'} dal carrello?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.cart.findIndex(cartItem => cartItem.dish?.id === item.dish?.id);
          if (index !== -1) {
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCart();
            eventBus.emit('cart-updated');
          }
        }
      });
    },
    incrementQuantity(item) {
      const existingItem = this.cart.find(cartItem => cartItem.dish?.id === item.dish?.id);
      if (existingItem) {
        if (existingItem.quantity >= 15) {
          Swal.fire({ title: 'Quantità massima raggiunta', text: 'Non puoi aggiungere più di 15 piatti.', icon: 'error' });
          return;
        }
        existingItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        eventBus.emit('cart-updated');
      }
    },
    decrementQuantity(item) {
      const existingItem = this.cart.find(cartItem => cartItem.dish?.id === item.dish?.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          localStorage.setItem('cart', JSON.stringify(this.cart));
          eventBus.emit('cart-updated');
        } else {
          this.removeItemFromCart(existingItem);
        }
      }
    },
    clearCart() {
      localStorage.removeItem('cart');
      this.cart = [];
      eventBus.emit('cart-updated');
    }
  },
  mounted() {
    this.clearCart(); // Svuota il carrello all'avvio
    this.updateCart();
    eventBus.on('cart-updated', this.updateCart);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCart);
  }
};
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