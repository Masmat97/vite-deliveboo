<script>

import AppHeader from './components/AppHeader.vue';


export default {
  name: 'App',

  components:{
    AppHeader,
    
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
  <router-view/>



</template>

<style scoped></style>
