<template>
  <div class="checkout-container">
    <div class="checkout">
      <h1>Checkout</h1>
      <div class="row">
        <div class="col-md-4 order-md-2">
          <div class="cart-items">
            <h2>Riepilogo Ordini</h2>
            <p v-if="restaurant">Stai ordinando da: <h4>{{ restaurant.name }}</h4></p>
            <ul>
              <li v-if="!cart || cart.length === 0">Il carrello è vuoto</li>
              <li v-else v-for="item in cart" :key="item.dish?.id">
                {{ item.dish.name }} - €{{ (Number(item.dish.price) || 0).toFixed(2) }} x {{ item.quantity }}
              </li>
            </ul>
            <h5>Totale: €{{ cartTotal }}</h5>
          </div>
        </div>

        <div class="col-md-8 order-md-1">
          <div class="accordion" id="checkoutAccordion">
            <div class="card">
              <div class="card-header" id="userInfoHeading">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#userInfo"
                    aria-expanded="true" aria-controls="userInfo">
                    Informazioni Utente
                  </button>
                </h2>
              </div>
              <div id="userInfo" class="collapse show" aria-labelledby="userInfoHeading" data-parent="#checkoutAccordion">
                <div class="card-body">
                  <div class="form-group">
                    <input v-model="user.name" placeholder="Nome" required />
                  </div>
                  <div class="form-group">
                    <input v-model="user.surname" placeholder="Cognome" required />
                  </div>
                  <div class="form-group">
                    <input v-model="user.email" placeholder="Email" required />
                  </div>
                  <div class="form-group">
                    <input v-model="user.phone" placeholder="Telefono" required />
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="shippingInfoHeading">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#shippingInfo"
                    aria-expanded="false" aria-controls="shippingInfo">
                    Informazioni di Spedizione
                  </button>
                </h2>
              </div>
              <div id="shippingInfo" class="collapse" aria-labelledby="shippingInfoHeading" data-parent="#checkoutAccordion">
                <div class="card-body">
                  <div class="form-group">
                    <input v-model="shipping.address" placeholder="Indirizzo" required />
                  </div>
                  <div class="form-group">
                    <input v-model="shipping.city" placeholder="Città" required />
                  </div>
                  <div class="form-group">
                    <input v-model="shipping.state" placeholder="Stato" required />
                  </div>
                  <div class="form-group">
                    <input v-model="shipping.postalCode" placeholder="Codice Postale" required />
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="shippingMethodHeading">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                    data-target="#shippingMethod" aria-expanded="false" aria-controls="shippingMethod">
                    Metodo di Spedizione
                  </button>
                </h2>
              </div>
              <div id="shippingMethod" class="collapse" aria-labelledby="shippingMethodHeading" data-parent="#checkoutAccordion">
                <div class="card-body">
                  <div class="form-group d-flex justify-content-center align-items-center">
                    <input type="radio" id="shippingMethodCheckbox" v-model="shippingMethodSelected" value="Corriere GLS"
                      checked class="custom-checkbox" />
                    <span style="margin-right: 5rem;">Corriere GLS</span>
                    <span style="margin-right: 5rem;">2/3 giorni lavorativi</span>
                    <span>5,50 € tasse incluse</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="paymentInfoHeading">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#paymentInfo"
                    aria-expanded="false" aria-controls="paymentInfo">
                    Informazioni di Pagamento
                  </button>
                </h2>
              </div>
              <div id="paymentInfo" class="collapse" aria-labelledby="paymentInfoHeading" data-parent="#checkoutAccordion">
                <div class="card-body">
                  <div id="dropin-container"></div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="submit-button" @click="submitOrder">Paga</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import braintreeDropin from 'braintree-web-drop-in';
import { eventBus } from '@/eventBus'; // Ensure you have an event bus set up

export default {
  name: 'Checkout',
  data() {
    return {
      cart: [],
      restaurant: null,
      user: {
        name: '',
        surname: '',
        email: '',
        phone: ''
      },
      shipping: {
        address: '',
        city: '',
        state: '',
        postalCode: ''
      },
      shippingMethodSelected: 'Corriere GLS',
      dropinInstance: null,
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        const price = Number(item.dish?.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + (price * quantity);
      }, 0).toFixed(2);
    }
  },
  methods: {
    initializeBraintree() {
      fetch('http://localhost:8000/api/braintree/token')
        .then(response => response.json())
        .then(data => {
          if (!data.clientToken) {
            throw new Error('Client token non trovato nella risposta.');
          }
          return braintreeDropin.create({
            authorization: data.clientToken,
            container: '#dropin-container',
          });
        })
        .then(instance => {
          this.dropinInstance = instance;
        })
        .catch(err => {
          console.error('Errore nell\'inizializzazione di Braintree:', err);
        });
    },
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.restaurant = JSON.parse(localStorage.getItem('restaurant')) || null;
    },
    submitOrder() {
  this.dropinInstance.requestPaymentMethod().then(payload => {
    // Simula un pagamento andato a buon fine
    const paymentSuccess = true; // Cambia questa logica in base alla tua implementazione

    if (paymentSuccess) {
      // Svuota il carrello
      localStorage.removeItem('cart'); // Rimuovi il carrello da localStorage
      this.cart = []; // Svuota il carrello nel componente

      // Reindirizza alla pagina di ringraziamento
      this.$router.push({ name: 'thank-you' });
    } else {
      alert('Errore nel completamento dell\'ordine.');
    }
  }).catch(err => {
    console.error('Errore nella richiesta di pagamento:', err);
    alert('Errore nella richiesta di pagamento.');
  });
},
  },
  mounted() {
    this.updateCart(); // Update cart when component mounts
    this.initializeBraintree(); // Initialize Braintree
  },
};
</script>

<style scoped>
.checkout-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.checkout {
  padding: 1rem;
  width: 60rem;
  margin: auto;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-8,
.col-md-4 {
  padding: 10px;
}

.cart-items {
  margin-bottom: 20px;
}

h1,
h2 {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

.custom-checkbox {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.card {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 15px;
  }

  .submit-button {
    width: 100%;
  }
}
</style>