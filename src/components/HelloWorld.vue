<template>
    <div>
        <div class="homeTitle">
              <div class="button">
                <div><el-link type="text" @click="MysqlMain" style="color:white;">教学主页</el-link></div>
                  <div><el-link type="text" @click="MySQLProgram" style="color:white;">编程主页</el-link></div>
                   <div> <el-link type="text"  @click="User" style="color:white;">个人信息</el-link></div>
                  <div class="login"> <el-link type="text" @click="Login" style="color:white;">登录</el-link></div>
                  <div class="register"> <el-link type="text" @click="Register" style="color:white;">注册</el-link></div>
                   <!-- <div class="unlogin"> <el-link type="text" @click="unLogin" style="color:white;">退出登录</el-link></div>   -->
              </div>
        </div>
    </div>

</template>

<script>
      
export default {
  data() {
        return{
                token:this.$route.query.token
            }
        },
  methods:{
      MysqlMain(){
        this.$router.push({
                path: "/MySQLPrePareIntroduce", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
      },
      User(){
        this.$router.push({
                path: "/User", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
      },
      Login(){
          this.$router.push({
                path: "/", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
      },
      Register(){
        this.$router.push({
                path: "/Register", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
      },
      MySQLProgram(){
            this.$router.push({
                path: "/MySQLProgram", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
      }  
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .homeTitle{
       background-color:rgb(62,110,147);
     // background-color:black;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100px;
      right: 0px;
      z-index: 100;
  }
   .homeTitle i{
     color: white;
     font-size: 40px;
   }
   .button{
     size: 100px;
   }
   .button div{
         margin-left: 100px;
         display: inline-block;
         margin-top: 25px;
         margin-right: 100px;
   }
</style>
