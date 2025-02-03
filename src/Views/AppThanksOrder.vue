<template>
  <div>
    <div class="container d-flex flex-column justify-content-center align-items-center" v-if="!isLoading">
      <div class="col-12 col-md-8 text-center">
          <h1 id="order-message">Ordine Effettuato!</h1>
          <p>Grazie per il tuo acquisto. Riceverai un'email di conferma a breve.</p>
          <p class="redirect-message">Verrai reindirizzato alla home page in pochi secondi...</p>
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-center">
        <div class="spinner"></div>      
      </div>
    </div>

    <div class="loading-screen" v-if="isLoading">
      <div class="loading-content">
        <p>Loading</p>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppThanksOrder",
  data() {
    return {
      isLoading: false, 
    };
  },
  mounted() {
      // Scorri all'inizio della pagina
      window.scrollTo(0, 0);

      // Mostra la pagina di ringraziamento per 5 secondi
      setTimeout(() => {
          this.isLoading = true; // Mostra il loading screen
          
          // Reindirizza alla home dopo un periodo di caricamento
          setTimeout(() => {
              this.$router.push({ name: 'home' }); // Reindirizza alla home
          }, 3000); // Tempo di attesa di 3 secondi per il loading screen
      }, 5000); // Tempo di attesa di 5 secondi per la pagina di ringraziamento
  }
}
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; 
    color: #333; 
    text-align: center;
    height: 100%;
}

.container {
    width: 80%;
    max-width: 100rem; 
    margin: 20px auto;
    padding: 1rem;
    background-color: #fff; 
    border-radius: 8px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

h1 {
    padding: 1rem 0;
    font-size: 1.5rem; 
    color: #fe1c1ccc;
    animation: fade-in 1s ease-in-out;
}

.loading-screen {
    position: fixed; /* Fissa l'overlay */
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Usa 100vh per coprire l'intera altezza della finestra */
    background-color: rgba(255, 255, 255, 0.8); /* Sfondo bianco semi-trasparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Assicurati che l'overlay sia sopra gli altri elementi */
}

.loading-content {
    text-align: center;
}

.spinner {
    width: 4rem; /* Aumenta la larghezza dello spinner */
    height: 4rem; /* Aumenta l'altezza dello spinner */
    border: 0.5rem solid #ccc; /* Colore del bordo */
    border-top: 0.5rem solid #fe1c1ccc; /* Colore del bordo superiore */
    border-radius: 50%;
    animation: spin 0.8s linear infinite; /* Aumenta la velocità dell'animazione */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loading-dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.loading-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #bb2d3b; /* or any other color you prefer */
    margin: 0 5px;
    animation: loading-dot 1.5s infinite;
}

.loading-dots span:nth-child(1) {
    animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
    animation-delay: 0.5s;
}

.loading-dots span:nth-child(3) {
    animation-delay: 1s;
}

@keyframes loading-dot {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 1.5rem; 
    }

    p {
        font-size: 0.8rem;
    }
}
</style>