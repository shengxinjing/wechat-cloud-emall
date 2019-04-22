
const db = wx.cloud.database()
const app = getApp()
Page({
  data:{
    list:[],
    tops:[]
  },
  show(){
    wx.navigateToMiniProgram({
      appId: 'wx5a9f6a2c25353607',
      path: 'pages/index/index',
      extraData: {},
      // envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  
  addCart(e){
    const {item} = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v=>v._id==item._id)
    if(i>-1){
      // 数量+1
      app.globalData.carts[i].num += 1
    }else{
      item.num = 1
      app.globalData.carts.push(item)
    }
    app.setTabbar()
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  onReachBottom() {
    this.page += 1
    this.getList()
  },
  redirectToDetail(event,x){
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.id,
    })
    console.log(event.currentTarget.id)
  },
  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

  getList(isInit) {
    const PAGE = 5
    wx.showLoading({
      title: '加载中',
    })
    db.collection('emall').orderBy('price','desc').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
      
        if (isInit) {
          this.setData({
            list: res.data
          })

        } else {
          // 下拉刷新，不能直接覆盖而是累加
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }

        wx.hideLoading()


      }
    })

  },
  getTop(){
    db.collection('emall').orderBy('count','desc').limit(4).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          tops: res.data
        })
      }
    })
  },
  onShareAppMessage(){
    return {
      title:'你好啊，我是panda小商城'
    }
  },
  onLoad(){
    this.page = 0
    this.getList(true)
    this.getTop()

    wx.showShareMenu()
  }
})
