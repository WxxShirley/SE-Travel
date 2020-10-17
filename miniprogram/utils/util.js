const app=getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 显示失败提示
var showModal = (title, content, doStringify = false) => {
  wx.hideToast()
  wx.showModal({
    title,
    content: doStringify ? JSON.stringify(content) : content,
    showCancel: false
  })
}

/*
    功能函数：进入到某个景区的详细界面
    @param: id ,景区的id(类型为string)
*/
function goattrDetail(id){
  app.getInfoWhere('touristAttraction',{id: parseInt(id),},
     res=>{
       if(res.data.length){
         var attractionObj=JSON.stringify(res.data[0])
         wx.navigateTo({
           url: '../attractionDetail/attractionDetail?attraction='+attractionObj,
         })
       }else{
         wx.showToast({
           title: '景区资源不存在喔~',
         })
       }
     }
    )
}


module.exports = {
  formatTime,
  showModal,
  goattrDetail,
}

