<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter

  }
};
</script>
<style scoped>
/* Stili globali possono andare qui, e.g., reset di margini e padding */
body,
html {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  /* Scegli il font che preferisci */
}
</style>
