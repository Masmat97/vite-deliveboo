<script>
import axios from 'axios';

export default {
  name: 'DishCard',
  props: ['dish'],
  data() {
    return {
      urlImage: "https://image.tmdb.org/t/p/w1280",
    }
  },
  methods: {
    getImgUrl(path) {
      return this.urlImage + path;
    }
  }
}
</script>

<template>
  <div class="card mb-3" style="width: 18rem;" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container h-100" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="dish.image" class="card-img-top img-fluid" alt="Dish image" style="height: 150px; object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">Prezzo: {{ dish.price }} €</p>
      <div class="input-group mb-3">
        <input type="number" class="form-control" value="1" min="1" max="10">
        <div class="input-group-append">
          <button class="btn btn-primary">Aggiungi al carrello</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>