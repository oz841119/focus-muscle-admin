import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.config.productionTip = false

// 掛載Vue前監聽用戶身份
const auth = getAuth();
let hasVueIns = false  // 判斷Vue實例是否存在
auth.onAuthStateChanged((user) => {
  // console.log(app);
  if(!hasVueIns) {  // 如果不存在則new起來 並將值改為true 避免重複調用
    hasVueIns = true
    new Vue({
      render: h => h(App),
      router,
      store,
    }).$mount('#app')
  }
})
// new Vue({
//   render: h => h(App),
//   router,
//   store,
// }).$mount('#app')
