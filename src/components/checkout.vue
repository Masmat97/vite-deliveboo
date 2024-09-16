<template>
  <div class="container-fluid cart-container">
    <div class="row">
      <div class="col-12 border border-danger ">
        <h1 class="">Riepilogo Ordini</h1>
        <p v-if="restaurant">Stai ordinando da:
        <h4>{{ restaurant.name }}</h4>
        </p>
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

        <div class="row">
          <div class="col-md-6 col-sm-12 my-3">
            <div v-if="cart.length === 0" class="empty-cart">
              <p>Il carrello è vuoto</p>
            </div>
            <div v-else>
              <div v-for="item in cart" :key="item.dish.id" class="cart-item">
                <img :src="item.dish.image" class="cart-item-image" alt="Product image">
                <div class="cart-item-details">
                  <h5>{{ item.dish.name }}</h5>
                  <p><strong>Prezzo:</strong> {{ item.dish.price }} €</p>
                  <p><strong>Ingredienti:</strong> {{ item.dish.ingredient }}</p>
                  <p><strong>Quantità:</strong> {{ item.quantity }}</p>
                  <button type="button" class="btn btn-outline-primary" @click="decrementQuantity(item)">-</button>
                  <button type="button" class="btn btn-outline-primary" @click="incrementQuantity(item)">+</button>
                  <button type="button" class="btn btn-outline-danger"
                    @click="removeItemFromCart(item)">Rimuovi</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12 my-3">
            <form @submit.prevent="validateForm" id="user-form" @keydown.enter.prevent="validateForm">
              <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" class="form-control" id="name" name="name" v-model="formData.name"
                  :class="{ 'is-invalid': !nomeIsValid }" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email" v-model="formData.email"
                  :class="{ 'is-invalid': !emailIsValid }" required>
              </div>
              <div class="form-group">
                <label for="address">Indirizzo:</label>
                <input type="text" class="form-control" id="address" name="address" v-model="formData.address"
                  :class="{ 'is-invalid': !indirizzoIsValid }" required>
              </div>
              <div class="form-group">
                <label for="phone_number">Numero di telefono:</label>
                <input type="tel" class="form-control" id="phone_number" name="phone_number"
                  v-model="formData.phone_number" :class="{ 'is-invalid': !telefonoIsValid }" required>
              </div>

              <div class="form-group">
                <label for="numb-card">Numero carta:</label>
                <input type="tel" class="form-control" :class="{ 'is-invalid': !telefonoIsValid }" required>
              </div>

              <div class="form-group">
                <label for="numb-card">Scadenza Carta:</label>
                <div class="form-control" :class="{ 'is-invalid': !telefonoIsValid }">
                  <select id="month" name="month" required>

                    <option value="12">Dicembre</option>
                    <option value="02">Novembre</option>
                    <option value="02">Ottobre</option>
                    <option value="02">Settembre</option>
                    <option value="02">Agosto</option>
                    <option value="02">Luglio</option>
                    <option value="02">Giugno</option>
                    <option value="02">Maggio</option>
                    <option value="02">Aprile</option>
                    <option value="02">Marzo</option>
                    <option value="02">Febbraio</option>
                    <option value="01">Gennaio</option>

                  </select>

                  <select id="year" name="year" required>

                    <option value="2022">2024</option>
                    <option value="2022">2025</option>
                    <option value="2023">2026</option>
                    <option value="2023">2027</option>
                    <option value="2023">2028</option>
                    <option value="2023">2029</option>
                    <option value="2023">2030</option>
                    <option value="2023">2031</option>
                    <option value="2023">2032</option>
                    <option value="2023">2033</option>
                    <option value="2023">2034</option>

                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-12 rounded-3 border border-danger mt-2 mx-2">
                  <div class="p-2">
                    <p>Total: {{ cartTotal }} €</p>
                    <button class="btn btn-primary m-0" @click="proceedToPayment">Procedi al pagamento</button>
                    <button class="btn btn-danger" @click="emptyCart">Svuota carrello</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
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
      restaurant: null, // add a data property to store the restaurant
      formData: {
        name: '',
        email: '',
        address: '',
        phone_number: ''
      },
      totalCart: ''
    };
  },
  computed: {
    cartTotal() {
      this.totalCart = this.cart.reduce((total, item) => total + item.dish.price * item.quantity, 0).toFixed(2);
      return this.totalCart;
    }
  },
  methods: {

    validateForm() {
      // Validazione del nome
      if (this.formData.name.trim() === '') {
        this.nomeIsValid = false
      } else {
        this.nomeIsValid = true
      }

      // Validazione dell'email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(this.formData.email)) {
        this.emailIsValid = false
      } else {
        this.emailIsValid = true
      }

      // Validazione dell'indirizzo
      if (this.formData.address.trim() === '') {
        this.indirizzoIsValid = false
      } else {
        this.indirizzoIsValid = true
      }

      // Validazione del numero di telefono
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
      if (!phoneRegex.test(this.formData.phone_number)) {
        this.telefonoIsValid = false
      } else {
        this.telefonoIsValid = true
      }

      // Validazione del numero carta
      const cardRegex = /^\d{16}$/
      if (!cardRegex.test(this.formData.numb_card)) {
        this.numbCardIsValid = false
      } else {
        this.numbCardIsValid = true
      }

      // Se tutte le proprietà di validazione sono true, il form è valido
      if (this.nomeIsValid && this.emailIsValid && this.indirizzoIsValid && this.telefonoIsValid && this.numbCardIsValid) {
        // Esegui l'azione di submit del form
        console.log('Form valido!')
      } else {
        console.log('Form non valido!')
      }
    },

    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log(this.cart)
    },
    proceedToPayment() {
      console.log("Attempting to proceed to payment");
      // Simula una chiamata API per processare il pagamento
      const data = [this.cart, this.formData, this.totalCart];
      axios.post('http://127.0.0.1:8000/api/payment', data)
        .then(response => {
          console.log(response.data);
          // Naviga all'URL del checkout Laravel
          window.location.href = 'http://localhost:5174/thanks';
          localStorage.removeItem('cart');
          this.cart = [];
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

      yesButton.addEventListener("click", function () {
        const index = this.cart.findIndex(cartItem => cartItem.dish.id === item.dish.id);
        if (index !== -1) {
          this.cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          this.updateCart();
          eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
        }
        confirmBox.style.display = "none";
      }.bind(this));

      noButton.addEventListener("click", function () {
        confirmBox.style.display = "none";
      });
    },
    incrementQuantity(item) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(cartItem => cartItem.dish.id === item.dish.id);
      if (existingItem) {
        if (existingItem.quantity >= 15) {
          const message = "Quantità massima raggiunta. Non puoi aggiungere più di 15 piatti.";
          const confirmBox = document.getElementById("info");
          document.getElementById("info-message").innerText = message;
          confirmBox.style.display = "block";

          // Add an event listener to the close button
          const closeButton = document.getElementById("okey-button");
          closeButton.addEventListener("click", function () {
            confirmBox.style.display = "none";
          }.bind(this));

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
          const confirmBox = document.getElementById("confirm");
          confirmBox.style.display = "block";
          const message = `Rimuovere ${item.dish.name} dal carrello?`;
          document.getElementById("confirm-message").innerText = message;

          // Add event listeners to the confirm box buttons
          const yesButton = document.getElementById("yes-button");
          const noButton = document.getElementById("no-button");

          yesButton.addEventListener("click", function () {
            const index = cart.indexOf(existingItem);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');
            confirmBox.style.display = "none";
          });
          noButton.addEventListener("click", function () {
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

      yesButton.addEventListener("click", function () {
        localStorage.removeItem('cart');
        this.cart = [];
        eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
        confirmBox.style.display = "none";
      }.bind(this));

      noButton.addEventListener("click", function () {
        confirmBox.style.display = "none";
      });
    },
  },
  mounted() {
    this.updateCart();
    this.restaurant = JSON.parse(localStorage.getItem('restaurant')); // retrieve the restaurant from local storage
    eventBus.on('cart-updated', this.updateCart);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCart);
  },
}
</script>
<style scoped>
select {
  background-color: white;
  border: 0px;
  width: 6rem;
  text-align: center;
}

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

button {
  margin-left: 1rem;
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
  text-align: center;
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