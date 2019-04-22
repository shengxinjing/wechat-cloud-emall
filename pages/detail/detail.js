// pages/detail/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:{}
  },
  spike(){
    wx.showModal({
      title: '设置秒杀',
      content: '简单粗暴，价格减10块，一个小时候开始',
      success:res=>{
        if(res.confirm){
          console.log(this.data.info)
          const { _id,_openid, ...reset } = this.data.info
          console.log({
            ...reset,
            _goodid: this.data.info._id,
            spikePrice: this.data.info.price - 10,
            spikeTime: new Date().getTime() + 3600 * 1000,
          })
          db.collection('spike').add({
            data: {
              ...reset,
              _goodid: this.data.info._id,
              spikePrice: this.data.info.price - 10,
              spikeTime: new Date().getTime() + 3600 * 1000,
            },
            success:res=>{
              console.log(res)
              wx.showToast({
                title: '设置成功',
              })
            }
          })
        }
      }
    })

  },


  
  order(){


    // 统一下单
   wx.cloud.callFunction({
      name: 'emall-pay',
      data: {
        type: 'unifiedorder',
        data: {
          goodId: this.data.id
        }
      },
      success: result=>{
        const data = result.data

        // 再次签名
        wx.cloud.callFunction({
          name: 'emall-pay',
          data: {
            type: 'orderquery',
            data: {
              out_trade_no: result.result.data.out_trade_no
            }
          },
          success:queryRet=>{

            const {
              time_stamp,
              nonce_str,
              sign,
              prepay_id,
              body,
              total_fee
            } = queryRet.result.data

            // 拉起支付
            wx.requestPayment({
              timeStamp: time_stamp,
              nonceStr: nonce_str,
              package: `prepay_id=${prepay_id}`,
              signType: 'MD5',
              paySign: sign,
              success(){
                wx.hideLoading()
              }
            })
            
          },
        })

      }
    })




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    const ins = db.collection('emall').doc(options.id)
    ins.update({
      data:{
        count: db.command.inc(1)
      }
    })
    ins.get({
      success:res=>{
        console.log(res)
        this.setData({
          info:res.data
        })
      }
    })
  }

})