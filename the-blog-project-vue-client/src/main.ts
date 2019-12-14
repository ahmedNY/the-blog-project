import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex';
// import Loading from 'vue-loading-overlay';

import './registerServiceWorker';
// import 'bootstrap-v4-rtl/dist/css/bootstrap.min.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import 'bootstrap-v4-rtl/dist/js/bootstrap.min.js';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/fonts/arabic-fonts.css';
import './assets/css/styles.css';

// import 'vue-loading-overlay/dist/vue-loading.css';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faBackspace, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
// import VueCurrencyFilter from 'vue-currency-filter';
import PortalVue from 'portal-vue';

// tslint:disable-next-line: no-var-requires
const vueShortKey = require('vue-shortkey');

Vue.use(BootstrapVue);
Vue.use(vueShortKey);
// Vue.use(VueCurrencyFilter,
//   {
//     symbol: 'SDG',
//     thousandsSeparator: ',',
//     fractionCount: 2,
//     fractionSeparator: '.',
//     symbolPosition: 'front',
//     symbolSpacing: true
//   });
// Vue.use(Loading);
// Vue.use(PortalVue);

library.add(faUserSecret);
library.add(faBackspace);
library.add(faPen);
Vue.component('font-awesome-icon', FontAwesomeIcon);


store.dispatch('syncSession');

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
