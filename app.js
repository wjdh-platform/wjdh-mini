//app.js
App({
  servers: "https://tc.mg.cool/",
  getTime(){
    var timestamp1 = Date.parse(new Date());
    wx.setStorage({
      key: 'timestamp1',
      data: timestamp1,
    })
  },
  onLaunch(){
    this.getTime()
  },
  globalData: {
    roles: ''
  }
})