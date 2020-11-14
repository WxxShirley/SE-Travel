var mockData = require("../../models/mockData")

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
    noMore: false //是否还有更多数据
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached: function(){
      var leftData = []
      var rightData = []
      
      this.getGuideData(this.data.skip, this.data.num)
    }, 
  },

  methods: {
    onChange: function(event){
      console.log(event.detail+1)
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
              left.push(res.result.data[i])
           else 
              right.push(res.result.data[i])
         }
        var newSkip = that.data.skip+that.data.num
         that.setData({
           guideData: res.result.data,
           leftList: left,
           rightList: right,
           skip: newSkip
         })
         console.log(that.data.guideData)
       })
    },
}
})
