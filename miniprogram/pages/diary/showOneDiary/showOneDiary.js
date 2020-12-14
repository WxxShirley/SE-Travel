/*  
    展示一个手帐的图
*/
Page({
  data: {
    imgSrc: ""
  },

  onLoad: function (options) {
    wx.showLoading()
    var imgPath = options.path 
    this.setData({
      imgSrc: imgPath
    })

    wx.hideLoading()
  },

  
})