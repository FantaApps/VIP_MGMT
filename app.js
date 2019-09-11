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
    userId : "",
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
      }, {
        key: "input_user",
        desc: "增加VIP",
        verify: "jwc"
      }, {
        key: "search",
        desc: "下单",
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
      }, {
        key: "input_user",
        desc: "增加VIP",
        verify: "jwc"
      }, {
        key: "verify_user",
        desc: "确认VIP",
        verify: "jwc"
      }, {
        key: "search",
        desc: "下单",
        verify: "jwc"
      }, {
        key: "verify_order",
        desc: "确认订单",
        verify: "jwc"
      }, {
        key: "inventory",
        desc: "增加库存",
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
  onLoad: function () {
    this.checkLogin()
  },
  onLaunch: function() {
    this.checkLogin()
  },
  checkLogin : function () {
    const token = wx.getStorageSync('openid');
    if (!token) {
      wx.navigateTo({
        url: "/pages/core/user/user"
      })
    } else {
      this.globalData.token = token;
      if (token == 'o4-7m5WiO7PdZRnBLEyO7anGn3FM' ||
        token == 'o4-7m5W7wuhN8C2ktqxt0rpbvBpc') {
        this.globalData.nav = this.data.navs1
      } else {
        this.globalData.nav = this.data.navs
      }
    }
  },
  getUserId : function () {
    var that = this
    wx.request({
      url: this.server + "/v1/user",
      data: {
        project: '若水藏真',
        weChatId: this.globalData.token
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.listUsers[0].iD)
        that.globalData.userId = res.data.data.listUsers[0].iD
      },
      fail(res) {
        console.log(res)
      }
    })
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
  server: "https://www.streamnet-chain.com",
  //server: "http://localhost:8089",
  //server: "http://150.109.145.30:8089",
  //server: "http://39.100.142.164:8089",
})
