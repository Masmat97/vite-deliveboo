<template>
    <div class="checkout-container">
      <h2>Checkout</h2>
      <div v-if="items.length === 0" class="empty-checkout">
        <p>Il carrello è vuoto</p>
        <router-link to="/cart">Torna al Carrello</router-link>
      </div>
      <form v-else @submit.prevent="submitOrder">
        <ul>
          <li v-for="item in items" :key="item.id">
            <span>{{ item.name }}</span>
            <span>{{ item.quantity }} x {{ item.price }}€</span>
          </li>
        </ul>
        <div class="checkout-footer">
          <p>Totale: {{ total }}€</p>
          <button type="submit">Paga</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Checkout',
    data() {
      return {
        items: JSON.parse(localStorage.getItem('cart')) || [],
      };
    },
    computed: {
      total() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      },
    },
    methods: {
      submitOrder() {
        // In futuro: aggiungere logica per inoltrare l'ordine a Braintree o ad altro servizio di pagamento
        alert('Il pagamento è stato effettuato!');
        localStorage.removeItem('cart');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout-container {
    padding: 20px;
  }
  .empty-checkout {
    text-align: center;
    margin-top: 20px;
  }
  .checkout-footer {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  