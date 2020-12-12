/* 
    模版函数：增加数据库中一条记录
    @param event (event.collection -表名, event.id -项id)
*/
/*const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
exports.main = async (event, context) => {
  
  try{
      db.collection(event.collection).doc(event._id).remove().then(res=>{
      return await db.collection("message").where({guide_id:event._id}).remove().then(
        res=>console.log(res)
      )
    })
  }catch(e){
    console.log(e)
    return e
  }
}*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
exports.main = async (event, context) => {
  
  try{
      await db.collection('message').where({
        guide_id: event.guide_id
      }).remove()
      return {
        status:'ok'
      }
  }catch(e){
    console.log(e)
    return e
  }
}