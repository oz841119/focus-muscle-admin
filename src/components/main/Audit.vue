<template>
  <!-- 按扭區 -->
  <div class="wrap">
    <div class="buttonWrap">
      <el-button class="el-icon--right" @click="getSuggestions('數據獲取成功')" type="primary" size="mini">讀取<i class="el-icon-sort-down el-icon--right"></i></el-button>
      <div class="buttonWrapRight">
        <el-button class="el-icon--right" @click="deleteData('刪除成功')" type="danger" size="mini">刪除<i class="el-icon-delete el-icon--right"></i></el-button>
        <el-button class="el-icon--right"  @click="approved('審核成功')" type="success" size="mini">審核<i class="el-icon-check el-icon--right"></i></el-button>
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
import {ref, child, update, push, remove} from "firebase/database";
import dayjs from 'dayjs'
import firebaseAPI from '../../mixins/firebaseAPI.js'

export default {
  mixins: [firebaseAPI],
  data() {
    return {
      databaseData: {}, // 數據庫回傳的資料
      tableData: [],
      multipleSelection: [], // 列表中勾選的選項
      loading: false
    }
  },
  methods: {
    getSuggestions(sucMsg) {
      this.loading = true
      this.mixinGetData('suggestions', (snapshot) => {
        if(snapshot.exists()) {
          this.databaseData = snapshot.val()
          this.tableData = Object.values(this.databaseData)
          this.loading = false
          this.successMsg(sucMsg)
          this.formatDate()
        }else {
          this.noHasDataMsg()
          this.tableData = []
          this.loading = false
        }
      },(error) => {
          console.warn(error);
          this.errorMsg()
          this.loading = false
      })
    },
    
    approved(sucMsg) {
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
        // this.successMsg(sucMsg)
        // this.deleteData()
      }
      this.successMsg(sucMsg)
      this.deleteData()
    },

    deleteData(errMsg) {
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
            remove(ref(db, `suggestions/${nowKey}`))
          }
        }
      }
      if(errMsg) this.successMsg(errMsg)
      this.getSuggestions('數據重新獲取成功')
    },

    formatDate() { // 將數據中的date格式化
      for(let i = 0 ; i<this.tableData.length ; i++) {
        this.tableData[i].date = dayjs(this.tableData[i].date).format('YYYY/MM/DD HH:mm:ss')
      }
    },

    // 當勾選項目時觸發，顯示勾選中的項目各值 Array
    handleSelectionChange(val) {
      this.multipleSelection = val
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
        message: '數據獲取失敗，請確認網路是否正常或詢問服務商',
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