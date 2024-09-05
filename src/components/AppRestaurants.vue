<script>
import axios from 'axios';

export default {
name: 'AppRestaurants',

data() {
    return {
        base_url: 'http://localhost:8000/',
        restaurants: '',
        searchType: '',
        filteredRestaurants: ''
     }
},
 mounted() {
        const url = `${this.base_url}api/restaurants`
        axios.get(url).then(response => {
            console.log(response.data);
            this.restaurants = response.data.restaurants
            this.filteredRestaurants = this.restaurants.data
            console.log(this.restaurants);

        })
    },
methods: {
    searchRestaurants() {
        const url = `${this.base_url}api/types/restaurant/${this.searchType}`
        axios.get(url).then(response => {
            console.log(response.data);
            this.filteredRestaurants = response.data.restaurants
        })
     }
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <input type="text" v-model="searchType" placeholder="Cerca per tipo">
                <button @click="searchRestaurants">Cerca</button>
            </div>
        </div>
        <div class="row">
            <div v-for="restaurant in filteredRestaurants" class="col-3 mt-5">
                <div class="card" style="width: 18rem;">

                    <div v-if="restaurant.image.startsWith('http')">
                        <img :src="restaurant.image" class="card-img-top" alt="">
                    </div>
                    <div v-else>
                        <img :src="url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                    </div>

                    <div class="card-body">

                        <h5 class="card-title">{{ restaurant.name }}</h5>
                        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">View Menù</router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
}
</style>