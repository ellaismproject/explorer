import Vue from 'vue';
import App from '@/App.vue';
import Router from '@/Router';
import Store from '@/Store';
import './RegisterServiceWorker';
import VueMeta from 'vue-meta';
import i18n from '@/plugins/i18n';
import Buefy from 'buefy';
import moment from 'moment';

Vue.prototype.moment = moment;
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true,
});
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
    i18n,
    router: Router,
    store: Store,
    render: (h) => h(App),
}).$mount('#app');
