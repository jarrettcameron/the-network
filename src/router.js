import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
    return () => import(`./pages/${page}.vue`)
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: loadPage('HomePage')
    },
    {
        path: '/profile/:profileId',
        name: 'Profile',
        component: loadPage('ProfilePage')
    },
    {
        path: '/search/:query',
        name: 'Search',
        component: loadPage('SearchPage')
    },
    {
        path: '/edit-profile',
        name: 'Edit Profile',
        component: loadPage('EditProfilePage')
    },
    {
        path: '/account',
        name: 'Account',
        component: loadPage('AccountPage'),
        beforeEnter: authGuard
    }
]

export const router = createRouter({
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    history: createWebHistory(),
    routes
})
