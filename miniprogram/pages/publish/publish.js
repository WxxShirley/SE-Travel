// miniprogram/pages/publish/publish.js
const app=getApp(); 
const utils = require("../../utils/util")

const allTags = {
  tourist_attraction : ['巴金故居', '宝藏湾', '碧海金沙', '蔡元培故居', '长乐路', '城隍庙旅游区', '沉香阁', '陈毅广场', '陈云纪念馆', '崇明岛国家地质公园', '大宁郁金香公园', '丁香花园', '迪士尼小镇', ' 滴水湖', '东方绿舟', '东方明珠', '东林寺', '东平国家森林公园', '东滩湿地公园', '多伦路文化名人街', '放生桥', '方塔园', '枫泾古镇', '复旦大学', '共青国家森林公园', '顾村公园', '古猗园', '淮海路', '黄浦江', '嘉定孔庙', '静安别墅', '静安寺', '锦江乐园', '金茂大厦', '金茂大厦88层观光厅', '金山城市沙滩', '巨鹿路', '课植园', '老码头', '龙华寺', '龙美术馆西岸馆', '陆家嘴', '陆家嘴中心绿地', '鲁迅公园', '鲁迅故居', '鲁迅纪念馆', '马勒别墅', '毛 泽东旧居', '梅赛德斯-奔驰文化中心', '明日世界', '南京路步行街', '南翔古镇', '浦东第一图书馆', '浦东开发陈列馆', '七宝老街', '青浦博物馆', '秋霞圃', '曲水园', '人民广场', '上海 文庙', '上海笔墨博物馆', '上海滨江森林公园', '上海玻璃博物馆', '上海博物馆', '上海城隍庙', '上海城市规 划展示馆', '上海辰山植物园', '上海大观园', '上海当代艺术博物馆', '上海当代艺术馆', '上海大自然野生昆虫馆', '上海电影博物馆', '上海迪士尼度假区', '上海动物园', '上海杜莎夫人蜡像馆', '上海工艺美术博物馆', '上海海昌海洋公园', '上海海湾国家森林公园', '上海海洋水族馆', '上海话剧艺术中心', '上海欢乐谷', '上海环球金融中心', '上海环球金融中心观光天阁', '上海交通大学', '上海基督教沐恩堂', '上海科技馆', '上海老街', '上海琉璃艺术博物馆', '上海马戏城', '上海玛雅海滩水公园', '上海汽车博物馆', '上海世博园', '上海外滩美术馆', '上海鲜花港', '上海野生动物园', '上海影视乐园', '上海犹太难民纪念馆', '上海邮政博物馆', '上海长风海洋世界', '上海展览中心', '上海植物园', '上海中心大厦', '上海中心大厦上海之巅观光厅', '上海自然博物馆', '佘山国家森林公园', '佘山天主教堂', '世纪公园', '思南公馆', '思南路', '宋庆龄故居纪念馆', '宋庆龄陵园', '孙中山故居纪念馆', '苏州河', '泰晤士小镇', '甜爱路', '天马山公园', '田子坊', '同济大学', '外白渡桥', '外滩', '外滩观光隧道', '外滩万国建筑博览群', '武康大楼', '武康路', '吴淞炮台湾湿地森林公园', '小桃园清真寺', '新场古镇', '新天地', '西沙湿地公园', '徐家汇天主教堂', '徐家汇源景区', '银行博物馆', '月湖雕塑公园', '玉佛禅寺', '豫园', '愚园路', '长风公园', '召稼楼', '真如寺', '中共一大会址', '中国航海博物馆', '中华艺术宫', '钟书阁', '周公馆', '周浦花海', '朱家角古镇景区', '醉白池','1933老场坊', 'M50创意园', 'SkyBridgeHQ 天会（原凌空SOHO）',],
  character :['自驾游','情侣出行','闺蜜打卡','古色古香','养生休闲','红色之旅','游乐园','探险体验','民俗体验','感受名校','影视基地','周末活动','深度人文','亲子游','清凉夏日','自然探索']
}

Page({
  data: {
    imgList: [],
    desc: '',
    tags: [],
    TagNum: 0,
    save: false,
    title: '',
    //控制tags的变量
    TagRichTabBarDidOpen: false,
    TagTypes: [
      { name: 'tourist_attraction',color: '#59c8b1',count: 150},
      { name: 'character',color: '', count: 16},
    ],
    currentTagType: 'tourist_attraction',
    currentTags: [],
    addTag:'',
    currentScrollTop: 0,
    currentPickerIndex: 0,

    TagAnimation: '',
    TagBottom: '-305rpx',
    TagRichTabBarDidOpen: false,
  },
  // 获得用户文输入的标题
  getTitle(event){
    console.log("输入标题",event.detail.value)
    this.setData({title: event.detail.value});
  }, 
    // 获得用户文本框内输入内容
  getInput(event){
    console.log("输入内容",event.detail.value)
    this.setData({desc: event.detail.value});
  },
  // 获得用户文本框内输入内容
  getInput(event){
    console.log("输入内容",event.detail.value)
    this.setData({desc: event.detail.value});
  },
  
  // 选择图片
  ChooseImage(){
    this.onRefreshView()
    wx.chooseImage({
      count: 8-this.data.imgList.length,
      sizeType: ['compressed'], // 指定图片为压缩格式
      sourceType: ['album'] , // 默认从相册中选择
      success:(res)=>{
        console.log("图片选择成功",res);
        if(this.data.imgList.length!=0){
          this.setData({imgList: this.data.imgList.concat(res.tempFilePaths)})
        }else{
          this.setData({imgList:res.tempFilePaths});
        }
        console.log("目前图片路径:", this.data.imgList)
      }
    })
  },

  // 删除图片
  DeleteImg(e){
    // 弹出Modal的方式让用户进一步选择
    this.onRefreshView()
    wx.showModal({
      title: '确定删除这张照片吗?',
      content: '',
      cancelText: '取消',
      confirmText:'确定',
      success: res=>{
        if(res.confirm){
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({imgList: this.data.imgList});
        }
      }
    })
  },

  // 上传图片
  publish: function(e){
    let desc = this.data.desc; // 用户文本内容
    let imgList = this.data.imgList; // 上传图片集合
    var tags = this.data.tags
   
    if(!desc || desc.length<5){
      wx.showToast({
        icon: "none", title:"内容长度需要大于5"
      })
      return 
    }
    if(!imgList || imgList.length<1){
      wx.showToast({
        icon: "none",
        title:"请选择图片"
      })
      return 
    }
    if(!tags || tags.length<1){
      wx.showToast({
        icon: "none",
        title:"请选择标签"
      })
      return
    }
    wx.showLoading({
      title: '正在发布...',
    })
    // 景区攻略
    var guide = {
      "user_avatar": app.globalData.userInfo.avatarUrl,
      "nickname": app.globalData.userInfo.nickName,
      "timestamp": utils.formatTime(new Date()),// 用户发布的时间戳
      "txt_content":desc, // 攻略文本内容
      "shortDescrip": desc.substr(0,20)+"...",
      "tags": tags,
      "like":0, // 点赞数目，初始化为0
      "title": this.data.title,
    }
    guide.imgList = []
    var tmpCounter = 0 , imgNum = imgList.length

    var that = this;
    imgList.map((item,index)=>{
      wx.cloud.uploadFile({
        cloudPath: 'guide_image/'+new Date().getTime() + item.match(/\.[^.]+?$/)[0],
        filePath: item
        }).then(res=>{
          console.log(res.fileID)
          guide.imgList.push(res.fileID)
          tmpCounter++ 
          //  STEP2 所有图片上传完毕, 调用云函数，执行更新diary数据库操作
          console.log("current imgCounter",tmpCounter)
          if(tmpCounter==imgNum){
            guide.imgSrc = guide.imgList[0]
            wx.getLocation({
              type: 'gcj02',
              success (res) {
                console.log(res)
                guide['longitude'] = res.longitude
                guide['latitude'] = res.latitude
                console.log(guide)
                wx.cloud.callFunction({
                  name: 'addEntry',
                  data: {item: guide, collection: 'guide'},
                  }).then(res=>{
                  console.log(res.errMsg)
                  wx.hideLoading() 
                  if(res.errMsg=="cloud.callFunction:ok"){
                    that.setData({save:true})
                  }else{
                    wx.showToast({
                      title: '出错了..',
                    })
                  }
                })
              }
            })
          }
        })
    })
  },
 // 关闭 RichTabBar
 onRefreshView: function(callback) {
  var that = this
  if (this.data.TagRichTabBarDidOpen) {
    this.setData({
      TagAnimation: 'rich-tab-bar-close',
      TagBottom: '-305rpx'
    })
    setTimeout(function() {
      that.setData({
        TagRichTabBarDidOpen: false
      })
    }, 300)
  }

  if (typeof callback === 'function') {
    callback()
  }
},
showTagRichTabBar: function() {
  this.setData({
    TagAnimation: 'rich-tab-bar-open',
    TagBottom: '0',
    TagRichTabBarDidOpen: true
  })
},
onTagTabTap: function() {
  /*var that = this,
    flag = this.data.TagRichTabBarDidOpen

  this.onRefreshView(function() {
    if (!flag) {
      that.showTagRichTabBar()
    }
  })*/
  wx.navigateTo({
    url: '../publish/chooseTag',
  })
},


// 点击tag类型选项卡则切换高亮选项
onTagTypeTap: function(e) {
  if (e.target.dataset.type){
    console.log(this.data.TagTypes, e.target.dataset.type)
    for (var i in this.data.TagTypes) {
      if (this.data.TagTypes[i].name === e.target.dataset.type) {
        this.data.TagTypes[i].color = '#59c8b1'
        this.data.currentTags = new Array(this.data.TagTypes[i].count)
        this.data.currentTags = allTags[e.target.dataset.type]
      } else {
        this.data.TagTypes[i].color = ''
      }
    }
    this.setData({
      TagTypes: this.data.TagTypes,
      currentTagType: e.target.dataset.type,
      currentTags: this.data.currentTags,
      currentScrollTop: 0
    })
  }
  
},
//手动添加新tag
onChange: function(e){
  this.setData({
    addTag: e.detail,
  });
  console.log(e.detail);
},
onAdd: function(e){
  if(this.data.addTag.length == 0) 
    return
  let result = this.data.tags.find(ele => ele === this.data.addTag)
  if (!result) {
    console.log("add a tag")
    var newtag = {"id": this.data.TagNum, "tag": this.data.addTag} 
    this.data.tags.push(newtag)
    this.data.TagNum++
    this.setData({
      tags: this.data.tags,
      TagNum: this.data.TagNum
    })
  }
},
// 点击添加新tag
onTagTap: function(e) {
  console.log(e.target.id)
  if (e.target.id) {
    var newtag = {"id": this.data.TagNum, "tag": this.data.currentTags[parseInt(e.target.id)-1]} 
    this.data.tags.push(newtag)
    this.data.TagNum++
    this.setData({
      tags: this.data.tags,
      TagNum: this.data.TagNum
    })

  }
},
onClosetag: function(e){
  console.log("closetag:",e.target.id)
  this.data.tags.splice(e.target.id,1)
  this.setData({tags: this.data.tags})

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTags: allTags[this.data.currentTagType]
    })
  },
})

