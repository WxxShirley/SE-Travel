const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
exports.main = async (event, context) => {
  
  try{
    //return await db.collection(event.collection).doc(event._id).remove().then(res=>{
      return await db.collection('message').where({
        guide_id: event.guide_id
      }).remove().then(res=>{
      console.log(res)
    })
  }catch(e){
    console.log(e)
    return e
  }
}