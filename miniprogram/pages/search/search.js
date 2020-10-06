// pages/search/search.js
var mockData = require('../../models/mockData.js');

Page({
  data: {
    hotSearchPlace: [],
    searchHistory: null,
    searchInput: ''
  },
  
  // 删除本地缓存的搜索历史记录
  deleteSearchHistory: function(){
    wx.setStorageSync('searchHistory', [])
    this.setData({searchHistory: []})
  },
  
  // 获取数据 - 搜索历史以及热搜地点
  onLoad: function (options) {
    this.setData({
     hotSearchPlace: mockData.hotPlace,
     searchHistory: wx.getStorageSync('searchHistory')
     })
  },

  onSearch: function(event){
    var place = event.detail;
    // TODO: 向服务端发起查找请求
    // 修改本地缓存及界面变量
    var his = wx.getStorageSync('searchHistory')||[];
    his.push(place);
    this.setData({searchHistory: his});
    wx.setStorage({data: his,key: 'searchHistory',})
  },

})