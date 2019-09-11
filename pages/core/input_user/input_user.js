const WXAPI = require('../../util/wxapi')

var app = getApp()
Page({
  data: {
    array : [],
    wechatID: '',
    listUsers: [],
    userName: '',
    fromUserId: '',
    phoneNum : '',
    address: '',
    email : '',
    userId : '',
    result : '',
    titleEmpty: true,
    contentEmpty: true
  },
  onLoad: function (opt) {
    app.checkLogin()
    var that = this
    var data = {
      "project" : "若水藏真"
    }
    WXAPI.getUserAdded(data).then(function (res) {
      var lstUsers = res.data.listUsers
      if (lstUsers.length > 0) {
        var arr = []
        for(var i=0; i<lstUsers.length; i++) {
          arr.push(lstUsers[i].name)
        }
        that.setData(
          {
            'index': 0,
            'array' : arr,
            'userName' : lstUsers[0].name,
            'wechatID': arr[0],
            'listUsers' : lstUsers
          }
        )
      }
    })
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
    var userName = e.detail.value.userName.trim();
    var email = e.detail.value.email.trim();
    var phoneNum = e.detail.value.phoneNum.trim();
    var address = e.detail.value.address.trim();
    var wid = this.data.listUsers[this.data.index].weChatID
    console.log(wid)
    this.setData({
      userName : userName,
      email : email,
      phoneNum : phoneNum,
      address : address,
      wechatID: wid
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

    var data = {
      project: '若水藏真',
      weChatId: that.data.wechatID,
      userName: that.data.userName,
      phoneNum: that.data.phoneNum,
      email: that.data.email,
      address: that.data.address,
      status: "GRANTED",
      createdAt: utc
    }
    WXAPI.updateUserAccount(data).then(function (res) {
      console.log(res.data.userId)
      console.log(res.data)
      that.setData({
        'result': '成功',
        'userId': res.data.userId
      })

      var data1 = {
        project: '若水藏真',
        fromUserId: app.globalData.userId,
        toUserId: res.data.userId,
        status: "INITIATED",
        createdAt: utc
      }

      WXAPI.addVipDevelop(data1).then(function (res) {
        console.log(res)
        that.setData({
          'result': '成功'
        })
      })
    })
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = parseInt(e.detail.value)

    that.setData({
      'weChatId': that.data.listUsers[idx].weChatID,
      'userName': that.data.listUsers[idx].name,
      'index': idx
    })
  },
})
