const utils = require("../../utils/util")
const app=getApp();

Page({
  data: {
    guideObj: null,
  },

  onLoad: function (options) {
    // 解析界面参数中传递的景点对象
    var obj = JSON.parse(options.guide)
    obj.timestamp = obj.timestamp.substring(0, 11)
    obj.txt_content = obj.txt_content + obj.txt_content + obj.txt_content + obj.txt_content + obj.txt_content
    this.setData({
      guideObj: obj
    })
  },

  // 轮播图事件改变
  swiperChange: function(e){
    this.setData({swiperCurrent: e.detail.current})
  },

  onBindtap: function(e){
    // 修改前端界面展示值的变化
    var likeContent = {
      "source_avatar": app.globalData.userInfo.avatarUrl,
      "source_nickname": app.globalData.userInfo.nickName,
      "timestamp": utils.formatTime(new Date()),// 用户发布的时间戳
      "target_id": this.data.guideObj.openid,
      "guide_id": this.data.guideObj._id,
      "guide_title": this.data.guideObj.title,
      "read": false,
      "target_nickname": this.data.guideObj.nickname, 
      "target_avatar": this.data.guideObj.user_avatar
    }
    this.callCloudFunc(likeContent, this.data.guideObj.amILike)

    var gObj = this.data.guideObj
    if(this.data.guideObj.amILike==true){
      gObj.like-=1
      gObj.amILike=false
    }else{
      gObj.like+=1
      gObj.amILike=true
    }
    this.setData({
      guideObj: gObj
    })
  },

  //  将本次修改事件传入后台
  callCloudFunc: function(Content,amILike){  
    wx.cloud.callFunction({
      name: 'onLike',
      data: {item: Content,like: amILike},
      }).then(res=>{
      console.log(res.errMsg)
      console.log(res.result)
      if(res.errMsg!="cloud.callFunction:ok"){
        wx.showToast({
          title: '出错了..',
        })
      }
    })
  },

})