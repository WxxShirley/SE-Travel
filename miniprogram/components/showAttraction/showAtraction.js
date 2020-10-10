// components/showAttraction/showAtraction.js
Component({
  properties: {
    dataset: { // 展示的数据集
      type: Array,
      value: []
    },
    title: { // 展示的标题栏
      type: String,
      value: "热门景点"
    }
  },

  data: {

  },

  methods: {
    goToList: function(e){
      wx.navigateTo({
        url: '../listview/tourList',
      })
    }
  }
})
