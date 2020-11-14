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
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached: function(){
      var leftData = []
      var rightData = []
      this.getGuideData(0, 20)
      
      for(let i=0;i<4;i++){
          var d = this.guideData[i]
          d.amILike = false
  
          if(i%2==0){
            leftData.push(d)
          }else{
            rightData.push(d)
          }
        }
     
      this.setData({
        leftList: leftData,
        rightList: rightData,
      })
    }
  }, 

  methods: {
    onChange: function(event){
      // wx.showToast({
      //   title: `切换到标签 ${event.detail.name}`,
      //   icon: 'success',
      // });
      console.log(event.detail+1)
      this.setData({active: event.detail.name});
    },

    getGuideData: function(skip, num){
      const db = wx.cloud.database()
      var that = this
      db.collection("guide").skip(skip).limit(num).get().then(res=>{
        console.log(res)
        that.setData({
          guideData: res.data
        })
        wx.showToast({
          title: `res${res.data[0].title}`,
          icon: 'success',
        })
      })
      // wx.cloud.callFunction({
      //   name: 'getEntry',
      //   data: {collection: 'guide', skip: skip, num: num},
      //  }).then(res=>{
      //   console.log(res)
      //   this.setData({
      //     guideData: res.result.data
      //   })
      //   wx.showToast({
      //     title: `res${res.result.data.length}`,
      //     icon: 'success',
      //   })
      // })
    },
  }
})
