<template>
  <div class="container-fluid cart-container">
    <div class="row">
      <div class="col-12 border border-danger ">
        <h1>Riepilogo Ordini</h1>
        <p v-if="restaurant">Stai ordinando da:
          <h4>{{ restaurant.name }}</h4>
        </p>
        <div class="row">
          <div class="col-md-6 col-sm-12 my-3">
            <div v-if="cart.length === 0" class="empty-cart">
              <p>Il carrello è vuoto</p>
            </div>
            <div v-else>
              <div v-for="item in cart" :key="item.dish?.id" class="cart-item">
                <img v-if="item.dish" :src="item.dish.image" class="cart-item-image" alt="Product image">
                <div class="cart-item-details" v-if="item.dish">
                  <h5>{{ item.dish.name }}</h5>
                  <p><strong>Prezzo:</strong> €{{ (Number(item.dish.price) || 0).toFixed(2) }}</p>
                  <p><strong>Ingredienti:</strong> {{ item.dish.ingredient }}</p>
                  <p><strong>Quantità:</strong> {{ item.quantity }}</p>
                  <button type="button" class="btn btn-outline-primary" @click="decrementQuantity(item)">-</button>
                  <button type="button" class="btn btn-outline-primary" @click="incrementQuantity(item)">+</button>
                  <button type="button" class="btn btn-outline-danger" @click="removeItemFromCart(item)">Rimuovi</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12 my-3">
            <form @submit.prevent="validateForm" id="user-form">
              <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="address">Indirizzo:</label>
                <input type="text" class="form-control" id="address" v-model="formData.address" required>
              </div>
              <div class="form-group">
                <label for="phone_number">Numero di telefono:</label>
                <input type="tel" class="form-control" id="phone_number" v-model="formData.phone_number" required>
              </div>
              <div class="form-group">
                <label for="numb-card">Numero carta:</label>
                <input type="tel" class="form-control" v-model="formData.cardNumber" required>
              </div>
              <div class="form-group">
                <label for="expiry">Scadenza Carta:</label>
                <div class="d-flex">
                  <select v-model="formData.expiryMonth" required>
                    <option value="" disabled>MM</option>
                    <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                  </select>
                  <select v-model="formData.expiryYear" required>
                    <option value="" disabled>YYYY</option>
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                  </select>
                </div>
              </div>
              <div class="row w-100 margin">
                <div class="col-12 rounded-3 border border-danger mt-2 mx-2">
                  <div class="p-2">
                    <p><strong>Totale:</strong> €{{ cartTotal }} </p>
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
import Swal from 'sweetalert2';

export default {
  name: 'Checkout',
  data() {
    return {
      cart: [],
      restaurant: null,
      formData: {
        name: '',
        email: '',
        address: '',
        phone_number: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: ''
      },
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      years: Array.from({ length: 10 }, (v, k) => new Date().getFullYear() + k),
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        const price = Number(item.dish?.price) || 0; // Assicurati che price sia un numero
        const quantity = Number(item.quantity) || 0; // Assicurati che quantity sia un numero
        return total + (price * quantity); // Calcola il totale
      }, 0).toFixed(2); // Restituisci il totale formattato
    }
  },
  methods: {
    validateForm() {
      // Implementa la logica di validazione qui
      Swal.fire({
        icon: 'success',
        title: 'Form valido!',
        text: 'Il tuo form è stato inviato con successo!',
        confirmButtonText: 'OK'
      });
    },
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.restaurant = JSON.parse(localStorage.getItem('restaurant')) || null;
    },
    proceedToPayment() {
      Swal.fire({
        title: 'Conferma pagamento',
        text: 'Sei sicuro di voler procedere al pagamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sì, procedi al pagamento',
        cancelButtonText: 'No, annulla'
      }).then((result) => {
        if (result.isConfirmed) {
          const data = { cart: this.cart, user: this.formData, total: this.cartTotal };
          console.log(data);
          window.location.href = 'http://localhost:5174/thanks';
          localStorage.removeItem('cart');
          this.cart = [];
        }
      });
    },
    removeItemFromCart(item) {
      const index = this.cart.findIndex(cartItem => cartItem.dish.id === item.dish.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        eventBus.emit('cart-updated');
      }
    },
    incrementQuantity(item) {
      const existingItem = this.cart.find(cartItem => cartItem.dish?.id === item.dish?.id);
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
    emptyCart() {
      Swal.fire({
        title: 'Svuota carrello',
        text: 'Sei sicuro di voler svuotare il carrello?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sì, svuota carrello',
        cancelButtonText: 'No, annulla'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('cart');
          this.cart = [];
          eventBus.emit('cart-updated');
        }
      });
    }
  },
  mounted() {
    this.updateCart();
    eventBus.on('cart-updated', this.updateCart);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCart);
  }
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
</style>