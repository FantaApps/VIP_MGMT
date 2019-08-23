const WXAPI = require('../../util/wxapi')
var app = getApp()

Page({
  //初始化数据
  data: {
    array: [],
    listUsers : [],
    index: 0,
    weChatId: '',
    userName: '',
    address : '',
    phoneNum : '',
    email : '',
    fromVipId: '',
    status : '',
    createdAt : '',
    toId : '',
    allValue: '',
    result : ''
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.server + "/v1/user/unconfirmed",
      data: {
        project: '若水藏真',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.listUsers)
        var lst = res.data.data.listUsers
        var tmp = []
        for (var i=0; i < lst.length; i++) {
          tmp.push(lst[i].name)
        }
        that.setData({
          'array': tmp,
          'weChatId': lst[0].weChatID,
          'userName': lst[0].name,
          'address': lst[0].address,
          'phoneNum': lst[0].phoneNum,
          'email': lst[0].email,
          'fromVipId': lst[0].fromID,
          'toId': lst[0].iD,
          'listUsers' : res.data.data.listUsers
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //表单提交按钮
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      allValue: e.detail.value
    })
  },
  //表单重置按钮
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      allValue: ''
    })
  },
  //---------------------与选择器相关的方法
  //地区选择
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = parseInt(e.detail.value)
    console.log(that.data.listUsers)
    
    that.setData({
      'weChatId': that.data.listUsers[idx].weChatID,
      'userName': that.data.listUsers[idx].name,
      'address': that.data.listUsers[idx].address,
      'phoneNum': that.data.listUsers[idx].phoneNum,
      'email': that.data.listUsers[idx].email,
      'createdAt': that.data.listUsers[idx].createdAt,
      'toId': that.data.listUsers[idx].iD,
      'index' : idx
    })
  },
  //日期选择
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //时间选择
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  switch2Change : function (e) {
    console.log("confirmed")
    this.setData(
      {
        'status' : 'CONFIRMED'
      }
    )
  },
  submit : function() {
    var that = this
    var utc = new Date().toJSON().slice(0, 24);

    var data = {
      "project": "若水藏真",
      "status": "CONFIRMED",
      "fromUserId": that.data.fromVipId,
      "toUserId": that.data.toId,
      "createdAt": utc
    }

    WXAPI.updateVipDevelop(data).then(function (res) {
      that.setData(
        {
          'result': "成功"
        }
      )
    })
  }
})