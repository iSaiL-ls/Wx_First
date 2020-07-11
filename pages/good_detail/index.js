// pages/good_detail/index.js
import {
  request
} from "../../request/index"
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    goodsObj: []
  },
  goods: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id)
  },
  // 获取数据
  async getGoodsDetail(id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    })
    this.setData({
      goodsObj: res
    })
    this.goods = res
  },
  // 点击轮播图
  handlePrevewImage(e) {
    const urls = this.goods.pics.map(v => v.pics_mid)
    console.log(1);
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: urls,
    });

  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.goods.goods_id)
    if (index === -1) {
      this.goods.num = 1;
      this.goods.checked = true
      cart.push(this.goods)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '已加入到购物车',
      icon: 'success',
      mask: true
    })
  }
})