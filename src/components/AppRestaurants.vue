<script>
import axios from 'axios';

export default {
    name: 'AppRestaurants',

    data() {
        return {
            base_url: 'http://localhost:8000/',
            restaurants: '',
            types: [], // add more types as needed
            selectedTypes: [],
            filteredRestaurants: ''
        }
    },
    mounted() {
        this.getTypes();
        const url = `${this.base_url}api/restaurants`
        axios.get(url).then(response => {
            this.restaurants = response.data.restaurants
            this.filteredRestaurants = this.restaurants.data
            console.log('Ristororanti' + this.restaurants);

        })
    },
    methods: {
        getTypes() {
            axios.get(`${this.base_url}api/types`).then(response => {
                this.types = response.data.types;
                console.log(response.data.types);

            })
        },
        searchRestaurants() {
            const url = `${this.base_url}api/types/restaurant`
            const params = {
                types: this.selectedTypes.map(type => type.name).join(',')
            }
            axios.get(url, { params }).then(response => {
                console.log(response.data); // Add this line
                this.filteredRestaurants = response.data.restaurants
            })
        }
    }
}
</script>
<template>
    <div class="container-fluid mt-10">

        <div class="row">

            <div class="col-2">
                <p>Filtra per tipologia:</p>
                <div v-for="type in this.types" :key="type">
                    <input type="checkbox" :id="type" :value="type" v-model="selectedTypes">
                    <label :for="type">{{ type.name }}</label>
                </div>
                <button @click="searchRestaurants">Cerca</button>
            </div>

            <div class="col-10 d-flex flex-wrap">
                <div v-for="restaurant in filteredRestaurants" class="col-3 mt-5">
                    <div class="card" style="width: 18rem;">

                        <div v-if="restaurant.image.startsWith('http')">
                            <img :src="restaurant.image" class="card-img-top" alt="">
                        </div>
                        <div v-else>
                            <img :src="base_url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                        </div>

                        <div class="card-body">

                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">View
                                Menù</router-link>
                        </div>
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