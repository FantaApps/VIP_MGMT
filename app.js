//app.js
App({
  version: "v1",
  week: 1,
  remind: "",
  offline: false,
  unauth: true,
  ui : {},
  globalData: {
    userInfo: null,
    token : "",
    nav : []
  },
  data : {
    "navs": [
      {
        key: "score",
        desc: "VIP积分",
        verify: "jwc"
      }, {
        key: "sale_summary",
        desc: "销售成绩",
        verify: "jwc"
      }
    ],
    "navs1": [
      {
        key: "score",
        desc: "VIP积分",
        verify: "jwc"
      }, {
        key: "sale_summary",
        desc: "销售成绩",
        verify: "jwc"
      }, {
        key: "tot_summary",
        desc: "销售汇总",
        verify: "jwc"
      }
    ]
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
    const token = wx.getStorageSync('openid');
    this.globalData.token = token;
    console.log(token)

    if (token == 'o4-7m5WiO7PdZRnBLEyO7anGn3FM' ||
        token == 'o4-7m5W7wuhN8C2ktqxt0rpbvBpc') {
      this.globalData.nav = this.data.navs1
    } else {
      this.globalData.nav = this.data.navs
    }

    if (!token) {
      wx.navigateTo({
        url: "/pages/core/user/user"
      })
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
  
  //server: "https://www.streamnet-chain.com",
  //server: "http://localhost:8089",
  server: "http://39.100.142.164:8089",
})
