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
            <input type="number" class="form-control" v-model="quantity" min="1" max="15" ref="quantityInput">
            <div class="input-group-append">
              <button class="btn btn-primary" @click="addToCart(dish, quantity)">+</button>
            </div>
          </div>
        </div>
        <p class="card-text text-start">Ingredienti: <br>{{ dish.ingredient }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { eventBus } from '@/eventBus'; // Assicurati di importare l'eventBus

export default {
  name: 'DishCard',
  props: {
    dish: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      quantity: 1 // Inizializza la quantità a 1
    }
  },
  methods: {
    addToCart(dish) {
      const quantityInput = parseInt(this.$refs.quantityInput.value) || 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Controlla se la quantità è valida
      if (quantityInput < 1 || quantityInput > 15) {
        Swal.fire({
          title: 'Errore',
          text: quantityInput > 15 ? "Quantità massima raggiunta. Non puoi aggiungere più di 15 piatti." : "La quantità deve essere compresa tra 1 e 15.",
          icon: 'error'
        });
        return; // Esci dalla funzione se la quantità non è valida
      }

      // Controlla se il piatto è già nel carrello
      const existingDish = cart.find(item => item.dish && item.dish.id === dish.id);
      if (existingDish) {
        existingDish.quantity += quantityInput; // Incrementa la quantità
      } else {
        cart.push({ dish, quantity: quantityInput }); // Aggiungi il piatto con quantità
      }

      // Salva il carrello nel localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Emetti un evento per notificare che il carrello è stato aggiornato
      eventBus.emit('cart-updated');

      Swal.fire({
        title: 'Aggiunto al Carrello',
        text: `${dish.name} è stato aggiunto al carrello!`,
        icon: 'success'
      });
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