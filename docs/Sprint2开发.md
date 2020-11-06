## Sprint2开发


### 总结一下遇到的坑
* js闭包中的`this`可能会和指代界面的全局`this`冲突，因此有的时候需要用其他变量指示`this`
```javascript
var that = this;

wx.cloud.downloadFile({
   fileID: '...', // 下载的文件名,
   success: res=>{
      that.setData({
      }) //注意此处用that
   }
})

```

* `wx.navigateTo`和`wx.redirectTo`比较
这两者都可以进行界面跳转,不同的是在界面形成的栈结构中，`wx.navigateTo`会将下一个要进入的界面入栈，界面深度是+1的，从新的界面返回会回到当前界面；
而`wx.redirectTo`界面会进行界面的重定向，会把当前界面从栈顶移出，将要进入的界面移入栈顶，因此如果从新界面返回，会回到原来的界面的上一级。
为了方式界面不停嵌套，而且微信小程序允许的界面栈深度为10. 有些时候使用`wx.redirectTo`非常必要。
> 目前在景区搜索功能里，界面都使用`navigaTo`来跳转，界面堆叠严重，后需要优化

* 同步和异步问题
有些地方可以通过`callback`函数强行同步。
或者设定较大的时间间隔调用`setTimeout`函数。
在`saveDiary`界面中，画布渲染后要将预览图上传到云端，但是非常诡异的是即使调用了`callback`函数也不能执行，🌚😈😈😈 
只能通过`setTimeOut`函数并且把时间调整为2s(这个延时效果非常差了....)才能正确执行


* 父子组件传值
在`diaryList`界面，是展示一个个用户已完成的手帐的缩略图界面，点击每个手帐的`setting menu`，会弹出是否删除或者保存图片的底部弹窗。如果选择了删除，会调用云函数删除指定的手帐。
但是这里是在`journal`组件里完成的，完成后这个组件需要告诉`diaryList`界面,也就是父子组件通信的问题，这样`diaryList`界面知道了有手帐被删除，重新发出加载的请求使得界面重新渲染，而不是用户手动下拉刷新。
在小程序里父子组件通信的方法：
```javascript
// 父组件的.wxml界面使用子组件时
<sonComponennt ... bindItemChange = "handleItemChange">

// 父组件的.js文件中编写handleItemChange函数，即处理子组件有变化时的逻辑函数
handleItemChange: function(e){
   console.log(e.detail) // 子组件传入的值
   // 执行相应的逻辑，比如在diaryList中就是重新请求加载所有的diary，调用this.setData({})使界面重新渲染
}

// 子组件中在合适的位置：
this.triggerEvent('itemChange', obj) // obj是要传递给父组件的内容

```

* 关于复用性
在我做的功能里，即用户编辑完手帐进入画布渲染、生成预览图上传、提供保存到本地的功能和在个人中心加载用户所有手帐功能中，为了快速实现功能，
各个云函数的实现已经放弃了复用，直接为删除手帐、加载手帐编写云函数。。🤦‍♀️
这个可能也是未来优化的目标，下次一定。。。

* 云函数操作小程序数据库的CRUD操作：
参考1[云函数操作数据库](https://zhuanlan.zhihu.com/p/120256279)
参考2[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Database.html)
