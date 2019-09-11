// pages/user/user.js
const JIYOU = require('../../util/wxapi')
var app = getApp()

Page(
  { 
    data: 
    {  
      openid: ''
    }, // 获取用户openid
    getOpenid: function () {
      let that = this;
      wx.login({
        success: function (res) {
          JIYOU.getOpenId(
            {
              project: "若水藏真",
              appid: "wxedc8ed909fd5ad11",
              resCode: res.code
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
    },
    addUser : function () {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userInfo = res.userInfo
                console.log(app.globalData.userInfo)
                const token = wx.getStorageSync('openid');
                app.globalData.token = token;
                var utc = new Date().toJSON().slice(0, 24);
                // sync to DB
                var addUserData = {
                  "userName": res.userInfo.nickName,
                  "weChatId": token,
                  "project": "若水藏真",
                  "phoneNum": '',
                  "email": '',
                  "address": '',
                  "status": 'ADDED',
                  "fromVipId": -1,
                  "createdAt": utc
                }
                JIYOU.addUserAccount(addUserData)
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/core/user/user',
            })
          }
        },
        fail(res) {
          wx.navigateTo({
            url: '/pages/core/user/user',
          })
        }
      })
    },
    authorizeLogin : function () {
      var that = this
      wx.getSetting({
        success(res) {
          console.log(res.authSetting)
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                wx.getUserInfo()
                that.getOpenid()
                that.addUser()
                wx.switchTab({
                  url: '/pages/index/index',
                })
              },
              fail(res) {
                console.log(res)
              }
            })
          } else {
            that.getOpenid()
            that.addUser()
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        },
        fail(res) {
          console.log(res)
        }
      })
    },
  })
