Page({
  data: {
    guidelist: [], //guidelist
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGuide()
  },

  loadGuide: function(){
    // 加载自己的攻略
    var that = this
    wx.showLoading({ title: '正在加载',})
    wx.cloud.callFunction({
      name: 'loadUserAll',
      data: {collection: 'guide'},
    }).then(res=>{
      
      that.setData({
        guidelist: res.result.data
      })
      console.log(that.data.guidelist)
      wx.hideLoading()
    })
  },

 
    deleteGuide: function(event) {
      console.log(event)
      const { position, instance } = event.detail;
      var that = this
      console.log(position,instance)
      wx.cloud.callFunction({
        name: 'deleteEntry',
        data: {collection:'guide' ,_id:event.currentTarget.id}
      }).then(res=>{
        //console.log(e.detail)
        this.loadGuide() // 重新加载
      })
    },

    gotoDetail: function(e){
      console.log(e)
      var guideObj=JSON.stringify(this.data.guidelist[Number(e.target.id)])
      wx.navigateTo({
        url: '../guideDetail/guideDetail?guide='+guideObj,
      })
    }
  


  
})