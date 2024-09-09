<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <div v-if="cart.length === 0" class="empty-checkout">
      <p>Il carrello è vuoto</p>
      <router-link to="/cart">Torna al Carrello</router-link>
    </div>
    <form v-else @submit.prevent="submitOrder">
      <ul>
        <li v-for="item in cart" :key="item.dish.id">
          <span>{{ item.dish.name }}</span>
          <span>{{ item.quantity }} x {{ item.dish.price }}€</span>
        </li>
      </ul>
      <div class="checkout-footer">
        <p>Totale: {{ totalOrderAmount }}€</p>
        <button class="btn btn-primary mt-auto" type="submit">Paga</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  computed: {
    cart() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    },
    totalOrderAmount() {
    return this.cart.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0).toFixed(2);
  }
  },
  methods: {
    submitOrder() {
      // In futuro: aggiungere logica per inoltrare l'ordine a Braintree o ad altro servizio di pagamento
      alert('Il pagamento è stato effettuato!');
      localStorage.removeItem('cart');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.checkout-container {
  padding: 20px;
  max-width: 800px; /* added max-width for responsiveness */
  margin: 0 auto; /* added margin for centering */
}

.empty-checkout {
  text-align: center;
  margin-top: 20px;
}

.checkout-footer {
  margin-top: 20px;
  text-align: right;
}

/* Media queries for responsiveness */

/* Small screens (max-width: 767px) */
@media (max-width: 767px) {
  .checkout-container {
    padding: 10px;
  }
  .empty-checkout {
    margin-top: 10px;
  }
  .checkout-footer {
    margin-top: 10px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .checkout-container {
    padding: 15px;
  }
  .empty-checkout {
    margin-top: 15px;
  }
  .checkout-footer {
    margin-top: 15px;
  }
}

/* Large screens (min-width: 992px) */
@media (min-width: 992px) {
  .checkout-container {
    padding: 20px;
  }
  .empty-checkout {
    margin-top: 20px;
  }
  .checkout-footer {
    margin-top: 20px;
  }
}
</style>