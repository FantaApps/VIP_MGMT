import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
const JIYOU = require('../../util/wxapi')
const WXAPI = require('apifm-wxapi')
var app = getApp()
const wxUploadFile = promisify(wx.uploadFile)

Page({

  data: {
    typeCount: 0,
    nameCount: 0,
    priceCount: 0,
    descriptionCount: 0,
    type: '',
    name: '',
    price: '',
    description: '',
    images: []
  },

  onLoad(options) {
    $init(this)
  },

  handleTypeInput(e) {
    const value = e.detail.value
    this.data.type = value
    this.data.typeCount = value.length
    $digest(this)
  },

  handleNameInput(e) {
    const value = e.detail.value
    this.data.name = value
    this.data.nameCount = value.length
    $digest(this)
  },

  handlePriceInput(e) {
    const value = e.detail.value
    this.data.price = value
    this.data.priceCount = value.length
    $digest(this)
  },

  handleDescriptionInput(e) {
    const value = e.detail.value
    this.data.description = value
    this.data.descriptionCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  submitForm(e) {
    var that = this
    const title = this.data.title
    const content = this.data.content

    //if (title && content) {
    if(true) {
      const arr = []

      for (let path of this.data.images) {
        arr.push(wxUploadFile({
          url: app.server + '/v1/product/upload',
          filePath: path,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
        }))
      }

      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      Promise.all(arr).then(res => {
        console.log(res[0].data)
        return res.map(item => JSON.parse(item.data).data)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        var utc = new Date().toJSON().slice(0, 24);
        return JIYOU.addProduct(
          {
            "product_type" : that.data.type,
            "product_name" : that.data.name,
            "product_price" : parseInt(that.data.price),
            "product_description" : that.data.description,
            "project" : "若水藏真",
            "imageLinks": JSON.stringify(urls),
            "createdTime" : utc
            
          }
        )
        //console.log(urls)
        //return createQuestion({
        //  title: title,
        //  content: content,
        //  images: urls
        //})
      }).then(res => {
        //const pages = getCurrentPages();
        //const currPage = pages[pages.length - 1];
        //const prevPage = pages[pages.length - 2];

        //prevPage.data.questions.unshift(res)
        //$digest(prevPage)

        //wx.navigateBack()
      }).catch(err => {
        console.log(">>>> create question error:", err)
      }).then(() => {
        wx.hideLoading()
      })
    }
  }
})