//app.js
App({
  onLaunch: function () {
    // 开启云开发
    if(!wx.cloud){
      console.error('请升级版本使用云开发功能')
    }else{
      wx.cloud.init({
        env: 'env-dev-4g6anmt6c45832a8',
      })
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code",res.code)
      }
    })

    // 从缓存中加载用户信息
    var user = wx.getStorageSync('user')
    if(user){
      this.globalData.userInfo = user
      
      // 打印用户信息
      console.log("用户昵称:"+this.globalData.userInfo.nickName)
      console.log("用户头像地址:"+this.globalData.userInfo.avatarUrl)


      // 开启攻略点赞监听
     const db=wx.cloud.database()
     const watcher_ = db.collection('message').where({
        target_nickname: this.globalData.userInfo.nickName,
      }).watch({
        onChange: function(snapshot){
       
         if(snapshot.type == 'init') {
           wx.cloud.callFunction({
             name: 'cf',
             success: function(res) {
               wx.cloud.callFunction({
                 name: 'cf3',
                 success: function(res2) {
                   if(res.result.message_count < res2.result.message_count)
                     that.globalData._hasNewMessage = true
                 }
               })
             }
           })
         }
         else if(snapshot.docChanges[snapshot.docChanges.length - 1].dataType == 'add')
           that.globalData._hasNewMessage = true
         wx.cloud.callFunction({
           name: 'cf2'
         })
        },
        onError:function(err){
         console.error('watch closed because of error',err)
       }
      })
    }

  
  },
  globalData: {
    // 全局信息： userInfo(用户信息), _hasNewMessage(是否有新的点赞消息)
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