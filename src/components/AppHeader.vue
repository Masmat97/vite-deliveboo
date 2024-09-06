<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <img class="logo" src="../assets/img/logo_deliveboo.png" alt="">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item"><router-link to="/">Home</router-link></li>
          <li class="nav-item"><router-link to="/orders">Ordini</router-link></li>
          <li class="nav-item"><a href="http://127.0.0.1:8000/login">Login</a></li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0">
          <li>
            <router-link to="/cart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span v-if="isCartEmpty">Il carrello è vuoto</span>
              <span v-else>
                Carrello <span class="cart-item-count">{{ cartItemCount }}</span>
              </span>
            </router-link>
          </li>
          <li>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search">
            </form>
          </li>
        </ul>

      </div>

    </div>
  </nav>
</template>

<script>
import { eventBus } from '../eventBus'; // Assicurati che il percorso sia corretto

export default {
  name: 'AppHeader',
  data() {
    return {
      cartItemCount: 0,
      isCartEmpty: true,
    };
  },
  mounted() {
    this.updateCartItemCount();
    eventBus.on('cartUpdated', this.updateCartItemCount);
  },
  beforeDestroy() {
    eventBus.off('cartUpdated', this.updateCartItemCount);
  },
  methods: {
    updateCartItemCount() {
      // Ottieni il carrello dal localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
      this.isCartEmpty = this.cartItemCount === 0;
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.nav-item {
  list-style-type: none;
  padding-left: 2rem;
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
  height: 10rem;
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

.navbar ul {
  list-style: none;
  display: flex;
}

.navbar ul li {
  margin: 0 15px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.cart-item-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 5px;
  margin-left: 5px;
  font-size: 14px;
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
