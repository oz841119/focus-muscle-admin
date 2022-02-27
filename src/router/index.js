import Vue from "vue";
import VueRouter from "vue-router";

import Index from '../components/main/Index.vue'
import Audit from '../components/main/Audit.vue'
import List from '../components/main/List.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

import { getAuth } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "後台管理系統 - FocusMuscle",
    },
    children: [
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登入 - FocusMuscle後台管理系統",
    }
  },
]
const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title;
  const auth = getAuth()
  const user = auth.currentUser
  if(to.name != 'Login' && !user) {
    return next({path: 'login'}) 
  }
  if(to.name == 'Login' && user) {
    console.log('dddd');
    return next({path: '/'})
  }
  next()
})


export default router;