import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '@/views/AppHome.vue'; // Utilizza '@' per referenziare la cartella 'src'
import NotFound from '@/views/NotFound.vue';

const routes = [
    { path: '/', name: 'Home', component: AppHome },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },  // Gestisce tutte le route non definite
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
