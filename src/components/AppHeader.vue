<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <img class="logo" src="../assets/img/logo_deliveboo.png" alt="">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <div class="menu-mobile d-flex justify-content-between">
              <div>
                <span class="nav-item">
                  <router-link to="/" @click="showLoadingScreen('home', $event)">
                    <i class="fa-solid fa-house"style="font-size: 1.5rem;"></i>
                  </router-link>
                </span>

                <span class="nav-item">
                  <router-link to="/cart" @click="showLoadingScreen('cart', $event)">
                    <i class="fa-solid fa-cart-shopping" style="font-size: 1.5rem;"></i>
                    <span v-if="isCartEmpty"></span>
                    <span v-else>
                      Carrello <span class="cart-item-count">{{ cartItemCount }}</span>
                    </span>
                  </router-link>
                </span>
              </div>
              <div>
                <!-- <span class="nav-item"><a href="http://127.0.0.1:8000/login">Accedi</a></span>
                <span class="nav-item"><a href="http://localhost:8000/register">Registrati</a></span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <LoadingScreen v-if="loading" />
  </div>
</template>

<script>
import { eventBus } from '@/eventBus'; 
import LoadingScreen from './LoadingScreen.vue'; 

export default {
  name: 'AppHeader',
  components: {
    LoadingScreen
  },
  data() {
    return {
      cartItemCount: 0,
      isCartEmpty: true,
      loading: false,
    };
  },
  mounted() {
    this.updateCartItemCount();
    eventBus.on('cart-updated', this.updateCartItemCount);
  },
  beforeDestroy() {
    eventBus.off('cart-updated', this.updateCartItemCount);
  },
  methods: {
    updateCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart from localStorage:', cart); // Debugging

    // Ensure that each item has a valid quantity field, default to 1 if not available
    this.cartItemCount = cart.reduce((total, item) => {
      // Make sure to assign a quantity if it's missing
      const quantity = Number(item.quantity) || 1;  // Default to 1 if quantity is missing or invalid
      console.log('Item:', item, 'Quantity:', quantity); // Log individual items for debugging
      return total + quantity;  // Add the quantity to the total
    }, 0);

    console.log('Total Item Count:', this.cartItemCount); // Log total count for debugging
    this.isCartEmpty = this.cartItemCount === 0;  // Check if the cart is empty
  },
    showLoadingScreen(type, event) {
      event.preventDefault();
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (type === 'home') {
          this.$router.push({ name: 'home' });
        } else if (type === 'cart') {
          this.$router.push({ name: 'cart' });
        }
      }, 1500);
    },
  }
};
</script>

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
