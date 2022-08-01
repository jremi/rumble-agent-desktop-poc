import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';

import applyPrototypes from '@/helpers/applyPrototypes.js';
import '@/styles/app.scss';

import '@/plugins/VWave.js';
import '@/plugins/VueSnotify.js';
import '@/plugins/VueMoment.js';

import App from '@/App.vue';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
applyPrototypes(Vue);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  render: function (h) {
    return h(App);
  }
}).$mount('#app');
