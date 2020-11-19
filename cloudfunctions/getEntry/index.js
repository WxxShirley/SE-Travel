/* 
    模版函数：增加数据库中的若干条记录路记录
    @param event (event.collection -> 表名, event.skip -> 开始获取的地方, event.num -> 获取条数)
*/

const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  
  try{
    // 修改逻辑:查询message表来判断是否喜欢 (amILike)
    let entrys = await db.collection(event.collection).orderBy('timestamp', 'desc').skip(event.skip).limit(event.num).get()
    for(let entry of entrys.data){
      let id = entry._id
      let queryRes = await db.collection('message').where({
        guide_id: id,
        source_id: openid,
        target_id: entry.openid
      }).get()
      entry.amILike = queryRes.data.length>0?true: false
    }
    return entrys
  }catch(e){
    console.log(e)
    return e
  }
}