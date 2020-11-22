Page({
  data: {
    friendPost: [], //searchFriend
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadFriend()
  },

  loadFriend: function(){
    // 加载自己的驴友贴
    wx.showLoading({ title: '正在加载',})
    wx.cloud.callFunction({
      name: 'loadUserAll',
      data: {collection: 'searchFriend'},
    }).then(res=>{
      console.log(res)
      this.setData({
        friendPost: res.result.data
      })
      wx.hideLoading()
    })
  },

 
    deletePost: function(event) {
      console.log(event)
      const { position, instance } = event.detail;
      var that = this
      console.log(position,instance)
      wx.cloud.callFunction({
        name: 'deleteEntry',
        data: {collection:'searchFriend' ,_id:event.currentTarget.id}
      }).then(res=>{
        //console.log(e.detail)
        this.loadFriend() // 重新加载
      })
    },
  


  
})