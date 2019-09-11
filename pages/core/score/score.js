// pages/core/score/score.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jd: NaN,
    aver_score: NaN,
    total_xf: NaN,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.checkLogin()
    let that = this
    wx.request({
      url: app.server + "/v1/user",
      data: {
        project: '若水藏真',
        weChatId: app.globalData.token
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var obj = res.data.data.listUsers[0]
        
        that.setData({
          'name': obj.name,
          'id': obj.iD,
          'total_sale': obj.total_sale,
          'monthly_sale': obj.monthly_sale,
          'vip_developed': obj.vipDeveloped,
          'vip_type' : obj.vipType
        })
      },
      fail(res) {
        console.log(res)
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.get_cj()
    this.setData({
      selectedAllStatus: false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
})
