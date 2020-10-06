## Frontend-Sprint1-Detail

**在Sprint1 我们主要做景区介绍相关的功能。因此本月的目标是将景区介绍（不包含问答）界面设计完，与后端api集成，并完成这一部分的单元测试代码**



逻辑架构：

* 主页：

  元素包括：搜索栏、 滑动图 、 宫格导航 、 瀑布流展示攻略

* 发现页：

  分tab展示攻略/手帐/交友信息

* 消息：

  展示获得的赞/收到提问的消息

* 个人中心



主页设计（主页/点击搜索栏/景点攻略）：

<img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004214002874.png" alt="image-20201004214002874" style="zoom: 25%;" /><img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004214026293.png" alt="image-20201004214026293" style="zoom: 25%;" /><img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004214203980.png" alt="image-20201004214203980" style="zoom: 25%;" />



在景点攻略界面（上面第三个），点击“更多”会进入分tab模式的热门景点和当季景点。

消息和发现页：

<img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004214304238.png" alt="image-20201004214304238" style="zoom: 25%;" /><img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004215446755.png" alt="image-20201004215446755" style="zoom: 25%;" /><img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004215528546.png" alt="image-20201004215528546" style="zoom: 25%;" />



**目前需要完成的功能**：

* 景点详细界面的设计 、 与该界面有关的后端API集成

> 我们会有一个界面展示景点的详细信息。这个界面的参数就是包含景点信息的Object,形如:
>
> ```javascript
> var attraction = {
>      title: "外滩",
>      description: "上海地标，夜景美轮美奂",
>      id: "0001", // 唯一标志
>      geoInfo: {district:"黄浦区", location:"上海市黄浦区中山东一路",latitude:xx, longtitude:xxx},
>      imgSrc: [
>       "../../images/waterfall/1.jpeg",// 这些后面都要换成服务端提供的图片地址，所有图片都存储在服务端
>       "../../images/waterfall/4.jpeg"
>      ],
>   }
> ```
> 
>因此，无论是在主页的滑动图还是在景点攻略中点击景点的名称或者图片，都根据这个景点的id，获取它上面的景点信息。跳转到这个景点的详细界面。
> 
>景点详细界面的元素包括：
> 
>* Swiper: 轮播图展示该景区图片
> 
>* 位置信息，类似下面这样，点击可以进入大图的地图模式
> 
>  <img src="https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/image-20201004215058050.png" alt="image-20201004215058050" style="zoom:50%;" />
> 
>* 景区介绍信息
> 
>* （如果有：门票信息）
> 

* 返回搜索结果界面的设计，与该界面内容有关的API集成服务

> 另外，我们还需要一个返回搜索结果的页面
>
> 也是以ListItem的方式展示，每一个Item包括：
>
> [图片，名称/位置 ]
>
> 点击后进入该景点的详细界面
>
> （多说一句，做的customized一点可以增加筛选的功能2333......

* 其他所有已完成界面的API集成



