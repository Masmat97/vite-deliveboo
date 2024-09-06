<template>
  <div class="card mb-3" style="width: 18rem;" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container h-100" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="dish.image" class="card-img-top img-fluid" alt="Dish image" style="height: 150px; object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">Prezzo: {{ dish.price }} €</p>
      <div class="input-group mb-3">
        <input type="number" class="form-control" ref="quantityInput" value="1" min="1" max="10">
        <div class="input-group-append">
          <button class="btn btn-primary" @click="addToCart">Aggiungi al carrello</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DishCard',
  props: ['dish'],
  data() {
    return {
      quantity: 1 // Inizializza la quantità a 1
    }
  },
  methods: {
    addToCart() {
      const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingDish = cart.find(item => item.id === this.dish.id);

      if (existingDish) {
        existingDish.quantity += quantityInput;
      } else {
        cart.push({
          id: this.dish.id,
          name: this.dish.name,
          price: this.dish.price,
          quantity: quantityInput
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${this.dish.name} è stato aggiunto al carrello.`);
    }
  }
}
</script>

<style scoped></style>
