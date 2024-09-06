<template>
    <div class="cart-container">
      <h2>Il tuo Carrello</h2>
      <div v-if="items.length === 0" class="empty-cart">
        <p>Il carrello è vuoto</p>
      </div>
      <ul v-else>
        <li v-for="item in items" :key="item.id">
          <span>{{ item.name }}</span>
          <span>{{ item.quantity }} x {{ item.price }}€</span>
          <button @click="removeFromCart(item.id)">Rimuovi</button>
        </li>
      </ul>
      <div v-if="items.length > 0" class="cart-footer">
        <p>Totale: {{ total }}€</p>
        <button @click="proceedToCheckout">Procedi al Pagamento</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
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
      removeFromCart(id) {
        this.items = this.items.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(this.items));
      },
      proceedToCheckout() {
        this.$router.push('/checkout');
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
  }
  .empty-cart {
    text-align: center;
    margin-top: 20px;
  }
  .cart-footer {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  