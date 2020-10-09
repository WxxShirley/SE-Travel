// pages/components/mainpage/mainpage.js
var mockData = require("../../models/mockData.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: [
      '/images/places/外滩.jpeg','/images/places/欢乐谷.jpeg', '/images/places/迪士尼.jpeg','/images/places/魔都矩阵.jpeg', ],
    swiperCurrent: 0,
    navList: [ // 宫格导航
      {name: '路径规划', events: 'tapNav', icon: 'location',color: 'lightblue'},
      {name: '景点攻略', events: 'goTourist', icon: 'fire',color:'pink'},
      {name: '旅行手帐', events: 'tapNav', icon: 'photo', color:'lightgreen'},
      {name: '寻找驴友', events: 'tapNav', icon: 'friends', color: 'orange'},
      {name: '解锁成就', events: 'tapNav', icon: 'award', color: 'yellow'}
    ],
    leftList: [],
    rightList: [],
    backTopValue: false, // “返回顶部”

  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached: function(){
      var leftData = [];
      var rightData = [];
      // TODO: 加载所有热门攻略
      for(let i=0;i<mockData.shares.length;i++){
        var shortDescrip = mockData.shares[i].content.substring(0,20);

        mockData.shares[i].shortDescrip = shortDescrip+"....";
        if(i%2==0){
          leftData.push(mockData.shares[i]);
        }else{
          rightData.push(mockData.shares[i]);
        }
      }
      this.setData({
        leftList: leftData,
        rightList: rightData
      })
    }
  },
  methods: {
     // 轮播图事件改变
    swiperChange: function(e){
      this.setData({swiperCurrent: e.detail.current})
    },

    // 用户点击搜索栏
    onSearchTap:()=>{
      console.log("tap")
      wx.navigateTo({
        url: "../search/search"
      })
    },
    
    // 点击了宫格导航栏
    tapNav:function (e){
      wx.showToast({
        title:'点击:'+this.data.navList[e.target.id].name
      });
    },

    // 进入到景点
    goTourist: function(e){
      wx.navigateTo({
        url: "../touristAttraction/touristAttraction",
      })
    },

  }
})
