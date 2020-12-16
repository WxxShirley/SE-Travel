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
        loc: this.data.attractionObj.geoInfo.location,
        title: this.data.attractionObj.title,
        iconPath: '../../images/marker_big.png',
      }
    )
    
    let cnt=1, total_num = Math.min(this.data.attractionObj.nearBy.length,10);
    if(total_num==0){
      // 直接进入景区详情界面，无需查询
      mapObj['markers'] = markers
      mapObj['id'] = this.data.attractionObj.id
      mapObj = JSON.stringify(mapObj)
      wx.navigateTo({
        url: '../../pages/attractionDetail/mapView?mapObj=' + mapObj,
       })
    }

    for(var i = 0; i < total_num; i ++)
    {
      app.getInfoWhere(
        'touristAttraction',
        {
          id: this.data.attractionObj.nearBy[i],
        },
        res=>{
          console.log(markers)
          cnt++
          markers.push(
            {
              id: res.data[0].id,
              latitude: res.data[0].geoInfo.lat,
              longitude: res.data[0].geoInfo.lng,
              loc: res.data[0].geoInfo.location,
              title: res.data[0].title,
              iconPath: '../../images/marker_small.png',
            }
          )
          if(total_num <= cnt+2){
            mapObj['markers'] = markers
            mapObj['id'] = this.data.attractionObj.id
            mapObj = JSON.stringify(mapObj)
            wx.navigateTo({
              url: '../../pages/attractionDetail/mapView?mapObj=' + mapObj,
             })
          }
        }
      )
    }
    
  },
})