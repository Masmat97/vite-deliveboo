import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './views/AppHome.vue'; // Utilizza '@' per referenziare la cartella 'src'
import NotFound from './views/Not_found.vue';
import AppAbout from './views/AppAbout.vue';
import AppContact from './views/AppContact.vue';
const routes = [
    { path: '/', name: 'Home', component: AppHome },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, 
    {
        path: '/about',
        name: 'about',
        component: AppAbout
    },
    {
        path: '/contact',
        name: 'contact',
        component: AppContact
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
