/* 
    云函数：加载某个用户的所有消息
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID

  try{
    return await db.collection('message').orderBy('timestamp','desc').where({
      target_id: openid
    }).get()
  }catch(e){
    console.log(e)
    return e
  }
  
}