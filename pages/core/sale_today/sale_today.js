var app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    let that = this
    wx.request({
      url: app.server + "/get_file",
      data: {
        project: 'diamond',
        key: '022IWzw70fQLVF1FDsw70riuw70IWzw6',
        secondary: 'sale',
        third: "20190710",
        tag: "KV"
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {     
        var json = "{"+res.data.replace("\[", "").replace("\]", "").replace(/'/g, "")+"}"
        var obj = JSON.parse(json)
        for (var key in obj) {
          that.setData({
            'listData' : obj[key]
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
