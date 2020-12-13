const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-6gb5dffd859b69ee'})
const db = cloud.database()
exports.main = async (event, context) => {
  console.log("delete_id"+event.guide_id)
  try{
    
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