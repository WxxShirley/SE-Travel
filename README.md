# HULV-DEV-LOGS


## 如何运行

下载代码，下载[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，打开软件包。

小程序ID：`wx871696d2ebd36b09`





## 开发任务

**Sprint1**：
> 这一阶段我们构建上海市景区数据集，提供景区搜索、展示详细信息、实时热门景区和景区评分的功能

[开发文档](https://github.com/WxxShirley/SE-Travel/blob/master/docs/Sprint1%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md)

**Sprint2**:
> 这一阶段 完成的功能包括：地图服务， 我的手帐静态展示、保存图片和个人中心查看所有， 寻找驴友服务中发布驴友贴， 发布攻略服务中发布和**瀑布流**展示攻略

[开发文档](https://github.com/WxxShirley/SE-Travel/blob/master/docs/Sprint2%E5%BC%80%E5%8F%91.md)


**Sprint3**

计划完成：



**旅游分享类服务**
- [x] 攻略点赞，消息插入到`message`表中
- [x] 攻略点赞，被点赞者通过`watch`监听到消息，并在消息界面展示新的未读消息，底部导航栏呈小红点
- [x] 攻略的详情界面，轮播图展示图片、底部文字和tag 。在个人中心的用户攻略和瀑布流攻略中，点击都能进入详细界面
- [x] 驴友贴展示，提供按条件过滤筛选
- [x] UI 美化，瀑布流文字显示的问题

###
**个性化服务**
- [x] 个人中心展示用户已发布的驴友贴，提供删除功能

TODO :

- [ ] 个人中心展示用户已发布的攻略，提供删除功能
> 这里的攻略也要提供点击后进入攻略详情的功能。攻略详情界面点赞触发中有部分逻辑是修改前一界面的属性、使得返回后点赞数量一致。**那里**需要修改，以适应不同界面进入的效果
- [ ] **成就达成**:根据用户的发帖情况系统颁发勋章，也是**watch**监听
- [ ] **个性化足迹**:个人中心提供我的足迹服务
> 用户发布攻略时获得用户当前定位功能。在个人中心我的足迹点击后进入上海市地图(map的中心经纬度选择外滩),上面的marker是曾经通过用户发布的攻略获得的一个个定位的经纬度，点击后会显示用户发布的攻略的简略内容和图片的气泡.
- [ ] **个性化推荐**:主页猜你喜欢部分推荐攻略,可以直接random


**测试**
分为 **景区展示、手帐、攻略、驴友、个性化**五大服务分别测试.其中手帐、攻略、驴友与个性化有部分耦合.

## 帮助文档

- 后端
  * [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

* 前端
  * [van-前端组件框架](https://vant-contrib.gitee.io/vant-weapp/#/intro)
  * [微信小程序开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

* 登陆微信小程序后台:[微信公众平台](https://mp.weixin.qq.com/)

  > 用户名: hulv2020@163.com
  >
  > 密码：FudanSE2020, 再配合微信扫码登录





