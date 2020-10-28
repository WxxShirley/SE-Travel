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
      address:obj.loc
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})