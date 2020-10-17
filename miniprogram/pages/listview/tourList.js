var data = require("../../utils/staticData");
var utils = require("../../utils/util")

Page({
  data: {
    active: 0,
    currentTab:0,
    navTitle:[
      {title: "热门景点"},
      {title:"当季景点"}
    ],
    list: [],
    hotList:null ,
    seasonList:data.onSeasonAttr,
    filepath: data.path
  },

  onLoad: function (options) {
    // this.setData({list: this.data.hotList})
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('touristAttraction').orderBy('hotDegree','desc')
    .get()
    .then(res=>{
        var hotL = res.data.slice(0,9)
        for(var i=0;i<hotL.length;i++){
          hotL[i].imgSrc = this.data.filepath+hotL[i].imgSrc[0]
        }
        this.setData({hotList:hotL,})
        wx.hideLoading()
     })
  },

  handleClick: function(e){
    let currentTab = e.currentTarget.dataset.index;
    if(currentTab==0)
       this.setData({list: this.data.hotList});
    else
       this.setData({list: this.data.seasonList})
  },

  goDetail: function(e){
    console.log(e.currentTarget.id)
    utils.goattrDetail(e.currentTarget.id);
  }
})