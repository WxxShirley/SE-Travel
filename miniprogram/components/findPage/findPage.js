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
    num: 8, // 每次加载的攻略数目，初始化为4
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
      {text:'科技馆', value:'科技馆'},
      {text:'朱家角', value:'朱家角'},
      {text:'豫园', value:'豫园'},
    ],
    value1:'random',
    value2: '景区不限',
    gender_choice:'random',
    attraction_choice:'景区不限',
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
         console.log(res);
         that.setData({
           searchFriendPosts: res.result.data,
           searchFriendPostsShow: res.result.data

         })
       })
    },
    
    /*
      !!! 瀑布流的爱心icon被点击时回调
       如果在waterfall中修改，本质上没有修改leftList/rightList的值，上滑后又会变成原来的数值
    */
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
    
   
    // 用户点击性别筛选时触发
    onGenderChange: function(e){
      this.data.gender_choice=e.detail
      console.log(this.data.gender_choice)
      if(e.detail=="random"){
        if(this.data.attraction_choice=='景区不限'){
          this.setData({
            searchFriendPostsShow: this.data.searchFriendPosts
          })
        }else{
          var that = this
          var showList = this.data.searchFriendPosts.filter(function(obj){
              return  obj.demands.bindAttraction.search(that.data.attraction_choice)!=-1
              //obj.demands.bindAttraction==that.data.attraction_choice
              
        })
          this.setData({
            searchFriendPostsShow: showList
          })
        }
      }else{
        var that = this
        var showList = this.data.searchFriendPosts.filter(function(obj){
          if(that.data.attraction_choice=='景区不限')
            return obj.demands.gender==e.detail
          else
            return obj.demands.gender==e.detail &&  obj.demands.bindAttraction.search(that.data.attraction_choice)!=-1
            //obj.demands.bindAttraction==that.data.attraction_choice
        })
        console.log(showList)
        this.setData({
          searchFriendPostsShow: showList
        })
      }
    },


    // 用户点击景点筛选后触发
    onAttractionChange: function(e){
      this.data.attraction_choice=e.detail
      console.log(this.data.attraction_choice)
      if(e.detail=="景区不限"){
          if(this.data.gender_choice=='random'){
            this.setData({
              searchFriendPostsShow: this.data.searchFriendPosts
            })
          }else{
            var that = this
            var showList = this.data.searchFriendPosts.filter(function(obj){
                return  obj.demands.gender==that.data.gender_choice 
          })
            this.setData({
              searchFriendPostsShow: showList
            })
          }
      }else{
        var that = this
        var showList = this.data.searchFriendPosts.filter(function(obj){
            if(that.data.gender_choice=='random')
              //return  obj.demands.bindAttraction==e.detail
              // 查找景区中包含了过滤条件的
              // 比如过滤条件是“迪士尼”(e.detail)，能够匹配“上海迪士尼” “迪士尼乐园”
              return obj.demands.bindAttraction.search(e.detail)!=-1
            else
              //return obj.demands.bindAttraction==e.detail && obj.demands.gender==that.data.gender_choice
              return obj.demands.bindAttraction.search(e.detail)!=-1 && obj.demands.gender==that.data.gender_choice
        })
        this.setData({searchFriendPostsShow:showList})
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
