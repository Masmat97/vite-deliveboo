<script>
import axios from 'axios';
import DishCard from '../components/DishCard.vue';
import Cart from '../components/Cart.vue';

export default {
    name: 'AppMenu',
    components: {
        DishCard,
        Cart
        
    },
    data() {
        return {
            base_url: 'http://localhost:8000/',
            restaurant: '',
            cart: JSON.parse(localStorage.getItem('cart')) || []
        }
    },
    // ...
    methods: {
       
    },
    mounted() {
    const url = `${this.base_url}api/restaurants/${this.$route.params.slug}`
    axios.get(url).then(response => {
        if (response.data.success) {
            console.log(response.data.restaurants)
            this.restaurant = response.data.restaurants

        } else {
            console.error('Error fetching restaurant data:', response.data.message)
        }
    }).catch(error => {
        console.error('Error fetching restaurant data:', error)
    })

},
    computed: {
        cartItems() {
            return JSON.parse(localStorage.getItem('cart')) || [];
        }
    },
}
</script>

<template>
    <div v-if="this.restaurant">
        <div class="container">
            <div class="row">
                <h1>{{ restaurant.name }}</h1>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div v-if="restaurant.image.startsWith('http')">
                        <img :src="restaurant.image" class="img-fluid" alt="">
                    </div>
                    <div v-else>
                        <img :src="url + 'storage/' + restaurant.image" class="img-fluid" alt="">
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 mt-5">
                    <p>{{ restaurant.address }}</p>
                    <p>
                        <span v-for="type in restaurant.types"> {{ type.name }} &nbsp</span>
                    </p>
                </div>
            </div>
            <hr>
            <div class="row mt-5">
                <div class="col-md-8 col-sm-12 col-xs-12">
                    <!-- Dish list -->
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12 text-center my-3" v-for="dish in this.restaurant.dishes"
                            :key="dish.id">
                            <DishCard :dish="dish" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12">
                    <!-- Cart summary -->
                    <div class="card cart mb-3">

                        <!-- app menu content -->
                        <Cart :cart="cart" :restaurant="restaurant" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (min-width: 669px) and (max-width: 991px) {
    .col-md-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

@media (max-width: 767px) {
    .text-center {
        text-align: center;
        display: flex;
        justify-content: center;
    }
}
</style>