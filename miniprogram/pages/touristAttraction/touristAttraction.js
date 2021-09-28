var data = require("../../utils/staticData");
var utils = require("../../utils/util.js");

Page({
  data: {
    hotPlace: null,
    onSeason: data.onSeasonAttr.slice(0,3),
    districts:data.districtMp,
    mainActiveIndex: 0,
    max: 2
  },

  onLoad: function(options){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('touristAttraction').orderBy('hotDegree','desc').get()
    .then(res=>{
       console.log(res.data)
        var hotList = res.data.slice(0,3)
        for(var i=0;i<3;i++){
          hotList[i].imgSrc = hotList[i].imgSrc[0]
        }
        console.log(hotList)
        this.setData({hotPlace:hotList,})
        wx.hideLoading()
     })
  },
  
  onClickNav: function({detail={}}){
    this.setData({
      mainActiveIndex: detail.index||0,
    })
    console.log(detail)
  },

  onClickItem({detail={}}){
    console.log(detail.id)
    utils.goattrDetail(detail.id)
  },

  // 用户点击搜索栏,界面跳转到搜索
  onSearchTap:()=>{
    console.log("tap")
    wx.navigateTo({
      url: "../search/search"
    })
  },

  
})