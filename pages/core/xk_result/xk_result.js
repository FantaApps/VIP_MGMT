// pages/core/timetable/timetable.js
var app = getApp()

Page({
  data: {
    listData: [
      { "code": "VIP01", "text": "A", "type": "500" },
      { "code": "VIP02", "text": "AA", "type": "1000" },
      { "code": "VIP03", "text": "B", "type": "300" },
      { "code": "VIP04", "text": "AAA", "type": "4000" },
      { "code": "VIP05", "text": "BBB", "type": "200" },
      { "code": "VIP06", "text": "A", "type": "500" },
      { "code": "VIP07", "text": "A", "type": "500" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }

})
