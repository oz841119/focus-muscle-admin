<template>
  <el-menu background-color="rgb(40,50,60)" text-color="#fff" router :default-active=this.$route.path>
    <el-menu-item index="/list">
      <i class="el-icon-caret-right"></i>動作列表
    </el-menu-item>
    <el-menu-item index="/audit">
      <i class="el-icon-caret-right"></i>動作審核
    </el-menu-item>
    <el-menu-item>
      <i class="el-icon-caret-right"></i>COMING SOON
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>