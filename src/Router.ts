import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import BlockPage from './views/BlockPage.vue';
import AddressPage from './views/AddressPage.vue';
import TransactionPage from './views/TransactionPage.vue';
import BlockHeightPage from './views/BlockHeightPage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/block/:hash',
            name: 'block',
            component: BlockPage,
        },
        {
            path: '/block-height/:blockNumber',
            name: 'blockHeight',
            component: BlockHeightPage,
        },
        {
            path: '/address/:hash',
            name: 'address',
            component: AddressPage,
        },
        {
            path: '/transaction/:hash',
            name: 'transaction',
            component: TransactionPage,
        },
    ],
});
