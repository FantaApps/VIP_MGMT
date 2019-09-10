// pages/leftSlide/leftSlide.js

const app = getApp()
import itemData from './mock.js'
import Touches from '../../utils/Touches.js'
const JIYOU = require('../../util/wxapi')

Page({
  data: {
    itemData,
  },
  Touches: new Touches(),
  touchS: function (e) {  // touchstart
    let startX = this.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let itemData = this.Touches.touchM(e, this.data.itemData, this.data.startX)
    itemData && this.setData({ itemData })

  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let itemData = this.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData })
  },
  itemDelete: function (e) {  // itemDelete
    let itemData = this.Touches.deleteItem(e, this.data.itemData)
    itemData && this.setData({ itemData })
  },
  setConfirmed : function (e) {
    var that = this
    var idx = e.target.id
    wx.showModal({
      title: '提示',
      content: '确认订单吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log(that.data.itemData)
          var utc = new Date().toJSON().slice(0, 24);
          JIYOU.confirmPurchase(
            {
              orderId: that.data.itemData[idx].order_id,
              user_id: that.data.itemData[idx].user_id,
              product_id: that.data.itemData[idx].product_id,
              project: that.data.itemData[idx].project,
              appid: 'wxedc8ed909fd5ad11',
              status: "COMPLETED",
              description: that.data.itemData[idx].description,
              sale_time: utc
            }
          ).then(function (res) {
            wx.navigateTo({
              url: "/pages/index/index"
            })
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (options) {
    let that = this
    
    JIYOU.getUnconfirmedPurchase(
      {
        project: '若水藏真',
      }
    ).then(function (res) {
      that.setData({
        'itemData': res.data.listProductPurchase
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})