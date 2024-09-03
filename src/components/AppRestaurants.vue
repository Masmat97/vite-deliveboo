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
            <div v-for="restaurant in this.restaurants.data" class="col-3 mt-5">
                <div class="card" style="width: 18rem;">

                    <div v-if="restaurant.image.startsWith('http')">
                        <img :src="restaurant.image" class="card-img-top" alt="">
                    </div>
                    <div v-else>
                        <img :src="url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                    </div>

                    <div class="card-body">

                        <h5 class="card-title">{{ restaurant.name }}</h5>
                        <a href="#" class="btn btn-primary">Visualizza il menu</a>

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