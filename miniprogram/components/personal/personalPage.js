// components/personal/personalPage.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 进入到手帐界面
    goFootmark: function(e) {
      wx.navigateTo({
        url: '../../pages/footmark/footmark',
      })
    },

    goDiary: function(e){
      console.log(e)
      wx.navigateTo({
        url: '../../pages/diary/diaryList/diaryList',
      })
    },
    goPost: function(e){
      console.log(e)
      wx.navigateTo({
        url: '../../pages/post/post',
      })
    },

    goGuide: function(e){
      console.log(e)
      wx.navigateTo({
        url: '../../pages/showMyGuide/showMyGuide',
      })
    },

    goAboutus: function(e){
      wx.navigateTo({
        url: '../../components/personal/aboutus/aboutus',
      })
    },

    goFeedback: function(e){
      wx.navigateTo({
        url: '../../components/personal/userFeedback/userFeedback',
      })
    }
  }
})
