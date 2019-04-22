const cloud = require('wx-server-sdk')
// chushihua 
cloud.init()

// 加法
exports.main = (event)=>{
  const wxInfo = cloud.getWXContext()

  return {
    sum: event.a + event.b,
    wxInfo
  }
}





// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }