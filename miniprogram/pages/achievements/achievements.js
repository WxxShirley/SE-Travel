// miniprogram/pages/achievements/achievements.js
const app=getApp();

Page({
  data: {
    avatar: null,
    badgeName: ["社交达人", "笔耕不辍", "知无不言"],  //徽章名字
    content: ["驴友贴", "手账", "攻略"],  //徽章内容
    imgSrc: ['/images/assets/badge-fp.png', '/images/assets/badge-diary.png', '/images/assets/badge-guide.png'],
    number: [null, null, null],  //发布的数量
    level: [null, null, null],  //等级
    gap: [null, null, null],  //升级需要的篇数    
    className: ["badge-left", "badge-right", "badge-left"],  //css class名，用于排版
    levelSrc: ["/images/assets/lv1.png", "/images/assets/lv2.png", "/images/assets/lv3.png"],
    fontColor: ["#791D2C", "#8376A2", "#336859"]
  },

  onLoad: function (options) {
    this.setData({
      avatar:app.globalData.userInfo.avatarUrl
    })
    // 获取数量，计算等级
    this.loadData()
  },

  loadData: function(){
    const lv2 = 5
    const lv3 = 25
    var tmp = [null, null, null]
    var name = ["searchFriend", "diary", "guide"]
    var level = [null, null, null]
    var gap = [null, null, null]
    for (let index = 0; index < 3; index++) {
      wx.cloud.callFunction({
        name: 'loadUserAll',
        data: {collection: name[index]},
      }).then(res=>{
        console.log(res)
        tmp[index] = res.result.data.length
        if (res.result.data.length < lv2) {
          level[index] = 1
          gap[index] = lv2 - res.result.data.length
        }else if(res.result.data.length >= lv2 && res.result.data.length < lv3){
          level[index] = 2
          gap[index] = lv3 - res.result.data.length
        }else{
          level[index] = 3
        }

        this.setData({
          number: tmp,
          level: level,
          gap: gap
        })
        wx.hideLoading()
      })      
    }
  },
})