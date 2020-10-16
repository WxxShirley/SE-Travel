// pages/components/mainpage/mainpage.js
var mockData = require("../../models/mockData.js");
var utils = require("../../utils/util.js")

Component({
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: [ 
      {id: 1,imgSrc: '/images/places/外滩.jpeg'},
      {id: 8,imgSrc: '/images/places/欢乐谷.jpeg'},
      {id: 3,imgSrc: '/images/places/迪士尼.jpeg'},
      {id: 7,imgSrc: '/images/places/科技馆.jpeg'},
      {id: 21,imgSrc: '/images/places/朱家角.jpeg'},
      {id: 11,imgSrc: '/images/places/城隍庙.jpeg'}
    ],
    swiperCurrent: 0,
    navList: [ // 宫格导航
      {name: '旅行手帐',  icon: 'edit', pageUrl: '../diary/diary'},
      {name: '路径规划', icon: 'location', pageUrl:'../demo/demo'},
      {name: '景点攻略',  icon: 'fire', pageUrl: '../touristAttraction/touristAttraction'},
      {name: '发布攻略', icon: 'photo',pageUrl:'../publish/publish'},
      {name: '寻找驴友',  icon: 'friends',pageUrl:null},
      {name: '解锁成就', icon: 'award',pageUrl:null},
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

    // 用户点击搜索栏,界面跳转到搜索
    onSearchTap:()=>{
      console.log("tap")
      wx.navigateTo({
        url: "../search/search"
      })
    },
    
    // 点击宫格导航栏,界面跳转到对应的界面
    tapNav:function (e){
      if(this.data.navList[e.target.id].pageUrl){
        wx.navigateTo({
          url: this.data.navList[e.target.id].pageUrl,
        })
      }else{
        wx.showToast({
          title:'点击:'+this.data.navList[e.target.id].name
        });
      }
    },
    
    // 进入到景区的详细界面
    goAttractionDetail: function(e){
      var id_ = e.target.id // 景区id
      utils.goattrDetail(id_)
    }
  }
})
