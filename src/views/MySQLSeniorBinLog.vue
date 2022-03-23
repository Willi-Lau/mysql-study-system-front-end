<template>
  <div class="MySQLSeniorBinLog">
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
           MySQL Bin log
          </h1>
         Mysql binlog是二进制日志文件，用于记录mysql的数据更新或者潜在更新(比如DELETE语句执行删除而实际并没有符合条件的数据)，在mysql主从复制中就是依靠的binlog。可以通过语句“show binlog events in 'binlogfile'”来查看binlog的具体事件类型。binlog记录的所有操作实际上都有对应的事件类型的，MySQL binlog的三种工作模式：<br><br>
（1）Row level（用到MySQL的特殊功能如存储过程、触发器、函数，又希望数据最大化一直则选择Row模式，我们公司选择的是row）<br>
　　简介：日志中会记录每一行数据被修改的情况，然后在slave端对相同的数据进行修改。<br>
　　优点：能清楚的记录每一行数据修改的细节<br><br>
　　缺点：数据量太大<br>
（2）Statement level（默认）<br>
　　简介：每一条被修改数据的sql都会记录到master的bin-log中，slave在复制的时候sql进程会解析成和原来master端执行过的相同的sql再次执行。在主从同步中一般是不建议用statement模式的，因为会有些语句不支持，比如语句中包含UUID函数，以及LOAD DATA IN FILE语句等<br>
　　优点：解决了 Row level下的缺点，不需要记录每一行的数据变化，减少bin-log日志量，节约磁盘IO，提高新能<br>
　　缺点：容易出现主从复制不一致<br><br>
（3）Mixed（混合模式）<br>
　　简介：结合了Row level和Statement level的优点，同时binlog结构也更复杂。<br>

       <h3> binlog结构解析</h3>
        binlog结构图如下：<br> <br> 
        <img src="../assets/mysql-binlog-1.webp" width="800px">


         
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
      .MySQLSeniorBinLog .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorBinLog .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorBinLog .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorBinLog .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorBinLog .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>