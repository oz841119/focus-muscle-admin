<template>
  <div class="content">
    <span class="title">
      <span class="mr8">FocusMuscle</span>
      <img class="logoIMG" src="../../assets/icons/logo.png">
      <span>REGISTER</span>
    </span>
    <form>
      <input type="email" placeholder="ACCOUNT" class="accountInput" v-model="email">
      <div class="ps">註冊帳號不需Email驗證，可以隨意輸入</div>
      <input type="password" placeholder="PASSWORD" class="accountInput mt8" v-model="password" autocomplete="on">
      <input type="password" placeholder="ENTER PASSWORD AGAIN" class="accountInput mt8" v-model="againPassword" autocomplete="on">
    </form>
    <span class="errMsg">{{errMsg}}</span>
    <div class="login cp" @click="registerAccount()">REGISTER</div>
    <div class="register cp" @click="toggleLoginPage()">I ALREADY HAVE AN ACCOUNT</div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
export default {
  data() {
    return {
      email: '',
      password: '',
      againPassword: '',
      errMsg: '',
      emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      setTimeout: null, // 保存定時器的標識符 用於調用時清除前次定時器
    }
  },
  methods: {
    toggleLoginPage() {
      this.$emit('toggleLoginPage')
    },
    registerAccount() {
      if(this.formatCheckFail()) return
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => { 
            this.$router.push('/')
          })
        })
      })
      .catch((error) => {
        if(error.message) {
          this.errMsg = error.message
          this.errMsgTO()
        }
      })
    },
    formatCheckFail() {
      if(!this.email || !this.password || !this.againPassword) {
        this.errMsg = '表單未填寫完整'
        this.errMsgTO()
        return true
      }

      if(this.password != this.againPassword) {
        this.errMsg = '密碼輸入不一致'
        this.errMsgTO()
        return true
      }
      if(this.password.length < 6) {
        this.errMsg = '密碼長度須大於6位'
        this.errMsgTO()
        return true
      }
      if(!this.emailReg.test(this.email)) {
        this.errMsg = '電子信箱輸入不正確，請重新輸入'
        this.errMsgTO()
        return true
      }
    },
    
    errMsgTO() {
      clearTimeout(this.timeOutId)
      this.timeOutId = setTimeout(() => {
        this.errMsg = ''
      }, 3000)
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

  .ps {
    font-size: 12px;
    color: rgb(104, 104, 104);
    margin-top: 4px;
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

  .errMsg {
    width: 100%;
    height: 6px;
    font-size: 12px;
    color: red;
  }
</style>