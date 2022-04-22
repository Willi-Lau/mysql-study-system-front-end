<template>
  <div class="User">
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
     
    <!-- over -->
     <div class="homeTitle3">
            <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
       background-color="rgba(66,66,66)"
      @open="handleOpen"
      text-color="#fff"
      @close="handleClose">
     
      
      <el-menu-item index="4"  @click="user">
        <i class="el-icon-user"></i>
        <span slot="title">用户信息页</span>
      </el-menu-item>
      <el-menu-item index="1"  @click="password">
        <i class="el-icon-setting"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </el-col>
      </div>
    <div class="mysql-change-1">
      <div>
        
      </div>
      <div class="d1">
                <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
                    <!-- <template slot="extra">
                        <el-button type="primary" size="small">操作</el-button>
                    </template> -->

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            姓名
                        </template>
                       {{this.user.name}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            学号
                        </template>
                       {{this.user.studentNumber}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            身份证号
                        </template>
                         {{this.user.identityCardNumber}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            手机号
                        </template>
                        {{this.user.phone}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            学校
                        </template>
                         {{this.user.university}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            班级
                        </template>
                         {{this.user.className}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行SQL次数
                        </template>
                         {{this.user.sqlNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行select次数
                        </template>
                         {{this.user.selectNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行update次数
                        </template>
                         {{this.user.updateNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行insert次数
                        </template>
                         {{this.user.insertNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行delete次数
                        </template>
                         {{this.user.deleteNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行other次数
                        </template>
                         {{this.user.otherNumber}}
                    </el-descriptions-item>

                     <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行成功次数
                        </template>
                         {{this.user.successNumber}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            执行失败次数
                        </template>
                         {{this.user.errorNumber}}
                    </el-descriptions-item>

                </el-descriptions>
                <br><br><br> 
                <div><h4>执行SQL历史</h4></div>
                <br>
                <template>
                    <el-table
                      :row-class-name="tableRowClassName"
                        :data="sqlData"
                        height="1000"
                        border
                        style="width: 100%">

                        <el-table-column
                        sortable
                        prop="id"
                        label="id"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="sqlstatement"
                        label="SQL语句"
                        width="380">
                        </el-table-column>

                        <el-table-column
                        sortable
                        prop="time"
                        label="执行时间"
                        width="280">
                        </el-table-column>

                        <el-table-column
                        sortable
                        width="180"
                        prop="type"
                        label="种类"
                        :filters="[{ text: 'select', value: 'select' }, { text: 'insert', value: 'insert' },
                        { text: 'update', value: 'update' },{ text: 'delete', value: 'delete' },{ text: 'other', value: 'other' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                            effect="dark"
                            :type= myType(scope.row.type)
                            disable-transitions>{{scope.row.type}}</el-tag>
                        </template>
                        </el-table-column>

                        <el-table-column
                        sortable
                        width="180"
                        prop="result"
                         filter-placement="bottom-end"
                           column-key="result"
                         :filters="[{ text: 'success', value: 'success' }, { text: 'error', value: 'error' }]"
                        :filter-method="filterTag2"
                        label="执行结果">
                        </el-table-column>

                    </el-table>
            </template>
            
      </div>       
    </div>
  </div>
</template>
<script>



import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
    
  data() {
      return{
          msg: 'Welcome to Your Vue.js App',
          token:"1234",
          sqlData:[{
              id:'',
              sqlstatement:'',
              time:'',
              type:'',
              result:''
          }],
          user:{
              name:'',
              identityCardNumber:'',
              studentNumber:'',
              phone:'',
              university:'',
              className:'',
              sqlNumber:'',
              selectNumber:'',
              updateNumber:'',
              insertNumber:'',
              deleteNumber:'',
              otherNumber:'',
              successNumber:'',
              errorNumber:''
          }
      }
    },
    methods:{
            user(){
                  this.$router.push({
                    path: "/User", //目标URL，为注册的路由
                    query:{
                        token:this.token
                        }
                    });
            },
            password(){
                    this.$router.push({
                        path: "/ForgetPassword", //目标URL，为注册的路由
                        query:{
                            token:this.token
                            }
                    });
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('type');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.type === value;
            },
             filterTag2(value, row) {
                return row.result === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            // socket
            OnMessage(event){
                // alert(event.data)
                 this.$notify({
                    title: '提示',
                    message: event.data,
                    duration: 0,
                    type: 'success'
                    
                    });
            },
            OnOpen(){},
            OnError(){}

      ,
        myType(type){
            if(type === "select"){
                return 'success';
            }
            else if(type === 'update'){
                return 'primary';
            }
            else if(type === 'delete'){
                return 'info';
            }
            else if(type === 'insert'){
                return 'warning';
            }
            else{
                return 'danger';
            }
        },
        tableRowClassName({row, rowIndex}) {
                if (row.result === "success") {
                    return 'success-row';
                }
                else {
                    return 'warning-row';
                
                return '';
            }
            },
        drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
    }

    },
    mounted(){
        this.drawLine();
    }
    ,
    created(){
        // socket
        var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;

         var m1 = this.$route.query.token;
        //获取table list
        if(Object.keys(m1).length >0){
            this.token = m1;

               
                     this.$axios.post("UserController/getUserInfoAndSqlData", this.$qs.stringify({
                        token: this.token
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        this.user.name = info.map.userInfo.name;
                        this.user.identityCardNumber = info.map.userInfo.identityCardNumber;
                        this.user.studentNumber = info.map.userInfo.studentNumber;
                        this.user.phone = info.map.userInfo.phone;
                        this.user.university = info.map.userInfo.university;
                        this.user.className = info.map.userInfo.className;
                        this.user.sqlNumber = info.map.userInfo.sqlNumber;

                        this.user.selectNumber = info.map.userInfo.selectNumber;
                        this.user.updateNumber = info.map.userInfo.updateNumber;
                        this.user.insertNumber = info.map.userInfo.insertNumber;
                        this.user.deleteNumber = info.map.userInfo.deleteNumber;
                        this.user.otherNumber = info.map.userInfo.otherNumber;
                        this.user.successNumber = info.map.userInfo.successNumber;
                        this.user.errorNumber = info.map.userInfo.errorNumber;

                        this.sqlData = info.map.sql;

                    }).catch(error => {
                        console.log(error);
                    });
        }
             else{
                  this.$router.push({
                path: "/", //目标URL，为注册的路由
                query:{
                      
                      }
            });
        }   
        // else{
        //     alert("jajajaj")
        // }
        

                    //  this.$axios.post("UserController/getSql", this.$qs.stringify({
                    //     token: this.token
                    // })).then(response => {
                    //     var info = response.data;
                    //     console.log(info);
                    // }).catch(error => {
                    //     console.log(error);
                    // });
    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
    .User .homeTitle3{
         position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 50px;  
            width: 180px;  
            height: 1600px;
            bottom:0px;
    }
    .User .homeTitle{
        background-color: black;
        z-index: 100;
    }
      .User .homeTitle2{
          position: absolute;
          
          background-color:rgb(43, 39, 39);
            top: 100px;
            left: 0px;  
            width: 50px;  
            height: 1600px;
            bottom:0px;
      }
      .User .homeBottom1{
            position: relative;
            top: 1650px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index : 101;
           
        }
      .User .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .User .d1{
      float: left;
      text-align: left;
      position: relative;
      left:70px;
      height: 170px;
      top:50px;

      border-bottom: solid 1px #484a50;
    }
   .User .mysql-change-1{
      position: absolute;
      left: 200px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
    .el-table .warning-row {
    background: rgb(214, 130, 109);
  }

  .el-table .success-row {
    background: #aee292;
  }
  .User .el-menu-vertical-demo{
      width: 180px;
  }
</style>