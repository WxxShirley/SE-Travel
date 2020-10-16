var data = require("../../utils/staticData");

Page({
  data: {
    hotPlace: data.onSeasonAttr.slice(6,9),
    onSeason: data.onSeasonAttr.slice(0,3),
    districts:data.districtMp,
    mainActiveIndex: 0,
    activeId: [],
    max: 2
  },
  
  onClickNav: function({detail={}}){
    this.setData({
      mainActiveIndex: detail.index||0,
    })
  },

  onClickItem({detail={}}){
    const {activeId} = this.data;
    const index=activeId.indexOf(detail.id);
    if(index>-1){
      activeId.splice(index,1);
    }else{
      activeId.push(detail.id);
    }
    this.setData({activeId})
  },

  // 用户点击搜索栏,界面跳转到搜索
  onSearchTap:()=>{
    console.log("tap")
    wx.navigateTo({
      url: "../search/search"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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