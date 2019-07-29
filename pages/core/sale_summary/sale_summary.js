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
        key: app.globalData.token,
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
        arr.sort(that.compare)

        for(var i in arr) {
          var item = arr[i]
          if (item.type == "TRUE_DIAMOND") {
            item.type = "钻石"
          } else if (item.type == "MOSANG") {
            item.type = "莫桑"
          }
        }
        that.setData({
          'listData': arr
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
