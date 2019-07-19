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
        tag: "KV"
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var json = "{" + res.data.replace("\[", "")
          .replace(new RegExp('\]$'), '')
        .replace(/'/g, "") + "}"
        console.log(json)
        var obj = JSON.parse(json)
        console.log(obj)
        var arr = []
        for (var key in obj) {
          arr = arr.concat(obj[key])
        }
        that.setData({
          'listData': arr
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  }

})
