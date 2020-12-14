
Component({
  properties: {
    journal_id: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    previewImageUrl: {
      type: String,
      value: ''
    },
    date: {
      type: String,
      value: ''
    }
  },

  data: {
  },

  methods: {
    // 点击设置图标则弹出设置 ActionSheet
    onSettingsTap: function() {
      var that = this

      wx.showActionSheet({
        itemList: ['保存到相册',  '移除手帐'],
        success: res => {
          switch (res.tapIndex) {
            case 0:
              {
                // 下载预览图
                wx.cloud.downloadFile({
                  fileID: that.data.previewImageUrl,
                  success: downloadRes => {
                    // 保存预览图到相册
                    wx.saveImageToPhotosAlbum({
                      filePath: downloadRes.tempFilePath,
                      success: () => {
                        wx.showToast({title: '保存成功', })
                      }
                    })
                  },
                  fail: error => {
                    wx.showToast({ title: '保存失败', })
                    console.log(error)
                  }
                })
                break
              }
            case 1:
              {
                wx.showModal({
                  title: '提示',
                  content: '确定移除手帐吗？',
                  success: res => {
                    if (res.confirm) {
                      // TODO:删除手帐
                      wx.cloud.callFunction({
                        name: 'deleteEntry',
                        data: {collection:'diary' ,_id:that.data.journal_id}
                      }).then(res=>{
                        this.triggerEvent("itemChange", "delete")
                      })
                    }
                  }
                })
                break
              }
          }
        }
      })
    },
    onJournalTap: function(e){
      console.log(this.data.previewImageUrl)
      wx.navigateTo({
        url: '../../diary/showOneDiary/showOneDiary?path='+this.data.previewImageUrl,
      })
    }
  }
})