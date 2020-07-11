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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 点击复选框
  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let {
      cart
    } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)


  },
  // 店家获取收货地址
  async handleChoosAddress() {
    try {
      const res = await getSetting(scopeAddress)
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      const address = await chooseAddress()
      wx.setStorage({
        key: "address",
        data: address,
      });
    } catch (err) {
      console.log(err);

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const address = wx.getStorageSync("address")
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 封装函数 从新计算属性
  setCart(cart) {
    const allChecked = cart.length ? cart.every(v => v.checked) : false
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }
    })

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart)
  },
  // 全选
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  // ++--
  async itemNumChange(e) {
    const {
      id,
      num
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && num === -1) {
      // wx.showModal({
      //   title: '提示',
      //   content: '是否要删除该商品',
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index, 1)
      //       this.setCart(cart)
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });

      const res = await showModal({
        content: "你是想要删除他?"
      })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }
    cart.forEach(v => {
      v.goods_id === id ? v.num = (v.num + num) : v.goods_id = v.goods_id
      if (v.num < 1) {
        v.num = 1
      }
    })

    this.setCart(cart)
  },
  // 结算
  async settlement() {
    const {
      address,
      totalNum
    } = this.data
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收货地址"
      })
      return
    }
    if (totalNum === 0) {
      await showToast({
        title: "还没有选择商品哦"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });

  }
})