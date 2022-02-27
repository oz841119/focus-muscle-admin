import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userUID: '',
    userEmail: '',
    userToken: ''
  },
  mutations: {
    userLogin(state, user) {
      state.userEmail = user.email
      state.userToken = user.accessToken
      state.userUID = user.uid
    }
  }
})


export default store;