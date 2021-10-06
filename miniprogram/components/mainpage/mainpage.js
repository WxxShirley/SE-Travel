// pages/components/mainpage/mainpage.js
var utils = require("../../utils/util.js")

Component({
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: [
    
      {id: 166,imgSrc: 'cloud://env-dev-4g6anmt6c45832a8.656e-env-dev-4g6anmt6c45832a8-1303853824/attractions/太湖.jpeg'},
      {id: 151,imgSrc: 'cloud://env-dev-4g6anmt6c45832a8.656e-env-dev-4g6anmt6c45832a8-1303853824/attractions/拙政园.jpeg'},
      {id: 158,imgSrc: 'cloud://env-dev-4g6anmt6c45832a8.656e-env-dev-4g6anmt6c45832a8-1303853824/attractions/留园.jpeg'},
      {id: 169,imgSrc: 'cloud://env-dev-4g6anmt6c45832a8.656e-env-dev-4g6anmt6c45832a8-1303853824/attractions/金鸡湖.jpeg'},
      {id: 21,imgSrc: 'cloud://env-dev-4g6anmt6c45832a8.656e-env-dev-4g6anmt6c45832a8-1303853824/attractions/朱家角.jpeg'}
    ],
    swiperCurrent: 0,
    showAuthButton: false,
    navList: [ // 宫格导航
      {name: '旅行手帐',  icon: 'edit', pageUrl: '../diary/diary'},
      {name: '景点介绍',  icon: 'fire', pageUrl: '../touristAttraction/touristAttraction'},
      {name: '发布攻略', icon: 'photo',pageUrl:'../publish/publish'},
      {name: '寻找驴友',  icon: 'friends',pageUrl:'../friend/friend'},
      {name: '解锁成就', icon: 'award',pageUrl: '../achievements/achievements'},
    ],
    skip: 0,//Math.ceil(Math.random()*10),
    num: 5,
    leftList: [],
    rightList: [],
    guideData: [],
    noMore: false,
    backTopValue: false, // “返回顶部”

  },

  /**
   * 组件的方法列表
   */
  lifetimes:{

    attached: function(){
      this.getGuideData(this.data.skip, this.data.num)
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
    },

   
    onClose: function(e){
      this.setData({showAuthButton:false})
    },
    getGuideData: function(){
      var that = this
       wx.cloud.callFunction({
         name: 'getEntry',
         data: {collection: 'guide', skip: that.data.skip,num: that.data.num, main:true},
        }).then(res=>{
         console.log(res)
         
         var left = that.data.leftList, right = that.data.rightList;
         if(res.result.data.length==0){
          that.setData({
            noMore: true
          })
        }  
         for(var i=0;i<res.result.data.length;i++){
           if(i%2)
             right.push(res.result.data[i])
           else 
             left.push(res.result.data[i])
           that.data.guideData.push(res.result.data[i])
         }  
         var newSkip = that.data.skip+that.data.num
         that.setData({
           guideData: that.data.guideData,
           leftList: left,
           rightList: right,
           skip: newSkip
         })
       })
    },
    handleItemLeftChange:function(e){
      console.log(e.detail)
      var lList = this.data.leftList
      if(e.detail.type=="delLike"){
       lList[e.detail.index].like-=1
        lList[e.detail.index].amILike=false
      }else if(e.detail.type="addLike"){
        lList[e.detail.index].like+=1
        lList[e.detail.index].amILike=true
      }
      this.setData({
        leftList: lList
      })
    },
    handleItemRightChange:function(e){
      console.log(e.detail)
      var rList = this.data.rightList
      if(e.detail.type=="delLike"){
        rList[e.detail.index].like-=1
        rList[e.detail.index].amILike=false
      }else if(e.detail.type="addLike"){
        rList[e.detail.index].like+=1
        rList[e.detail.index].amILike=true
      }
      this.setData({
        rightList: rList
      })
    },

  }
})
