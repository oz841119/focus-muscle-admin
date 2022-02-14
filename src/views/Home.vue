<template>
  <div>
    <el-container class="layout">
      <el-header>
        <span>FocusMuscleAdmin</span>
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

export default {
  name: 'home',
  components: {
    Aside,
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
    background-color: rgb(71, 118, 212);
  }

  .el-aside {
    flex: 1;
    background-color: rgb(202, 221, 255);
  }

  .el-main {
    flex: 7;
    /* background-color: gold; */
  }

</style>