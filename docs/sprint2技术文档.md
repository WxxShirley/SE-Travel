## Sprint2 技术相关



### 为什么不实现景区攻略分tag展示？

目前发现页的逻辑:

加载攻略首先赋值到`guideData`中，之后遍历`guideData`，将下标偶数的加入到`leftList`中，下标为奇数的加入到`rightList`中。之后界面的渲染调用了两次瀑布流组件实现左右两列渲染。

```css
<!--瀑布流显示 景点-攻略-->
<view wx:if="{{active==0}}" class="content">
  <view class="left">
    <waterfall dataset="{{leftList}}" binditemChange="handleItemLeftChange" />
  </view>

  <view class="right">
    <waterfall dataset="{{rightList}}" binditemChange="handleItemRightChange"/>
  </view>
```

这个时候如果有攻略点赞行为，逻辑是在`waterfall`组件中触发，但是我们为了界面渲染的一致性，需要修改对应的`leftList`和`rightList`，才能保证用户在**下拉后再返回效果一致**。（如果我们直接在`waterfall`中修改点赞样式，即`amILike`为True/False，`like`自增或者自减。当用户下拉会再次请求数据，使得`guideData`，`leftList`, `rightList`更新重新渲染界面；而我们所点赞的攻略它本身的`amILike`和`like`值未改动，因此界面还是点赞前的效果。因而正确的做法是在`waterfall`组件中触发回调函数，这个回调函数传入当前点赞的攻略在对应的rightList/leftList的下标和用户的行为(是点赞/取消点赞), `leftList`所渲染的`waterfall`组件每当被触发函数后，会将对应下标的攻略的`amILike`和`like`进行更新，这样保证了我们直接更新的是`leftList`或者`rightList`。因此无论界面怎么样经过下拉刷新等用户行为，点赞行为的显示效果是一致的。



如果我们要做攻略分tag展示，势必要增加一个变量名为`tagShow`，表明当前展示的攻略集合。当这个攻略被点赞时，仅仅在`tagShow`中修改它的`amILike`和`like`是不够的；如果用户又切换到主tag下(未经任何筛选的), 它的显示结果保证一致会逻辑比较麻烦。考虑了一下想放弃这个功能。我已经让zyz做个人中心的一个功能。





### 新消息小红点显示

核心的技术方法：

* 使用微信小程序数据库的`watch`方法开启对`message`表某个用户的所有信息的**监听**。当检测到变化时，根据变化的类型:包括`init`, `update`等这几种类型进行逻辑处理=>判断是否有新消息
* 是否有新消息这个变量作为全局变量`globalData`, 我们命名为布尔型变量`_hasNewMessage`。初始化为false,当有新消息到来时，我们设置`_hasNesMessage`为true.同时在主页面增加对全局变量`globalData`的监听，当监听到值发生变化时，如果修改为true，则导航栏显示小红点。

* 以上逻辑仅能处理用户在线时新消息实时提示的小红点。当用户刚登陆，如果在她上次登录和这次登录期间有新消息到来，同样需要小红点提示。这个问题有很多解决办法，我们是专门新建了一张表保存用户最后一次下线前她/他的总消息数量，当用户上线时会重新查询他的全部消息数，进行值的比较来判断是否有新消息到来

<img src="/Users/xxwu/Library/Application Support/typora-user-images/image-20201124092725460.png" alt="image-20201124092725460" style="zoom:50%;" />

在介绍的时候可以介绍`watch`（监听数据库发生变化，实现实时消息传递），和对全局变量`globalData`的监听=>类似于全局事件总线。

<img src="/Users/xxwu/Library/Application Support/typora-user-images/image-20201124093144116.png" alt="image-20201124093144116" style="zoom: 50%;" />







### 云函数抽象代码走读(以LoadUserAll云函数为例)

<img src="/Users/xxwu/Library/Application Support/typora-user-images/image-20201124104243449.png" alt="image-20201124104243449" style="zoom:50%;" />

`loadUserAll`云函数是我们抽象出来加载某个用户的某张表中他/她所有记录的云函数。这个云函数传入的参数是表的名字(`event.collection`). 当我们在个人中心加载某个用户的所有攻略时，只需要调用这个函数，传入参数表名为`guide`；加载她/他所有手帐时，也是调用这个函数，传入参数即为表名`diary`。经过我们的抽象，对于场景为个人中心加载用户的手帐、攻略、驴友帖，只需要编写一个函数即可；不需要为三个业务逻辑编写三个云函数。









