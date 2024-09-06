// import { createRouter, createWebHistory } from 'vue-router';
// import AppHome from './views/AppHome.vue'; // Utilizza '@' per referenziare la cartella 'src'
// import NotFound from './views/Not_found.vue';
// import AppAbout from './views/AppAbout.vue';
// import AppContact from './views/AppContact.vue';

// const routes = [
//     { path: '/', name: 'Home', component: AppHome },
//     { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, 
//     { path: '/about', name: 'about', component: AppAbout },
//     { path: '/contact', name: 'contact', component: AppContact },



// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";

import AppHome from './Views/AppHome.vue';
import AppAbout from './views/AppAbout.vue';
import AppContact from './views/AppContact.vue';
import Not_found from "./views/Not_found.vue";
import AppRestaurants from "./components/AppRestaurants.vue";
import AppMenu from "./views/AppMenu.vue";
import AppTerms from "./Views/AppTerms.vue";
import AppPrivacy from "./Views/AppPrivacy.vue";
import AppCookies from "./Views/AppCookies.vue";
import AppFaq from "./Views/AppFaq.vue";

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
            // path: '/:pathMatch(.)',
            path: '/:pathMatch(.)',
            name: 'not_found',
            component: Not_found
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: AppHome
        }, {
            path: '/restaurant/:name',
            name: 'restaurant',
            component: AppMenu
        }, {
            path: '/terms',
            name: 'terms',
            component: AppTerms
        }, {
            path: '/privacy',
            name: 'privacy',
            component: AppPrivacy
        }, {
            path: '/cookies',
            name: 'cookies',
            component: AppCookies
        }, {
            path: '/FAQ',
            name: 'FAQ',
            component: AppFaq
        },


    ]

});

export { router };

