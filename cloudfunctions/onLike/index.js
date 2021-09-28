// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  var entry = event.item
  let amILike = event.like
  entry.source_id = openid

  let msgs = await db.collection('message').where({
    source_id: openid,
    target_id: entry.target_id,
    guide_id: entry.guide_id
  }).get()

  if(msgs.data.length>0){
    // 说明点过赞
    console.log("点过赞，清除中...")
    try{
      let updateRes = await db.collection('guide').where({_id:entry.guide_id}).update({
        data: {like: _.inc(-1)}
       })
      let delRes = await db.collection('message').where({
        source_id: entry.source_id,
        guide_id:entry.guide_id
      }).remove()
      
      return { status: '取消点赞成功' ,extra1:updateRes, extra2:delRes}
    
    }catch(e){
      console.log(e)
      return {status:'取消点赞失败' }
    }
  }else{
    console.log("没点过赞")
    try{
      let updateRes = await db.collection('guide').where({_id:entry.guide_id}).update({ data: {like: _.inc(1)} })
      let addRes = await db.collection('message').add({
        data: entry,
      })
      return {status:'点赞成功',extra1:addRes,extra2:updateRes}
    }catch(e){
      console.log(e)
      return {  status:'点赞失败'  }
    }
  }
}