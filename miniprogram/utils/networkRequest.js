/*
    基于wx.request 封装的一个请求函数
*/

let myRequest = function(args={url:'', methods: 'GET', data:{}, success: function(){}, fail: function(){} }){
  wx.request({
    url: args.url,
    data: args.data,
    header: {'content-type': 'application/json'},
    method: args.methods,
    dataType: 'json',
    responseType: 'text',
    success:(res)=>{
      console.log(res); // 控制台打印返回的信息
      if(res.statusCode==200){ // 请求成功执行的回掉函数
        args.success(res)
      }else{
        args.fail()
      }
    }
  })
}

module.exports={
  myRequest: myRequest
}