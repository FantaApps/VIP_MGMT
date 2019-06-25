// pages/core/timetable/timetable.js
var app = getApp()

Page({
  data: {
    listData: [
      { "code": "一月", "text": "100000", "type": "500" },
      { "code": "二月", "text": "104000", "type": "1000" },
      { "code": "三月", "text": "103000", "type": "300" },
      { "code": "四月", "text": "205000", "type": "4000" },
      { "code": "五月", "text": "500000", "type": "200" },
      { "code": "六月", "text": "160000", "type": "500" },
      { "code": "七月", "text": "170000", "type": "500" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }

})
