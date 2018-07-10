<template>
<div>
  <div class="n-main">
    <el-row style="width:600px;">
      <el-col :span=12>
        <el-input v-model.number="weight" />
      </el-col>
      <el-col :span=12>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="n-graph-area">
    <div id="nweek" class="n-small"></div>
    <div id="nmonth" class="n-small"></div>
    <div id="nall" class="n-small"></div>
  </div>
</div>
</template>
<script>
import {saveWeight, getData} from '@/api/weight.js'
import {parseTime} from '@/utils/date.js'
export default {
  data () {
    return {
      weight: null,
      datas: []
    }
  },
  mounted () {
    this.loadDatas()
  },
  methods: {
    loadDatas () {
      getData().then(resp => {
        this.datas = resp.data
        this.generateGraph()
      })
    },
    submit () {
      let w = this.weight
      w = w.toFixed(2)
      saveWeight({weight: w}).then(resp => {
        let s = resp.data
        if (s === 'success') {
          this.$message({
            message: '记录成功',
            type: 'success'
          })
          this.getData()
        } else if (s === 'repeat') {
          this.$message({
            message: '今日已提交',
            type: 'warning'
          })
        } else {
          this.$message.error('系统错误')
        }
      })
    },
    generateGraph () {
      let refs = ['nweek', 'nmonth', 'nall']
      this.getLineGraph(this.datas, refs)
    },
    getLineGraph (datas, refs) {
      var colors = ['#006ff3', '#3023ae', '#f76b1c', '#c86dd7']
      for (let i in refs) {
        let data = datas[i]
        let xValues = []
        let yValues = []
        for (let j in data) {
          xValues.push(parseTime(data[j].createDate, '{m}-{d}'))
          yValues.push(Number(data[j].weight))
        }
        var myChart = this.$echarts.init(document.getElementById(refs[i]))
        var series = [
          {
            name: '',
            type: 'line',
            data: yValues, // 模拟数据，后期以data代替
            lineStyle: {
              normal: {
                color: colors[i],
                width: 3,
                type: 'solid'
              }
            },
            smooth: false
          }
        ]
        let text = Number(i) === 0 ? '一周指数' : (Number(i) === 1 ? '一月指数' : '总体数据')
        myChart.setOption({
          title: {
            text: text
          },
          xAxis: [{
            type: 'category',
            show: true,
            data: xValues
          }],
          yAxis: [{
            type: 'value',
            show: true,
            max: 150,
            min: 80
          }],
          grid: {
            left: '10%',
            top: '10%',
            right: '10%',
            bottom: '10%'
          },
          series: series
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.n-main{
  padding: 50px;
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.n-graph-area{
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 100px 0px;
  .n-small{
    width: 480px;
    height: 480px;
  }
}
</style>
