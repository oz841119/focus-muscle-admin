import db from '../firebase/initFirebase'
import {ref, get, child, update, push, remove} from "firebase/database";

export default {
  methods: {
    /**
     * @param {string} target 路徑
     * @param {function} successFun 數據請求成功時調用的方法
     * @param {function} failFun 數據請求失敗時調用的方法
     */
    mixinGetData(target, successFun, failFun) {
      const dbRef = ref(db)
      get(child(dbRef, target)).then((snapshot) => {successFun(snapshot)}).catch((error) => failFun(error))
      // .catch((eroor) => failFun)
    },

    
  }
}