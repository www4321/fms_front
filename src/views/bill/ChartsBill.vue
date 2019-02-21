<template>
    <section>
        <el-col :span="24" class="toolbar intro" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="edit_bill_form">
                <el-form-item label="年份">
                    <el-select v-model="edit_bill_form.year" placeholder="请选择年份">
                        <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月份">
                    <el-select v-model="edit_bill_form.month" placeholder="请选择月份">
                        <el-option v-for="item in months" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getChartsBills">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="12">
            <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-col>


        <el-col :span="12">
            <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>

        <el-col :span="12">
            <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-col>

    </section>
</template>

<script>
    import echarts from 'echarts'
    import {chartsBillYearMonth,chartsBillYear} from '../../api/api';
    export default {
        data() {
            return {
                edit_bill_form: {
                    year:"",
                    month:1,
                },
                years:[],
                months:[1,2,3,4,5,6,7,8,9,11,12],
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null
            }
        },

        methods: {
            drawColumnChart(result) {
                let xAxis = [];
                let yAxis = [];
                Object.keys(result.data).forEach(function(key){
                    console.log(key,result.data[key]);
                    xAxis.push(key);
                    yAxis.push(result.data[key]);
                });

                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: result.title },
                  tooltip: {},
                  xAxis: {
                      data: xAxis
                  },
                  yAxis: {},
                  series: [{
                      name: '消费金额',
                      type: 'bar',
                      data: yAxis
                    }]
                });
            },
            drawPieChart(result) {
                let xAxis = [];
                let yAxis = [];
                Object.keys(result.data).forEach(function(key){
                    let ele = {
                        value:result.data[key],
                        name:key,
                    };
                    console.log(key,result.data[key]);
                    xAxis.push(key);
                    yAxis.push(ele);
                });

                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: result.title,
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: xAxis
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: yAxis,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawLineChart(result) {
                let xAxis = [];
                let yAxis = [];
                Object.keys(result.data).forEach(function(key){
                    let ele = {
                        value:result.data[key],
                        name:key,
                    };
                    console.log(key,result.data[key]);
                    xAxis.push(key);
                    yAxis.push(ele);
                });
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title: {
                        text: result.title
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['消费趋势']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '消费趋势',
                            type: 'line',
                            stack: '总量',
                            data: yAxis
                        }
                    ]
                });
            },

            drawChartsBillYearMonth() {
                let param = {
                    year:this.edit_bill_form.year,
                    month:this.edit_bill_form.month,
                };
                chartsBillYearMonth(param).then((res) => {
                    let { errCode, errMsg, data} = res;
                    if(errCode != 0){
                        console.log("http request err. errMsg:{}", errMsg);
                        this.$message({
                            message: '未查到月份数据',
                            type: 'success'
                        });
                    } else {
                        let result = {};
                        result.title = param.year + '年' + param.month + '月消费信息统计';
                        result.data = data;
                        console.log("result:",result)
                        this.drawColumnChart(result)
                        this.drawPieChart(result)
                    }
                });
            },
            drawChartsBillYear(){
                let param = {
                    year:this.edit_bill_form.year,
                };
                chartsBillYear(param).then((res) => {
                    let { errCode, errMsg, data} = res;
                    if(errCode != 0){
                        console.log("http request err. errMsg:{}", errMsg);
                        this.$message({
                            message: '未查到月份数据',
                            type: 'success'
                        });
                    } else {
                        let result = {};
                        result.title = param.year + '年消费信息统计';
                        result.data = data;
                        console.log("result:",result)
                        this.drawLineChart(result);
                    }
                });

            },
            getChartsBills() {
                this.drawChartsBillYearMonth();
            },
            getYears(){
                let date = new Date();
                let begin = 2018;
                let end = date.getFullYear();
                console.log("month:{}",date.getMonth());
                for(let i=end; i>= begin; i--){
                    this.years.push(i);
                }
                this.edit_bill_form.year = end;
                this.edit_bill_form.month = date.getMonth() + 1;
            },
        },

        mounted: function () {
            this.drawChartsBillYearMonth();
            this.drawChartsBillYear();
        },
        created: function () {
            this.getYears()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    .intro
    {
        background-color:white;
    }
    .el-col {
        padding: 30px 20px;
    }
</style>
