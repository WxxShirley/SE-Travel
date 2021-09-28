/*
    定时触发器
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var today = new Date()
 
  try{
    await db.collection('searchFriend').where({
      'endTime': _.lte(today)
    }).get().then(res=>{
      console.log("find!!!")
      //console.log(res)
      if(res.data){
        for(var i=0;i<res.data.length;i++){
          console.log(res.data[i].content,res.data[i].endTime)
        }
      }
    })
    return db.collection('searchFriend').where({
      // 结束日期小于当前时间，设置为过期
      'endTime': _.lte(today)
    })
    .update(
      {data:{expired: true}}
    )
   
  }catch(e){
    console.log(e)
    return e
  }
}