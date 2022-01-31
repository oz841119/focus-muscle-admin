import Vue from "vue";
import VueRouter from "vue-router";

import Index from '../components/main/Index.vue'
import Audit from '../components/main/Audit.vue'
Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: "FocusMuscle後台管理系統",
    }
  },
  {
    path: '/Audit',
    name: 'Audit',
    component: Audit,
    meta: {
      title: "審核 - FocusMuscle後台管理系統",
      // requiresAuth: false
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