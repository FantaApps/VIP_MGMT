// pages/user/user.js
const WXAPI = require('../../util/wxapi')

Page(
{ 
  data: 
  {  
    openid: ''
  }, // 获取用户openid
  getOpenid: function() {  
    let that = this;  //获取openid不需要授权
    wx.login({   success: function(res) {    //请求自己后台获取用户openid
      wx.request(
      {     
        url: 'https://30paotui.com/user/wechat',     
        data: {      
          appid: 'wxedc8ed909fd5ad11',      
          secret: '73d7d1af4e520f0f641a2402d955a1d7',      
          code: res.code
        },     
        success: function(response) {      
          var openid = response.data.openid;      
          console.log('请求获取openid:' + openid);
          wx.setStorageSync('openid', openid);
          that.setData({       openid: "获取到的openid：" + openid
          })
        }
      })
    }
  })

  wx.navigateTo({
    url: '/pages/index/index',
  })
 }
})
