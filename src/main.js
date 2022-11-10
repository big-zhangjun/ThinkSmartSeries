import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/reset.css";
import "./assets/css/mtrLg.css";
import "./assets/font/font.scss";
import i18n from '../public/i18n/index';// 引入i18n实例
import  "./utils/mobile-adaption"
import Bounce from 'vue-bounce'
import { Collapse, CollapseItem , Popup} from 'vant';
Vue.prototype.$EventBus = new Vue()   
Vue.use(Bounce)
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Popup);

Vue.config.productionTip = false
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
