//app.js
import utils from './utils/util.js'
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
    let timestamp1 = utils.getItem('timestamp1')
         
      if(!timestamp1){
        this.getTime()
      }
      
       

  },
  globalData: {
    roles: ''
  }
})