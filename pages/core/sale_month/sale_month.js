var app = getApp()
Page({
  data: {
  },
  curday : function () {
    var today = new Date();
    var mm = today.getMonth(); //As January is 0.
    var yyyy = today.getFullYear();
    if (mm < 10) mm = '0' + mm;
    return (mm + ',' + yyyy);
  },
  onLoad: function () {
    let that = this
    var today = this.curday();
    wx.request({
      url: app.server + "/v1/product/sale",
      data: {
        project: '若水藏真',
        weChatId: app.globalData.token,
        month: today
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {  
        console.log(res.data.data.listProductPurchase)   
        var obj = res.data.data.listProductPurchase
        that.setData({
            'listData' : obj
        })

      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
