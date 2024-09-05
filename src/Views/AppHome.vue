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

    <AppRestaurants />

  </div>
</template>


<style scoped>
/* Add your styles here */
</style>