// miniprogram/pages/diary/saveDiary/saveDiary.js
Page({
  data: {
    journal_id: '',
    previewImageUrl: '',
    previewImagePath: '',
    backgroundId: '',
    backgroundPath: '',
    assemblies: []
  },

  onLoad: function (options) {
    // wx.showLoading({title: '正在渲染',})

    // 解析数据
    options = JSON.parse(options.data)
    console.log(options)
    this.setData({
      journal_id: options.journal_id,
      backgroundId: options.backgroundId,
      backgroundPath: options.backgroundPath,
      assemblies: options.assemblies
    })
    this.draw()
  },
  
  // 绘图函数
  draw: function(){
    // 按照z-index大小对组件排序
    var sortedAssemblies = this.data.assemblies.sort(function(value1,value2){
      if(value1.z_index < value2.z_index){
        return -1;
      }else if(value1.z_index > value2.z_index){
        return 1;
      }else{
        return 0;
      }
    })

    var ctx = wx.createCanvasContext('preview_canvas',this)
   
    // 设置文字对齐方式
    ctx.setTextAlign('center')
    ctx.setTextAlign('top')

    // 绘制背景图
    console.log(this.data.backgroundPath)
    ctx.drawImage(this.data.backgroundPath, 0, 0, 750, 1112)
   
    // 绘制组件
    for(var i in sortedAssemblies){
      ctx.translate(sortedAssemblies[i].stickerCenterX, sortedAssemblies[i].stickerCenterY)
      ctx.rotate(sortedAssemblies[i].rotate*Math.PI/180)

      switch(sortedAssemblies[i].component_type){
        case 'sticker':
          {
            ctx.drawImage(sortedAssemblies[i].local_url, -100 * sortedAssemblies[i].scale, -100 * sortedAssemblies[i].scale, 200 * sortedAssemblies[i].scale, 200 * sortedAssemblies[i].scale)
            break
          }
        case 'image':
          {
            if (sortedAssemblies[i].wh_scale >= 1) {
              ctx.drawImage(sortedAssemblies[i].image_url, -100 * sortedAssemblies[i].scale, -100 * sortedAssemblies[i].scale / sortedAssemblies[i].wh_scale, 200 * sortedAssemblies[i].scale, 200 * sortedAssemblies[i].scale / sortedAssemblies[i].wh_scale)
            } else {
              ctx.drawImage(sortedAssemblies[i].image_url, -100 * sortedAssemblies[i].scale * sortedAssemblies[i].wh_scale, -100 * sortedAssemblies[i].scale, 200 * sortedAssemblies[i].scale * sortedAssemblies[i].wh_scale, 200 * sortedAssemblies[i].scale)
            }
            break
          }
          case 'text':
            {
              // 初始化字体大小
              ctx.setFontSize(28 * sortedAssemblies[i].scale)
  
              // 分割字符串
              var textArray = sortedAssemblies[i].text.split(''),
                temp = '',
                row = []
  
              // 按长度组合每行的文本
              for (var j in textArray) {
                if (ctx.measureText(temp).width > 180 * sortedAssemblies[i].scale) {
                  row.push(temp)
                  temp = ''
                }
                temp += textArray[j]
              }
              row.push(temp)
  
              // 绘制文本
              for (var k in row) {
                ctx.fillText(row[k], 0, (4 * (k + 1) - 100) * sortedAssemblies[i].scale)
              }
  
              break
            }
      }
      // 恢复上下文状态
      ctx.rotate(-sortedAssemblies[i].rotate * Math.PI / 180)
      ctx.translate(-sortedAssemblies[i].stickerCenterX, -sortedAssemblies[i].stickerCenterY)
    }
 
   ctx.draw()
   var that = this
   setTimeout(function(){
    console.log("prev")
    wx.canvasToTempFilePath({
      canvasId: 'preview_canvas',
      success: res=>{
        // 保存预览图临时路径
        that.setData({previewImagePath: res.tempFilePath})

        wx.showLoading({  title: '正在上传', })

        wx.cloud.uploadFile({
          cloudPath: 'diary_preview/'+new Date().getTime() + res.tempFilePath.match(/\.[^.]+?$/)[0],
          filePath: res.tempFilePath,
          success: res=>{
            console.log(res.fileID) // 预览图上传的url
            wx.cloud.callFunction({
              name: 'uploadDiaryPreviewImage',
              data: {
                _id: that.data.journal_id,
                previewImageUrl: res.fileID
              }
            }).then(res=>{
              wx.hideLoading()
              console.log(res)
            })
          }
        })
      },fail: error=>{
        console.log("error")
        console.log(error)
      }
    }) 
  },2000)
   wx.hideLoading()
  },
  
  onSaveJournal: function(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.previewImagePath,
      success: res=>{
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  }
  
})