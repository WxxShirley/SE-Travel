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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function(event){
      wx.showToast({
        title: `切换到标签 ${event.detail.name}`,
        icon: 'success',
      });
    }
  }
})
