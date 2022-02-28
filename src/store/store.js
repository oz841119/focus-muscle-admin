import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userEmail: '',
  },
  mutations: {
    judgeUser(state, user) {
      state.userEmail = user.email
    }
  }
})


export default store;