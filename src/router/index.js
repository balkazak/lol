import Vue from 'vue'
import VueRouter from 'vue-router'
import profile from '../views/profile.vue'
import authPage from '../views/auth-page.vue'
import stats from '../views/stats.vue'
import cards from '../views/card-page.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'authPage',
        component: authPage
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile
    },
    {
        path: '/stats',
        name: 'stats',
        component: stats
    },
    {
        path: '/cards',
        name: 'cards',
        component: cards
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router