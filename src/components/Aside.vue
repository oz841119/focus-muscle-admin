<template>
<!-- 0218 響應當前路由的index未解決 -->
  <el-menu background-color="rgb(40,50,60)" text-color="#fff" router default-active="/list">
    <el-menu-item index="/list">
      <i class="el-icon-caret-right"></i>動作列表
    </el-menu-item>
    <el-menu-item index="/audit">
      <i class="el-icon-caret-right"></i>動作審核
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style scoped>
  /* .aside {
    box-sizing: border-box;
    display: flex;
    padding: 20px 0px;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  } */
  .linl {
    display: block;
  }
</style>