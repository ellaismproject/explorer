import Vue from 'vue';
import App from './App.vue';
import router from './Router';
import store from './Store';
import './RegisterServiceWorker';
import Buefy from 'buefy';
import moment from 'moment';
import 'buefy/dist/buefy.css';

Vue.prototype.moment = moment;
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
