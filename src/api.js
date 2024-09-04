// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Modifica questo con il tuo URL API effettivo
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Includi il token JWT qui se l'autenticazione è necessaria
  }
});

export default api;
