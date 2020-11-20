// 展示单个驴友贴组件

const genders = ["male","female","random"]
const formatGenders = ["小哥哥","小姐姐","都可"]

Component({
  // 参数列表
  properties: {
    profile_url:{
      type: String,
      value: ""
    },
    nickname: {
      type: String,
      value: "",
    },
    content: {
      type: String,
      value: "",
    },
    gender: {
      type: String,
      value: "",
    },
    valid_time: {
      type:Array ,
      value: [],
    },
    bindAttraction: {
      type:String,
      value: ""
    },
    timestamp:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    whitespace:"    ",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatGender:"",
    formatTime:""
  },

  lifetimes:{
    attached:function(){

      this.update()
    }
  },
  methods:{
    // 更新显示的性别和时间要求
    //   在findPage中会被调用，原因是过滤条件后没有及时刷新
    update:function(){
      var format_gender = formatGenders[genders.indexOf(this.data.gender)]
       var format_time = this.data.valid_time[0].substr(0,10)+"至"+this.data.valid_time[1].substr(0,10)
      
       this.setData({
         formatGender: format_gender,
         formatTime: format_time
       })
    }
  }

})
