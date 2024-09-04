<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>

<style scoped>
/* Stili globali possono andare qui, e.g., reset di margini e padding */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif; /* Scegli il font che preferisci */
}
</style>
