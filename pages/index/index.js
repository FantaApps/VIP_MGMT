//index.js
const WXAPI = require('../util/wxapi')
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
    app.getUserId()
    var that = this
    this.setData({
      "remind": app.remind,
      "offline": app.offline,
    })
  },
  onShow: function() {
    app.checkLogin()
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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
