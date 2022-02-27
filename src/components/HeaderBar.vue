<template>
    <div class="wrap">
      <router-link to="/">
        <div class="title">
          <div class="imgWrap"><img class="logoIMG" src="../assets/icons/logo.svg"></div>
          <div class="titleText">
            <span>FocusMuscle</span>
            <span>ADMIN</span>
          </div>
        </div>
      </router-link>
      <div>
        <div>{{this.$store.state.userEmail}}</div>
        <div @click="userSignOut()">登出</div>
      </div>
    </div>
</template>

<script>
import { getAuth, signOut} from "firebase/auth";
export default {
  methods: {
    userSignOut() {
      const auth = getAuth()
      signOut(auth).then(() => {
        console.log('登出');
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>

  .wrap {
    display: flex;
    width: 100%;
    justify-content:space-between;
    align-items: center;
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
    font-family: 'Work Sans', sans-serif;
    font-weight: 700;
    font-style: italic;
  }

  .imgWrap {
    display: flex;
    width: 48px;
    margin-right: 6px;
  }
  
  .logoIMG {
    width: 100%;
  }
</style>