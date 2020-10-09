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
    this.setData({searchHistory: []} )
  },
  
  // 获取数据 - 搜索历史以及热搜地点
  onLoad: function (options) {
    this.setData({
     hotSearchPlace: mockData.hotPlace,
     searchHistory: wx.getStorageSync('searchHistory')
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