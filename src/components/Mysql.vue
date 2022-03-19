<template>
    <div>
        <div class="homeTitle2">

        </div>

        <div class="homeTitle1">
             <el-row class="tac">
                <el-col :span="12">
                    <h5>MySQL教程</h5>

                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    unique-opened = true

                    >


                    <!-- 准备 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>MySQL准备</span>
                        </template>
                            <el-menu-item index="1-1" @click="mysqlJieShao" >MySQL 介绍</el-menu-item>
                            <el-menu-item index="1-2" @click="mysqlAnZhuang" >MySQL 安装</el-menu-item>
                    </el-submenu>
                    <!-- 初级 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>MySQL 初级</span>
                        </template>
                            <el-menu-item index="2-1" @click="mysqlChangeDatabases" >MySQL 操作数据库</el-menu-item>
                            <el-menu-item index="2-2" @click="mysqlChangeTables" >MySQL 操作数据表</el-menu-item>
                            <el-menu-item index="2-3" @click="MySQLJuniorSelect" >MySQL Select</el-menu-item>
                            <el-menu-item index="2-4" @click="MySQLJuniorInsert" >MySQL Insert</el-menu-item>
                            <el-menu-item index="2-5" @click="MySQLJuniorUpdate" >MySQL Update</el-menu-item>
                            <el-menu-item index="2-6" @click="MySQLJuniorDelete" >MySQL Delete</el-menu-item>
                            <el-menu-item index="2-7" @click="MySQLJuniorOrderBy" >MySQL Order By</el-menu-item>
                            <el-menu-item index="2-8" @click="MySQLJuniorGroupBy" >MySQL Group By</el-menu-item>
                            <el-menu-item index="2-9" @click="MySQLJuniorJoin" >MySQL Union</el-menu-item>
                            <el-menu-item index="2-10" @click="MySQLJuniorJoin" >MySQL Join</el-menu-item>
                            <el-menu-item index="2-11" @click="MySQLJuniorLike" >MySQL Like</el-menu-item>
                            <el-menu-item index="2-12" @click="MySQLJuniorJoin" >MySQL 正则表达式</el-menu-item>
                            
                    </el-submenu>
                    <!-- 高级 -->
                     <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>MySQL 高级</span>

                        </template>
                        <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 体系架构</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 事务</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 分布式事务</el-menu-item>
                            <el-menu-item index="1-1" @click="mysqlJieShao" >MySQL 索引基础</el-menu-item>
                            <el-menu-item index="1-1" @click="mysqlJieShao" >MySQL 索引高级</el-menu-item>
                            <el-menu-item index="1-2" @click="mysqlAnZhuang" >MySQL Expalin</el-menu-item>
                            <el-menu-item index="1-3" @click="mysqlGuanLi" >MySQL InnoDB</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL MyISAM</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL B-Tree</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL MVCC</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL 锁基础</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 锁高级</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL Undolog</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL Redolog</el-menu-item>
                            <el-menu-item index="1-4" @click="mysqlLianJie" >MySQL Binlog</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 性能调优</el-menu-item>
                    </el-submenu>
                    <!-- 面试题 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>MySQL 面试题</span>
                        </template>
                        <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 体系架构</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 面试题-网易</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 面试题-字节跳动</el-menu-item>
                            <el-menu-item index="2-13" @click="mysqlJieShao" >MySQL 面试题-快手</el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-col>
                </el-row>
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
        // 准备
        mysqlJieShao(){
            this.$router.push({
                path: "/MySQLPrePareIntroduce", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
        mysqlAnZhuang(){
             this.$router.push({
                path: "/MySQLPrePareInstall", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         mysqlChangeDatabases(){
             this.$router.push({
                path: "/MySQLJuniorChangeDatabases", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         mysqlChangeTables(){
             this.$router.push({
                path: "/MySQLJuniorChangeTables", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
          MySQLJuniorSelect(){
             this.$router.push({
                path: "/MySQLJuniorSelect", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorInsert(){
             this.$router.push({
                path: "/MySQLJuniorInsert", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorUpdate(){
             this.$router.push({
                path: "/MySQLJuniorUpdate", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorDelete(){
             this.$router.push({
                path: "/MySQLJuniorDelete", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
        MySQLJuniorOrderBy(){
             this.$router.push({
                path: "/MySQLJuniorOrderBy", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorGroupBy(){
             this.$router.push({
                path: "/MySQLJuniorGroupBy", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorJoin(){
             this.$router.push({
                path: "/MySQLJuniorJoin", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
         MySQLJuniorLike(){
             this.$router.push({
                path: "/MySQLJuniorLike", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
    },
  name: 'Mysql',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.homeTitle2{
     position: absolute;
     
     background-color:rgba(66,66,66);
      top: 100px;
      left: 0px;  
      width: 100px;  
      height: 800px;
      bottom:0px;
}
 .homeTitle1{
     // background-color: #545c64;
      position: absolute;
      top: 100px;
      left: 100px;  
      width: 400px;  
      height: 600px;
      bottom:0px;
   //   border: 2px solid #545c64;
    
    
  }

</style>
