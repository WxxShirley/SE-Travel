var mockData = require("../../models/mockData")
const app=getApp()

// components/findPage/findPage.js
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
    active: 0,
    guideData: [], 
    leftList: [],
    rightList: [],
    skip: 0,
    num: 4, // 每次加载的攻略数目，初始化为4
    noMore: false,  //是否还有更多数据
    searchFriendPosts: [], //寻找驴友贴
    searchFriendPostsShow: [], //当前展示的内容

    option1: [
      {text: '性别不限', value:'random'},
      {text: '小哥哥', value:'male'},
      {text: '小姐姐', value:'female'},
    ],
    option2: [
      {text:'景区不限', value:'景区不限'},
      {text:'外滩', value:'外滩'},
      {text:'迪士尼', value:'迪士尼'},
      {text:'欢乐谷', value:'欢乐谷'},
    ],
    value1:'random',
    value2: '景区不限'
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached: function(){
      // 加载景点攻略
      this.getGuideData(this.data.skip, this.data.num)

      // 加载寻找驴友
      this.loadSearchFriendPosts()
    }, 
  },

  methods: {
    // 加载驴友贴
    loadSearchFriendPosts: function(){
      var that = this
       wx.cloud.callFunction(
         {
           name: 'loadFriend',
           data: {},
         }
       ).then((res)=>{
         that.setData({
           searchFriendPosts: res.result.data,
           searchFriendPostsShow: res.result.data

         })
       })
    },
    
    // TODO: 控制联合筛选条件
    // TODO: 调整卡片同样宽度

    // 用户点击性别筛选时触发
    onGenderChange: function(e){
      console.log(e.detail)
      if(e.detail=="random"){
        this.setData({searchFriendPostsShow:this.data.searchFriendPosts})
      }else{
        var showList = this.data.searchFriendPosts.filter(function(obj){
          return obj.demands.gender==e.detail
        })
        console.log(showList)
        this.setData({
          searchFriendPostsShow: showList
        })
        if(showList.length){
          this.selectComponent("#child").update()
        }
      }
    },

    // 用户点击景点筛选后触发
    onAttractionChange: function(e){
      if(e.detail=="景区不限"){
        this.setData({
          searchFriendPostsShow: this.data.searchFriendPosts
        })
      }else{
        var showList = this.data.searchFriendPosts.filter(function(obj){
          return obj.demands.bindAttraction==e.detail
        })
        this.setData({searchFriendPostsShow:showList})
        if(showList.length){
          this.selectComponent("#child").update()
        }
      }
    },

    onChange: function(event){
      this.setData({active: event.detail.name});
    },

    getGuideData: function(){

      var that = this
       wx.cloud.callFunction({
         name: 'getEntry',
         data: {collection: 'guide', skip: that.data.skip, num: that.data.num},
        }).then(res=>{
         console.log(res)
         
         var left = that.data.leftList, right = that.data.rightList;
         
         // 没有更多数据了
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
         console.log(that.data.guideData.length)

       })
    },
}
})
