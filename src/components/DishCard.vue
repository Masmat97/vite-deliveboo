<template>
  <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container h-100" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="dish.image" class="card-img-top img-fluid" alt="Dish image" style="height: 150px; object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h5 class="card-title pb-2">{{ dish.name }}</h5>
      <div class="row">
        <div class="col-6">
          <p class="card-text"><b>Prezzo: €{{ dish.price }}</b></p>
        </div>
        <div class="col-6">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="quantity" min="1" max="15" ref="quantityInput">
            <div class="input-group-append">
              <button class="btn btn-primary" @click="addToCart(dish, quantity)">+</button>
            </div>
          </div>
        </div>
        <p class="card-text text-start">Ingredienti: <br>{{ dish.ingredient }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { eventBus } from '@/eventBus'; // Make sure the eventBus is imported

export default {
  name: 'DishCard',
  props: {
    dish: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      quantity: 1 // Initialize quantity to 1
    };
  },
  methods: {
    addToCart(dish) {
      const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if quantity is valid
      if (quantityInput < 1 || quantityInput > 15) {
        Swal.fire({
          title: 'Errore',
          text: quantityInput > 15 ? "Quantità massima raggiunta. Non puoi aggiungere più di 15 piatti." : "La quantità deve essere compresa tra 1 e 15.",
          icon: 'error'
        });
        return; // Exit if quantity is invalid
      }

      // Check if the dish is already in the cart
      const existingDish = cart.find(item => item.dish && item.dish.id === dish.id);
      if (existingDish) {
        existingDish.quantity += quantityInput; // Increment quantity
      } else {
        cart.push({ dish, quantity: quantityInput }); // Add dish with quantity
      }

      // Save the cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      eventBus.emit('cart-updated'); // Notify that the cart is updated

      Swal.fire({
        title: 'Aggiunto al Carrello',
        text: `${dish.name} è stato aggiunto al carrello!`,
        icon: 'success'
      });
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  min-width: 200px;
}
</style>
