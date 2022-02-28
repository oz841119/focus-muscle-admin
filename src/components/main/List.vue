<template>
  <div>
    <div class="buttonWrap">
      <el-button class="el-icon--right" @click="getActions()" type="primary" size="mini">讀取<i class="el-icon-sort-down el-icon--right"></i></el-button>
      <div class="buttonWrapRight">
        <el-button class="el-icon--right" @click="deleteData()" type="danger" size="mini">刪除<i class="el-icon-delete el-icon--right"></i></el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="3">
        <el-input class="mt8" v-model="searchText" size="mini" placeholder="在列表中搜尋"></el-input>
        </el-col>
    </el-row>
    <!-- 表格區 -->
    <el-table class="mt8" :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="isLoading">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="肌群" prop="name"></el-table-column>
      <el-table-column label="訓練動作" prop="action"></el-table-column>
      <el-table-column label="提供人" prop="provider"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import firebaseAPI from '../../mixins/firebaseAPI'
import db from '../../firebase/initFirebase'
import { ref, remove } from "firebase/database";

export default {
  mixins: [firebaseAPI],
  data() {
    return {
      isLoading: false,
      databaseData: {}, // 數據庫回傳的資料
      tableData: [],
      originalTableData: [], // 原始的table資料 搜索功能時使用  ??- 深淺拷貝問題 -?? 
      multipleSelection: [], // 列表中勾選的選項
      searchText: ''
    }
  },
  methods: {
    getActions() { 
      this.tableData = [] // 初始化一次tableData
      this.searchText = ''  // 初始化一次searchText 避免重新讀取時searchText有內容而導致的無更新對應搜索
      this.isLoading = true
      console.log(this.isLoading);
      this.mixinGetData('actions', (snapshot) => {
        if(snapshot.val()) { // snapshot.val(): firebase方法 當請求成功且數據庫有數據時會返回數據
          this.databaseData = snapshot.val() // 
          this.relayData = Object.values(this.databaseData) // 資料處理中繼
          for(let i = 0 ; i<this.relayData.length ; i++) {
            // 若沒有actions的話 變數manyActions在Object.values取值將會失敗並觸發catch 所以需要判斷是否為undefined來跳過本次迴圈
            if(this.relayData[i].actions === undefined) {
              continue
            }
            let manyActions = Object.values(this.relayData[i].actions)
            for(let j = 0 ; j < manyActions.length ; j++) {
              this.tableData.push({name: this.relayData[i].name, action: manyActions[j]})
            }
          }
          this.originalTableData = this.tableData // 原始的table資料 搜索功能時使用  ??- 深淺拷貝問題 -?? 
          this.successMsg('數據讀取成功')
          this.isLoading = false
        }else {
          this.noHasDataMsg()
          this.tableData = []
          this.isLoading = false
        }
      }, (error) => {
          console.warn(error); // error為firebase傳入的失敗原因
          this.errorMsg()
          this.isLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    },

    /*
      方法待重寫 過多冗余  且有重複名稱的訓練動作會被一起刪除的問題
    */ 
    deleteData() {
      if(this.multipleSelection.length == 0) {
        this.$message('您沒有列表勾選');
        return
      }
      this.isLoading = true
      let databaseDataArr = Object.values(this.databaseData)
      for(let i = 0 ; i<this.multipleSelection.length ; i++) {
        for(let j = 0 ; j<databaseDataArr.length ; j++) {
          if(databaseDataArr[j].name == this.multipleSelection[i].name) {
            for (let key in databaseDataArr[j].actions) { // 查找這個動作名稱對應的流水key
              if(databaseDataArr[j].actions[key] == this.multipleSelection[i].action) {
                for(let path in this.databaseData) { // 查找流水key對應的上層路徑(也為key)
                  if(this.databaseData[path].name == this.multipleSelection[i].name) {
                    remove(ref(db, `actions/${path}/actions/${key}`))
                    break  // 最外層每次遍歷只會執行一次刪除 刪除後就可進行退出 不必往下查找
                  }
                }
                break
              }
            }
          }
        } 
      }
      this.isLoading = false
      this.successMsg('刪除成功')
      this.getActions()
    }
    
  },
  
  watch: {
    searchText: { // 監聽搜索框得到相對應的列表
      handler: function() {
        let reg = new RegExp(this.searchText);
        this.tableData = this.originalTableData.filter((item) => reg.test(item.action))
      }
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