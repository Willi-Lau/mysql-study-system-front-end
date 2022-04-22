<template>
  <div class="MySQLSeniorUndoLog">
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
           MySQL Undo Log   
          </h1>
       1.基本概念<br>
        重做日志记录了事务的行为，可以很好地通过其对页进行“重做”操作。但是事务 有时还需要进行回滚操作，这时就需要undoo因此在对数据库进行修改时，InnoDB存 储引擎不但会产生redo,还会产生一定量的undoo这样如果用户执行的事务或语句由于 某种原因失败了，又或者用户用一条ROLLBACK语句请求回滚，就可以利用这些undo 信息将数据回滚到修改之前的样子。
redo存放在重做日志文件中，与redo不同，undo存放在数据库内部的一个特殊段 (segment)中，这个段称为undo段(undo segment)。undo段位于共享表空间内。可以 通过py_innodb_page_info.py工具来查看当前共享表空间中undo的数量。
            <br> <br> 
            用户通常对undo有这样的误解:undo用于将数据库物理地恢复到执行语句或事务 之前的样子——但事实并非如此。undo是逻辑日志，因此只是将数据库逻辑地恢复到原 来的样子。所有修改都被逻辑地取消了，但是数据结构和页本身在回滚之后可能大不相 同。这是因为在多用户并发系统中，可能会有数十、数百甚至数千个并发事务。数据库 的主要任务就是协调对数据记录的并发访问。比如，一个事务在修改当前一个页中某几 条记录，同时还有别的事务在对同一个页中另几条记录进行修改。因此，不能将一个页 回滚到事务开始的样子，因为这样会影响其他事务正在进行的工作。
            <br> <br> 
            例如，用户执行了一个INSERT IOW条记录的事务，这个事务会导致分配，即表空间会增大。在用户执行ROLLBACK时，会将插入的事务进行回滚，但是表 空间的大小并不会因此而收缩。因此，当InnoDB存储引擎回滚吋，它实际上做的是与 先前相反的工作。对于每个INSERT, InnoDB存储引擎会完成一个DELETE ；对于每个 DELETE, InnoDB存储引擎会执行一个INSERT :对于每个UPDATE, InnoDB存储引 擎会执行一个相反的UPDATE,将修改前的行放回去。
            除了回滚操作，undo的另一个作用是MVCC,即在InnoDB存储引擎中MVCC的 实现是通过undo来完成。当用户读取一行记录时，若该记录已经被其他事务占用，当 前事务可以通过undo读取之前的行版本信息，以此实现非锁定读取。
            最后也是最为重要的一点是，undo log会产生redo log,也就是undo log的产生会伴 随着redo log的产生，这是因为undo log也需要持久性的保护。
             <br> <br> 
             2. undo存储管理<br> 
            InnoDB存储引擎对undo的管理同样采用段的方式。但是这个段和之前介绍的段有 所不同。首先InnoDB存储引擎有rollback segment,每个回滚段种记录了 1024个undo log segment,而在每个undo log segment段中进行undo页的申请。共享表空间偏移量 为5的页（0, 5）记录了所有rollback segment header所在的页，这个页的类型为FIL_ PAGE_TYPE_SYSo
            在InnoDB 1.1版本之前（不包括1.1版本），只有一个rollback segment,因此支持同 时在线的事务限制为1024o虽然对绝大多数的应用来说都已经够用，但不管怎么说这是 一个瓶颈。从1.1版本开始InnoDB支持最大128个rollback segment,故其支持同时在 线的事务限制提高到了 128*1024。
                    <br> <br> 
            3. undo log 格式 <br> 
            在InnoDB存储引擎中，undo log分为:<br> 
            □insert undo log<br> 
            □update undo log<br> 
            <br> insert undo log是指在insert操作中产生的undo log。因为insert操作的记录，只对 事务本身可见，对其他事务不可见(这是事务隔离性的要求)，故该undo log可以在事 务提交后直接删除。不需要进行purge操作。
               
               
               
               
               
               
               
               
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
    },
  name: 'Register',
 components: { HelloWorld,Mysql }
  ,
  created(){
   var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;
 }
}
</script>
<style>
/* 公共部分 */
      .MySQLSeniorUndoLog .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorUndoLog .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorUndoLog .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorUndoLog .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorUndoLog .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>