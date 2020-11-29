//app.js
import utils from './utils/util.js'
App({
  servers: "https://tc.mg.cool/",
  onLaunch(){
      
    (async () => {
      const p = await new Promise(resolve => {
          setTimeout(() => resolve("hello async/await"), 1000);
      });
      console.log(p);
  })();

  },
  globalData: {
    roles: ''
  }
})