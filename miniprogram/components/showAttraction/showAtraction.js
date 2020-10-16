// components/showAttraction/showAtraction.js
var data = require("../../utils/staticData");
const { goattrDetail } = require("../../utils/util");
var utils = require("../../utils/util");

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
    filepath: data.path
  },

  methods: {
    goToList: function(e){
      wx.navigateTo({
        url: '../listview/tourList',
      })
    },
    
    gotoDetails: function(e){
      console.log(e.currentTarget.id)
      var id = e.currentTarget.id
      goattrDetail(id)
    }

  }
})
