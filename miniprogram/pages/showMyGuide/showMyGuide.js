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
    wx.showLoading({ title: '',})
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
      console.log(event.currentTarget.id);
      wx.cloud.callFunction({
        name: 'deleteEntry',
        data:{isMessage:true,guide_id:event.currentTarget.id}
      }).then(res=>
        {
        wx.cloud.callFunction({
          name: 'deleteEntry',
          data: {collection:'guide',_id:event.currentTarget.id}
        }).then(result=>
          this.loadGuide() // 重新加载
        )
      }
      )
    },

    gotoDetail: function(e){
      console.log(e)
      var guideObj=JSON.stringify(this.data.guidelist[Number(e.target.id)])
      wx.navigateTo({
        url: '../guideDetail/guideDetail?guide='+guideObj,
      })
    }
  


  
})