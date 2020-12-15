// 展示单个驴友贴组件
Component({
  // 参数列表
  properties: {
    postObj: {
      type:Object,
      value: {
        profile_url:"",
        nickname:"",
        contnet: "",
        gender: "",
        valid_time:[],
        demands:{},
        timestamp:""
      }
    },
    showLine:{
      type:Boolean,
      value: true
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

      console.log(this.data.showLine)
    }
  },
  methods:{
  }

})
