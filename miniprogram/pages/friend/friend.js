// miniprogram/pages/friend/friend.js
const utils = require("../../utils/util")
const app=getApp(); //写在文件顶部

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    date: '',
    startDate: '',
    endDate: '',
    txtContent: '',
    radio:'1',
    attraction: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

   getInput: function(e){
     console.log(e)
     console.log(e.detail.value)
   },


   onDisplay(e) {
     console.log(e)
    this.setData({ show: true });
  },
  onClose: function(e) {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm: function(event) {
    const [start, end] = event.detail;
    console.log(utils.formatTime(start))
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      startDate:utils.formatTime(start),
      endDate:utils.formatTime(end)
    });
  },
  
  submit: function(e){
    // 各项参数合法性检查
    if(this.data.startDate=='' ){
      wx.showToast({title:"提交不合法"})
      return 
    }

    // 提交
    var obj = {
      "nickname": app.globalData.userInfo.nickName,
      "profile_url": app.globalData.userInfo.avatarUrl,
      "timestamp": utils.formatTime(new Date()),
      "content":this.data.txtContent,
      "demands":{
        "gender": this.data.radio,
        "valid_time":[this.data.startDate, this.data.endDate],
        "bindAttraction": this.data.attraction,
      },
      "expired":false
    }
    
    
    wx.cloud.callFunction({
      'name': 'addEntry',
      'data':{
        collection: 'searchFriend',
        item: obj
      }
    }).then(res=>{
      console.log(res)
    })

  }

})