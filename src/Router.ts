import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "homepage" */ '@/views/HomePage.vue'),
        },
        {
            path: '/block/:hash',
            name: 'block',
            component: () => import(/* webpackChunkName: "blockpage" */ '@/views/BlockPage.vue'),
        },
        {
            path: '/block-height/:blockNumber',
            name: 'blockHeight',
            component: () => import(/* webpackChunkName: "blockheightpage" */ '@/views/BlockHeightPage.vue'),
        },
        {
            path: '/addr/:hash',
            redirect: '/address/:hash',
        },
        {
            path: '/address/:hash',
            name: 'address',
            component: () => import(/* webpackChunkName: "addresspage" */ '@/views/AddressPage.vue'),
        },
        {
            path: '/transaction/:hash',
            name: 'transaction',
            component: () => import(/* webpackChunkName: "transactionpage" */ '@/views/TransactionPage.vue'),
        },
        {
            path: '/tx/:hash',
            redirect: '/tx/:hash',
        },
        {
            path: '/richest',
            name: 'richest',
            component: () => import(/* webpackChunkName: "richestpage" */ '@/views/RichestPage.vue'),
        },
        {
            path: '*',
            component: () => import(/* webpackChunkName: "notfound" */ './views/Error404Page.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
});
