/* 
    模版函数：加载某个表中某个用户的所有内容
    @param event (event.collection -> 表名)
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID

  try{
    if(event.collection=="userFeedback"){
      /* 用户反馈表按时间正序，5条 */
      return await db.collection(event.collection).where({
        openid: openid
      }).get()
    }
    return await db.collection(event.collection).where({
      openid: openid
    }).orderBy('timestamp','desc').get()
  }catch(e){
    console.log(e)
    return e
  }
}