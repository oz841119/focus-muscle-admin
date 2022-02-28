<template>
  <div class="wrap">
    <SingIn v-if="isLogin" @toggleRegisterPage="toggleRegisterPage"/>
    <Register v-if="isRegister" @toggleLoginPage="toggleLoginPage"/>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import SingIn from '../components/login/SingIn.vue'
import Register from '../components/login/Register.vue'

export default {
  components: {
    SingIn,
    Register
  },
  data() {
    return {
      isLogin: true,
      isRegister: false
    }
  },
  methods: {
    toggleRegisterPage() {
      this.isRegister = true
      this.isLogin = false
    },
    toggleLoginPage() {
      this.isRegister = false
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgb(30,40,50);
  } 
</style>