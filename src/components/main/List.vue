<template>
  <div>
    <div class="buttonWrap">
      <el-button class="el-icon--right" @click="getActions()" type="primary" size="mini">讀取<i class="el-icon-sort-down el-icon--right"></i></el-button>
      <div class="buttonWrapRight">
        <el-button class="el-icon--right" type="danger" size="mini">刪除<i class="el-icon-delete el-icon--right"></i></el-button>
        <el-button class="el-icon--right" type="success" size="mini">審核<i class="el-icon-check el-icon--right"></i></el-button>
      </div>
    </div>
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

export default {
  mixins: [firebaseAPI],
  data() {
    return {
      isLoading: false,
      databaseData: {}, // 數據庫回傳的資料
      tableData: [],
      multipleSelection: [], // 列表中勾選的選項
    }
  },
  methods: {
    getActions() {
      this.loading = true
      this.mixinGetData('actions', (snapshot) => {
        if(snapshot.val()) {
          console.log('成功');
          this.databaseData = snapshot.val()
          this.relayData = Object.values(this.databaseData)
          for(let i = 0 ; i<this.relayData.length ; i++) {
            if(this.relayData[i].actions === undefined) {
              continue
            }
            console.log(i);
            let manyActions = Object.values(this.relayData[i].actions)
            for(let j = 0 ; j < manyActions.length ; j++) {
              this.tableData.push({name: this.relayData[i].name, action: manyActions[j]})
            }
          }
          this.loading = false
        }else {
          this.noHasDataMsg()
          this.tableData = []
          this.loading = false
        }
      }, (error) => {
          console.log('失敗');
          console.log(error);
          this.errorMsg()
          this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection);
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