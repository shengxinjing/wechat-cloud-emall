//index.js
//获取应用实例
const app = getApp()
// 云数据库实例
const db = wx.cloud.database()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  logout(){
    wx.removeStorageSync('userinfo')
    this.setData({
      userInfo:{}
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },  
  getMall(){

    db.collection('emall').get({
      success:(res)=>{
        console.log(res)
      }
    })
  },
  addMall(){
    wx.chooseImage({
      count:1,
      success: function(res) {
        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = 'panda-img-' + tempFile[tempFile.length-2]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:res=>{
            
            db.collection('emall').add({
                data:{
                  title:'商品2',
                  price:18,
                  tags:['books','food'],
                  image: res.fileID,
                  count:1
                },
                success:ret=>{
                  console.log(ret)
                  wx.showToast({
                    title: '新增成功',
                  })
                }
              })

            
          }
        })
      },
    })
    // 新增
    // db.collection('emall').add({
    //   data:{
    //     title:'商品1',
    //     price:18,
    //     tags:['books','food']
    //   },
    //   success:res=>{
    //     console.log(res)
    //     wx.showToast({
    //       title: '新增成功',
    //     })
    //   }
    // })
    // wx.showToast({
    //   title: '添加',
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
   
    wx.cloud.callFunction({
      name:'login',
      data:{
        a: 10,
        b: 20
      },
      success:res=>{
        // console.log(res.result.wxInfo.OPENID)
        e.detail.userInfo.openid = res.result.wxInfo.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })


  }
})
