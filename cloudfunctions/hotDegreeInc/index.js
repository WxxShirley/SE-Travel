// 实现某个景区的热度自增1 
const cloud = require('wx-server-sdk')

cloud.init({env: 'env-dev-4g6anmt6c45832a8'})
const db = cloud.database() 
const _ = db.command

exports.main = async (event, context) => {
 
  try{
    return await db.collection('touristAttraction').where(
      {id: event.id}
    ).update({
     data: {hotDegree: _.inc(1)}
    })
  }catch(e){
    console.log(e)
    return e
   }

  
}