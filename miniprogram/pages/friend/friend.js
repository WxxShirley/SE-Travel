// miniprogram/pages/friend/friend.js
const utils = require("../../utils/util")
const app=getApp(); //写在文件顶部

const genders = ["male","female","random"]
const formatGenders = ["小哥哥","小姐姐","都可"]

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
    radio:'male',
    attraction: '',
    save: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInput(event){
    console.log("输入内容",event.detail.value)
    this.setData({txtContent: event.detail.value});
  },

  onLoad: function (options) {

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
      //startDate:utils.formatTime(start),
      //endDate:utils.formatTime(end),
      startDate: start,
      endDate:end
    });
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    this.setData({
      attraction: event.detail,
    });
    console.log(event.detail);
  },
  
  // 用户点击性别单选框
  onClick(event){
    const {name} = event.currentTarget.dataset;
    console.log(name);
    this.setData({
      radio: name
    })
  },
  
  submit: function(e){
    // 各项参数合法性检查
    if(this.data.startDate=='' || this.data.endDate==''|| this.data.txtContent=='' || this.data.attraction=='' ){
      wx.showToast({title:"提交不合法", icon:"none"})
      return 
    }


    // 提交
    wx.showLoading({
      title: '正在提交',
    })
    var obj = {
      "nickname": app.globalData.userInfo.nickName,
      "profile_url": app.globalData.userInfo.avatarUrl,
      "timestamp": utils.formatTime(new Date()),
      "content":this.data.txtContent,
      "demands":{
        "gender": this.data.radio,
        "valid_time":[new Date(this.data.startDate), new Date(this.data.endDate)],
        "bindAttraction": this.data.attraction,
        "formatGender": formatGenders[genders.indexOf(this.data.radio)],
        "formatTime": utils.formatTime(this.data.startDate).substr(0,10)+"至"+utils.formatTime(this.data.endDate).toString().substr(0,10)
      },
      "endTime": new Date(this.data.endDate),
      "expired":false
    }
    
    
    wx.cloud.callFunction({
      'name': 'addEntry',
      'data':{
        collection: 'searchFriend',
        item: obj
      }
    }).then(res=>{
      console.log(res.errMsg)
      wx.hideLoading({})
      if(res.errMsg=="cloud.callFunction:ok"){
        this.setData({save:true})
      }else{
        wx.showToast({icon:"none",
          title: '出错了..',
        })
      }
    })

  }

})