/* 
    云函数: 删除指定_id对应的手帐记录
    @param event (event.id)
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
exports.main = async (event, context) => {
  
  try{
    return await db.collection('diary').doc(event._id).remove().then(res=>{
      console.log(res)
    })
  }catch(e){
    console.log(e)
    return e
  }
}