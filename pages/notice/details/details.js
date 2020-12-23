// pages/notice/details/details.js
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[{
      id:'0',
      title:'温馨提示——请注意厨房用火安全',
      intro:'<p>某小区业主在做饭时,将油倒入锅中点燃天然气便离开厨房到外屋接听电话,由于长时间未返回厨房处理,导致锅内菜油加热过度引发燃烧,业主发现后发出惊呼,该小区物业公司工作人员立即持灭火器迅速赶往现场紧急处置。在大家的共同努力下,及时排除了险情。这一幕不是电影中的场景,而是前两天某小区刚发生的一起失火事件。该小区相关领导也在第一时间内赶到现场,向业主询问了具体情况,及时对业主情绪进行了安抚,安排保洁员协助业主对失火房间进行了清理。物业社区微信，物业公司工作人员在对该户业主厨房进行检查时发现:燃气灶胶管烧坏,气灶上方一块玻璃破损,其它均无损失。此次失火事件虽未给业主造成较大的损失,但着实让人后怕。在此我们提醒各位:请注意厨房用火安全。</p><p>1、 定期检查煤气管道接头是否漏气;</p><p>2、 外出时请务必确认煤气阀门是否关闭;</p><p>3、 发现异常情况请及时报修,发生紧急情况请及时报警;</p><p>4、 煤气灶处于明火状态时请勿离开厨房。</p>',
      img:['https://tc.mg.cool/uploads/rq01.jpg','https://tc.mg.cool/uploads/rq02.jpg'],
      time:'一天前'
    },{
      id:'1',
      title:'关于高空抛物的温馨提示      ',
      intro:'<p>尊敬的业主/住户:</p><p>近期管理服务中心接到业主/住户反映,有人从楼上向下扔杂物、烟头等,此不良行为严重危及他人安全。</p><p>为杜绝类似事件发生,敬请各业主/住户不要空抛物,您的细心大家齐安心。</p>',
      img:['https://tc.mg.cool/uploads/gkpw.jpg','https://tc.mg.cool/uploads/gkpw2.jpg'],
      time:'2020年11月20日'
    },{
      id:'2',
      title:'关于小区停水的通知',
      intro:'<p>尊敬的业主/住户:</p><p>由于小区管网维修,本小区将在2020年10月5日09:00—11:00停水,请各位业主及住户提前做好储水准备,由此给您带来的不便,敬请谅解,谢谢合作!</p>',
      img:['https://tc.mg.cool/uploads/tstz.jpg'],
      time:'2020年10月5日'
    },{
      id:'3',
      title:'国庆节放假的温馨提示',
      intro:'<p>尊敬的各位业主: </p><p>您好!</p><p>国庆节将至,为了让小区业主能渡过一个愉快、安全的大假,我公司在这里特别提醒大家:</p><p>1、如您安携家人外出旅游、访友,请一定认真检查水、电、气、门窗是否已关闭好,避免留下安全隐患。</p><p>2、如果您和家人将外出较长时间,建议您到物管处进行登记备案,在您外出期间,物管处将在您外出期间对您的住处进行重点检查巡逻</p><p>3、建议您在家里不要存放大量现金,并妥善放置好贵重物品(如金银首饰等)</p><p>4、在大假期间小区将停止一切装修活动,以确保节日期间有一个安宁、和睦氛围。10月8日恢复小区装修活动。</p><p>5、节日期间小区来访的亲朋好友较多,请提醒他们配合物管的查询、访客登记工作,以确保小区节日的安全。</p>',
      img:['https://tc.mg.cool/uploads/gq01.jpg','https://tc.mg.cool/uploads/gq02.jpg'],
      time:'2020年9月29日'
    }
  ]

  },

  getNoticeDetails(param){
    api.noticeDetails(param,(res)=>{
      let data = res.data
      if(data.code == 0){
        this.setData({
          noticeDetails:data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id:options.id
    })
    this.getNoticeDetails({ announcement_id: options.id })
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