<template>
  <div class="content">
    <span class="title">
      <span class="mr8">FocusMuscle</span>
      <img class="logoIMG" src="../../assets/icons/logo.png">
      <span>LOGIN</span>
    </span>
    <input type="text" placeholder="ACCOUNT" class="accountInput" v-model="email">
    <input type="password" placeholder="PASSWORD" class="accountInput mt8" v-model="password">
    <div class="ps">基於呈現，您可以使用預設的admin登入，也可以註冊新帳號。</div>
    <div class="keepAndForget mt8">
        <label for="check" class="keepLoginWrap cp"><input type="checkbox" id="check" class="cp"><span class="ml4">保持登入</span></label>
        <div class="forget">忘記密碼</div>
    </div>
    <div class="login cp" @click="fn()">LOGIN</div>
    <div class="register cp" @click="toggleRegisterPage()">REGISTER</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'admin@nothing.com',
      password: 'adminpassword'
    }
  },
  methods: {
    toggleRegisterPage() {
      this.$emit('toggleRegisterPage')
    }
  }
}
</script>

<style scoped>
  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26px 40px 50px;
    width: 30vw;
    /* height: 50vh; */
    background-color: rgba(255, 255, 255, 0.986);

    box-shadow: 5px 5px 5px 1px #242424;
    -webkit-box-shadow: 5px 5px 5px 1px #242424;
    -moz-box-shadow: 5px 5px 5px 1px #242424;
    -o-box-shadow: 5px 5px 5px 1px #242424;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .title span {
    font-family: 'Work Sans', sans-serif;
  }

  .logoIMG {
    height: 24px;
    margin-right: 8px;
  }

  .accountInput {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 5px;
    border: 1px solid rgb(136, 136, 136);
    font-family: 'Work Sans', sans-serif;
  }

  .keepAndForget {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 12px;
    color: rgb(104, 104, 104)
  }

  .keepLoginWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    background-color: rgba(30, 40, 50, 0.904);
    margin-top: 26px;
    font-family: 'Work Sans', sans-serif;
  }

  .register {
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    background-color: rgba(30, 40, 50, 0.699);
    margin-top: 12px;
    font-family: 'Work Sans', sans-serif;
  }

  .forget {
    cursor: pointer;
  }

  .ps {
    font-size: 12px;
    color: rgb(104, 104, 104);
    margin-top: 4px;
  }
  .ml4 {
    margin-left: 4px;
  }
</style>