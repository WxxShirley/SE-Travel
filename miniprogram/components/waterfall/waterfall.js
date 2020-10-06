// components/waterfall/waterfall.js
Component({
  properties: {
    dataset:{ // 展示的数据集,由调用该组件的位置传入具体的数据
      type: Array,
      value: [],
    },
  },

  data: {
  },

  methods: {
    onBindtap: function(e){
      // 修改前端界面展示值的变化
      if(this.data.dataset[e.target.id].amILike==true){
        this.data.dataset[e.target.id].amILike=false;
        this.data.dataset[e.target.id].like-=1;
      }else{
        this.data.dataset[e.target.id].amILike=true;
        this.data.dataset[e.target.id].like+=1;
      }
      this.setData({
        dataset: this.data.dataset
      })
    }

    // TODO: 将本次修改事件传入后台
  }
})
