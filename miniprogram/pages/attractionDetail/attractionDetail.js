// 景区详情界面 
var data = require("../../utils/staticData");

Page({
  data: {
    attractionObj: null,
    filepath: data.path,
  },

  onLoad: function (options) {
    // 解析界面参数中传递的景点对象
    var obj = JSON.parse(options.attraction)
    this.setData({
      attractionObj: obj
    })
  },

  // 轮播图事件改变
  swiperChange: function(e){
    this.setData({swiperCurrent: e.detail.current})
  },

  
})