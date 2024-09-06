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

<template>
  <div id="app">

    <body>
      <AppHeader />
      <div class="general-container">
        <router-view />
      </div>
      <AppFooter />
    </body>
  </div>
</template>


<style scoped>
/* Stili globali possono andare qui, e.g., reset di margini e padding */

html {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  /* Scegli il font che preferisci */
}

.general-container {
  min-height: 100vh;
  margin-top: 10rem;
}
</style>
