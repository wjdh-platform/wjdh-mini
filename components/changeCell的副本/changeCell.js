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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    villageIdx: 0,
    province: '',
    city: '',
    changeCityType: false,
    cityData: [], //城市数组
    value: [0, 0],
    values: [0, 0],
    cellType:false
  },





  /**
   * 组件的方法列表
   */
  methods: {
    changeCity() {
      let t = this
      t.setData({
        changeCityType: true,
        province: t.data.provinces[0],
        city: t.data.citys[0],
        cityId: t.data.cityIds[0]
      })
    },
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
        this.triggerEvent('changeClose', false)
        // this.triggerEvent('changeBuildingsType',true)
      } else {
        utils.showToast('请选择小区', 'none')
      }
    },
    bindChange: function (e) {
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.cityData;
      if (val[0] != t[0]) {
        const citys = [];
        const cityIds = []
        for (let i = 0; i < cityData[val[0]].cities.length; i++) {
          citys.push(cityData[val[0]].cities[i].city_name)
          cityIds.push(cityData[val[0]].cities[i].id)
        }
        this.setData({
          province: this.data.provinces[val[0]],
          city: cityData[val[0]].cities[0].city_name,
          cityId:cityData[val[0]].cities[0].id,
          citys: citys,
          values: val,
          value: [val[0], 0]
        })
      }
      console.log(this.data.province)
      if (val[1] != t[1]) {
        this.setData({
          city: this.data.citys[val[1]],
          cityId:this.data.cityIds[val[1]],
          values: val,
          value: [val[0], val[1]]
        })
      }
    },
    open: function () {
      let t= this,
      villageIdx = utils.getItem('villageIdx')
      t.setData({
        changeCityType: !t.data.changeCityType,
        cellType:true
      })
      if (villageIdx) {
        t.setData({
          villageIdx: utils.getItem('villageIdx'),
          villageList: utils.getItem('villageList'),
        })
      } else {
        api.getVillage({ 
          city_id: t.data.cityId
         }, (res) => {
          if (res.data.code == 0) {
            let list = [],
              oldList = res.data.data
              if(oldList !=[]){
                list = oldList.unshift({ community_name: '请选择' })
                t.setData({
                  villageList: oldList
                })
                utils.setItem('villageList', oldList)
              }else{
                utils.showToast('当前城市未找到小区','none')
              }
            
          }
        })
      }
    },
  },
    attached() {
      //请求数据(业务逻辑)
      let t = this
        
      api.getCity({}, (res) => {
        console.log(res)
        let cityData = res.data.data;
        const provinces = [],
                  citys = [],
                  cityIds = []
        for (let i = 0; i < cityData.length; i++) {
          provinces.push(cityData[i].province_name);
        }
        for (let i = 0; i < cityData[0].cities.length; i++) {
          citys.push(cityData[0].cities[i].city_name)
          cityIds.push(cityData[0].cities[i].id)
        }
        t.setData({
          provinces,
          citys,
          cityIds,
          cityData
        })
      })

      
    }
  
})

