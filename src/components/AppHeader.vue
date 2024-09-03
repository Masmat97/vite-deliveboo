<script>
import axios from 'axios';


export default {
  name: 'hello',

  data() {
    return {
      base_url: 'http://localhost:8000/',
      restaurants: ''
    }
  },
  mounted() {
    const url = `${this.base_url}api/restaurants`
    axios.get(url).then(response => {
      console.log(response.data);
      this.restaurants = response.data.restaurants
      console.log(this.restaurants);

    })
  }
}

</script>

<template>

</template>

<style></style>