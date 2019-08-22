var app = getApp()

Page({
  //初始化数据
  data: {
    array: [],
    listSales: [],
    index: 0,
    orderId: '',
    userName: '',
    productType: '',
    productName: '',
    price: '',
    description: '',
    status: '',
    createdAt: '',
    toId: '',
    allValue: '',
    result: ''
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.server + "/v1/product/sale/unconfirmed",
      data: {
        project: '若水藏真',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        var lst = res.data.data.listProductPurchase
        var tmp = []
        for (var i = 0; i < lst.length; i++) {
          tmp.push(lst[i].order_id)
        }
        that.setData({
          'array': tmp,
          'orderId': lst[0].order_id,
          'userName': lst[0].user_name,
          'productType': lst[0].productInfo.product_type,
          'productName': lst[0].productInfo.product_name,
          'price': lst[0].productInfo.product_price,
          'description': lst[0].description,
          'status': lst[0].status,
          'index' : 0,
          'listSales' : lst
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
    console.log(that.data.listSales)

    that.setData({
      'orderId': that.data.listSales[idx].order_id,
      'userName': that.data.listSales[idx].user_name,
      'productType': that.data.listSales[idx].productInfo.product_type,
      'productName': that.data.listSales[idx].productInfo.product_name,
      'price': that.data.listSales[idx].productInfo.product_price,
      'description': that.data.listSales[idx].description,
      'index': idx
    })
  },
  
  switch2Change: function (e) {
    console.log("confirmed")
    this.setData(
      {
        'status': 'COMPLETED'
      }
    )
  },
  submit: function () {
    var that = this
    var utc = new Date().toJSON().slice(0, 24);
    var idx = that.data.index
    wx.request({
      url: app.server + "/v1/product/purchase",
      data: {
        orderId: that.data.listSales[idx].order_id,
        user_id: that.data.listSales[idx].user_id,
        product_id: that.data.listSales[idx].product_id,
        project: that.data.listSales[idx].project,
        status: that.data.status,
        description: that.data.listSales[idx].description,
        sale_time: utc
      },
      method: 'PUT',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('success')
        that.setData(
          {
            'result': "成功"
          }
        )
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
