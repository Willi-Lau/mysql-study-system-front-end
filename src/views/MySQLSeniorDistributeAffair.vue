<template>
  <div class="MySQLSeniorDistributeAffair">
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
           MySQL 分布式事务
          </h1>
            <div>
                innodb存储引擎提供了对XA事务的支持，并通过XA事务来支持分布式事务的实现。分布式事务指的是允许读个独立的事务资源参与到一个全局的
                事务中。事务资源通常是关系型数据库系统，但也可以是其他类型的资源。全局事务要求在其中的所有参与的事务要么都提交，要么都回滚，这对于事务原有的
                ACID要求又有了提高。另外，在使用分布式事务时候，innodb存储引擎的事务隔离级别必须设置为Serializable <br> 
                XA事务允许不同的数据库之间 的分布式事务，如一台服务器是MySQL提供的，另一台是Oracle提供的，只要参与在全局事务中的每个节点都支持
                XA事务。
                <br>  <br> 
                XA事务由一个或多个资源管理器（Resources Managers），一个事务管理器以及一个应用程序组成。 <br> 
                资源管理器：提供访问事务资源的方法。通过长一个数据库就是一个资源管理器 <br> 
                事务管理器：协调参与全局事务中的各个事务。通常和参与全局事务的所有资源管理器进行通信。 <br> 
                应用程序：定义事务的便捷，指定去哪聚事务中的操作。 <br>  <br>
                分布式事务使用两阶段提交的方式 two-phase commit ，在第一阶段，所有参与全局事务的节点都开始准备（prepare），告诉事务
                管理器他们准备好了。在第二个阶段，事务管理器告诉资源管理器执行 rollback 还是commit 如果任何一个节点显示不能提交，则所有的节点都被告知
                需要回滚。可见与本地事务不同的是，分布式事务需要多一次的prepare操作，待收到所有的同一节点后在进行提交。  <br>  <br>
                MySQL数据库XA事务的SQL语句语法如下： <br> 
                 <div class="info"> 
                <br>
                 XA {START|BEGIN} XID {JOIN|RESUME} <br>
                 XA END XID {SUSPEND{FOR MIGRATE}} <br>
                 XA PREPARE XID <br>
                 XA COMMIT XID {ONE PHASE} <br>
                 XA ROLLBACK XID <br>
                 XA RECOVER <br>
               <br>
               </div>
               <br>   
               <h5>内部XA事务</h5>
               之前讨论的是分布式事务是外部事务，即资源管理器是MySQL数据库本身。在MySQL数据库中还存在另外一种分布式事务，其在存储引擎与插件之间
               。或者在存储引擎和存储引擎之间，称之为内XA事务。最为常见的内部XA事务存在于binlog与innodb存储引擎之间。由于复制的需要，因此绝大多数数据库都开启
               了binlog功能，在事务提交时，先写二进制日志，在写innodb重做日志。对上述两个操作的要求也是原子性的，即二进制日志和重做日志必须同时写入。
                若二进制先写了，而在innodb存储引擎时发生了宕机，那slave可能会接收到master传送过去的二进制并执行，最终导致主从不一致。<br>
                为了解决这个问题，MySQL数据库在binlog与innodb存储引擎之间采用XA事务，当事务提交时候，innodb存储引擎会先做一个prepare操作，
                将事务的xid写入，接着进行二进制日志的写入。如果在innodb存储引擎提交前，MySQL数据库宕机了，那么MySQL数据库在重启后会先检查UXID事务是否
                已经提交，若没有，则在存储引擎在进行一次提交操作。
                 <img src="../assets/mysql-affair-2.jpg"> 
                 <br> 
                 MySQL 宕机导致replication主从不一致
                <br> 
                <img src="../assets/mysql-affair-1.jpg">
                <br> 
                MySQL 通过内部XA保证主从一致

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
      .MySQLSeniorDistributeAffair .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 2500px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorDistributeAffair .homeBottom1{
            position: relative;
            top: 2550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorDistributeAffair .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorDistributeAffair .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorDistributeAffair .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>