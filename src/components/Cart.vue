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
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
    },
    restaurantName() {
    if (this.cart.length > 0) {
      return this.restaurant.name;
    } else {
      return JSON.parse(localStorage.getItem('restaurant'))?.name;
    }
  }
},
watch: {
  restaurant(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.restaurantName = newValue?.name;
    }
  }
},
  methods: {
    updateCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.restaurant = JSON.parse(localStorage.getItem('restaurant')) || null;
    this.$forceUpdate(); // Forza l'aggiornamento della proprietà calcolata
  },
  removeItemFromCart(item) {
    Swal.fire({
      title: 'Rimuovere dal carrello?',
      text: `Rimuovere ${item.dish.name} dal carrello?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sì',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.cart.findIndex(cartItem => cartItem.dish.id === item.dish.id);
        if (index !== -1) {
          this.cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          this.updateCart();
          eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
        }
      }
    });
  },
  incrementQuantity(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.dish.id === item.dish.id);
    if (existingItem) {
      if (existingItem.quantity >= 15) {
        Swal.fire({
          title: 'Quantità massima raggiunta',
          text: 'Non puoi aggiungere più di 15 piatti.',
          icon: 'error'
        });
        return;
      }
      existingItem.quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      eventBus.emit('cart-updated');
    }
  },
  decrementQuantity(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.dish.id === item.dish.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        eventBus.emit('cart-updated');
      } else {
        Swal.fire({
          title: 'Rimuovere dal carrello?',
          text: `Rimuovere ${item.dish.name} dal carrello?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sì',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            const index = cart.indexOf(existingItem);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');
          } else {
            existingItem.quantity = 1;
          }
        });
      }
    }
  },
    leavePage() {
      eventBus.emit('save-cart', this.cart);
    }
  },
  mounted() {
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
    <p v-if="cart.length > 0 && restaurantName">Stai ordinando da: <h4>{{ restaurantName }}</h4></p>
      <div id="confirm" style="display: none;">
      <p id="confirm-message"></p>
      <button class="m-1" id="yes-button">Sì</button>
      <button class="m-1" id="no-button">No</button>
    </div>
    <!-- alert -->
    <div id="info" style="display: none;">
      <p id="info-message"></p>
      <button class="m-1 btn btn-primary" id="okey-button">Chiudi</button>
    </div>
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
          <button type="button" class="btn btn-outline-primary" @click="decrementQuantity(item)">-</button>
          <button type="button" class="btn btn-outline-primary" @click="incrementQuantity(item)">+</button>
          <button type="button" class="btn btn-outline-danger" @click="removeItemFromCart(item)">Rimuovi</button>
        </div>
      </div>
      <div class="cart-summary">
        <p><b>Total: {{ cartTotal }} €</b></p>
        <RouterLink :to="{ name: 'checkout', params: { restaurant: restaurant } }" class="btn btn-primary mt-auto">Completa l'ordine</RouterLink>
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

#confirm,
#info {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  border: 1px solid #fe1c1c;
  padding: 20px;
  display: none;
  border-radius: 1rem;
}

#confirm-message,
#info-message {
  font-size: 18px;
  margin-bottom: 20px;
}

#yes-button,
#no-button,
#okey-button {
  background-color: #fe1c1c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#yes-button:hover,
#no-button:hover,
#okey-button:hover {
  background-color: #d110108f;
}
</style>
