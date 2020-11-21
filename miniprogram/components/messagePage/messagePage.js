// components/messagePage/messagePage.js
Component({
  properties: {
  },

  data: {
    likeNotice: null,
   
  },

  lifetimes: {
    attached: function(e){
      // 加载该用户的所有消息
      this.loadMessage()
    }
  },

  methods: {
    loadMessage: function(e){
       wx.cloud.callFunction(
         {
           name: 'loadUserMessage',
           data: {}
         }
       ).then((res)=>{
         console.log(res.result.data)
         this.setData({
           likeNotice: res.result.data,

         })
        getApp().globalData._hasNewMessage = false
       })
    }
  }
})
