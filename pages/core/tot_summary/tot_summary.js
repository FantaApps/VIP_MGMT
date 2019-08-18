var app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    let that = this
    wx.request({
      url: app.server + "/v1/product/sale/summary_all",
      data: {
        project: '若水藏真',
        weChatId: '',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          'listData': res.data.data.listSaleSummary
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  compare: function (a, b) {
    if (a.ID < b.ID) {
      return -1;
    }
    if (a.ID > b.ID){
      return 1;
    }
    return 0;
  },
})
