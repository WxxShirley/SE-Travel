var hotPlace = [
  {place:"外滩",location:"上海市黄浦区中山东一路",description:"外滩是到上海旅游的首站，外滩建筑群是上海的名片，夜景不可错过",related:["万国建筑博览群","金融广场","游船码头"],icon:"icon-jiantouUp",color:"text-red"},
  {place:"田子坊", location: "上海市黄浦区泰康路248弄", description:"上海滩最有味道的弄堂，时尚地标，是文艺小年轻的首选地", related: ["泰迪之家","气味图书馆","李守白艺术中心","新视野画廊"] ,icon:"icon-jiantouDown",color:"text-green"},
  {place:"南京路步行街", location: "上海市黄浦区山东中路33号", description:"大上海繁华的商业街，名品汇聚的购物街区，这里的夜晚五光十色。", related: ["第一百货","世贸HelloKitty上海滩时光之旅","萌萌塔"],icon:"icon-jiantouUp",color:"text-red"},
  {place:"上海城隍庙旅游区", location: "上海市黄浦区方浜中路249号", description:"古香古色如集市一般，绝不能错过夜景", related:["豫园","上海历史收藏馆","沉香阁","湖心亭茶楼"],icon:"icon-jiantouDown",color:"text-green" },
  {place:"1933老场坊", location: "上海市虹口区溧阳路611号", description:"建筑设计简约独特，拍照打卡圣地", related:[] ,icon:"icon-jiantouUp",color:"text-red"},
]

var shares = [
  // tmpImgSrc: "../../images/waterfall/1.jpeg"
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/0.jpg", content: "打卡长沙必须喝的饮品！超级推荐幽兰拿铁、声声乌龙和桂花弄，真的太好喝了！", user_avatar: "../../images/userAvater/9.jpeg", like: 20, amILike: false, "nickname":"胖虎"},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/1.jpg", content: "Day1: 宽窄巷子——锦里、武侯祠，Day2: 熊猫基地--东郊记忆， Day3: 春熙路——人民公园——九眼桥， Day4: 青城山——都江堰", user_avatar: "../../images/userAvater/9.jpeg", like: 288, amILike: false},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/2.jpg", content: "重庆必去！洪崖洞--如梦如幻。洪崖洞是逛山城老街、观赏两江风光、品尝当地美食的好去处，还是“城中见江、江中见城”的显山露水的视觉通廊。洪崖洞“一态、三绝、四街、八景”的经营形态体现了巴渝文化休闲业态。", user_avatar: "../../images/userAvater/10.jpeg", like: 17, amILike: false},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/3.jpg", content: "超简略迪士尼攻略🐮 推荐项目：创极速光轮＞飞跃地平线＞小矮人矿车＞加勒比海盗（这四个一定要玩）。游玩路线：我玩的是逆时针，一上午几乎刷完了想玩的项目 。烟花表演：晚上20点30开始，建议19点去米奇大街占位置。吃喝购物：建议都在迪士尼小镇解决", user_avatar: "../../images/userAvater/9.jpeg", like: 20, amILike: true},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/4.jpg", content: "故宫不得不去的地方！第一，故宫中轴线上的前殿，那个气势恢宏，那个雄伟壮阔，再租个讲解器听一听，这些建筑在古代到底是怎样的呢？一定会让你对于故宫有一个更深刻的印象！第二，珍宝馆，珍宝馆是需要再收10块钱门票的，但是这个景点那是非常的值，她的范围大概是皇极殿（一个乾隆本来想修建给退位后的自己住的，但是他一天也没住的地方），里面包括很多很多大家耳熟能详的故宫打卡地点，eg，九龙壁、珍妃井、还有各种金银器珠宝的地方，所以一定要去！！！然后就是一些在我心中排名不分先后的地方啦，比如男生可能更爱的箭亭（里面有镶了宝石皇上用过的马鞍、弓箭等武器）；电视剧迷都要去的延禧宫（延禧攻略，延禧宫现在还有AR技术）、翊坤宫（甄嬛传，但是被慈禧把翊坤宫和储秀宫给打通了）；历史控要去的储秀宫（那些个展品啊）、钟宝馆（那些个中式、西式、会动的、不会动的计时器）等等等。怎么说呢，故宫在我心中就是一个大宝藏！怎么挖都挖不光！", user_avatar: "../../images/userAvater/9.jpeg", like: 32, amILike: true},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/5.jpg", content: "成都小吃推荐！麻辣兔头：麻辣兔头是成都的特色名小吃，特别是双流兔头，速冻的鲜兔头加上麻辣鲜香的干辣椒，鲜香味美，口感极佳，让人狂流口水系列！。凉糕：凉糕是锦里的一大特色，利用糖、豆沙、江米等材料做成的糕点冰起来，再切块就成了糯米凉糕。而且这里还有特别的麻辣口味，真是有意思~  叶儿粑：叶儿粑又叫艾馍，是四川名小吃之一，因为外面包有良姜叶子，所以又叫叶儿粑。滚烫之时，一口咬下去，油汁“滋滋”往外冒，满嘴肉香，别提让人多满足！牛肉焦饼：牛肉焦饼是一种馅饼，不过在川味的调教下，牛肉焦饼变得又酥又嫩，非常好吃，吃的时候再配一口鲜香浓郁的牛肉汤，用成都话说，简直巴适得板！", user_avatar: "../../images/userAvater/9.jpeg", like: 999, amILike: false},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/6.jpg", content: "😄 野人版 - 上海欢乐谷🌈游玩攻略🌟: 进门右转去 异度空间（鬼屋）——天地双雄——摇摆伞——欢乐风火轮——魔幻陀螺——谷木游龙——绝地雄风——飞旋驼峰——峡谷漂流——蓝月飞车——大洋历险——矿山历险——金银岛——激流勇进——极速旋风——完美风暴——天幕水极（晚上）——旋转木马——返程。一圈下来该玩的都玩了，入园之后建议先去玩大型项目就去玩，越到后面排队时间越久。 ", user_avatar: "../../images/userAvater/10.jpeg", like: 13, amILike: true},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/7.jpg", content: "蔓越阑珊｜蔓越莓➕奶油➕果茶带着一点酸味的果味奶 配上沾点蔓越莓的奶油 很特别 但完全不难喝 是👦🏻喝的我只尝了下喜奶的可以尝试", user_avatar: "../../images/userAvater/9.jpeg", like: 5, amILike: true},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/8.jpg", content: "🌈 一条开挂版的故宫游览路线：上午门城墙→经过 东华门→神武门城墙下来。这条路线，能够俯瞰故宫，居高临下。如果天气好，还可以看见远处的西山。（现在这条路线人还不太多）", user_avatar: "../../images/userAvater/10.jpeg", like: 20, amILike: false},
  {imgSrc: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/9.jpg", content: "逻辑吧嗦半游记性质的攻略: Day1 南京站 鸡鸣寺 明城墙 玄武湖 青旅 总统府 凯瑟琳广场 狮子桥 颐和路 南京大学 先锋书店 明瓦廊。Day2 老门东 南京博物馆 钟山风景区 夫子庙-秦淮河一带。真正到了南京我才发现，旅行的意义不在于一份完美的攻略，而在于当你真正行走于这座城市，它的气场契合于你，带给你无可复制的体验，于是这趟旅途中的遗憾也化成了更多的期待。南京太太太美好了，我还没爬到城墙上俯瞰南京，还没数过中山陵的台阶....这些遗憾都是我下次去南京的理由～", user_avatar: "cloud://env-dev-6gb5dffd859b69ee.656e-env-dev-6gb5dffd859b69ee-1303853824/img/10.jpg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/2.jpeg", content: " 进城了！外滩攻略来了。位于上海市中心黄浦区的黄浦江畔，是最具上海城市象征意义的景点之一。·长1.5公里，由南向北漫步，左手边是宽阔的中山东一路，路边一字排开着数十栋风格迥异的外国建筑。·紧靠上海的母亲河—黄浦江，江上巨轮穿梭，江对岸则矗立着金茂大厦、环球金融中心等摩天建筑。·夜晚，浦江两岸霓虹齐放，适合与爱人漫步在外滩，感受着“不夜城”的韵味与浪漫。", user_avatar: "../../images/userAvater/9.jpeg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/3.jpeg", content: "🙋 拙政园线路推荐！最棒的园林体验～线路①：天泉亭、梧竹幽居周边。线路②：倒影楼、海棠春坞周边。线路③：苏州园林博物馆及其周边", user_avatar: "../../images/userAvater/10.jpeg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/1.jpeg", content: "最全长沙美食合集！湘菜类：一盏灯饭庄，费大厨辣椒炒肉、炊烟时代。臭豆腐类：下岗牌臭豆腐、武爹臭豆腐。糖油粑粑类：老头子糖油粑粑、李公庙糖油粑粑。米粉类：长沙一中丽君粉店、矮子粉店、学艺面粉。面食类：裕和面记、刘家削面馆、特别推荐下秦九和🌟。火锅类：知味轩、老清泉、小龙坎。油炸类：一中的麻辣大王、姐妹炸炸炸。烤串：正哥烤肉、美丽烤排骨、波哥烤肉、无名烧烤、1911牛肉烤串....(未完待续！)", user_avatar: "../../images/userAvater/9.jpeg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/2.jpeg", content: "上海欢乐谷必玩项目推荐： 古木游龙（欢乐谷特色过山车），绝顶雄风（90度俯冲过山车，胆小请勿尝试）。矿山历险（最温和的大型过山车），大洋探险（双脚悬空的过山车），激流勇进（漂流）。蓝月飞车=>最快的过山车🎢 ", user_avatar: "../../images/userAvater/9.jpeg", like: 18, amILike: false},
  {imgSrc: "../../images/waterfall/3.jpeg", content: "日间：湖滨码头（上游船）-小瀛洲-雷峰塔附近码头（下游船）-雷峰塔（制高点，西湖全景）-净慈寺（雷峰塔对面，时间充裕备选）-岳庙（公交车至，时间充裕备选）-午餐（顺路可选楼外楼）-湖滨码头（体力充裕可闲逛回，中间有博物馆、美术馆、西泠印社可选择性参观）。夜间：湖滨码头出发闲逛，逛到哪算哪", user_avatar: "../../images/userAvater/10.jpeg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/1.jpeg", content: "成都主要景点介绍！🌟 宽窄巷子，青羊宫，杜甫草堂，四川博物馆，蜀锦博物馆，武侯祠，文殊院，春熙路，天府广场，都江堰～", user_avatar: "../../images/userAvater/9.jpeg", like: 8, amILike: false},
  {imgSrc: "../../images/waterfall/2.jpeg", content: "🎺 外滩新景点介绍！外滩“情人墙”建于黄浦公园至新开河的黄浦江边，全长约1700米。观光台是建造在伸向浦江上的空箱式结构防汛墙上，地面是用14万块彩色地砖和花岗石铺成。临江的一边有32个半圆形花饰铁栏的观景阳台，64盏庭柱式方灯。观光台上还有21个碗形花坛，柱形方亭和六角亭，以及供游人休息的造型各异的人造大理石椅子。观光台西侧，有四季常青的绿化带，成了观光台绿色的栏墙，既保证了游人的安全，又使游人赏心悦目。", user_avatar: "../../images/userAvater/10.jpeg", like: 20, amILike: false},
  {imgSrc: "../../images/waterfall/3.jpeg", content: "♥️ 打卡南京网红景点！美龄宫、石塘竹海、东南大学、爱情隧道、四方当代美术馆。南京景点这么多，我们不走寻常路争当文艺好青年，人山人海的地方就让别人去吧！", user_avatar: "../../images/userAvater/10.jpeg", like: 20, amILike: false},

]



module.exports={
  hotPlace: hotPlace,
  shares: shares
}