Page({
  data: {
    friendPost: [], //searchFriend
    falseVar: false
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

  // 删除驴友帖，先弹出选择确认框 防止用户误删  
    deletePost: function(event) {
      var that = this
      
      wx.showModal({
        title: '提示',
        content: '确定删除驴友帖吗？',
        success: res => {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'deleteEntry',
              data: {collection:'searchFriend' ,_id:event.currentTarget.id}
            }).then(res=>{
              //console.log(e.detail)
              that.loadFriend() // 重新加载
            })
          }
        }
      })
    },
  
})