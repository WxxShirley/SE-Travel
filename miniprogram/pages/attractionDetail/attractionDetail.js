// 景区详情界面 
var data = require("../../utils/staticData");

Page({
  data: {
    attractionObj: null,
    filepath: data.path,
    activeNames: []
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

  onchange: function(event){
    this.setData({
      activeNames: event.detail
    })
  },

  goMap: function(e){
    var mapObj = {
      "lat":this.data.attractionObj.geoInfo.lat,
      "lng":this.data.attractionObj.geoInfo.lng,
      "loc":this.data.attractionObj.geoInfo.location
    }
    mapObj = JSON.stringify(mapObj)
    wx.navigateTo({
      url: '../../pages/attractionDetail/mapView?mapObj='+mapObj,
    })
  }

  
})