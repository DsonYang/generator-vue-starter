import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'constants';
import 'utils';
import App from './pages/index.vue';
import routes from './routes/index.js';

Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
