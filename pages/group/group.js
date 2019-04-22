// pages/spike/spike.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    restTime:'123'
  },
  format(ms){
    let s = parseInt(ms/1000)
    return parseInt(s/60)+'分'+parseInt(s%60)+'秒'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  startTimer(end){
    setInterval(()=>{
      const offset = end - new Date().getTime()
      console.log(end)
      this.setData({
        restTime: this.format(offset)
      })
    },1000)
  },
  onShareAppMessage(){
    return {
      title: 'Panda邀请你参团拉，还差1人',
      path: '/page/group/group',
      imageUrl:this.data.info.image
    }
  },
  onLoad: function (options) {
    db.collection('group').get({
      success:res=>{
        console.log(res.data)
        this.setData({
          info:res.data[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})