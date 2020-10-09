// miniprogram/pages/publish/publish.js
Page({
  data: {
    imgList: [],
    desc: ''
  },
  
  // 获得用户文本框内输入内容
  getInput(event){
    console.log("输入内容",event.detail.value)
    this.setData({desc: event.detail.value});
  },
  
  // 选择图片
  ChooseImage(){
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
  publish(){
    let desc = this.data.desc; // 用户文本内容
    let imgList = this.data.imgList; // 上传图片集合
    if(!desc || desc.length<3){
      wx.showToast({
        icon: "none", title:"内容长度需要大于3"
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
    
    wx.showLoading({
      title: '正在发布...',
    })

    // TODO: 上传到云端
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})