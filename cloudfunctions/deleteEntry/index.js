/* 
    模版函数：增加数据库中一条记录
    @param event (event.collection -表名, event.id -项id)
*/
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database()
exports.main = async (event, context) => {
  if( event.isMessage!=null){
    console.log("del message!")
    return await db.collection('message').where({
       guide_id: event.guide_id
    }).remove().then(res=>{
    console.log(res)
  })
    
  }
  try{
    return await db.collection(event.collection).doc(event._id).remove().then(res=>{
      console.log(res)
    })
  }catch(e){
    console.log(e)
    return e
  }
}