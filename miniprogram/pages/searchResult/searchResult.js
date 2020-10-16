// 返回搜索结果的界面
var data = require("../../utils/staticData.js")
var utils = require("../../utils/util")
const app = getApp()

Page({
  data: {
    list: null, // 显示的景区集合
    filepath: utils.path
  },
  onLoad: function (options) {
    // 对界面传递的数据进行解析
    var res=JSON.parse(options.res)
    this.setData({
      list: res,
      filepath: data.path
    })
  },

  goDetail: function(e){
     // TODO: 增加景区热度
     var id_ = e.currentTarget.id
    

     utils.goattrDetail(id_)
   }

})