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
import { getAuth } from "firebase/auth";
export default {
  name: 'home',
  created() {
    this.getUser()
  },
  components: {
    Aside,
    HeaderBar
  },
  methods: {
    getUser() {
      const auth = getAuth()
      const user = auth.currentUser
      this.$store.commit('judgeUser', user)
      this.$message({
          message: '登入成功',
          type: 'success'
        });
    }
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