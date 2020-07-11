// pages/search/index.js
import {
  request
} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false


  },

  // 输入框监听
  inputChange(e) {
    const {
      value
    } = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
        inoValue: ""
      })
      return;
    }

    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.querch(value)
    }, 1000)
    this.setData({
      isFocus: true
    })
  },
  async querch(query) {
    const goods = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    this.setData({
      goods
    })
  },
  // 清楚数据
  clearIpt() {
    this.setData({
      goods: [],
      isFocus: false,
      inoValue: ""

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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