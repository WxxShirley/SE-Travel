// 地图界面
Page({
  data: {
    longitude: null,
    latitude: null,
    markers: []
  },

  onLoad: function (options) { 
    var mapObj = JSON.parse(options.mapObj)
    this.setData(
      {
        latitude: mapObj.latitude,
        longitude: mapObj.longitude,
        markers: mapObj.markers,
      }
    )
    wx.getLocation(
      {
        type: 'gcj02'
      }
    )
  },

  goFromMarkerToAttractionDetail: function (e) {
    var utils = require('../../utils/util')
    utils.goattrDetail(e.detail)
  }
})