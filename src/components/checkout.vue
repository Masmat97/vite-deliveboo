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
          <button type="button" class="btn btn-outline-primary" @click="decrementQuantity(item.dish.id)">-</button>
          <button type="button" class="btn btn-outline-primary" @click="incrementQuantity(item.dish.id)">+</button>
          <button type="button" class="btn btn-outline-danger" @click="removeFromCart(item.dish.id)">Rimuovi</button>
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
import axios from 'axios';

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
      // console.log(this.cart);

      const data = this.cart;
      axios.post('http://127.0.0.1:8000/api/payment', data).then(response => {
        console.log(response.data)
      })

      // Aggiungi un flag per indicare che l'utente sta procedendo al pagamento
      // localStorage.setItem('proceedToPayment', true);

      // // Naviga all'URL del checkout Laravel
      // window.location.href = 'http://127.0.0.1:8000/checkout';
    },
    removeItemFromCart(item) {
  const confirmBox = document.getElementById("confirm");
  confirmBox.style.display = "block";
  const message = `Rimuovere ${item.dish.name} dal carrello?`;
  document.getElementById("confirm-message").innerText = message;

  // Add event listeners to the confirm box buttons
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");

  yesButton.addEventListener("click", function() {
    const index = this.cart.findIndex(cartItem => cartItem.dish.id === item.dish.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCart();
      eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
    }
    confirmBox.style.display = "none";
  }.bind(this));

  noButton.addEventListener("click", function() {
    confirmBox.style.display = "none";
  });
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
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          localStorage.setItem('cart', JSON.stringify(cart));
          eventBus.emit('cart-updated');
        } else {
          const confirmBox = document.getElementById("confirm");
          confirmBox.style.display = "block";
          const message = `Rimuovere ${item.dish.name} dal carrello?`;
          document.getElementById("confirm-message").innerText = message;

          // Add event listeners to the confirm box buttons
          const yesButton = document.getElementById("yes-button");
          const noButton = document.getElementById("no-button");

          yesButton.addEventListener("click", function() {
            const index = cart.indexOf(existingItem);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');
            confirmBox.style.display = "none";
          });

          noButton.addEventListener("click", function() {
            existingItem.quantity = 1;
            confirmBox.style.display = "none";
          });
        }
      }
    },
    emptyCart() {
      if (confirm('Sei sicuro di svuotare il carrello?')) {
        localStorage.removeItem('cart');
        this.cart = [];
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
      }
    }
  },
  mounted() {
    this.updateCart();
    eventBus.on('cart-updated', this.updateCart);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCart);
  },
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

button{
  margin-left: 1rem;
}
</style>
