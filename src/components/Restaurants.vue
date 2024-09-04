<!-- src/components/Restaurants.vue -->
<template>
    <div>
      <h1>Ristoranti</h1>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        restaurants: []
      };
    },
    created() {
      this.fetchRestaurants();
    },
    methods: {
      fetchRestaurants() {
        api.get('/restaurants')
          .then(response => {
            this.restaurants = response.data;
          })
          .catch(error => {
            console.error('Error fetching restaurants:', error);
          });
      }
    }
  }
  </script>
  