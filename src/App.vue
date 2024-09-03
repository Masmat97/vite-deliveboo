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
  <<<<<<< HEAD <AppHome />
  =======
  <router-view />

  >>>>>>> e7ee8e9bde3a5dc9a04122c41ef3859d94a4c7e7


</template>

<style scoped></style>
