<template>
  <div class="ManagerHome">
      <div class="homeTitle">
          <div class="context">MySQL 学习平台管理界面 </div>
      </div>
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
         <!-- <HelloWorld></HelloWorld> -->
     
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
     
      
      <el-menu-item index="1"  @click="userInfo">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理页</span>
      </el-menu-item>
      <!-- <el-menu-item index="2"  @click="managerInfo">
        <i class="el-icon-setting"></i>
        <span slot="title">管理员管理页</span>
      </el-menu-item> -->
      <el-menu-item index="3"  @click="userSpread">
        <i class="el-icon-setting"></i>
        <span slot="title">用户广播发送页</span>
      </el-menu-item>
     
       <el-menu-item index="4"  @click="cooperationSchool">
        <i class="el-icon-setting"></i>
        <span slot="title">合作学校</span>
      </el-menu-item>
        <el-menu-item index="5"  @click="login">
        <i class="el-icon-setting"></i>
        <span slot="title">登录界面</span>
      </el-menu-item>
    </el-menu>
  </el-col>
      </div>
     
      <!-- 正文部分 -->
    <div class="mysql-change-1">
         <!-- 条件筛选部分 -->
      <el-form ref="form" :model="conditionSelectForm" label-width="80px">
        <!-- id -->
        <span>id</span>   &nbsp;
         <el-select v-model="conditionSelectForm.idOptionsValue" placeholder="默认查询所有" clearable style="width:135px">
            <el-option
            v-for="item in idOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>&nbsp;
        <el-input v-model="conditionSelectForm.id" placeholder="" style="width:200px" clearable></el-input> &nbsp;

        <span>姓名</span> &nbsp;
         <el-select v-model="conditionSelectForm.nameOptionsValue" placeholder="默认查询所有" clearable style="width:135px">
            <el-option
            v-for="item in nameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>  &nbsp;
        
        <el-input v-model="conditionSelectForm.name" placeholder="" style="width:250px" clearable></el-input> &nbsp;

        <span>身份证号</span> &nbsp;   
        <el-input v-model="conditionSelectForm.identityCardNumber" placeholder="" style="width:250px" clearable></el-input> &nbsp;  <br>

        <span>学号</span> &nbsp;
        <el-input v-model="conditionSelectForm.studentNumber" placeholder="" style="width:170px" clearable></el-input> &nbsp; 

        <span>手机号</span> &nbsp;
        <el-input v-model="conditionSelectForm.phone" placeholder="" style="width:140px" clearable></el-input> &nbsp;

        <span>大学</span> &nbsp;
         <el-select v-model="conditionSelectForm.university" clearable placeholder="默认查询所有" style="width:180px">
            <el-option
            
            v-for="item in schoolList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
            </el-option>
        </el-select> &nbsp;
        <span>是否禁用</span> &nbsp; 
         <el-select v-model="conditionSelectForm.state" clearable placeholder="默认所有" style="width:120px">
            <el-option
            
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>  &nbsp;
        <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
        <el-button type="success"  @click="selectCondition">查询</el-button>
        <el-button type="danger" @click="clearForm" >清空</el-button>
        
        <el-button type="warning"  @click="dialogVisible = true">规则说明</el-button>
      </el-form>
      <br>
         <!-- 用户列表 -->
         <el-table
            :data="userList"
            height="350"
            border
            style="width: 100%">

            <el-table-column
            sortable
             fixed="left"
            prop="id"
            label="id"
            width="100">
            </el-table-column>

            <el-table-column
            sortable
            prop="name"
            label="姓名"
            width="100">
            </el-table-column>

            <el-table-column
            sortable
             width="180"
            prop="studentNumber"
            label="学号">
            </el-table-column>

            <el-table-column
            sortable
             width="180"
            prop="identityCardNumber"
            label="身份证号">
            </el-table-column>

            <el-table-column
            sortable
             width="180"
            prop="phone"
            label="手机号">
            </el-table-column>

            <el-table-column
            sortable
             width="180"
            prop="university"
            label="大学">
            </el-table-column>

            <el-table-column
            sortable
             width="100"
            prop="className"
            label="班级">
            </el-table-column>

           
             <el-table-column
              fixed="right"
             width="80"
            prop=""
            label="是否禁用">
                  <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state"
                                :active-value="true"
                                :inactive-value="false"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="switchalive($event,scope.$index,scope.row.id)"
                        >
                        </el-switch>
                                   </template>
            </el-table-column>
                        <!--                         获取索引-->
                        <!--                         {{scope.$index}}-->
         

             <!-- 操作部分 -->
            <el-table-column 
               fixed="right"
            label="操作" 
             width="100">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row.id)">选择</el-button>
         
                </template>
            </el-table-column>

        </el-table>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div style="text-align: left;">
                1.多个查询条件连接时应该使用英文逗号连接。其他无效<br>
                2.id查询支持范围查询，格式：初始范围-终止范围<br>
                3.执行有条件的查询必须选择是精确查询还是模糊查询<br>
                4.模糊查询规则为包括查询条件的部分
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
            <br><br><br>
            <!-- 用户信息部分 -->
            <div class="userinfo-d1">
                <div><h4>指定用户信息</h4></div>
                <el-descriptions class="margin-top" title="" :column="3" :size="size" border>
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
                        height="400"
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
             <br><br><br> 
                <div><h4>用户登录历史记录</h4></div>
                <br>
                <!-- 可以根据日期查询 -->
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                 
                    <template>
                        <el-radio v-model="radio" label="special">指定用户</el-radio>
                        <el-radio v-model="radio" label="all">全部用户</el-radio>
                    </template>

                    <el-date-picker type="date" placeholder="选择开始日期" v-model="numberValidateForm.data1" style="width: 300px"></el-date-picker>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="numberValidateForm.data2" style="width: 300px"></el-date-picker>
                   &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="getUserHistoryByDate">日期查询</el-button>
                    &nbsp;&nbsp;
                    <el-button type="primary" @click="getUserHistoryAll">全部查询</el-button>
                  

                </el-form>
                <br><br>
                <template>
                    <el-table
                      :row-class-name="userLoginHistory"
                        :data="userLoginHistory"
                        height="400"
                        border
                        style="width: 100%">

                        <el-table-column
                        sortable
                        prop="id"
                        label="id"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="userId"
                        label="用户ID"
                        width="380">
                        </el-table-column>

                        <el-table-column
                        sortable
                        prop="loginTime"
                        label="登录时间"
                        width="280">
                        </el-table-column>

                         <el-table-column
                        sortable
                        prop="localHostAddress"
                        label="IP地址"
                        width="280">
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
          chooseUserId:'',
          radio:'all',
          numberValidateForm:{
              data1:'',
              data2:''
          },
          msg: 'Welcome to Your Vue.js App',
          token:this.$route.query.token,
          stateOptions:[
               {
                value: '全部',
                label: '全部'
          },{
                value: '是',
                label: '是'
          },
          {
                value: '否',
                label: '否'
          }],
          conditionSelectForm:{
              idOptionsValue:'',
              id:'',
              nameOptionsValue:'',
              name:'',
              studentNumber:'',
              identityCardNumber:'',
              phone:'',
              university:'',
              state:''
          },
          sqlData:[{
              id:'',
              sqlstatement:'',
              time:'',
              type:'',
              result:''
          }],
          user:{
              id:'',
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
              errorNumber:'',
              state:''
          },
          userList:[{
              id:'',
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
              errorNumber:'',
              state:''
          }],
          schoolList:[{
              id:'',
              name:'',
              createTime:'',
              deadline:'',
              studentNum:''
          }],
          schoolOptions:[{
              value:'',
              lable:''
          }],
            schoolOption:{
                value:'',
                lable:''
            }
            ,
          idOptions:[
              {
                value: '查询所有',
                label: '查询所有'
              }
               ,
              {
                value: '精确查询',
                label: '精确查询'
              }
               ,
               {
                value: '模糊查询',
                label: '模糊查询'
              }
              ,
          ],
          nameOptions:[
               {
                value: '查询所有',
                label: '查询所有'
              }
               ,
              {
                value: '精确查询',
                label: '精确查询'
              }
               ,
               {
                value: '模糊查询',
                label: '模糊查询'
              }
              ,
          ],
           dialogVisible: false,
           userLoginHistory:[{
               id:'',
               userId:'',
               loginTime:'',
               localHostAddress:''
               
               }],

      }
    },
    methods:{
        //跳转界面：
        userInfo(){
           
            this.$router.push({
                    path: "/ManagerHome", //目标URL，为注册的路由
                    query:{
                        token:this.token
                     }
                });
        },
        userSpread(){
             this.$router.push({
                    path: "/ManagerSpread", //目标URL，为注册的路由
                    query:{
                        token:this.token
                     }
                });
        },
        cooperationSchool(){
                this.$router.push({
                    path: "/ManagerCooperationSchool", //目标URL，为注册的路由
                    query:{
                        token:this.token
                     }
                });
        },
        login(){
                this.$router.push({
                    path: "/", //目标URL，为注册的路由
                    query:{
                        token:this.token
                     }
                });
        },
        getUserHistoryAll(){
            if(this.radio === "all"){
                this.$axios.post('ManagerController/getAllUserLoginHistory',this.$qs.stringify(
                    {
 
                    }
                     )).then(response=>{      //返回值部分
                       
                        this.userLoginHistory = response.data.map.userLoginHistory;

                     }).catch(error=>{
                    console.log(error)
                    });
            }
            else{
                this.$axios.post('ManagerController/getUserLoginHistory',this.$qs.stringify(
                    {
                            id:this.chooseUserId
                    }
                     )).then(response=>{      //返回值部分
                       
                        this.userLoginHistory = response.data.map.userLoginHistory;

                     }).catch(error=>{
                    console.log(error)
                    });  
            }
              
        },
        getUserHistoryByDate(){
            if(this.radio === "all"){
                 this.$axios.post('ManagerController/getAllUserLoginHistoryByDate',this.$qs.stringify(
                    {
                        //刚开始查询第一页
                        startTime : this.numberValidateForm.data1,
                        endTime : this.numberValidateForm.data2
                    }
                     )).then(response=>{      //返回值部分
                       
                        this.userLoginHistory = response.data.map.userLoginHistory;

                     }).catch(error=>{
                    console.log(error)
                    });
            }else{
                 this.$axios.post('ManagerController/getUserLoginHistoryByDate',this.$qs.stringify(
                    {
                        //刚开始查询第一页
                        id:this.chooseUserId,
                        startTime : this.numberValidateForm.data1,
                        endTime : this.numberValidateForm.data2
                    }
                     )).then(response=>{      //返回值部分
                       
                        this.userLoginHistory = response.data.map.userLoginHistory;

                     }).catch(error=>{
                    console.log(error)
                    });
            }
                 
        },
        //显示规则
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        //清空
        clearForm(){
            this.$router.go(0)
        },
        //查询指定的用户
        selectCondition(){
 
            this.$axios.post('ManagerController/getConditionStudent',this.$qs.stringify(
                    {
                            idOptionsValue:this.conditionSelectForm.idOptionsValue,
                            id:this.conditionSelectForm.id,
                            nameOptionsValue:this.conditionSelectForm.nameOptionsValue,
                            name:this.conditionSelectForm.name,
                            studentNumber:this.conditionSelectForm.studentNumber,
                            identityCardNumber:this.conditionSelectForm.identityCardNumber,
                            phone:this.conditionSelectForm.phone,
                            university:this.conditionSelectForm.university,
                            state:this.conditionSelectForm.state
                    }
                )).then(response=>{      //返回值部分
                    var info = response.data;
                    var type = info.type;
                    if(type === true){
                        this.userList = info.map.userByConditionList;
                    }
                    else{
                       
                            this.$alert("输入有误请检查", "error", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    this.$message({
                                        type: "error",
                                        message: `输入有误请检查`
                                    });
                                }
                            });
                        

                    }
                    

                }).catch(error=>{
                    console.log(error)
                });

                
                
        },

        //用户是否禁用
        switchalive(event,index,id){
            // alert(event)

            // alert(index)
            this.$axios.post('ManagerController/changeState',this.$qs.stringify(
                    {
                        //刚开始查询第一页
                        id:id,
                        state:event
                    }
                )).then(response=>{      //返回值部分


                }).catch(error=>{
                    console.log(error)
                });
                //改变值
                this.userList[index].state = event ;
        },
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
    },
    //根据选择获取用户信息
    handleEdit(index,id){
                       
                    this.chooseUserId = id;
        
                     this.$axios.post("UserController/getUserInfoAndSqlDataById", this.$qs.stringify({
                        id:id
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

                     this.$axios.post('ManagerController/getUserLoginHistory',this.$qs.stringify(
                    {
                        //刚开始查询第一页
                        id:id,
                    }
                     )).then(response=>{      //返回值部分
                       
                        this.userLoginHistory = response.data.map.userLoginHistory;

                     }).catch(error=>{
                    console.log(error)
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

        // else{
        //     alert("jajajaj")
        // }
        

                     this.$axios.post("ManagerController/getUserList", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.userList = info.map.userList;
                        console.log(this.userList);
                    }).catch(error => {
                        console.log(error);
                    });

                     this.$axios.post("ManagerController/getSchoolList", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.schoolList = info.map.schoolList;
                        // for(var i = 0 ; i < schoolList.length ; i ++){
                                
                        //         schoolOptions[i].label = schoolList[i].name;
                        //         schoolOptions[i].value = schoolList[i].name;
                               
                        // }
                        console.log(this.schoolList);
                        var schoolObject =  {id:'',
                                            name:'查询所有',
                                            createTime:'',
                                            deadline:'',
                                            studentNum:''}
                        this.schoolList.unshift(schoolObject)
                    }).catch(error => {
                        console.log(error);
                    });
    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
    .ManagerHome .homeTitle3{
         position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 50px;  
            width: 180px;  
            height: 2500px;
            bottom:0px;
    }
    .ManagerHome .homeTitle{
        background-color: black;
        z-index: 100;
    }
      .ManagerHome .homeTitle2{
          position: absolute;
          
          background-color:rgb(43, 39, 39);
            top: 100px;
            left: 0px;  
            width: 50px;  
            height: 2500px;
            bottom:0px;
      }
      .ManagerHome .homeBottom1{
            position: relative;
            top: 2550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index : 101;
           
        }
      .ManagerHome .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .ManagerHome .d1{
      float: left;
      text-align: left;
      position: relative;
      left:70px;
      height: 170px;
      top:50px;

      border-bottom: solid 1px #484a50;
    }
   .ManagerHome .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 150px;
      right: 50px;
      bottom:0px;
      
    }
    .el-table .warning-row {
    background: rgb(214, 130, 109);
  }

  .el-table .success-row {
    background: #aee292;
  }
  .ManagerHome .el-menu-vertical-demo{
      width: 180px;
  }
  .ManagerHome .context{
      color: white;
      font-size: 40px;
  }

</style>