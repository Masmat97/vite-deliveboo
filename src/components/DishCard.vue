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
  <li>
    <ul>
      {{ dish.name }}
    </ul>
  </li>
  <img :src="dish.image">
</template>

<style scoped></style>