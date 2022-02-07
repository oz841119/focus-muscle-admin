<template>
  <div class="wrap">
    <div class="buttonWrap">
      <el-button class="el-icon--right" @click="getSuggestions()" type="primary" size="mini">讀取<i class="el-icon-sort-down el-icon--right"></i></el-button>
      <div class="buttonWrapRight">
        <el-button class="el-icon--right" @click="deleteData()" type="danger" size="mini">刪除(構建中)<i class="el-icon-delete el-icon--right"></i></el-button>
        <el-button class="el-icon--right"  @click="approved()" type="success" size="mini">審核<i class="el-icon-check el-icon--right"></i></el-button>
      </div>
    </div>
    <!-- 表格區 -->
    <el-table class="mt8" :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="肌群" prop="muscleName"></el-table-column>
      <el-table-column label="訓練動作" prop="action"></el-table-column>
      <el-table-column label="提供人" prop="provider"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import db from '../../firebase/initFirebase'
import {ref, get, child, update, push, remove} from "firebase/database";

export default {
  data() {
    return {
      databaseData: {},
      tableData: [],
      multipleSelection: [],
      loading: false
    }
  },
  methods: {
    getSuggestions() {
      this.loading = true
      const dbRef = ref(db)
      get(child(dbRef, 'suggestions'))
      .then((snapshot) => {
        if(snapshot.exists()) {
          this.databaseData = snapshot.val()
          this.tableData = Object.values(this.databaseData)
          this.loading = false
        } else {
          this.noHasDataMsg()
          this.tableData = []
          this.loading = false
        }
      })
      .catch((error) => {
        this.errorMsg()
        console.log(error);
        this.loading = false
      })
    },
    
    approved() {
      console.log(this.multipleSelection);
      if(this.multipleSelection.length == 0) {
        this.$message('您沒有列表勾選');
        return
      }
      this.loading = true
      for(let i=0 ; i<this.multipleSelection.length ; i++) {
        const newAction = this.multipleSelection[i]
        const newKey = push(child(ref(db), `actions/${newAction.muscleName}/actions`)).key;
        const updates = {}
        updates[`actions/${newAction.muscleName}/actions/${newKey}`] = newAction.action
        update(ref(db), updates) 
        this.successMsg('審核成功')
        this.deleteData()
      }
    },

    deleteData() {
      if(this.multipleSelection.length == 0) {
        this.$message('您沒有列表勾選');
        return
      }
      this.loading = true
      let nowKey = ''
      for(let i=0 ; i<this.multipleSelection.length ; i++) {
        for (let prop in this.databaseData) {
          if(this.databaseData[prop] == this.multipleSelection[i]) {
            nowKey = prop
            console.log(nowKey);
            remove(ref(db, `suggestions/${nowKey}`))
          }
        }
        console.log(this);
        this.successMsg('刪除成功')
      }
      this.getSuggestions()
    },

    // 當勾選項目時觸發，顯示勾選中的項目各值 Array
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection);
    },
    noHasDataMsg() {
      this.$message('目前沒有數據提供');
    },

    successMsg(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },

    errorMsg() {
      this.$message({
        message: '數據獲取失敗',
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>

  .buttonWrap {
    display: flex;
    justify-content: space-between;
  }
</style>