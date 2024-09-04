<template>
  <header>
    <h1>Header</h1>
    <!-- Componente Carrello aggiunto qui -->
    <Cart />
  </header>
</template>

<script>
import Cart from './Cart.vue'; 
export default {
  name: 'AppHeader',
  components: {
    Cart 
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  }
}
</script>

<style scoped>
header {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  background-color: #f3f3f3;
  padding: 10px;
}
h1 {
  margin: 0; 
}
</style>
