import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate);
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyAa8z6oEtxPj1E6-z1E0paZF5_ygxsTHoo',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
