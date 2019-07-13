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

    const token = wx.getStorageSync('token');
    if (!token) {
      this.goLoginPageTimeOut()
      return
    }
  },
  goLoginPageTimeOut: function() {
    if (this.navigateToLogin){
      return
    }
    wx.removeStorageSync('token')
    this.navigateToLogin = true
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  },

  
  server: "https://www.streamnet-chain.com/",

})
