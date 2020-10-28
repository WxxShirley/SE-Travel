// 地图界面
Page({
  data: {
    title: '详细地址',
    address:"测试地址",
    longitude: null, // 初始化经纬度为外滩经纬度
    latitude: null,
    scale: 12,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var that = this
    
    var obj = JSON.parse(options.mapObj)
    console.log(obj)
    var marker = [{id:1, 
      latitude: obj.lat,
      longitude:obj.lng,
      address:obj.loc,
      callout: {
        content: obj.loc,  //文本
        color: '#FF0202',  //文本颜色
        borderRadius: 3,  //边框圆角
        borderWidth: 1,  //边框宽度
        borderColor: '#FF0202',  //边框颜色
        bgColor: '#ffffff',  //背景色
        padding: 5,  //文本边缘留白
        textAlign: 'center'  //文本对齐方式。有效值: left, right, center
      }
    }]
    
    this.setData({
      latitude: obj.lat,
      longitude:obj.lng,
      address:obj.loc, 
      markers: marker
    })
    
    var that = this
    
    // 得到用户当前的位置
    wx.getLocation({
      type: 'gcj02',
      success(res){
        console.log(res)
      }
    })
    
  },

  
})