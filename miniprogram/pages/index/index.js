//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
    motto: '一开口就是老程序员了',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    backTopValue: false,
    newMessagein: false
  },
  //事件处理函数
  onChange(event){
    console.log(event.detail+1)
    console.log(event)
    this.setData({active: event.detail});
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo!=null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log("in")
    app.watch(this.watchBack)
  },
  
  watchBack:function(val){
    console.log(val)

    this.setData({
      newMessagein: val
    })
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 监听滚动条坐标, 如果滚动超过600，则出现“返回顶部”的按钮
  onPageScroll: function(e){
    let scrollTop = e.scrollTop
    let backTopValue = scrollTop>400?true:false;
    this.setData({backTopValue})
  },

  // 返回顶部
  backTop: function(e){
    if(wx.pageScrollTo){
      wx.pageScrollTo({
        scrollTop:0
      })
    }else{
      wx.showModal({
        title:'提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试'
      })
    }
  },

  scrollToLower: function(e){
    // console.log(e)
    var comp = this.selectComponent('#findPage')
    if(comp && comp.data.active==0){
      console.log("查看攻略，继续下拉")
      this.selectComponent("#findPage").getGuideData()
    }
  },
  scrollToLowermain: function(e){
    console.log(e)
    this.selectComponent("#mainpage").getGuideData()
  }
})
