<template>
  <div class="cart-container">
    <h1>Checkout</h1>
    <div id="confirm" style="display: none;">
  <p id="confirm-message"></p>
  <button class="m-1" id="yes-button">Sì</button>
  <button class="m-1" id="no-button">No</button>
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
      console.log("Attempting to proceed to payment");
      // Simula una chiamata API per processare il pagamento
      const data = this.cart;
      axios.post('http://127.0.0.1:8000/api/payment', data)
        .then(response => {
          console.log(response.data);
          // Naviga all'URL del checkout Laravel
          window.location.href = 'http://127.0.0.1:8000/checkout';
        })
        .catch(error => {
          console.error("There was an error processing the payment", error);
        });
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
  const confirmBox = document.getElementById("confirm");
  confirmBox.style.display = "block";
  const message = `Sei sicuro di svuotare il carrello?`;
  document.getElementById("confirm-message").innerText = message;

  // Add event listeners to the confirm box buttons
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");

  yesButton.addEventListener("click", function() {
    localStorage.removeItem('cart');
    this.cart = [];
    eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
    confirmBox.style.display = "none";
  }.bind(this));

  noButton.addEventListener("click", function() {
    confirmBox.style.display = "none";
  });
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
.cart-summary {
  margin-top: 20px;
  text-align: right;
}

#confirm {
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

  #confirm-message {
    font-size: 18px;
    margin-bottom: 20px;
  }

  #yes-button, #no-button {
    background-color: #fe1c1c;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #yes-button:hover, #no-button:hover {
    background-color: #d110108f;
  }
</style>