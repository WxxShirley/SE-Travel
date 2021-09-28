// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  let entry = await db.collection('user').where({
    openid: openid
  }).get()
  if(entry.data.length)
    return {
      message_count: entry.data[0].message_count,
    }
  await db.collection('user').add({
    data: {
      openid: openid,
      message_count: 0,
    }
  })
  return {
    message_count: 0,
  }
}