import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import store from "@/store"
// import 'vant/lib/index.less'
import {
  Tabbar,
  TabbarItem,
  Sidebar,
  SidebarItem,
  List,
  PullRefresh,
  Loading,
  NavBar,
  Dialog,
  Empty,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Toast,
  Search,
  Icon
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Loading);
Vue.use(NavBar);
Vue.use(Dialog);
Vue.use(Empty);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Search);
Vue.use(Icon);
Vue.config.productionTip = false
// Vue.prototype.$Toast = Toast;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')