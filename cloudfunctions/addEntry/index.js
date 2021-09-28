/* 
    模版函数：增加数据库中一条记录
    @param event (event.item -> 记录的内容， event.collection -> 插入的表名称)
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()

exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  
  let entry = event.item
  entry.openid = openid
  
  try{
    if(event.collection=='searchFriend'){
      entry.endTime = new Date(entry.endTime)
      return await db.collection(event.collection).add({
        data: entry,
      })
    }
    return await db.collection(event.collection).add({
      data: entry,
    })
  }catch(e){
    console.log(e)
    return e
  }
  
}