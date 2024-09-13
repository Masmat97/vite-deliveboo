<script>
import { eventBus } from '@/eventBus';

export default {
  name: 'AppHeader',
  data() {
    return {
      cartItemCount: 0,
      isCartEmpty: true,
      isOpen: false,
      restaurant: null, // add a data property to store the restaurant

    };
  },
  mounted() {
    this.updateCartItemCount();
    this.restaurant = JSON.parse(localStorage.getItem('restaurant')); // retrieve the restaurant from local storage
    console.log("header",this.restaurant)
    eventBus.on('cart-updated', this.updateCartItemCount);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCartItemCount);
  },
  methods: {
    updateCartItemCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
      this.isCartEmpty = this.cartItemCount === 0;
    }
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">

      <img class="logo" src="../assets/img/logo_deliveboo.png" alt="">



      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="menu-mobile  d-flex justify-content-between">

            <div>
              <span class="nav-item"><router-link to="/">Home</router-link></span>
              <!-- <span class="nav-item"><router-link to="/orders">Ordini</router-link></span> -->
            </div>
            <div>
              <span class="nav-item">
  <router-link to="/cart" :restaurant="this.restaurant">
    <i class="fa-solid fa-cart-shopping" style="font-size: 1.5rem;"></i>
    <span v-if="isCartEmpty"></span>
    <span v-else>
      Carrello <span class="cart-item-count">{{ cartItemCount }}</span>
    </span>
  </router-link>
</span>
            </div>
            <div>
              <span class="nav-item"><a href="http://127.0.0.1:8000/login">Accedi</a></span>
              <span class="nav-item"><a href="http://localhost:8000/register">Registrati</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>



</template>


<style scoped>
nav {
  height: 10rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

a {
  padding: 0 1rem;
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.logo {
  width: 7rem;
}

img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/img/pasta.png');
  background-size: cover;
  background-position: center;
  animation: backgroundChange 8s infinite;
  transition: background-image 0.5s ease-in-out;
  border-bottom: 2px white solid;
}

.cart-item-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 5px;
  margin-left: 5px;
  font-size: 14px;
}

.menu-mobile {
  background-color: rgba(197, 17, 7, 0.5);
  border-radius: 1rem;
  padding: 1rem;
}

button {
  color: #bb2d3b;
  border-color: #bb2d3b;
}

@keyframes backgroundChange {
  0% {
    background-image: url('../assets/img/pasta.png');
  }

  25% {
    background-image: url('../assets/img/pizza.png');
  }

  50% {
    background-image: url('../assets/img/pollo.png');
  }

  75% {
    background-image: url('../assets/img/sushi.png');
  }

  100% {
    background-image: url('../assets/img/pasta.png');
  }

}
</style>
