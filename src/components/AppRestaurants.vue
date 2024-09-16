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
            filteredRestaurants: '',
            currentPage: 1, // add this to keep track of the current page
            totalPages: 0, // add this to store the total number of pages
            isOpen: false
        }
    },
    mounted() {
        this.getTypes();
        this.getRestaurants();
    },
    methods: {
        getRestaurants() {
            const url = `${this.base_url}api/restaurants?page=${this.currentPage}`
            axios.get(url).then(response => {
                this.restaurants = response.data.restaurants
                this.filteredRestaurants = this.restaurants.data.map(restaurant => ({
                    ...restaurant,
                    slug: restaurant.name.toLowerCase().replace(/\s+/g, '-')
                }))
                this.totalPages = response.data.restaurants.last_page // get the total number of pages
                console.log(response);
            })
        },
        getTypes() {
            axios.get(`${this.base_url}api/types`).then(response => {
                this.types = response.data.types;

            })
        },
        searchRestaurants() {
            const url = `${this.base_url}api/types/restaurant`
            const params = {
                types: this.selectedTypes.map(type => type.name).join(',')
            }

            if (this.selectedTypes.length == 0) {
                this.getRestaurants()
            } else {
                axios.get(url, { params }).then(response => {
                    this.filteredRestaurants = response.data.restaurants
                })
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
                this.searchRestaurants()
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
                this.searchRestaurants()
            }
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">

            <div class="col-xl-2 col-lg-3 col-md-4 mt-5">
                <button type="button" class="btn btn-danger d-md-none" @click="isOpen = !isOpen">
                    <span><i class="fa-solid fa-bars"></i> Filtra</span>
                </button>

                <div class="filter-menu" :class="{ 'd-md-block': true, 'd-none': !isOpen }">
                    <p class="my-3 fw-bold">Filtra per tipologia:</p>
                    <div v-for="type in this.types" :key="type" class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" :id="type" :value="type"
                            v-model="selectedTypes" @change="searchRestaurants">
                        <label class="form-check-label ms-3" :for="type">{{ type.name }}</label>
                    </div>
                </div>
            </div>


            <div class="col-xl-10 col-lg-9 col-md-8 d-flex flex-wrap">
                <div v-for="restaurant in filteredRestaurants" class="col-xl-3 col-lg-3 col-md-6 mt-5">
                    <div class="card mx-3">

                        <div v-if="restaurant.image.startsWith('http')">
                            <img :src="restaurant.image" class="card-img-top" alt="">
                        </div>
                        <div v-else>
                            <img :src="base_url + 'storage/' + restaurant.image" class="card-img-top" alt="">
                        </div>

                        <div class="card-body">

                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                                <a class="my-3 btn btn-danger" href="#" role="button">Visualizza Menù</a>
                            </router-link>

                            <p>
                            <ul class="d-flex gap-3 flex-wrap">
                                <li v-for="type in restaurant.types">{{ type.name }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-center">

                <div class="pagination m-3 d-flex align-items-center gap-3">

                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><span class="page-link" @click="prevPage"><i
                                        class="fa-solid fa-chevron-left"></i></span></li>

                            <li class="page-item"><span class="page-link">Pagina {{ currentPage }} di {{ totalPages
                                    }}</span></li>
                            <li class="page-item"><span class="page-link" @click="nextPage"><i
                                        class="fa-solid fa-chevron-right"></i></span></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 bg-dark d-flex flex-row p-4 mb-5 d-flex justify-content-center">

                <div class="col-xl-3 col-lg-3 col-md-3 text-white d-flex flex-column">
                    <h4>Porta DeliveBoo sempre con te!</h4>
                    <span>Scarica la nostra App per Smartphone</span>
                    <button type="button" class="btn btn-light mt-3 rounded-pill" style="width: 10rem;">
                        <i class="fa-brands fa-google-play me-2"></i>Google Play
                    </button>
                    <button type="button" class="btn btn-light mt-3 rounded-pill" style="width: 10rem;">
                        <i class="fa-brands fa-apple me-2"></i>App Store
                    </button>
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4">

                    <div class="app_store">
                        <img src="../assets/img/app.jpg" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>









</template>

<style scoped>
.card {
    height: 100%;
}

.page-link {
    color: #bb2d3b;
}

img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
}

ul {
    padding: 0;
}

li {
    list-style: none;
}

.filter-menu {
    display: block;
}

.card {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);

    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);

}

.app_store {
    width: 10rem;
    border-radius: 1rem;
}

.pagination {
    justify-content: center;
    margin-top: 20px;
}

.page-link {
    color: #bb2d3b;
    font-size: 18px;
    font-weight: bold;
}

.page-link:hover {
    color: #bb2d3b;
    text-decoration: none;
}
</style>