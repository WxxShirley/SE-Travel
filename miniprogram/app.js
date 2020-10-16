//app.js
App({
  onLaunch: function () {
    // 开启云开发
    if(!wx.cloud){
      console.error('请升级版本使用云开发功能')
    }else{
      wx.cloud.init({
        env: 'env-dev-6gb5dffd859b69ee',
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code",res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          // 用户没有授权，有消息提示框
          console.log("你还未授权，无法使用本app")
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  /* 
      云数据库查询
      @param: setName 查询的数据库名称
      @param: ruleObj 查询的字段
      @param: callback 查询成功的回调函数
  */
  getInfoWhere: function(setName, ruleObj, callback){
    const db=wx.cloud.database()
    db.collection(setName).where(ruleObj)
      .get({
        success: callback,
        fail: console.error
      })
  },
})