var utils = require('../../utils/util')
const app=getApp()

Page({
  data: {
    hotSearchPlace: [],
    searchHistory: null,
    searchInput: ''
  },
  
  // 删除本地缓存的搜索历史记录
  deleteSearchHistory: function(){
    wx.setStorageSync('searchHistory', [])
    this.setData({searchHistory: []} )
  },
  
  // 获取数据 - 搜索历史以及热搜地点
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection('touristAttraction').orderBy('hotDegree','desc')
    .get()
    .then(res=>{
        this.setData({hotSearchPlace:res.data.slice(0,6),
          searchHistory: wx.getStorageSync('searchHistory')
        })
        wx.hideLoading()
     })
  },

  // 用户点击某个搜索历史后触发,将查找框的内容设置为该内容
  onTapHistory: function(event){
    this.setData({
      searchInput: event.target.id
    });
  },
  
  // 用户点击某个热门搜素后，将查找框的内容设置为该内容
  onTapHotplace: function(event){
    this.setData({searchInput: event.currentTarget.id});
  },

  onSearch: function(event){
    var place = event.detail;

    // TODO: 向服务端发起查找请求
    app.getInfoWhere(
      'touristAttraction',
      {
        title: wx.cloud.database().RegExp({regexp: place,options: 'i', }),
      },
      res=>{
        // 如果没有查询到，toast提示；否则跳转到结果界面
        if(res.data.length==0){
          wx.showToast({icon:'error',title:'未查询到！'})
        }else{
          var lists = JSON.stringify(res.data)
          wx.navigateTo({
            url: '../searchResult/searchResult?res='+lists,
          })
        }
      }
    )

    // 修改本地缓存及界面变量
    var his = wx.getStorageSync('searchHistory')||[];
    // 如果已经在本地缓存中了，则不再加入历史
    var idx = his.indexOf(place);
    if(idx==-1){
      his.push(place);
      this.setData({searchHistory: his});
      wx.setStorage({data: his,key: 'searchHistory',})
    }
  },

})