var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    // 组件数组
    assemblies: [],

    // 贴纸类型
    stickerTypes: [
      { name: 'food',color: '#59c8b1',count: 24},
      { name: 'travel',color: '', count: 20},
      { name: 'sport',color: '',count: 20},
      { name: 'plant',color: '',count: 20},
      { name: 'national_flag',color: '',count: 31}
    ],

    // 图片素材信息
    allBackground: new Array(9),
    backgroundUrl: '', // 请求后台的背景图
    backgroundId: '1',
    backgroundPath: null,
    stickerUrl: '', // 请求后台的贴纸图
    currentStickerType: 'food',
    currentStickers: [], 

    // 控制组件选中状态
    selected: false,
    hidden: true,
    border: '',

    // 是否正在编辑文本
    addingText: false,

    // 当前页面最高层级
    max_z_index: 1,

    // 控制RichTabBar的动画效果
    backgroundAnimation: '',
    backgroundBottom: '-305rpx',
    backgroundRichTabBarDidOpen: false,

    stickerAnimation: '',
    stickerBottom: '-305rpx',
    stickerRichTabBarDidOpen: false,

    // 当前手帐信息
    journal_id: '',
    journal_book_id: '',

    // 手帐本列表
    bookList: [],

    // 相关组件的当前索引
    currentScrollLeft: 0,
    currentPickerIndex: 0,

    containerHeight: '',
    windowBottom: ''
  },
  
  // 初始化相关数据
  onLoad: function(option) {
    // TODO: 向服务端请求加载背景图和贴纸图
    var res = wx.getSystemInfoSync()
    this.downloadBackgroundImage(this.data.backgroundId)
    this.setData({
      currentStickers: new Array(this.data.stickerTypes[0].count),
      containerHeight: (2 * res.windowHeight - 105).toString(),
      windowBottom: (res.windowHeight - res.windowWidth * 1112 / 750 - 52.5).toString()
    })
  },

  // 下载背景图
  downloadBackgroundImage: function(backgroundId) {
    // TODO: 正确修改背景图
    this.setData({
      backgroundPath: "../../images/bg.jpg"
    })
  },

  showBackgroundRichTabBar: function() {
    this.setData({
      backgroundAnimation: 'rich-tab-bar-open',
      backgroundBottom: '0',
      backgroundRichTabBarDidOpen: true
    })
  },

  showStickerRichTabBar: function() {
    this.setData({
      stickerAnimation: 'rich-tab-bar-open',
      stickerBottom: '0',
      stickerRichTabBarDidOpen: true
    })
  },

  // 取消所有组件的选中状态并关闭 RichTabBar
  onRefreshView: function(callback) {
    var that = this

    this.setData({
      selected: false,
      hidden: true,
      border: ''
    })

    if (this.data.backgroundRichTabBarDidOpen) {
      this.setData({
        backgroundAnimation: 'rich-tab-bar-close',
        backgroundBottom: '-305rpx'
      })
      setTimeout(function() {
        that.setData({
          backgroundRichTabBarDidOpen: false
        })
      }, 300)
    }

    if (this.data.stickerRichTabBarDidOpen) {
      this.setData({
        stickerAnimation: 'rich-tab-bar-close',
        stickerBottom: '-305rpx'
      })
      setTimeout(function() {
        that.setData({
          stickerRichTabBarDidOpen: false
        })
      }, 300)
    }

    if (typeof callback === 'function') {
      callback()
    }
  },

  // 移除组件
  onRemoveComponent: function(e) {
    // 移除组件列表中的相关项
    for (var i in this.data.assemblies) {
      if (this.data.assemblies[i].id === e.target.id) {
        this.data.assemblies.splice(i, 1);
        break
      }
    }

    // 刷新组件数据
    this.setData({
      assemblies: this.data.assemblies
    })
  },

  // 刷新组件数据
  onRefreshData: function(e) {
    for (var i in this.data.assemblies) {
      if (this.data.assemblies[i].id === e.target.id) {
        this.data.assemblies[i].stickerCenterX = e.detail.stickerCenterX
        this.data.assemblies[i].stickerCenterY = e.detail.stickerCenterY
        this.data.assemblies[i].scale = e.detail.scale
        this.data.assemblies[i].rotate = e.detail.rotate
        this.data.assemblies[i].z_index = e.detail.z_index
      }
    }
    this.setData({
      assemblies: this.data.assemblies
    })
  },

  // 更新当前页面最高层级
  onUpdateMax_z_index: function() {
    this.setData({
      max_z_index: this.data.max_z_index += 1
    })
  },

  // 点击背景选项卡弹出BackgroundRichTabBar
  onBackgroundTabTap: function() {
    var that = this,
      flag = this.data.backgroundRichTabBarDidOpen

    this.onRefreshView(function() {
      if (!flag) {
        that.showBackgroundRichTabBar()
      }
    })
  },

  // 点击贴纸选项卡弹出StickerRichTabBar
  onStickerTabTap: function() {
    var that = this,
      flag = this.data.stickerRichTabBarDidOpen

    this.onRefreshView(function() {
      if (!flag) {
        that.showStickerRichTabBar()
      }
    })
  },

  // 点击图片选项卡弹出图片选择ActionSheet
  onImageTabTap: function() {
    var that = this

    this.onRefreshView()

    wx.chooseImage({
      count: 1, //默认只从相册/照相机选择一张
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // 获取图片信息
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: imageInfoRes => {
            // 新图片入栈
            that.data.assemblies.push({
              id: Math.random().toString(36).substr(2, 4), // 随机生成4位id
              component_type: 'image',
              image_url: res.tempFilePaths[0],
              stickerCenterX: 375,
              stickerCenterY: 300,
              scale: 1,
              rotate: 0,
              wh_scale: imageInfoRes.width / imageInfoRes.height,
              z_index: that.data.max_z_index + 1 // 默认置于最顶层
            })

            // 刷新界面
            that.setData({
              assemblies: that.data.assemblies
            })

            that.onUpdateMax_z_index() //更新界面层级
          }
        })
      }
    })
  },

  // 点击文字选项卡添加自定义文字
  onTextTabTap: function() {
    this.onRefreshView()

    // 显示弹框
    this.setData({
      addingText: true
    })
  },

  onInputCancel: function() {
    // 隐藏弹框
    this.setData({
      addingText: false
    })
  },

  onInputConfirm: function(e) {
    // 隐藏弹框
    this.setData({
      addingText: false
    })

    if (e.detail) {
      // 新文字组件入栈
      this.data.assemblies.push({
        id: Math.random().toString(36).substr(2, 4), // 随机生成4位id
        component_type: 'text',
        text: e.detail,
        stickerCenterX: 375,
        stickerCenterY: 300,
        scale: 1,
        rotate: 0,
        z_index: this.data.max_z_index + 1 // 默认置于最顶层
      })

      // 刷新界面
      this.setData({
        assemblies: this.data.assemblies
      })
    }
  },

  // 点击贴纸类型选项卡则切换高亮选项
  onStickerTypeTap: function(e) {
    if (e.target.dataset.type) {
      for (var i in this.data.stickerTypes) {
        if (this.data.stickerTypes[i].name === e.target.dataset.type) {
          this.data.stickerTypes[i].color = '#59c8b1'
          this.data.currentStickers = new Array(this.data.stickerTypes[i].count)
        } else {
          this.data.stickerTypes[i].color = ''
        }
      }
      this.setData({
        stickerTypes: this.data.stickerTypes,
        currentStickerType: e.target.dataset.type,
        currentStickers: this.data.currentStickers,
        currentScrollLeft: 0
      })
    }
  },

  // 添加新贴纸
  onStickerTap: function(e) {
    console.log(e.target.id)
    if (e.target.id) {
      this.onRefreshView()
      this.data.assemblies.push({
        id: Math.random().toString(36).substr(2,4),
        component_type: 'sticker',
        sticker_type: this.data.currentStickerType,
        sticker_id: e.target.id,
        image_url: "../../images/sticker.jpg",
        stickerCenterX: 375,
        stickerCenterY: 300,
        scale: 0.5,
        rotate: 0,
        z_index: this.data.max_z_index+1 // 默认放置在最顶层
      })
      this.setData({assemblies: this.data.assemblies})
      this.onUpdateMax_z_index()
    }
  },

  onBackgroundTap: function(e) {
    console.log(e.target.id)
    if (e.target.id) {
      this.onRefreshView()
      this.downloadBackgroundImage(e.target.id)
      this.setData({
        backgroundId: e.target.id
      })
    }
  },

  // 提交数据
  onJournalBookSelected: function(e) {
    // 取消所有组件选中状态
    this.onRefreshView()

    // 构造页面传递数据
    var data = {
      backgroundId: this.data.backgroundId,
      backgroundPath: this.data.backgroundPath,
      assemblies: this.data.assemblies
    }
    
    // 界面跳转
    /*
    wx.redirectTo({
      url: '/pages/save/save?data=' + JSON.stringify(data),
    })*/
  }
})