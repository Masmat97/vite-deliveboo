<script>
import axios from 'axios';


export default {
    name: 'AppRestaurants',

    data() {
        return {
            base_url: 'http://localhost:8000/',
            restaurants: ''
        }
    },
    mounted() {
        const url = `${this.base_url}api/restaurants`
        axios.get(url).then(response => {
            console.log(response.data);
            this.restaurants = response.data.restaurants
            console.log(this.restaurants);

        })
    }
}

</script>

<template>
    <div class="container">
        <div class="row">

            <div v-for="restaurant in this.restaurants.data">

                <div class="card" style="width: 18rem;">

                    <div class="card-body">
                        <p class="card-text">
                            {{ restaurant.name }}
                        <div v-if="restaurant.image.startsWith('http')">

                            <img :src="restaurant.image" class="card-img-top" alt="">
                        </div>
                        <div v-else>

                            <img :src="url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                        </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>