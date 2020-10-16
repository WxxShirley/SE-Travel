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
    hotList:[
      {title:"外滩", description:"建筑群美轮美奂，夜景不可错过", imgSrc:"../../images/waterfall/1.jpeg"},
      {title:"迪士尼乐园",description:"进入迪士尼的梦幻童话世界", imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"田子坊",description:"最有味道的弄堂",imgSrc:"../../images/waterfall/3.jpeg"},
      {title:"南京路步行街",description:"大上海繁华的商业街", imgSrc:"../../images/waterfall/3.jpeg"},
      {title:"城隍庙",description:"古色古香如集市，不可错过的夜景", imgSrc:"../../images/waterfall/2.jpeg"},
      {title:"1933老场坊",description:"建筑设计简约，拍照打卡圣地", imgSrc:"../../images/waterfall/1.jpeg"}
    ],
    seasonList:data.onSeasonAttr,
    filepath: data.path
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

  goDetail: function(e){
    console.log(e.currentTarget.id)
    utils.goattrDetail(e.currentTarget.id);
  }
})