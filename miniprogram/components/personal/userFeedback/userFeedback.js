// pages/contact/contact.js
const app = getApp();
const utils = require("../../../utils/util")
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;


function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '您在使用本小程序过程中，有任何bug或意见反馈输入后点击回车都可以在这里提交~'
    },
    /*{
      speaker: 'customer',
      contentType: 'text',
      content: '我怕是走错片场了...'
    }*/
  ]
  that.setData({
    msgList,
    inputVal
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    hasHistory: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
    this.loadHistory();
  },

  loadHistory: function(e){
    var that = this
    wx.cloud.callFunction({
      name: 'loadUserAll',
      data:{collection:'userFeedback'}
    }).then(res=>{
      console.log(res.result.data)
      var list = that.data.msgList
      if(res.result.data.length>0){
        for(var i=0;i<res.result.data.length;i++){
          list.push({
            speaker: 'customer',
            contentType: 'text',
            content: res.result.data[i].txt_content
          })
        }
        
        this.setData({
          msgList: list,
          hasHistory:true
        })
      }
     
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    console.log(e)
    if(e==null || e.detail==null || e.detail.value==null|| e.detail.value.length==0){
      wx.showToast({
        icon: "none",
        title: '请不要发送空内容',
      })
      return ;
    }
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    msgList.push({
      speaker:'server',
      contentType:'text',
      content:"我们已经收到您的意见，将仔细查看并解决～"
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });

    // 上传数据到服务端
    var feedback = {
      "txt_content": e.detail.value,
      "timestamp": utils.formatTime(new Date()),
      "user_nickname":app.globalData.userInfo.nickName
    }
    
    wx.cloud.callFunction({
      name: 'addEntry',
      data: {collection: 'userFeedback', item: feedback},
    }).then(res=>
      console.log(res)
    )

  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
