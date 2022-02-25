import Vue from "vue";
import VueRouter from "vue-router";

import Index from '../components/main/Index.vue'
import Audit from '../components/main/Audit.vue'
import List from '../components/main/List.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: "後台管理系統 - FocusMuscle",
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登入 - FocusMuscle後台管理系統",
    }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: Audit,
    meta: {
      title: "審核 - FocusMuscle後台管理系統",
      // requiresAuth: false
    }
  },
  {
    path: '/list',
    name: List,
    component: List,
    meta: {
      title: "列表 - FocusMuscle後台管理系統"
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})

export default router;