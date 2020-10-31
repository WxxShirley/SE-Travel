# HULV-DEV-LOGS


## 如何运行

下载代码，下载[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，打开软件包。

小程序ID：`wx871696d2ebd36b09`





> just a test

## 开发任务

**Sprint1**：
> 这一阶段我们构建上海市景区数据集，提供景区搜索、展示详细信息、实时热门景区和景区评分的功能

[开发文档](https://github.com/WxxShirley/SE-Travel/blob/master/docs/Sprint1%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md)

**Sprint2**:
> 这一阶段前两周完成攻略、手帐和寻找驴友的展示

| 任务                            | DDL      | 说明                                                         |
| ------------------------------- | -------- | ------------------------------------------------------------ |
| 【发布攻略】界面美化+API完成    | 1人11.10 | 界面增加padding,修改配色等,整体美观。用户点击发布攻略后将文字和图片都上传云端。另外，增加一个景点选择器，和可选的tag。 |
| 接入腾讯地图                    | 1人11.10 | 景区详细界面位置一栏点击进入腾讯地图界面，显示该景点和周围景点的marker，显示当前用户定位。 |
| 【寻找驴友】界面+API完成        | 2人11.10 | 整个界面类似表单，一些属性需要用户选择                       |
| 【旅行手帐】界面完善            | 1人11.10 | 在"我的界面"按照发布时间逆序展示自己的旅行手帐，点击后进入静态界面，可以长按保存为图片 |
| 【瀑布流展示景点攻略】界面+接口 | 2人11.10 | 接口设计类似美团的分页策略，每次加载最新的20个，当用户滑动浏览完，可以继续加载（请求服务端）。瀑布流组件可参考目前已实现`waterfall`组件。 |
| 【寻找驴友】界面+接口           |          | 提供类似美团界面的筛选功能（时间、景点、性别）               |


表格属性：
```javascript
// 景区攻略
var item = {
  "_id": "_fsrfrsf", // 云数据库自动生成的id
  
  "openid": "pofsefs2", // 云函数可以得到微信用户唯一的id，即openid
  "profile_url": "用户微信头像url" , // app启动时可以由用户授权得到，这个接口我之后加上
  "nickname":"用户昵称",
  
  "timestamp":"2020/10/21 22:32:41", // 用户发布的时间戳
  "txt_content":"好多人啊", // 攻略文本内容
  "imgList": [
    "cloud://....", // 图片在云端的位置
  ],
  "bindAttraction": "外滩", 
  "tags":[
    "清凉夏日","亲子游"
  ]
}
// 提交要求：
//   至少选择1个tag，5个以上字符，1张图片
/*
    tag list: 
      古色古香  养生休闲 红色之旅
      游乐园 探险体验 民俗体验 感受名校 影视基地
      周末活动 深度人文 亲子游 清凉夏日 自然探索
*/


// 寻找驴友
var item = {
  "_id": "_fsefe" ,// 云数据库自动生成的
  "openid": "fsrsfsrfa", // 云函数可以得到微信用户唯一的id，即openid
  "profile_url":"用户微信头像url",
  "nickname":"二C",
  
  "timestamp":"2020/10/21 22:32:41", // 用户发布的时间戳
  
  "content":"找一个小姐姐，元旦迪士尼约！",
  "demands":{
    "gender":"female",// ["female", "male","none"] 
    "valid_time": ["发布日期","旅行日期"], // 招募驴友贴的有效日期
    "bindAttraction": "迪士尼乐园"
  }
}
```

前端要求：

* 组件 all-in-place,提供必要的加载或者提示，注意同步和异步
* 尽量美观

后端API：

* 实现无线加载的瀑布流中，请求的参数有页码或者上次扫描的最后一个的id（具体看云数据库支持的查询办法），返回参数有我们限制的规模大小的列表和布尔型变量`hasMore`（是否已经到达末尾）


> 前后端交互的逻辑可以参考`diary`中上传图片的策略，尤其是异步问题的解决



## 如何提交
> 无论何种方式，都需要先`git pull `拉取最新的代码，注意冲突合并问题
* 方式1 直接提交到这个仓库中
```
git add . 
git commit -m "你完成的任务"
git push origin master
```

* 方式2 fork到自己的仓库中，更新代码后提交pull request。之后经过Code review后会merge两个分支




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





