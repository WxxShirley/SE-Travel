var data = require("../../utils/staticData");
var utils = require("../../utils/util.js");

Page({
  data: {
    hotPlace: data.onSeasonAttr.slice(6,9),
    onSeason: data.onSeasonAttr.slice(0,3),
    districts:data.districtMp,
    mainActiveIndex: 0,
    max: 2
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