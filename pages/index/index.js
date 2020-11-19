Page({

  /**
  * 页面的初始数据
  */
  data: {
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
  },
  aa() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (photo) {
        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            console.log(res)
            var ctx = wx.createCanvasContext('photo_canvas');
            var ratio = 5;
            var canvasWidth = res.width
            var canvasHeight = res.height;
            _this.setData({
              aaa: photo.tempFilePaths[0],
              canvasWidth2: res.width,
              canvasHeight2: res.height
            })
            // 保证宽高均在200以内
            while (canvasWidth > 200 || canvasHeight > 200) {
              //比例取整
              canvasWidth = Math.trunc(res.width / ratio)
              canvasHeight = Math.trunc(res.height / ratio)
              ratio++;
            }
            _this.setData({
              canvasWidth: canvasWidth,
              canvasHeight: canvasHeight
            }) //设置canvas尺寸
            ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight) //将图片填充在canvas上
            ctx.draw()
            //下载canvas图片
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'photo_canvas',
                success: function (res) {
                  console.log(res.tempFilePath)
                  _this.setData({
                    bbb: res.tempFilePath
                  })
                  wx.uploadFile({
                    filePath: res.tempFilePath,
                    name: 'name',
                    url: 'https://tc.mg.cool/api/v1/peoplephoto',
                  })
                },
                fail: function (error) {
                  console.log(error)
                }
              })
            }, 100)
          },
          fail: function (error) {
            console.log(error)
          }
        })

      },
      error: function (res) {
        console.log(res);
      }
    })
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
  }
})