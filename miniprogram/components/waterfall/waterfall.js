// components/waterfall/waterfall.js
const utils = require("../../utils/util")
const app=getApp();
Component({
  properties: {
    dataset:{ // 展示的数据集,由调用该组件的位置传入具体的数据
      type: Array,
      value: [],
    },
  },

  data: {
  },

  methods: {
    onBindtap: function(e){
      // 修改前端界面展示值的变化
      var likeContent = {
        "source_avatar": app.globalData.userInfo.avatarUrl,
        "source_nickname": app.globalData.userInfo.nickName,
        "timestamp": utils.formatTime(new Date()),// 用户发布的时间戳
        "target_id": this.data.dataset[e.target.id].openid,
        "guide_id": this.data.dataset[e.target.id]._id,
        "guide_title": this.data.dataset[e.target.id].title,
        "read": false,
        "target_nickname": this.data.dataset[e.target.id].nickname, 
        "target_avatar": this.data.dataset[e.target.id].user_avatar
      }
      this.callCloudFunc(likeContent,this.data.dataset[e.target.id].amILike)
      
      // 子组件向父组件触发函数itemChange
      if(this.data.dataset[e.target.id].amILike==true){
        this.triggerEvent('itemChange', {'index':e.target.id, 'type':'delLike'})
      }else{
        this.triggerEvent('itemChange', {'index':e.target.id, 'type':'addLike'})
      }
      this.setData({
        dataset: this.data.dataset
      })
    },
     //  将本次修改事件传入后台
    callCloudFunc: function(Content,amILike){  
      wx.cloud.callFunction({
        name: 'onLike',
        data: {item: Content,like: amILike},
       }).then(res=>{
         console.log(res)

      })
    },

    gotoDetail: function(e){
      var guideObj=JSON.stringify(this.data.dataset[e.target.id])
      wx.navigateTo({
        url: '../guideDetail/guideDetail?guide='+guideObj,
      })
    }
   

  }
})
