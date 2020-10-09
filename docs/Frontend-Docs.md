## 前端文档



### 文件夹说明

`components`:  抽象的组件

`pages`: 各个界面

`plugins`: 使用到的插件，目前前端一些UI使用了开源框架`vant weapp`。该文件夹下是这个框架的源码。

> 使用`vant weapp`中组件的办法：
>
> * 先在`app.json`的`usingComponents`中注册，比如使用它的button:
>
>   ```
>   "van-button": "plugins/vantComponents/dist/button/index"
>   ```
>
>   使用哪个组件把名字(比如上面的button)换一下就可以了
>
> * 之后就可以直接使用了，使用的时候是我们注册的名字，上面的例子就是`van-button`

`style`: 一些抄的其他地方的格式

`utils`: 一些功能函数

`models`: 目前存放了一个模拟数据的文件，[未来计划]将一些数据模型/本地的数据



### 设计说明

* 架构

  由于主页实现了底部导航栏，如果使用微信小程序原生的界面跳转，界面跳转效果并不理想。因此这里把主页、发现、消息、我的做成了4个component. 当监听到页面切换事件，加载对应的component

  > 主页、发现、消息分别对应`components`下的`mainpage`, `findPage`,`messagePage`

* 主页

  * 将猜你喜欢部分抽象成了组件`waterfall`，即瀑布流，方便在发现界面继续复用

* 景点攻略

  * “当季景点”和“热门景点”的组成一样的，无非数据不同，因此抽象成了组件`showAttraction`. 其内容为一行内显示3张图片，图片底部为名称，下面为介绍。

  