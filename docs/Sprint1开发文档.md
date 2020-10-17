## Sprint1开发文档

### 文件夹说明

>* `components`路径下为抽象出来的各个组件，可以复用
>
>* `pages`路径下为各个界面的代码。
>
>  ⚠️⚠️⚠️为什么主页(mainpage)、发现页(findPage)、消息(messagePage)定义在`component`中？
>
>  ​      因为它们是由主页根据底部导航栏切换tab显示的，如果定义成`page`，切换界面闪烁效果很差，因此定义成了`component`

```
├── miniprogram                 // 前端
│   ├── app.js                  // 小程序启动时执行的代码，以及全局数据和函数定义
│   ├── app.json                // 配置文件，使用vant框架中的component或者自己抽象时，需要在其中定义
│   ├── app.wxss                // 小程序全局wxss格式
│   ├── components              // 抽象出来的可复用的各个组件
│   │   ├── findPage            // “发现”页
│   │   ├── inputBox            // 组件:可以输入一段文本的浮动框，在编辑手帐界面调用
│   │   ├── journal             // 组件:可以显示一个手帐封面
│   │   ├── mainpage            // “主页”
│   │   ├── messagePage         // “消息"页
│   │   ├── showAttraction      // 组件:一行展示3个景区信息,在`touristAttraction`界面调用两次
│   │   ├── sticker             // 组件:贴纸，在编辑手帐界面调用
│   │   └── waterfall           // 组件:瀑布流，在主页展示“猜你喜欢”攻略中调用，后面发现页也可调用
│   ├── images                  // 使用到的图片
│   ├── models                  // 模拟数据[模拟了主页猜你喜欢的攻略]
│   │   └── mockData.js
│   ├── package-lock.json
│   ├── pages
│   │   ├── attractionDetail    // 景区详细内容界面,接受[景区对象]为参数
│   │   ├── diary               // 编辑手帐界面
│   │   ├── index               // app主页，这里根据tab分别显示`mainpage`/`findpage`等
│   │   ├── listview            // 以listview形式展示热门景区与当季景区的界面
│   │   ├── publish             // 发布攻略界面
│   │   ├── search              // 搜索界面
│   │   ├── searchResult        // 展示景区搜索界面，search界面获得搜索结果后将结果List做为参数传入
│   │   └── touristAttraction   // “景点攻略界面”,展示热门、当季和分区景点
│   ├── sitemap.json
│   ├── style                   // 一些全局格式
│   └── utils                   // 功能函数
│       ├── staticData.js       // 一些静态数据，比如上海区到景点的映射
│       └── util.js             // 功能函数，比如goattrDetail(id)，进入ID为id的景区详细界面
└── project.config.json 
```



### 小程序开发简单介绍

* 前端

  * 当我们需要新建一个界面时，在`pages`下先新建一个文件夹，之后在新建的文件夹下选择`新建page`.这时候小程序会自动生成四个界面，并且将这个界面配置到`app.json`的`pages`中。四个界面分别是`.js, .json, .wxml, ,wxss`这里`.js`主要写界面的逻辑，比如`onLoad` 编写界面初始化的函数，`data`是这个界面的内置的数据，我们可以调用`this.setData({})`对这个界面内置数据修改，会触发界面的重新渲染 。  `.wxml`主要写界面的布局.` .wxss`是类CSS文件主要写界面的格式。

    > 总的来说，小程序类似于React这样的框架，并且抽象得更加简单了

  * 当有一些组件经常被使用，我们可以将它们抽象成component。与pages不同的是它需要手动在`app.json`中的`usingComponent`中进行注册。另外，小程序原生的组件并不丰富，我还使用了有赞框架中的许多组件,比如景区评分和一些好看的icon等，这些组件在使用前也要在其中注册。详细内容可以参阅[有赞文档](https://vant-contrib.gitee.io/vant-weapp/#/intro)

  * 微信小程序集成了非常多的API，非常方便我们的使用

    ```javascript 
    wx.navigateTo() // 界面跳转
    
    wx.showLoading() // 显示界面正在加载提示，非常适合我们需要加载数据的时候显示一个toast给用户这个提示信息，加载完成后再调用 hideLoading
    
    wx.chooseImage() // 选择图片，里面的参数可以设定，详见`publish.js`中的使用方法
    ···
    ```

  大家需要简单了解目前已有的界面的布局和相应的逻辑处理函数(在对应的`.js` 和 `.wxml` 文件中)

* 云数据库

  * 目前景区信息我们通过导入json的方式存储在云端，表的名字为`touristAttraction`. 

  * 新建一个数据库时，需要**配置好相应的权限**（所有人可读）、**创建好相关的索引**。目前使用的版本**前端对数据库可读，但是不可写**，因此**所有写数据库都需要调用云函数完成**。

    ```javascript
    // 前端查询数据库
    /* 
          云数据库查询模版 (定义在app.js中)
          @param: setName 查询的数据库名称
          @param: ruleObj 查询的字段
          @param: callback 查询成功的回调函数
      */
    getInfoWhere: function(setName, ruleObj, callback){
       const db=wx.cloud.database()
       db.collection(setName).where(ruleObj)
         .get({
            success: callback,
            fail: console.error
         })
    },
    // 如果我们查询 ‘touristAttraction' 中 id 为1的景区信息，可以这样调用:
     app.getInfoWhere('touristAttraction',{id:1},res=>{
       console.log(res)
     }) 
    
    // 也可以不使用上面的模版，直接查询。比如查询热度最高的景区（小程序默认最多返回20个）
    wx.cloud.database().collection('touristAttraction').orderBy('hotDegree','desc')
     .get()
     .then(res=>{
           console.log(res.data)
    })
    ```

* 云函数

  * 对数据库有读写需求的功能，必须写云函数，然后前端调用。具体的流程是，在`cloudFunctions`中选择新建`Node.js`云函数，之后编写这个函数。需要上传到云端才可使用。

    > 在debug的时候，我们可以借助云开发控制台实现对数据库和云函数的监控

  * 一个示例，即当用户搜索并点击了某个景区后，这个景区的热度+1.

    ```javascript
    // 在云函数hotDegreeInc中定义
    const cloud = require('wx-server-sdk')
    cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
    const db = cloud.database() 
    const _ = db.command
    
    exports.main = async (event, context) => {
      // event是前端调用时传入的参数集合，小程序会自动加上这个用户的openid(微信的用户ID)，帮助我们实现了鉴权。
      try{
        return await db.collection('touristAttraction').where(
          {id: event.id} // event.id是前端调用时传入的参数，景区的id
        ).update({
         data: {hotDegree: _.inc(1)} // _.inc()来实现某个属性值的自增
        })
      }catch(e){
        console.log(e)
        return e
       }
    }
    
    // 前端调用这个云函数的办法， 在searchResult.js中有使用
         const db = wx.cloud.database()
         const _ = db.command
         wx.cloud.callFunction({
           name: 'hotDegreeInc', // 调用的云函数名称
           data: {id: parseInt(id_)} // 传递的参数集合
         }).then(res=>{
           console.log(res)
         }).catch(console.error)
    
    ```

    

