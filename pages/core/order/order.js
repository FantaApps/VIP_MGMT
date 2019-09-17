var app = getApp()
const WXAPI = require('../../../wxapi/main')
const JIYOU = require('../../util/wxapi')

Page({
  //初始化数据
  data: {
    array : [],
    userInfo : [],
    index : 0,
    productNameMap: [],
    productList : [],
    productType : '',
    productName : '',
    productDescription: '',
    productId : '',
    price : '',
    index: 0,
    index1 : 0,
    date: '2016-12-20',
    time: '11:19',
    pic: '',
    allValue: ''
  },
  getProductInfo: function (lst, type, name) {
    for (var i = 0; i < lst.length; i++) {
      var info = lst[i]
      if (info.product_type == type && info.product_name == name) {
        return info
      }
    }
  },
  onLoad: function (options) {
    console.log(options)
    let that = this
    var userId = app.getUserId()
    console.log(userId)
    WXAPI.goodsDetail(options.id).then(function (res) {
      if(res.code == 0) {
        that.setData(
          {
            "productType" : res.data.category.name,
            "productName" : res.data.basicInfo.name,
            "price" : res.data.basicInfo.originalPrice,
            "pic" : res.data.basicInfo.pic
          }
        )
        that.getProductId()
      }
    })
    that.getUserAdded()
    // generate a uuid for idem purpose
    let r = Math.random().toString(36);
    that.setData(
      {
        'requestId' : r
      }
    )
  },
  getProductId : function () {
    var that = this
    JIYOU.getProductId(
      {
        project : "若水藏真",
        productType : this.data.productType,
        productName : this.data.productName
      }
    ).then(function (res) {
      that.setData(
        {
          "productId" : res.data.listProduct[0].iD
        }
      )
    })
  },
  getUserAdded : function () {
    var that = this
    JIYOU.getUserGranted(
      {
        project : "若水藏真"
      }
    ).then(function (res) {
      console.log(res)
      var arr = []
      for (var i=0; i<res.data.listUsers.length; i++) {
        var name = res.data.listUsers[i].name
        arr.push(name)
      }
      that.setData(
        {
          "array" : arr,
          "userInfo": res.data.listUsers
        }
      )
    })
  },
  checkNull: function () {
    if (this.data.productDescription == "") {
      return false;
    }
    return true
  },
  //表单提交按钮
  formSubmit: function (e) {
    var utc = new Date().toJSON().slice(0, 24);
    var that = this

    if (!this.checkNull()) {
      this.setData({
        'result': '输入数据不能为空'
      })
      return false
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.getUserId()
    wx.request({
      url: app.server + "/v1/product/purchase",
      data: {
        requestId : that.data.requestId,
        project: '若水藏真',
        product_id: that.data.productId,
        user_id: that.data.userInfo[that.data.index].iD,
        description: that.data.productDescription,
        appid: 'wxedc8ed909fd5ad11',
        status: 'INITIATED',
        sale_time: utc
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("success")
        that.setData(
          {
            'result': "成功，5秒后跳转："
          }
        )

        setTimeout(function () {
          //要延时执行的代码
          wx.switchTab({
            url: "/pages/index/index"
          })
        }, 5000) //延迟时间 

      },
      fail(res) {
        console.log(res)
      }
    })
  },
  inputContent: function (e) {
    this.setData({
      productDescription: e.detail.value
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
  
  bindPickerChange : function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData(
      {
        "index": e.detail.value
      }
    )
  },

})