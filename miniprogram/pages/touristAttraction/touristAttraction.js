Page({
  data: {
    hotPlace: [
      {title:"外滩", description:"建筑群美轮美奂，夜景不可错过", imgSrc:"../../images/waterfall/1.jpeg"},
      {title:"迪士尼乐园",description:"进入迪士尼的梦幻童话世界", imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"田子坊",description:"最有味道的弄堂",imgSrc:"../../images/waterfall/3.jpeg"},
    ],
    onSeason: [
      {title:"朱家角古镇",description:"江南水乡古镇，古意盎然", imgSrc:"../../images/waterfall/7.jpeg"},
      {title:"泰晤士小镇",description:"浓郁的欧式建筑风情，适合摄影",imgSrc:"../../images/waterfall/8.jpg"},
      {title:"佘山公园",description:"山体中秀，林木葱郁", imgSrc:"../../images/waterfall/9.jpeg"},
    ],
    districts:[
      {text:"黄浦区", dot: false, children: [{text:"外滩", id:"0101",imgSrc:"../../images/waterfall/1.jpeg"}, {text:"田子坊", id:"0102",imgSrc:"../../images/waterfall/3.jpeg"},{text:"南京路步行街",id:"0103", imgSrc: "../../images/waterfall/2.jpeg"},
      {text:"豫园",id:"0104",imgSrc:"./../images/waterfall/6.jpeg"}]},
      {text:"徐汇区", dot: false, children: [{text:"龙华寺", id:"0201",imgSrc:"../../images/waterfall/2.jpeg"}, {text:"徐家汇", id:"0202", imgSrc:"../../images/waterfall/4.jpeg"} ,{text:"上海植物园", id:"0203",imgSrc:"../../images/waterfall/3.jpeg"},
      {text:"滨江大道",id:"0204",imgSrc:"./../images/waterfall/8.jpeg"}]},
      {text:"长宁区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"静安区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"普陀区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"虹口区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"杨浦区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"闵行区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"宝山区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"嘉定区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"浦东新区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"金山区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"松江区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"青浦区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"奉贤区", dot: false, children: [{text:"静安寺", id:1}]},
      {text:"崇明区", dot: false, children: [{text:"静安寺", id:1}]},
    ],
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