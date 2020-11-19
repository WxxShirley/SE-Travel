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
      }
      this.callCloudFunc(likeContent,this.data.dataset[e.target.id].amILike)

      if(this.data.dataset[e.target.id].amILike==true){
        this.data.dataset[e.target.id].amILike=false;
        this.data.dataset[e.target.id].like-=1;
      }else{
        this.data.dataset[e.target.id].amILike=true;
        this.data.dataset[e.target.id].like+=1;
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
        console.log(res.errMsg)
        console.log(res.result)
        if(res.errMsg!="cloud.callFunction:ok"){
          wx.showToast({
            title: '出错了..',
          })
        }
      })
    },
   

  }
})
