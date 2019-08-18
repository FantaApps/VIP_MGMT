//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "swiper_height": 200,
    "notices": [{
      url: "http://www.dianping.com/shop/126396111",
      pic: "../../images/ruoshui.png"
    }],
    "navs" : app.globalData.nav,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              
              app.globalData.userInfo = res.userInfo
              console.log(app.globalData.userInfo)
            }
          })
        }
      }
    })
    var that = this
    this.setData({
      "remind": app.remind,
      "offline": app.offline,
    })
    const token = wx.getStorageSync('openid');
    app.globalData.token = token;
    
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },  
  /*跳转到登陆界面，待完善研究生登陆*/
  auth: function() {
    var type = "jwc"
    wx.navigateTo({
      url: '/pages/login/login?type=' + type,
    })
  },
  navigatetokb: function() {
    wx.navigateTo({
      url: '/pages/core/sale_month/sale_month',
    })
  },
  submit: function(e) {
    var key = e.detail.target.dataset.key //要去的地方。
    var verify = e.detail.target.dataset.verify; //需要的权限
    var content = ""
    var url = ""
    
    wx.navigateTo({
      url: '/pages/core/' + key + "/" + key,
    })
  },
  noticeTo: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/web/web?url=' + e.target.dataset.id,
    })
  },
})
