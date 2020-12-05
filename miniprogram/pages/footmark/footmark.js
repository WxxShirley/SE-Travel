// miniprogram/pages/footmark/footmark.js
Page({
  data: {
    latitude:31.243452887043176,
    longitude:121.49720404433653,
    scale: 9,
    iconList: [
      'blue', 'cherry', 'deepblue', 'green', 'purple', 'red', 'yellow'
    ],
    guides: [],
    markers: [],
  },

  onLoad() {
    wx.cloud.callFunction({
      name: 'loadUserAll',
      data: {
        collection: 'guide',
      },
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        guides: res.result.data,
      })
      let markers = []
      for(var i = 0; i < res.result.data.length; i ++) {
        let iconPath = this.getRandColorIcon()
        markers.push({
          id: i,
          longitude: res.result.data[i].longitude,
          latitude: res.result.data[i].latitude,
          iconPath: iconPath,
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          },
          zIndex: 100,
          callout: {
            content: res.result.data[i].title,
            display: 'ALWAYS',
            padding: 2,
            borderRadius: 4,
            anchorY: 10,
            fontSize: 14,
          }
        })
      }
      console.log(markers)
      this.setData({
        markers: markers,
      })
    })
  },

  getRandColorIcon() {
    return '../../images/' + this.data.iconList[Math.floor(Math.random() * this.data.iconList.length)] + '.png';
  },

  markertap(e) {
    const newId = Number(e.markerId);
    console.log(this.data.guides[newId])
    var guideObj = JSON.stringify(this.data.guides[newId])
    wx.navigateTo({
      url: '../guideDetail/guideDetail?guide=' + guideObj,
    })
  },
})