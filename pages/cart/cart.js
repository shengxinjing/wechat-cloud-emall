const app = getApp()
Page({
  data:{
    carts:[],
    total:0,
    address:{}
  },
  order(){
    if(!this.data.address.userName){
      wx.chooseAddress({
        success:res=>{
          this.setData({
            address:res
          })
          console.log(res)
        }
      })
    }else{

    }
  },
  getTotal(){
    const total = this.data.carts.reduce((sum,a)=>sum + a.price*a.num, 0)
    this.setData({
      total
    })
  },
  addCart(e) {
    const { index } = e.currentTarget.dataset
    const carts = [...this.data.carts]
    carts[index].num += 1
    this.setData({
      carts
    })
    app.globalData.carts = carts
    app.setTabbar()
    this.getTotal()
  },
  onShow(){
    this.setData({
      carts:app.globalData.carts
    })
    this.getTotal()
    this.address = {}
  }
})