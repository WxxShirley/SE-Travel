
Page({
  data: {
    journals: [], //journals
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDiary()
  },

  loadDiary: function(){
    // 加载手帐
    wx.showLoading({ title: '',})
    wx.cloud.callFunction({
      name: 'loadUserAll',
      data: {collection: 'diary'},
    }).then(res=>{
      console.log(res)
      this.setData({
        journals: res.result.data
      })
      wx.hideLoading()
    })
  },
  
  /*
     子组件journal被删除时回调，重新加载diary，使得界面刷新
  */
  handleItemChange: function(e){
    console.log(e.detail)
    this.loadDiary() // 重新加载
  }
  
})