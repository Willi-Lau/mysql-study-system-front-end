<template>
  <div class="MySQLSeniorFrameWork">
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
      <Mysql></Mysql>
    <!-- over -->
    <div class="mysql-change-1">
      <div>
        
      </div>
      <div class="d1">
          <h1>
           MySQL 架构设计
          </h1>
         首先来看一下MySQL架构图<br><br>

          <img src="../assets/mysql-framework.jpg" width="800px"><br><br>
           <div>
               1.最上层的服务并不是MySQL独有的，大多数基于网络的客户端/服务器的工具或者服务都有类似的架构。比如连接处理，授权认证，安全等
           </div>
           <br><br>
           <div>
               2.第二层的架构是MySQL中比较有意思的部分。大多数MySQL核心服务都在这一层，包括查询解析，分析，优化，缓存及所有的内置函数（例如日期，时间，数学，加密函数）
                ，所有跨存储引擎的功能都在这一层实现：存储过程，触发器，函数等
           </div>
            <br><br>
           <div>
               3.第三增包含了存储引擎。存储引擎负责MySQL中数据的存储和提取.和GNU/Linux下的各种文件系统一样，每一个存储引擎都有它的优势和劣势
               。服务器通过Api与存储引擎进行通信。这些接口屏蔽了不同存储引擎之间的差异，使得这些差异对上层的查询过程透明。存储引擎Api包含了
               几十个底层函数，用于执行诸如‘开始一个事务’或者‘根据主键提取一行记录’等操作。但存储引擎不回去解析SQL，不同的存储引擎不会通信，
               而是简单的相应上层服务器的请求。
           </div>
         
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
          token:this.$route.query.token,
      }
    },
    methods:{

    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
      .MySQLSeniorFrameWork .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorFrameWork .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorFrameWork .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorFrameWork .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorFrameWork .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>