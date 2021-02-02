//app.js
import utils from './utils/util.js'
App({
  servers: "https://tc.mg.cool/",
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.navHeight = res.statusBarHeight + 46; // 赋值导航高度
      },
      fail(err) {
        console.log(err);
      }
    })
    this.overShare()
   

  },
   //重写分享方法
   overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        console.log('是否重写分享方法', data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //你的分享配置
            return {
              title: '随时随地 回家看看',
              path: '/pages/property/property?type=share',
              imageUrl:'https://tc.mg.cool/mini/images/shareImg.jpg'
            };
          }
        }
      }
    })
  },

  globalData: {
    roles: '',
    access_token: '',
    community_identifier: '',
    villageList: [],
    villageIdx: 0,
    community_name: '',
    navHeight: 0,
    temperatures: [],
    imageUrl: 'https://tc.mg.cool/mini/images/shareImg.jpg'
  }
})
