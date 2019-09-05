// pages/user/user.js
const JIYOU = require('../../util/wxapi')
var app = getApp()

Page(
  { 
    data: 
    {  
      openid: ''
    }, // 获取用户openid

    getOpenid: function() {
      var appid = 'wxedc8ed909fd5ad11'
      var secret = '73d7d1af4e520f0f641a2402d955a1d7'
      let that = this;
      wx.login({
        success: function (res) {
          if (res.code) {
          }
          JIYOU.getOpenId(
            {
              project : "若水藏真",
              resCode : res.code 
            }
          ).then(function (res) {
            var openid = res.data
            console.log('请求获取openid:' + openid);
            wx.setStorageSync('openid', openid);
            that.setData({
              openid: "获取到的openid：" + openid
            })
            if (openid == 'o4-7m5WiO7PdZRnBLEyO7anGn3FM' ||
              openid == 'o4-7m5W7wuhN8C2ktqxt0rpbvBpc') {
              app.globalData.nav = app.data.navs1
            } else {
              app.globalData.nav = app.data.navs
            }
          })
        }
      });

      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                wx.getUserInfo()
              },
              fail(res) {
                console.log(res)
              }
            })
            wx.navigateTo({
              url: '/pages/index/index',
            })
          } else {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  })
