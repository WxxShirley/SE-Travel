/*
    云函数，查看用户是否已经给某条攻略点赞
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID

  try{
    return await db.collection('message').where({
      target_id: event.target_id, // 被点赞的用户的openid
      source_id: openid ,// 点赞的用户的openid
      guide_id: event._id
    }).get()
  }catch(e){
    console.log(e)
    return e
  }
}