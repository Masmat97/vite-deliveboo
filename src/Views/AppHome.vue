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
            <li><router-link to="/cart">Carrello</router-link></li>
          </ul>
        </nav>
      </header>
      <section class="featured-restaurants">
        <h2>Ristoranti del Momento</h2>
        <div class="restaurant-list">
          <div class="restaurant-item" v-for="restaurant in restaurants" :key="restaurant.id">
            <img :src="restaurant.image" :alt="restaurant.name">
            <div>
              <h3>{{ restaurant.name }}</h3>
              <p>{{ restaurant.description }}</p>
              <span class="rating">{{ restaurant.rating }}</span>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>© 2024 DeliveBoo. Tutti i diritti riservati.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AppHome',
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
            this.restaurants = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the restaurants', error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  