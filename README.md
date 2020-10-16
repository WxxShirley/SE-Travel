# HULV-DEV-LOGS



## How to run

下载代码，下载[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，打开软件包。

小程序ID：`wx871696d2ebd36b09`





## TimeLine

**Sprint1**：

这一阶段我们构建上海市景区数据集，提供景区搜索、展示详细信息、实时热门景区和景区评分的功能

> 问答的实现过于复杂，在sprint1我们完成的工作量偏少，sprint3在期末季，因此sprint2开发压力大。考虑摒弃这个功能，改为评分。另外DDL均为当日21:00

* FrontEnd

| 任务                            | DDL   | 说明                                                  | 
| ------------------------------- | ----- | ----------------------------------------------------- |
| 景区详细介绍界面设计            | 10.18 | 静态界面，模拟数据                                    |
| 搜索结果展示界面设计            | 10.18 | 静态界面，模拟数据. **将listView界面抽象出component** |
| 景区详细介绍界面的集成后端API   | 10.25 | -                                                     |
| 搜索结果展示界面的集成后端API   | 10.25 | -                                                     |
| 其他所有已完成界面的后端API集成 | 10.25 | -                                                     |
| 前端已完成部分单元测试代码      | 10.31 | 静态界面设计完就可以写对应的UT，后面再加上逻辑部分    |
| [待定]景区评分（界面+API集成）  |       |                                                       |

* BackEnd

| 任务                                                         | DDL   | 说明                         |
| ------------------------------------------------------------ | ----- | ---------------------------- |
| ~~爬取和构建上海市旅游景区数据集（人员*2)~~                    | ~~10.13~~ | ~~json文件+图片集~~              |
| ~~根据微信开发文档，实现景区云数据库，实现图片的存储和加载~~     | ~~10.18~~ | ~~仔细阅读景区数据集格式再建库~~ |
| 云函数实现【~~按名称搜索景区~~ 、 实时热门景区  、给定景区ID返回景区对象、（待定）给景区评分】 | 10.23 |                              |


## 如何提交
> 无论何种方式，都需要先`git pull `拉取最新的代码，注意冲突合并问题
* 方式1 直接提交到这个仓库中
![commit-example](https://github.com/WxxShirley/SE-Travel/blob/master/readme-imgs/commit.png)

* 方式2 fork到自己的仓库中，更新代码后提交pull request。之后经过Code review后会merge两个分支

## 文件夹说明


```
├── README.md
├── cloudfunctions    云函数
├── docs              文档
├── miniprogram       小程序前端代码
│   ├── app.js        小程序启动执行的代码
│   ├── app.json      配置文件，使用的components和pages需要注册说明
│   ├── app.wxss      全局格式文件
│   ├── components    抽象出来的各个组件
│   │   ├── findPage  发现页
│   │   ├── inputBox  手帐 - 输入框
│   │   ├── journal   手帐 - 展示
│   │   ├── mainpage  主页
│   │   ├── messagePage 消息页
│   │   ├── showAttraction 展示一行三个景区的抽象组件
│   │   ├── sticker   手帐 - 贴纸
│   │   └── waterfall 瀑布流展示
│   ├── images         图片
│   ├── models
│   │   └── mockData.js 模拟数据
│   ├── package-lock.json
│   ├── pages
│   │   ├── diary      编辑手帐界面
│   │   ├── index      小程序主页
│   │   ├── diary      编辑手帐
│   │   ├── listview   展示热门景区
│   │   ├── logs
│   │   ├── publish    发布攻略界面
│   │   ├── diary      编辑手帐
│   │   ├── search     搜索页
│   │   └── touristAttraction 景点攻略页面
│   ├── plugins        使用插件 vant-weapp
│   │   └── vantComponents
│   ├── sitemap.json
│   ├── style          全局格式
│   └── utils          功能函数
├── project.config.json
├── readme-imgs  
└── tmp                微信小程序前端初始化的文件
```


## 参考文档

- 后端
  * [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

* 前端
  * [van-前端组件框架](https://vant-contrib.gitee.io/vant-weapp/#/intro)
  * [微信小程序开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

* 登陆微信小程序后台:[微信公众平台](https://mp.weixin.qq.com/)

  > 用户名: hulv2020@163.com
  >
  > 密码：FudanSE2020, 再配合微信扫码登录





