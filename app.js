//app.js
App({
  version: "v1",
  week: 1,
  remind: "",
  offline: false,
  unauth: true,
  ui : {},
  globalData: {
    userInfo: null
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  
  onLaunch: function() {
    var end_day = wx.getStorageSync("end_day") //从本地获取学期结束日期
    var that = this
    this.user_token = "1234567890"
    if (this.user_token) {
      this.unauth = false
    } else {
      this.remind = "unauth"
    }
    var that = this
    //调用应用实例的方法获取全局数据
    that.getUserInfo(function (userInfo) {
      //更新数据
      //that.setData({
      //  userInfo: userInfo
      //})
      
    })
  },
  
  calWeek: function() {
    var begin = new Date(this.begin_day).getTime()
    var now = new Date().getTime()
    var day = Math.ceil((now - begin) / 1000 / 60 / 60 / 24)
    this.week = Math.ceil(day / 7)
    return this.week
  },
  cmpDate: function(date) { // 现在是否大于指定的时间。
    var now = new Date()
    var date = new Date(date)
    return now > date
  },
  add_formid: function(formid) {
    var that = this
    wx.request({
      url: that.server + "/add_formid",
      data: {
        user_token: that.user_token,
        formid: formid
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  get_user: function(formid) {
    var that = this
    wx.request({
      url: that.server + "/add_formid",
      data: {
        user_token: that.user_token,
        formid: formid
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  server: "https://weouc.it592.com/api",
  //server: "http://127.0.0.1:5000/api",

})