/* 
    函数: 加载某位用户所有的手帐
    @param event (event.item -> 记录的内容， event.collection -> 插入的表名称)
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()

exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID

  try{
    return await db.collection('diary').where({
      openid: openid
    }).get()
  }catch(e){
    console.log(e)
    return e
  }
}