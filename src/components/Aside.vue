<template>
  <div class="aside">
    <router-link class="link" to="/list">列表</router-link>
    <router-link class="link" to="/audit">審核</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .aside {
    box-sizing: border-box;
    display: flex;
    padding: 20px 0px;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }

  .link {
    color: #fff
  }

  .link:nth-child(2) {
    margin-top: 16px;
  }
</style>