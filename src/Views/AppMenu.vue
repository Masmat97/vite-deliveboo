<script>
import axios from 'axios';
import DishCard from '../components/DishCard.vue';

export default {
    name: 'AppMenu',
    components: {
        DishCard
    },
    data() {
        return {
            base_url: 'http://localhost:8000/',
            restaurant: ''
        }
    },
    mounted() {
        const url = `${this.base_url}api/restaurants/${this.$route.params.name}`
        axios.get(url).then(response => {
            this.restaurant = response.data.restaurants
            console.log(this.restaurant);
        })
    }
}
</script>

<template>
    <div v-if="this.restaurant">
        <div class="container">
            <div class="row">
                <div class="col-8">
                    <h1>{{ restaurant.name }}</h1>
                </div>
                <div class="col-8">
                    <div v-if="restaurant.image.startsWith('http')">
                        <img :src="restaurant.image" class="card-img-top" alt="">
                    </div>
                    <div v-else>
                        <img :src="url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                    </div>
                </div>
                <div>
                    <DishCard v-for="dish in this.restaurant.dishes" :dish="dish" />
                </div>
                <div v-for="type in this.restaurant.types">
                    tipologia: {{ type.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>