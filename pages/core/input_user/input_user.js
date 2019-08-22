var app = getApp()
Page({
  data: {
    wechatID: '',
    userName: '',
    phoneNum : '',
    address: '',
    email : '',
    userId : '',
    result : '',
    titleEmpty: true,
    contentEmpty: true
  },
  onLoad: function (opt) {
    // 设置初始值
    /*this.setData({
      wechatId: opt.wechatId,
      //name: opt.name
    })
    console.log(this.data.wechatId)
    this.setData({
      titleEmpty: this.data.title),
      contentEmpty: util.isTextEmpty(this.data.content)
    })*/
  },
  inputTitle: function (e) {
    this.setData({
      titleEmpty: e.detail.value.length == 0
    })
  },
  clearTitle: function () {
    this.setData({
      title: '',
      titleEmpty: true
    })
  },
  inputContent: function (e) {
    this.setData({
      contentEmpty: e.detail.value.length == 0
    })
  },
  clearContent: function () {
    this.setData({
      content: '',
      contentEmpty: true
    })
  },
  save: function (e) {
    console.log(e)
    var wechatID = e.detail.value.wechatID.trim();
    var userName = e.detail.value.userName.trim();
    var email = e.detail.value.email.trim();
    var phoneNum = e.detail.value.phoneNum.trim();
    var address = e.detail.value.address.trim();
    this.setData({
      wechatID : wechatID,
      userName : userName,
      email : email,
      phoneNum : phoneNum,
      address : address
    })
    console.log(this.data)
    // 提交请求
  },
  checkNull : function () {
    if (this.data.wechatID == "" ||
      app.globalData.userId == "" ||
      this.data.userName == "" ||
      this.data.phoneNum == "" || 
      this.data.email == "" ||
      this.data.address == "") {
        return false;
    }
    return true
  },
  submitData : function() {
    if (!this.checkNull()) {
      this.setData({
        'result': '输入数据不能为空'
      })
      return false
    }
    var utc = new Date().toJSON().slice(0, 24);
    var that = this
    wx.request({
      url: app.server + "/v1/user/add",
      data: {
        project: '若水藏真',
        weChatId: this.data.wechatID,
        fromVipId: app.globalData.userId,
        userName: this.data.userName,
        phoneNum: this.data.phoneNum,
        email: this.data.email,
        address: this.data.address,
        status: "INITIATED",
        createdAt : utc
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.userId)
        that.setData({
          'result': '成功',
          'userId': res.data.data.userId
        })
      },
      fail(res) {
        console.log(res)
        that.setData({
          'result': '失败'
        })
      }
    })
 }
})
