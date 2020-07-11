import {
  request
} from "../../request/index"
//Page Object
Page({
  data: {
    // 轮播图
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数据
    floorList: [],
  },
  // 获取轮播图
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(res => {
      this.setData({
        swiperList: res
      })
    }, err => {
      console.log(err);
    })

  },
  // 获取导航栏
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        cateList: res
      })
    }, err => {
      console.log(err);
    })
  },
  // 获取楼层
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(res => {

      this.setData({
        floorList: res
      })
    }, err => {
      console.log(err);
    })
  },
  //页面加载的时候除法
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});