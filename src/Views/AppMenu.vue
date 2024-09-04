<script>
import axios from 'axios';

export default {
    name: 'AppMenu',
    data() {
        return {
            base_url: 'http://localhost:8000/',
            restaurant: ''
        }
    },
    mounted() {
        const url = `${this.base_url}api/restaurants/${this.$route.params.id}`
        axios.get(url).then(response => {
            console.log(response.data);
            this.restaurant = response.data.restaurant
        })
    }
}
</script>

<template>
<h1>Menù</h1>
  </template>
  

  <style scoped>
  /* Add your styles here */
  </style>
  