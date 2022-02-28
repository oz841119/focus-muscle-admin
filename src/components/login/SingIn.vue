<template>
  <div class="content">
    <span class="title">
      <span class="mr8">FocusMuscle</span>
      <img class="logoIMG" src="../../assets/icons/logo.png">
      <span>LOGIN</span>
    </span>
    <form action="">
      <input type="text" placeholder="ACCOUNT" class="accountInput" v-model="email">
      <input type="password" placeholder="PASSWORD" class="accountInput mt8" v-model="password" autocomplete="on">
      <span class="errMsg">{{errMsg}}</span>
    </form>
    <div class="ps">基於呈現，您可以使用預設的admin登入，也可以註冊新帳號。</div>
    <div class="keepAndForget mt8">
        <label for="check" class="keepLoginWrap cp"><input type="checkbox" id="check" v-model="isKeepLogin" class="cp"><span class="ml4">保持登入</span></label>
        <div class="forget"  @click="toggleIsForget()">忘記密碼</div>
    </div>
    <div class="login cp" @click="loginAccount()">LOGIN</div>
    <div class="register cp" @click="toggleRegisterPage()">REGISTER</div>
    <div v-if="isForget" class="forgetPasswordWrap">
      <div>是否發送信件至您當前輸入Email進行密碼重設</div>
      <div><span class="forgetWrapEmail">Email:</span> <span>{{this.email}}</span></div>
      <div class="forgetButtonWrap">
        <span class="no cp" @click="toggleIsForget()">否，我想起密碼了</span>
        <span class="yes cp" @click="sendEmail()">是，請發送</span>
      </div>
      <div class="sendMsg" v-if="isSendMsg">
        已發送至您的Email<br/>請在信件中直接更改密碼<br/>並使用新的密碼進行登入
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, sendPasswordResetEmail, inMemoryPersistence } from "firebase/auth";
export default {
  data() {
    return {
      email: 'admin@nothing.com',
      password: 'adminpassword',
      errMsg: '',
      emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      setTimeout: null, // 保存定時器的標識符 用於調用時清除前次定時器
      isForget: false,
      isSendMsg: false,
      isKeepLogin: false
    }
  },
  methods: {
    toggleRegisterPage() {
      this.$emit('toggleRegisterPage')
    },

    loginAccount() {
      if(this.formatCheckFail()) return
      const auth = getAuth()
      let keepWork = browserLocalPersistence // 默認用戶的登入狀態保存方式為Local
      if(!this.isKeepLogin) {
        keepWork = inMemoryPersistence  // 登入狀態保存方式為不保存
      }
      setPersistence(auth, keepWork)
      .then(() => {
        signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
          this.errMsg = '錯誤的電子郵件或密碼'
          this.errMsgTO()
        })
      })
    },

    formatCheckFail() {
      if(!this.email || !this.password) {
        this.errMsg = '表單未填寫完整'
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

    sendEmail() {
      if(!this.email) {
        this.errMsg = '請輸入Email'
        this.errMsgTO()
        return
      }

      if(!this.emailReg.test(this.email)) {
        this.errMsg = '電子信箱輸入不正確，請重新輸入'
        this.errMsgTO()
        return
      }

      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.isSendMsg = true
        this.email = ''
      })
      .catch(() => {
        this.errMsg = '錯誤的電子郵件，請重新輸入'
        this.errMsgTO
      })
    },

    errMsgTO() {
      clearTimeout(this.timeOutId)
      this.timeOutId = setTimeout(() => {
        this.errMsg = ''
      }, 3000)
    },

    toggleIsForget() {
      this.isForget = !this.isForget
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
    background-color: rgba(255, 255, 255, 0.986);

    box-shadow: 5px 5px 5px 1px #242424;
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

  .forgetPasswordWrap {
    box-sizing: border-box;
    width: 100%;
    margin-top: 8px;
    color: rgb(218, 79, 79);
    border: 1px solid rgba(30, 40, 50, 0.699);;
    padding: 2px 4px 6px 4px;
    font-size: 14px;
    text-align: center;
    background-color: rgba(209, 209, 209, 0.699);;
  }

  .forgetButtonWrap {
    display: flex;
    justify-content: space-around;
    color: #fff;
    margin-top: 5px;
  }

  .forgetWrapEmail {
    color:#cf1818;
    font-weight: 700;
  }

  .no {
    background-color: rgba(30, 40, 50, 0.699);
    padding: 4px 4px;
    font-size: 12px;
    box-shadow: 1px 1px 1px 1px #242424;
  }

  .yes {
    background-color: rgba(30, 40, 50, 0.904);
    padding: 4px 4px;
    font-size: 12px;
    box-shadow: 1px 1px 1px 1px #242424;
  }

  .sendMsg {
    margin-top: 8px;
  }
  
  .errMsg {
    width: 100%;
    height: 6px;
    font-size: 12px;
    color: red;
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