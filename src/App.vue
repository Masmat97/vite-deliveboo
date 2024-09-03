<script>
import AppHeader from './components/AppHeader.vue';
import AppHome from './views/AppHome.vue';


export default {
  name: 'App',
  components: {
    AppHeader,
    AppHome
  },

  data() {
    return {

    }
  },


  mounted() {


  }


};

</script>


<template>

  <AppHeader />
  <router-view />



</template>

<style scoped></style>
