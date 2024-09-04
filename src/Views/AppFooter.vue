<script>

import AppHome from '../Views/AppHome.vue';

export default {
    name: "AppFooter",
    components: {

    },
}
</script>

<template>
    <footer>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 bg-dark">

                    <div class="text-white d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column p-2">
                            <a href="">Scopri DeliveBoo</a>
                            <a href="">Chi siamo</a>
                            <a href="">Ristornati</a>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <a href="">Note Legali</a>
                            <a href="">Termini e condizioni</a>
                            <a href="">Informativa sulla privacy</a>
                            <a href="">Cookies</a>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <a href="">Help</a>
                            <a href="">FAQ</a>
                            <a href="">Contatti</a>
                        </div>
                    </div>

                    <div class=" d-flex justify-content-center">
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-square-instagram"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-tiktok"></i>

                    </div>

                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a {
    color: white;
    text-decoration: none;
    transition: font-size 0.2s;
}

a:hover {
    font-size: 20px;
}

i {
    color: white;
    font-size: 2rem;
    padding: 1rem;
}
</style>