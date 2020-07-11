// 定义一个控制参数
let ajaxF = 0
export const request = (params) => {
  ajaxF++
  // 显示加载中
  wx.showLoading({
    title: '加载中',
    mask: true,
  });

  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
        ajaxF--
        if (ajaxF === 0) {
          wx.hideLoading();
        }
      }
    });

  })
}