var data = require("../../utils/staticData");

Page({
  data: {
    hotPlace: [
      {title:"外滩", description:"建筑群美轮美奂，夜景不可错过", imgSrc:"../../images/waterfall/1.jpeg"},
      {title:"迪士尼乐园",description:"进入迪士尼的梦幻童话世界", imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"田子坊",description:"最有味道的弄堂",imgSrc:"../../images/waterfall/3.jpeg"},
    ],
    onSeason: [
      {title:"朱家角古镇",description:"江南水乡古镇，古意盎然", imgSrc:"../../images/waterfall/3.jpeg"},
      {title:"泰晤士小镇",description:"浓郁的欧式建筑风情，适合摄影",imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"佘山公园",description:"山体中秀，林木葱郁", imgSrc:"../../images/waterfall/1.jpeg"},
    ],
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