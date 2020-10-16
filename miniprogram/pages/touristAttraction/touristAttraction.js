var data = require("../../utils/staticData");
var utils = require("../../utils/util.js");

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
    console.log(detail)
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