/*
    定时触发器
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var date = new Date()
  console.log(date)
  try{
    return db.collection('searchFriend').where({
      // 结束日期小于当前时间，设置为过期
      'demands.valid_time.1':_.lt(date+1)
    })
    .update(
      {data:{expired: true}}
    )

  }catch(e){
    console.log(e)
    return e
  }
}