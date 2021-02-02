// components/changeCell/changeCell.js
import * as api from '../../api/api'
import utils from '../../utils/util.js'
const app = getApp();
var startPoint
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
    title: {
      type: String
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
    cityType: false,
    windowHeight: '',
    windowWidth: '',

    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    changeCellType:false
  },





  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e){
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.districtData;
      
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
        // return;
      }
      if(val[2] != t[2]){
        console.log('county no');
        this.setData({
          county: this.data.countys[val[2]],
          values: val,
          value:[val[0],val[1],val[2]]
        })
        // return;
      }


      
      
    },
    openPicker(){
      let t = this,
       cityData = t.data.districtData,
         provinces = [],
        citys = [],
        countys = []
        
        t.setData({
          condition:!this.data.condition,
          value:[0,0,0]
        })
      
        utils.removeItem('districtData')
        utils.removeItem('cityIdx')

        for (let i = 0; i < cityData.length; i++) {
          provinces.push(cityData[i]);
        }
        console.log('省份完成');
        for (let i = 0; i < cityData[0].cities.length; i++) {
          citys.push(cityData[0].cities[i])
        }
        console.log('city完成');
        for (let i = 0; i < cityData[0].cities[0].counties.length; i++) {
          countys.push(cityData[0].cities[0].counties[i])
        }
        console.log('区县完成');

        t.setData({
          'provinces': provinces,
          'citys': citys,
          'countys': countys,
          'province': cityData[0],
          'city': cityData[0].cities[0],
          'county': cityData[0].cities[0].counties[0]
        })
    },
    open:function(e){
      console.log(e.currentTarget.dataset.btn)
      let t = this,
      btn = e.currentTarget.dataset.btn,
       cityData = t.data.districtData
        
        if(btn == 'enter'){
          api.getVillage({
            county_id: cityData[t.data.value[0]].cities[t.data.value[1]].counties[t.data.value[2]].id
          }, (res) => {
            if (res.data.code == 0) {
              let list = [],
                oldList = res.data.data
              if (oldList.length>0) {
                list = oldList.unshift({
                  community_name: '请选择小区'
                })
                t.setData({
                  villageList: oldList,
                  cellType: true
                })
                utils.setItem('villageList', oldList)
              } else {
                t.setData({
                  villageList: [],
                  cellType: false,
                  villageIdx:0
                })
                utils.setItem('villageList', [])
                utils.setItem('villageIdx', 0)
              }
    
            }
          })
        }
        utils.setItem('districtData', t.data.districtData)
        utils.setItem('cityIdx', t.data.value)
      t.setData({
        condition:!this.data.condition
      })
    },
    getsize() {
      let that = this;
      wx.getSystemInfo({
        success(res) {
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth
          })
        },
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
      let villageIdx = utils.getItem('villageIdx')
      if (villageIdx&&villageIdx!=0) {
        this.triggerEvent('closeBtn', false)
      } else {
        utils.showToast('必须选择小区后才能进行后续操作！', 'none')
      }

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
          changeCellType: false
        }
        this.triggerEvent('changeClose', json)
      } else if(t.data.villageList.length == 0){
        utils.showToast('当前城市暂未开通智慧社区', 'none')
      }else {
        utils.showToast('请选择小区', 'none')
      }
    },
    districtData(){

      api.district({}, (res) => {
        console.log(res.data.data)
        
        this.setData({
          districtData: res.data.data
        })
      })
    }
    
  

  },
  attached() {
    //请求数据(业务逻辑)
    let t = this,
      districtData = utils.getItem('districtData'),
      cityIdx = utils.getItem('cityIdx'),
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    t.getsize();
    t.districtData()
    if (villageIdx) {
      t.setData({
        villageList,
        villageIdx,
        cellType: true,
        cityType: true,
        // province:districtData[cityIdx[0]],
        // city:districtData[cityIdx[0]].cities[cityIdx[1]],
        // county:districtData[cityIdx[0]].cities[cityIdx[1]].counties[cityIdx[2]],
      })
    } else {
    
      

      
    }





  }

})
