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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code",res.code)
      }
    })
    // 获取用户信息
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              console.log("用户昵称:"+this.globalData.userInfo.nickName)
              console.log("用户头像地址:"+this.globalData.userInfo.avatarUrl)

               // 开启攻略点赞监听
              const db=wx.cloud.database()
              const watcher_ = db.collection('message').where({
                 target_nickname: this.globalData.userInfo.nickName,
               }).watch({
                 onChange: function(snapshot){
                  console.log('changed events:',snapshot.docChanges)
                  for(var i=0;i<snapshot.docChanges.length;i++){
                    if(snapshot.docChanges[i].dataType=='add'){
                      that.globalData._hasNewMessage = true  
                    }
                  }
                 },
                 onError:function(err){
                  console.error('watch closed because of error',err)
                }
               })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          // 用户没有授权，有消息提示框
          console.log("你还未授权")
        }
      }
    })
  },
  globalData: {
    // 全局信息： userInfo(用户信息)
    userInfo: null,
    _hasNewMessage: false
  },

  // 监控hasNewMessage
  watch: function(method){
    var obj = this.globalData
    Object.defineProperty(obj, "_hasNewMessage",{
      configurable: true,
      enumerable: true,
      set: function(value){
        method(value)
      },
      get:function(){
        return this._hasNewMessage
      }
    })
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