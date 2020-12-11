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
    this.setData({
      guideObj: obj
    })

    //再次检查用户是否已经给攻略点过赞
    var that = this;
    if(that.data.guideObj.amILike==null){
      wx.showLoading({
        title: '加载中..',
      })
      wx.cloud.callFunction({
        name: 'checkLike',
        data:{
          target_id: that.data.guideObj.target_id,
          _id: that.data.guideObj._id
        }
      }).then(res=>{
        var obj = that.data.guideObj
        if(res.result.data.length>0){
          obj.amILike = true 
        }else{
          obj.amILike = false 
        }
        that.setData({
          guideObj: obj 
        })
        wx.hideLoading()
      })
    }
  },

  // 轮播图事件改变
  swiperChange: function(e){
    this.setData({swiperCurrent: e.detail.current})
  },

  onBindtap: function(e){
    if(this.data.guideObj.amILike==null){
      wx.showModal({
        title:'正在加载,请勿点赞',
        icon:"none"
      })
      return 
    }
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
    
    // 需要同时在上一界面[findPage]更新点赞情况
    let pages = getCurrentPages()
    let currPage = null, prevPage = null
    if(pages.length>=2){
      currPage = pages[pages.length-1] // 当前界面
      prevPage = pages[pages.length-2] // 上一界面
    }
    if(prevPage){
      if(prevPage.selectComponent("#findPage")&&prevPage.selectComponent("#findPage").data.guideData){
        // 从瀑布流入口进入
        var list = prevPage.selectComponent("#findPage").data.guideData
        for(var i=0;i<list.length;i++){
          if(list[i]._id == this.data.guideObj._id){
            var corrList = prevPage.selectComponent("#findPage").data.rightList
             if(i%2==0){
               //在leftList中
               corrList = prevPage.selectComponent("#findPage").data.leftList
             }
             var index = parseInt(i/2) // 对应的在leftList/rightList中下标
             // 进行findPage界面中 对应的攻略的 amILike 和 like 的更新
             if(this.data.guideObj.amILike==true){
               corrList[index].amILike=true
               corrList[index].like+=1
             }else{
               corrList[index].amILike=false
               corrList[index].like-=1
             }
             
             // setData触发界面更新
             if(i%2){
              prevPage.selectComponent("#findPage").setData({
                rightList: corrList
              })
             }else{
               prevPage.selectComponent("#findPage").setData({
                 leftList: corrList
               })
             }
  
          }
        }
      }
      else if(prevPage.selectComponent("#mainpage")&&prevPage.selectComponent("#mainpage").data.guideData){
        // 从主页瀑布流入口进入
        var list = prevPage.selectComponent("#mainpage").data.guideData
        for(var i=0;i<list.length;i++){
          if(list[i]._id == this.data.guideObj._id){
            var corrList = prevPage.selectComponent("#mainpage").data.rightList
             if(i%2==0){
               //在leftList中
               corrList = prevPage.selectComponent("#mainpage").data.leftList
             }
             var index = parseInt(i/2) // 对应的在leftList/rightList中下标
             // 进行findPage界面中 对应的攻略的 amILike 和 like 的更新
             if(this.data.guideObj.amILike==true){
               corrList[index].amILike=true
               corrList[index].like+=1
             }else{
               corrList[index].amILike=false
               corrList[index].like-=1
             }
             
             // setData触发界面更新
             if(i%2){
              prevPage.selectComponent("#mainpage").setData({
                rightList: corrList
              })
             }else{
               prevPage.selectComponent("#mainpage").setData({
                 leftList: corrList
               })
             }
  
          }
        }
      }else if(prevPage.data.guidelist&&prevPage.data.guidelist.length>0){
        console.log("find show my guide!")
        var lis = prevPage.data.guidelist 
        
        for(var i=0;i<lis.length;i++){
          console.log(lis[i]._id, this.data.guideObj._id)
          if(lis[i]._id==this.data.guideObj._id){
            console.log("find")
            console.log(lis[i])
            if(this.data.guideObj.amILike==true){
              lis[i].like+=1
              console.log("add 1")
            }else{
              lis[i].like-=1
              console.log("del 1")
            }
            break 
          }
          
        }
        prevPage.setData({
          guidelist: lis
        })
      }
    }

  },

  //  将本次修改事件传入后台
  callCloudFunc: function(Content,amILike){  
    wx.cloud.callFunction({
      name: 'onLike',
      data: {item: Content,like: amILike},
      }).then(res=>{
      console.log(res)
    })
  },

})