// pages/core/timetable/timetable.js
var app = getApp()
Page({
  data: {
    listData: [
      { "code": "01", "text": "天然钻石", "type": "50000" },
      { "code": "02", "text": "莫桑钻石", "type": "4800" },
      { "code": "03", "text": "天然钻石", "type": "40000" },
      { "code": "04", "text": "莫桑钻石", "type": "7300" },
      { "code": "05", "text": "天然钻石", "type": "35000" },
      { "code": "06", "text": "天然钻石", "type": "35600" },
      { "code": "07", "text": "莫桑钻石", "type": "3600" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }

})
