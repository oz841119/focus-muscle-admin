<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/style/common.css'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
export default {
  name: 'App',
  components: {
    Home,
    Login,  
  },
}
</script>

<style>
</style>
