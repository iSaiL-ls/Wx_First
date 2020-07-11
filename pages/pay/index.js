// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from ".././../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  paySuccess() {
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000,
      mask: false,
    });

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 2000)



  },
  onShow() {
    const address = wx.getStorageSync("address")
    let cart = wx.getStorageSync("cart") || [];
    // 过滤
    cart = cart.filter(v => v.checked)





    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {

      totalPrice += v.num * v.goods_price
      totalNum += v.num

    })

    this.setData({
      cart,

      totalPrice,
      totalNum,
      address
    })

  }

})