import { createRouter, createWebHistory } from 'vue-router';

// Importa i tuoi componenti
import AppHome from './Views/AppHome.vue';
import AppAbout from './views/AppAbout.vue';
import AppContact from './views/AppContact.vue';
import Not_found from "./views/Not_found.vue";
import AppMenu from "./views/AppMenu.vue";
import AppTerms from "./Views/AppTerms.vue";
import AppPrivacy from "./Views/AppPrivacy.vue";
import AppCookies from "./Views/AppCookies.vue";
import AppFaq from "./Views/AppFaq.vue";
import Cart from './components/Cart.vue'; // Importa il componente del carrello
import Checkout from './components/checkout.vue'; // Importa il componente del checkout
import AppThanksOrder from './Views/AppThanksOrder.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'AppHome',
            component: AppHome
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome
        },
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
        {
            path: '/restaurants',
            name: 'restaurants',
            component: AppHome
        },
        {
            path: '/restaurant/:slug', //add slug
            name: 'restaurant',
            component: AppMenu
        },
        {
            path: '/terms',
            name: 'terms',
            component: AppTerms
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: AppPrivacy
        },
        {
            path: '/cookies',
            name: 'cookies',
            component: AppCookies
        },
        {
            path: '/FAQ',
            name: 'FAQ',
            component: AppFaq
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/thanks',
            name: 'thanks',
            component: AppThanksOrder
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not_found',
            component: Not_found
        }
    ]
});

export { router };
