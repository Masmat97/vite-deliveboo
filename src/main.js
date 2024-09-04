// Importa le dipendenze necessarie
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js'; // Controlla che il percorso del router sia corretto
import './style.css'; // Include il file di stile globale

// Crea l'applicazione Vue e configura il router
const app = createApp(App);
app.use(router);
app.mount('#app');
