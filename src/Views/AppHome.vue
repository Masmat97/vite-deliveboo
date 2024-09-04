<script>
import axios from 'axios';
import AppRestaurants from '../components/AppRestaurants.vue';
export default {
  name: "AppHome",
  components: {
    AppRestaurants,
  },
  data() {
    return {
      restaurants: [],
      user: false,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      axios.get('http://localhost:8000/api/restaurants')
        .then(response => {
          this.restaurants = response.data.restaurants;
        })
        .catch(error => {
          console.error('There was an error fetching the restaurants', error);
        });
    }
  }
}
</script>

<template>
  <div>
    <header>
      <img src="#" alt="DeliveBoo Logo" class="logo">
      <input type="search" placeholder="Cerca ristoranti o cibo..." class="search-bar">
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/explore">Esplora</router-link></li>
          <li v-if="user"><router-link to="/orders">Ordini</router-link></li>
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li v-if="!user"><router-link to="/about">About</router-link></li>
          <li v-if="!user"><router-link to="/contact">Contact</router-link></li>


          <li><router-link to="/cart">Carrello</router-link></li>
        </ul>
      </nav>
    </header>
    <!-- <section class="featured-restaurants">
        <h2>Ristoranti del Momento</h2>
        <div class="restaurant-list">
          <div class="restaurant-item" v-for="restaurant in this.restaurants.data" :key="restaurant.id">
            <img :src="restaurant.image" :alt="restaurant.name">
            <div>
              <h3>{{ restaurant.name }}</h3>
              <p>{{ restaurant.description }}</p>
              <span class="rating">{{ restaurant.rating }}</span>
            </div>
          </div>
        </div>
      </section> -->

    <AppRestaurants />

  </div>
</template>


<style scoped>
/* Add your styles here */
</style>