// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  let entry = event.item
  let amILike = event.like
  entry.source_id = openid
  console.log(event)
  if(!amILike){
    try{
      db.collection('guide').where({_id:entry.guide_id}).update({
        data: {like: _.inc(1)}
       })
      return await db.collection('message').add({
        data: entry,
      })
    }catch(e){
      console.log(e)
      return e
    }
  }
  else{
    try{
      db.collection('guide').where({_id:entry.guide_id}).update({
        data: {like: _.inc(-1)}
       })
      return await db.collection('message').where({
        source_id: entry.source_id,
        guide_id:entry.guide_id
      }).remove()
    }catch(e){
      console.log(e)
      return e
    }
  }
  
}