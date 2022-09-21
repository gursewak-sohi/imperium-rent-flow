import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation);

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
Vue.use(VueMoment, {
  moment,
})




import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

  Vue.use(VueViewer)

import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCBzyGIOhn0qY_r7YQ9mdnXWvcb1lKicaw",
    libraries: "places"
  }
});

import Dialog from 'vue-dialog-loading'
Vue.use(Dialog, {
 dialogBtnColor: '#0f0'
})

import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);







Vue.use(VueToast);


Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console);
const apiUrl = 'ghgff';

new Vue({
  el: '#app',
  router,
  store,
  icons,
  apiUrl,
  template: '<App/>',
  components: {
    App
  }
})
