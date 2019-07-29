var app = getApp()
Page({
  data: {
  },
  curday : function (sp) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (mm + sp + dd + sp + yyyy);
  },
  onLoad: function () {
    let that = this
    var today = this.curday('-');
    wx.request({
      url: app.server + "/get_file",
      data: {
        project: 'diamond',
        key: app.globalData.token,
        secondary: 'sale',
        third: today,
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
          for (var i in obj[key]) {
            var item = obj[key][i]
            console.log(item)
            if(item.type == "TRUE_DIAMOND") {
              item.type = "钻石"
            } else if (item.type == "MOSANG") {
              item.type = "莫桑"
            }
          }
        }
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
