import {
  request
} from "../../request/index"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧
    leftMenuList: [],
    rightMenuList: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    scrollTop: '0'
  },
  // 接口返回的数据
  Cates: [],
  // 获取分类数据
  getCates() {
    request({
      url: "/categories"
    }).then(res => {
      this.Cates = res
      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.Cates
      })
      // zuoce
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 右侧
      let rightMenuList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    })
  },
  // 点击左边导航栏
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates()
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    } else {
      this.Cates = Cates.data
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 右侧
      let rightMenuList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
    }
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