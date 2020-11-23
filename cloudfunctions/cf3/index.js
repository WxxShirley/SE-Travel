// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  let entrys = await db.collection('message').where({
    target_id: openid,
  }).get()
  return {
    message_count: entrys.data.length,
  }
}