// components/messagePage/messagePage.js
Component({
  properties: {
  },

  data: {
    tapLike: true,
    tapQues: false,
    likeNotice: [
      {uId:233, nickname:"胖虎" ,avatar: "../../images/userAvater/10.jpeg", title:" 最全上海欢乐谷攻略", timestap:"8:05"},
    ],
    quesNotice: [
      {uId:233, nickname :"胖虎" ,avatar: "../../images/userAvater/10.jpeg", 
      title:" 茶颜悦色饮品推荐?", timestap:"8:05"},
    ]
  },

  methods: {
    // 点击了"攻略获赞",展示该部分消息
    tapLikeNotice: function(){
      this.setData({
        tapLike:true, tapQues:null
      })
    },

    // 点击了"问题相关",展示该部分消息
    tapQuesNotice: function(){
      this.setData({
        tapLike: null, tapQues:true,
      })
      console.log("clikQues")
    }
  }
})
