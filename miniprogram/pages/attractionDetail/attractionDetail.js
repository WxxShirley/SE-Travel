// 景区详情界面 
var data = require("../../utils/staticData");
const app = getApp()

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

  goMap: function(e) {
    var mapObj = {}
    mapObj['latitude'] = this.data.attractionObj.geoInfo.lat
    mapObj['longitude'] = this.data.attractionObj.geoInfo.lng
    var markers = []
    markers.push(
      {
        id: this.data.attractionObj.id,
        latitude: this.data.attractionObj.geoInfo.lat,
        longitude: this.data.attractionObj.geoInfo.lng,
      }
    )
    for(var i = 0; i < this.data.attractionObj.nearBy.length; i ++)
    {
      app.getInfoWhere(
        'touristAttraction',
        {
          id: this.data.attractionObj.nearBy[i],
        },
        res=>{
          markers.push(
            {
              id: res.data[0].id,
              latitude: res.data[0].geoInfo.lat,
              longitude: res.data[0].geoInfo.lng,
            }
          )
        }
      )
    }
    console.log(markers)
    mapObj['markers'] = markers
    mapObj = JSON.stringify(mapObj)
    wx.navigateTo({
      url: '../../pages/attractionDetail/mapView?mapObj=' + mapObj,
    })
  },

  goNavigation: function(e) {
    let plugin = requirePlugin('routePlan');
    let key = 'G5ABZ-DOAR4-6B2UZ-XBORG-KCVC2-IUBXG';  //使用在腾讯位置服务申请的key
    let referer = '沪驴';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': this.data.attractionObj.geoInfo.location,
      'latitude': this.data.attractionObj.geoInfo.lat,
      'longitude': this.data.attractionObj.geoInfo.lng
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
})