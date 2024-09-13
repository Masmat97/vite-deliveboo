<template>
  <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container h-100" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="dish.image" class="card-img-top img-fluid" alt="Dish image"
        style="height: 150px; object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">Prezzo: {{ dish.price }} €</p>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="quantity" min="1" max="10" ref="quantityInput">
        <div class="input-group-append">
          <button class="btn btn-primary" @click="addToCart(dish, quantity)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';

export default {
  name: 'DishCard',
  props: ['dish'],
  data() {
    return {
      quantity: 1 // Inizializza la quantità a 1
    }
  },
  methods: {
    addToCart(dish, quantity) {
      console.log('Adding to cart:', dish, quantity);

      const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if the cart is empty
      if (cart.length === 0) {
        // If empty, add the dish to the cart and set the restaurant ID
        cart.push({
          dish: dish,
          quantity: quantityInput
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        eventBus.emit('cart-updated');
      } else {
        // If not empty, check if the dish is from the same restaurant as the first dish
        const firstDish = cart[0].dish;
        if (dish.restaurant_id === firstDish.restaurant_id) {
          // If same restaurant, add the dish to the cart
          const existingDish = cart.find(item => item.dish.id === dish.id);
          if (existingDish) {
            existingDish.quantity += quantityInput;
          } else {
            cart.push({
              dish: dish,
              quantity: quantityInput
            });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          eventBus.emit('cart-updated');
        } else {
          // If not same restaurant, display a confirmation alert
          const confirmClearCart = confirm("Sei sicuro di voler cambiare ristorante? Il carrello precedente sarà svuotato.");
          if (confirmClearCart) {
            // Clear the cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');

            // Add the new dish to the cart
            cart.push({
              dish: dish,
              quantity: quantityInput
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');
          } else {
            // If user cancels, do nothing
            console.log('Cart change cancelled');
          }
        }
      }
    }
  }
}

</script>

<style scoped>
.card {
  width: 100%;
  width: 100%;
  min-width: 200px;
  /* adjust this value to your liking */
  height: 100%;
}
</style>
