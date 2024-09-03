<script>
import AppHeader from './components/AppHeader.vue';
import AppHome from './views/AppHome.vue';



export default {
  name: 'App',
  components: {
    AppHeader,
    AppHome
  },

}

</script>


<template>

  <AppHeader />
  <AppHome />


</template>

<style scoped></style>
