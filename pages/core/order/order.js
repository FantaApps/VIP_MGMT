var app = getApp()

Page({
  //初始化数据
  data: {
    array_type: [],
    array_product: [],
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
    let that = this
    wx.request({
      url: app.server + "/v1/product",
      data: {
        project: '若水藏真',
        productType : '',
        productName : ''
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.productNameMap)
        var arr = [];
        Object.keys(res.data.data.productNameMap).forEach(function (key) {
          arr.push(key)
        });
        console.log(res.data.data)
        var type = arr[0]
        var name = res.data.data.productNameMap[arr[0]][0]
        var lst = res.data.data.listProduct

        var productInfo = that.getProductInfo(lst, type, name)
        console.log(productInfo)
        that.setData (
          {
            'array_type' : arr,
            'array_product': res.data.data.productNameMap[arr[0]],
            'productNameMap': res.data.data.productNameMap,
            'productList' : lst,
            'productType': type,
            'productName': name,
            'productId': productInfo.iD,
            'price' : productInfo.product_price
          }
        )
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  
  //表单提交按钮
  formSubmit: function (e) {
    var utc = new Date().toJSON().slice(0, 24);
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: app.server + "/v1/product/purchase",
      data: {
        project: '若水藏真',
        product_id: that.data.productId,
        user_id: app.globalData.userId,
        description: that.data.productDescription,
        status: 'INITIATED',
        sale_time: utc
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("success")
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
  //地区选择
  bindPickerChangeType: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var type = this.data.array_type[e.detail.value] 
    var arr_prod = this.data.productNameMap[this.data.array_type[e.detail.value]]
    var name = arr_prod[0]
    var productInfo = that.getProductInfo(that.data.productList, type, name)
    that.setData({
      index: e.detail.value,
      index1 : 0,
      'array_product': arr_prod,
      'productType': type,
      'productName': name,
      'productId': productInfo.iD,
      'price': productInfo.product_price
    })
  },
  bindPickerChangeName : function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    
    var name = that.data.array_product[e.detail.value]
    var productInfo = that.getProductInfo(that.data.productList, that.data.productType, name)
    that.setData({
      index1: e.detail.value,
      'productName': name,
      'productId': productInfo.iD,
      'price': productInfo.product_price
    })
  },

})