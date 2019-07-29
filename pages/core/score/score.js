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
    listData: [
      { "code": "珠宝顾问", "text": "每月到店参加分享活动及专业学习", "type": "统一零售价27%分红，团队销售总额5%奖金" },
      { "code": "珠宝经理", "text": "发展5名以上珠宝顾问", "type": "统一零售价27%分红，团队销售总额8%奖金" },
      { "code": "珠宝总监", "text": "发展30名以上珠宝顾问", "type": "统一零售价27%分红，带领团队销售总额8%奖金" },
      { "code": "珠宝高级合伙人", "text": "发展50名义上珠宝顾问", "type": "统一零售价27%分红，带领团队销售总额8%奖金，项目干股5%分红" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.request({
      url: app.server + "/get_file",
      data: {
        project: 'diamond',
        key: app.globalData.token,
        secondary: 'vipinfo',
        tag: "KV"
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        
        var json = res.data.replace("\[", "").replace("\]", "").replace("\'", "").replace("\'", "")
        console.log(json)
        var obj = JSON.parse(json)

        if (obj.vipType == 'ADVANCED') {
          obj.vipType = "珠宝经理";
        }
        that.setData({
          'xh': obj.vipID,
          'jd': obj.vipType,
          'total_xf': obj.developedVIP,
          'aver_score': obj.score
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