/* 
    增加一个手帐的云函数
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()

exports.main = async (event, context) => {
  let openid = cloud.getWXContext().OPENID
  
  let diary = event.item
  diary.openid = openid
  
  try{
    return await db.collection('diary').add({
      data: diary,
    })
  }catch(e){
    console.log(e)
    return e
  }
  
}