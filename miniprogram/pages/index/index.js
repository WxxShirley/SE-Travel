//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    backTopValue: false,
    newMessagein: false
  },
  //事件处理函数
  onChange(event){
    console.log(event.detail+1)
    console.log(event)
    this.setData({active: event.detail});
  },

  onLoad: function () {
    if (app.globalData.userInfo!=null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    app.watch(this.watchBack)
  },
  
  watchBack:function(val){
    console.log(val)

    this.setData({
      newMessagein: val
    })
  },



  getUserProfile: function(e){
    wx.getUserProfile({
      desc:"使用户得到更好的体验",
      success: (res)=>{
        console.log("获取用户信息成功", res)
        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('user', res.userInfo)

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail: res=>{
        console.log("获取用户信息失败", res)
      }
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
