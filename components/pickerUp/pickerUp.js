// components/pickerUp/pickerUp.js
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      condition: {
        type: Boolean
      },
      provinces: {
        type: Array,
        value: []
      },
      province: {
        type: String,
        value: ''
      },
      citys: {
        type: Array,
        value: []
      },
      city: {
        type: String,
        value: ''
      },
      cityData: {
        type: Array,
        value: []
      },
      countys: {
        type: [],
        value: ''
      },
      county: {
        type: String,
        value: []
      }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [0, 0, 0],
    values: [0, 0, 0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e){
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.cityData;
      
      if(val[0] != t[0]){
        console.log('province no ');
        const citys = [];
        const countys = [];
  
        for (let i = 0 ; i < cityData[val[0]].cities.length; i++) {
          citys.push(cityData[val[0]].cities[i])
        }
        for (let i = 0 ; i < cityData[val[0]].cities[0].counties.length; i++) {
          countys.push(cityData[val[0]].cities[0].counties[i])
        }
  
        this.setData({
          province: this.data.provinces[val[0]],
          city: cityData[val[0]].cities[0],
          citys:citys,
          county: cityData[val[0]].cities[0].counties[0],
          countys:countys,
          values: val,
          value:[val[0],0,0]
        })
        var provinceData = {
          city:  cityData[val[0]].cities[0].city_name,
          province: this.data.provinces[val[0]].province_name,
          county: cityData[val[0]].cities[0].counties[0].county_name
        }
        this.triggerEvent('provinceData', provinceData)
        
        // return;
      }
      if(val[1] != t[1]){
        console.log('city no');
        const countys = [];
  
        for (let i = 0 ; i < cityData[val[0]].cities[val[1]].counties.length; i++) {
          countys.push(cityData[val[0]].cities[val[1]].counties[i])
        }
        
        this.setData({
          city: this.data.citys[val[1]],
          county: cityData[val[0]].cities[val[1]].counties[0],
          countys:countys,
          values: val,
          value:[val[0],val[1],0]
        })
        var cityData = {
          city: this.data.citys[val[1]].city_name,
          county: this.data.cityData[val[0]].cities[val[1]].counties[0].county_name
        }
        this.triggerEvent('cityData', cityData)
        // return;
      }
      if(val[2] != t[2]){
        console.log('county no');
        this.setData({
          county: this.data.countys[val[2]],
          values: val,
          value:[val[0],val[1],val[2]]
        })
        var countyData = {
          county: this.data.countys[val[2]].county_name
        }
        console.log(this.data.countys[val[2]])
        this.triggerEvent('countyData', countyData)
        // return;
      }


      
      
    },
    open:function(e){
      console.log(e.currentTarget.dataset.btn)
      let t = this,
      btn = e.currentTarget.dataset.btn,
       cityData = t.data.cityData
        
        if(btn == 'enter'){
          this.triggerEvent('cellId', cityData[t.data.value[0]].cities[t.data.value[1]].counties[t.data.value[2]].id)
          // api.getVillage({
          //   county_id: cityData[t.data.value[0]].cities[t.data.value[1]].counties[t.data.value[2]].id
          // }, (res) => {
          //   if (res.data.code == 0) {
          //     let list = [],
          //       oldList = res.data.data
          //     if (oldList.length>0) {
          //       list = oldList.unshift({
          //         community_name: '请选择小区'
          //       })
          //       t.setData({
          //         villageList: oldList,
          //         cellType: true
          //       })
          //       utils.setItem('villageList', oldList)
          //     } else {
          //       t.setData({
          //         villageList: [],
          //         cellType: false,
          //         villageIdx:0
          //       })
          //       utils.setItem('villageList', [])
          //       utils.setItem('villageIdx', 0)
          //     }
    
          //   }
          // })
        }
        utils.setItem('districtData', t.data.districtData)
        utils.setItem('cityIdx', t.data.value)
      t.setData({
        condition:!this.data.condition
      })
      this.triggerEvent('conditionState', this.data.condition)
    },
  }
})
