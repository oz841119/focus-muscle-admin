<template>
  <div>
    <el-container class="layout">
      <el-header height="60px">
        <router-link to="/">
          <div class="title">
            <span class="imgWrap"><img class="logoIMG" src="../assets/icons/logo.svg" alt=""></span>
            <div class="titleText">
              <span>FocusMuscle</span>
              <span>ADMIN</span>
            </div>
          </div>
        </router-link>
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
    background-color: rgb(30,40,50);
    color: #fff;
  }

  .el-aside {
    flex: 1;
    background-color: rgb(40,50,60);
  }

  .title {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .titleText {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .imgWrap {
    height: 60%;
    margin-right: 6px;
  }
  
  .logoIMG {
    height: 100%;
  }

  .el-main {
    flex: 7;
    /* background-color: gold; */
  }

</style>