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
        addToCart(dish, quantity) {
            console.log('Adding to cart:', dish, quantity);
            const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingDish = cart.find(item => item.dish.id === dish.id);

            if (existingDish) {
                existingDish.quantity += quantityInput;
            } else {
                cart.push({
                    dish: dish, // Add the entire dish object to the cart item
                    quantity: quantityInput
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated'); // Notifica dell'aggiornamento
        }
        ,
        // ...
    },
    beforeRouteLeave(to, from, next) {
        if (this.cart.length > 0 && to.name !== 'checkout') {
            const answer = window.confirm('Sei sicuro? Se non procedi con il checkout il carrello sarà svuotato');
            if (answer) {
                localStorage.removeItem('cart');
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    },
    mounted() {
        const url = `${this.base_url}api/restaurants/${this.$route.params.name}`
        axios.get(url).then(response => {
            this.restaurant = response.data.restaurants
            console.log('Restaurant data:', this.restaurant)
        }).catch(error => {
            console.error('Error fetching restaurant data:', error)
        })
    },
    computed: {
        cartItems() {
            return JSON.parse(localStorage.getItem('cart')) || [];
        },
        totalOrderAmount() {
            return this.cartItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0).toFixed(2);
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
                        <Cart :cart="cart" />
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