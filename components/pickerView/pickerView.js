// components/pickerView/pickerView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    condition: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [0, 0],
    values: [0, 0],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    open: function() {
      this.setData({
        condition: !this.data.condition
      })

      this.triggerEvent('conditionState', this.data.condition) //conditionState自定义名称事件，父组件中使用
    },
    bindChange: function(e) {
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.cityData;
      if (val[0] != t[0]) {
        const citys = [];
        for (let i = 0; i < cityData[val[0]].children.length; i++) {
          citys.push(cityData[val[0]].children[i].name)
        }
        this.setData({
          province: this.data.provinces[val[0]],
          city: cityData[val[0]].children[0].name,
          citys: citys,
          values: val,
          value: [val[0], 0]
        })

        var provinceData = {
          city: this.data.city,
          province: this.data.province
        }
        this.triggerEvent('provinceData', provinceData)
      }
      if (val[1] != t[1]) {
        this.setData({
          city: this.data.citys[val[1]],
          values: val,
          value: [val[0], val[1]]
        })
        var cityData = {
          city: this.data.city
        }
        this.triggerEvent('cityData', cityData)
      }
    },


  },




})