// pages/listview/tourList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentTab:0,
    navTitle:[
      {title: "热门景点"},
      {title:"当季景点"}
    ],
    list: [],
    hotList:[
      {title:"外滩", description:"建筑群美轮美奂，夜景不可错过", imgSrc:"../../images/waterfall/1.jpeg"},
      {title:"迪士尼乐园",description:"进入迪士尼的梦幻童话世界", imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"田子坊",description:"最有味道的弄堂",imgSrc:"../../images/waterfall/3.jpeg"},
      {title:"南京路步行街",description:"大上海繁华的商业街", imgSrc:"../../images/waterfall/4.jpeg"},
      {title:"城隍庙",description:"古色古香如集市，不可错过的夜景", imgSrc:"../../images/waterfall/5.jpeg"},
      {title:"1933老场坊",description:"建筑设计简约，拍照打卡圣地", imgSrc:"../../images/waterfall/6.jpg"}
    ],
    seasonList:[
      {title:"朱家角古镇",description:"江南水乡古镇，古意盎然", imgSrc:"../../images/waterfall/7.jpeg"},
      {title:"泰晤士小镇",description:"浓郁的欧式建筑风情，适合摄影",imgSrc:"../../images/waterfall/8.jpg"},
      {title:"佘山公园",description:"山体中秀，林木葱郁", imgSrc:"../../images/waterfall/9.jpeg"},
      {title:"新天地",description:"石库门建旧区，古色古香",imgSrc:"../../images/waterfall/10.jpeg"},
      {title:"上海科技馆",description:"全方位了解自然科学，适合亲子游",imgSrc:"../../images/waterfall/11.jpeg"},
      {title:"七宝古镇",description:"集游览、观光、餐饮、休闲一体",imgSrc:"../../images/waterfall/12.jpeg"},
    ]
  },

  onLoad: function (options) {
    this.setData({list: this.data.hotList})
  },

  handleClick: function(e){
    let currentTab = e.currentTarget.dataset.index;
    if(currentTab==0)
       this.setData({list: this.data.hotList});
    else
       this.setData({list: this.data.seasonList})
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