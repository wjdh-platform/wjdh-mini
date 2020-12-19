// components/changeCell/changeCell.js
import * as api from '../../api/api'
import utils from '../../utils/util.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    changeCellType: {
      type: Boolean
    },
    buildingsType: {
      type: Boolean
    },
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    villageIdx: 0,
    provincesIdx: 0,
    cityIdx: 0,
    cellType: false,
    cityType: false
  },





  /**
   * 组件的方法列表
   */
  methods: {

    bindvillageList(e) {
      let t = this,
        villageIdx = utils.getItem('villageIdx')
      t.setData({
        villageIdx: e.detail.value
      })
      if (villageIdx) {
        if (e.detail.value != utils.getItem('villageIdx')) {
          utils.setItem('changeIdx', true)
        } else {
          utils.setItem('changeIdx', false)
        }
      }

      utils.setItem('villageIdx', e.detail.value)
    },
    closePopup() {
      this.triggerEvent('changeClose', false)
    },
    changePopupType() {
      this.triggerEvent('changePopupType', true)
    },
    enterBtn() {
      let t = this
      if (t.data.villageIdx != 0) {
        // utils.setItem('community_identifier')t.data.villageList[t.data.villageIdx].community_identifier
        let json = {
          community_name: t.data.villageList[t.data.villageIdx].community_name,
          changeCellType:false
        }
        this.triggerEvent('changeClose', json)
      } else {
        utils.showToast('请选择小区', 'none')
      }
    },
    bindProvincesList(e) {
      let t = this
      t.setData({
        provincesIdx: e.detail.value
      })
      utils.setItem("provincesData",t.data.provincesData)
      utils.setItem('provincesIdx', e.detail.value)
      api.getCity({
        province_id: t.data.provincesData[e.detail.value].id
      }, (res) => {
        console.log(res)
        let oldList = res.data.data,
          list = []
        if (oldList != []) {
          list = oldList.unshift({ city_name: '请选择城市' })
          t.setData({
            cityData: oldList,
            cityType: true
          })
        }

      })
    },
    bindCityList(e) {
      let t = this
      t.setData({
        cityIdx: e.detail.value,
      })
      utils.setItem("cityData",t.data.cityData)
      utils.setItem('cityIdx', e.detail.value)
      api.getVillage({
        city_id: t.data.cityData[e.detail.value].id
      }, (res) => {
        if (res.data.code == 0) {
          let list = [],
            oldList = res.data.data
          if (oldList != []) {
            list = oldList.unshift({ community_name: '请选择小区' })
            t.setData({
              villageList: oldList,
              cellType:true
            })
            utils.setItem('villageList', oldList)
          } else {
            utils.showToast('当前城市未找到小区', 'none')
          }

        }
      })
    },
  },
  attached() {
    //请求数据(业务逻辑)
    let t = this,
         provincesData = utils.getItem('provincesData'),
         provincesIdx = utils.getItem('provincesIdx'),
         cityData = utils.getItem('cityData'),
         cityIdx = utils.getItem('cityIdx'),
         villageList = utils.getItem('villageList'),
         villageIdx = utils.getItem('villageIdx')
         if(villageIdx){
           t.setData({
            provincesData,
            provincesIdx,
            cityData,
            cityIdx,
            villageList,
            villageIdx,
            cellType:true,
            cityType:true
           })
         }else{
          api.getProvinces({}, (res) => {
            console.log(res)
            let oldList = res.data.data,
              list = []
            list = oldList.unshift({ province_name: '请选择省份' })
            t.setData({
              provincesData: oldList
            })
          })
         }

    


  }

})

