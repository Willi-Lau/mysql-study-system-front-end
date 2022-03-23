<template>
    <div>
        <div class="homeTitle">
              <div class="button">
                <div></div>
                   <el-button type="text">教学主页</el-button>
                   <el-button type="text" @click="MySQLProgram">编程主页</el-button>
                   <el-button type="text">登录</el-button>
                   <el-button type="text">注册</el-button>
                   <el-button type="text">个人信息</el-button>
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
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100px;
      right: 0px;
      z-index: 10000;
  }
   .homeTitle i{
     color: white;
     font-size: 40px;
   }
   .button{
     size: 100px;
   }
</style>
