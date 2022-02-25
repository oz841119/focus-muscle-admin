# focus-muscle-admin
```
FocusMuscle的後台管理系統
基於Vue2、Vue-Router、Element
以Firebase作為數據庫管理

安裝依賴後請至Firebase創建實時資料庫(Realtime Database)
取得相關資料庫及相關驗證Key
手動在src資料夾內創建firebase資料夾
包含一個initFirebase.js
將取得的資料庫連結及其他資料填入 並導出getDatabase()方法
```
![image](https://github.com/oz841119/focus-muscle-admin/blob/main/ReadmeImage/key.jpg)

## 修正
```
1. 修正了審核時產生重複多次訊息的BUG
2. 修正了一些複用方法時應該產生的對應訊息框
3. 抽離Header作為單一組件

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
