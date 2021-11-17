import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router';
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import 'sweetalert2/dist/sweetalert2.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { index } from './components/index';
import 'vue-search-select/dist/VueSearchSelect.css';

import { routes } from './router/routes';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import ScrollLoader from 'vue-scroll-loader'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'
import VueDataTables from 'vue-data-tables'

import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
Vue.use(VueSweetalert2);
Vue.use(SweetModal);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI, { locale })
Vue.use(ScrollLoader)
Vue.use(VueDataTables)

const allRoutes = Array.prototype.concat(
  routes
);

Vue.use('multiselect', Multiselect);
// Router
Vue.use(VueRouter,BootstrapVue,IconsPlugin);
const router = new VueRouter({
    routes: allRoutes,
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    mode: 'hash'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App }
})
