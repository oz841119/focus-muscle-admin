<template>
  <div>
    <el-container class="layout">
      <el-header height="60px">
        <HeaderBar/>
      </el-header>
      <el-container>
        <el-aside>
          <Aside/>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside.vue'
import HeaderBar from '../components/HeaderBar.vue'

export default {
  name: 'home',
  components: {
    Aside,
    HeaderBar
  }
}
</script>

<style scoped>

  .layout {
    height: 100vh;
  }
  
  .el-header {
    display: flex;
    align-items: center;
    background-color: rgb(30,40,50);
    color: #fff;
  }

  .el-aside {
    flex: 1;
    background-color: rgb(40,50,60);
  }

  .el-main {
    flex: 6;
  }

</style>