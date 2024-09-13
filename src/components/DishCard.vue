<template>
  <div class="card" :style="{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }">
    <div class="img-container h-100" :style="{ borderRadius: '10px 10px 0 0' }">
      <img :src="dish.image" class="card-img-top img-fluid" alt="Dish image"
        style="height: 150px; object-fit: cover; border-radius: 10px 10px 0 0;">
    </div>
    <div class="card-body">
      <h5 class="card-title pb-2">{{ dish.name }}</h5>
      <div class="row">
        <div class="col-6">
          <p class="card-text"><b>Prezzo: €{{ dish.price }}</b></p>
        </div>
        <div class="col-6">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="quantity" min="1" max="10" ref="quantityInput">
            <div class="input-group-append">
              <button class="btn btn-primary" @click="addToCart(dish, quantity)">+</button>
            </div>
          </div>
        </div>
        <p class="card-text text-start">Ingredienti: <br>{{ dish.ingredient }}</p>
      </div>
    </div>
  </div>
  <!-- confirm box -->
  <div id="confirm" style="display: none;">
    <p id="confirm-message"></p>
    <button class="m-1 btn btn-primary" id="yes-button">Sì</button>
    <button class="m-1 btn btn-secondary" id="no-button">No</button>
  </div>
  <!-- alert -->
  <div id="info" style="display: none;">
    <p id="info-message"></p>
    <button class="m-1 btn btn-primary" id="okey-button">Chiudi</button>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';

export default {
  name: 'DishCard',
  props: ['dish'],
  data() {
    return {
      quantity: 1 // Inizializza la quantità a 1
    }
  },
  methods: {
    addToCart(dish, quantity) {
      const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (quantityInput < 1 || quantityInput > 15) {
    const message = quantityInput > 15 ? "Quantità massima raggiunta. Non puoi aggiungere più di 15 piatti." : "La quantità deve essere compresa tra 1 e 15.";

    // Display the error message in a custom alert box
    const confirmBox = document.getElementById("info");
    document.getElementById("info-message").innerText = message;
    confirmBox.style.display = "block";

    // Add an event listener to the close button
    const closeButton = document.getElementById("okey-button");
    closeButton.addEventListener("click", function() {
      confirmBox.style.display = "none";
    }.bind(this));

    return;
  }

      // Check if the cart is empty
      if (cart.length === 0) {
        // If empty, add the dish to the cart and set the restaurant ID
        cart.push({
          dish: dish,
          quantity: quantityInput
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        eventBus.emit('cart-updated');
      } else {
        // If not empty, check if the dish is from the same restaurant as the first dish
        const firstDish = cart[0].dish;
        if (dish.restaurant_id === firstDish.restaurant_id) {
          // If same restaurant, add the dish to the cart
          const existingDish = cart.find(item => item.dish.id === dish.id);
          if (existingDish) {
            existingDish.quantity += quantityInput;
          } else {
            cart.push({
              dish: dish,
              quantity: quantityInput
            });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          eventBus.emit('cart-updated');
        } else {
          // If not same restaurant, display a confirmation alert
          const confirmBox = document.getElementById("confirm");
          const message = "Sei sicuro di voler cambiare ristorante? Il carrello precedente sarà svuotato.";
          document.getElementById("confirm-message").innerText = message;

          const yesButton = document.getElementById("yes-button");
          const noButton = document.getElementById("no-button");

          yesButton.addEventListener("click", function () {
            // Clear the cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');

            // Add the new dish to the cart
            cart.push({
              dish: dish,
              quantity: quantityInput
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            eventBus.emit('cart-updated');
            confirmBox.style.display = "none";
          }.bind(this));

          noButton.addEventListener("click", function () {
            confirmBox.style.display = "none";
          });

          confirmBox.style.display = "block";
        }
      }
    },
  }
}

</script>

<style scoped>
.card {
  width: 100%;
  width: 100%;
  min-width: 200px;
  /* adjust this value to your liking */
  height: 100%;
}

#confirm,
#info {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  border: 1px solid #fe1c1c;
  padding: 20px;
  display: none;
  border-radius: 1rem;
}

#confirm-message,
#info-message {
  font-size: 18px;
  margin-bottom: 20px;
}

#yes-button,
#no-button,
#okey-button {
  background-color: #fe1c1c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#yes-button:hover,
#no-button:hover,
#okey-button:hover {
  background-color: #d110108f;
}
</style>
