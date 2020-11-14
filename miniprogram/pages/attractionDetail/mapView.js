// 地图界面
Page({
  data: {
    longitude: null,
    latitude: null,
    markers: [],
    id: null
  },

  onLoad: function (options) { 
    var mapObj = JSON.parse(options.mapObj)

    for(var i=0;i<mapObj.markers.length;i++){
      var marker = mapObj.markers[i];
      marker["callout"] = {
        content: marker.title + ',' +marker.loc,
        color: '#FF0202',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FF0202',
        bgColor: '#ffffff',
        padding: 5,
        textAlign: 'center'
      }
    }

    this.setData(
      {
        latitude: mapObj.latitude,
        longitude: mapObj.longitude,
        markers: mapObj.markers,
        id: mapObj.id
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
    console.log(e.markerId)
    if(e.markerId!=this.data.id)
        utils.goattrDetail(e.markerId)
  }
})