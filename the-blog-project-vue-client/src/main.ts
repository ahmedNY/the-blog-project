import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex';

import './registerServiceWorker';
import 'bootstrap-v4-rtl/dist/css/bootstrap.min.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import 'bootstrap-v4-rtl/dist/js/bootstrap.min.js';

import './assets/fonts/arabic-fonts.css';
import './assets/css/styles.css';

import 'lodash/lodash.js';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import Notifications from 'vue-notification';
Vue.use(Notifications);

import { DateFilterPlugin } from '@/lib/dateFilters';
Vue.use(DateFilterPlugin);

import { NumericalFilterPlugin } from '@/lib/numericFilters';
Vue.use(NumericalFilterPlugin);

// tslint:disable-next-line: no-var-requires
const vueShortKey = require('vue-shortkey');
Vue.use(vueShortKey);

import VueCurrencyFilter from 'vue-currency-filter';
Vue.use(VueCurrencyFilter,
  {
    symbol: 'SDG',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
  });

// tslint:disable-next-line: no-var-requires
const Loading = require('vue-loading-overlay');
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

// this will connect with server and unsure user has valid token
store.dispatch('syncSession');

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
