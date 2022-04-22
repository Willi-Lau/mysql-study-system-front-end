<template>
  <div class="MySQLSeniorRedoLog">
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
           MySQL Redo log
          </h1>
                1.基本概念 <br>
                重做日志用来实现事务的持久性，即事务ACID中的D。其由两部分组成：一是内 存中的重做日志缓冲(redo log buffer),其是易失的；二是重做日志文件(redo log file), 其是持久的。
                InnoDB是事务的存储引擎，其通过Force Log at Commit机制实现事务的持久 性，即当事务提交(COMMIT)时，必须先将该事务的所有日志写入到重做日志文件 进行持久化，待事务的COMMIT操作完成才算完成。这里的日志是指重做日志，在 InnoDB存储引擎中，由两部分组成，即redo log和undo log。redo log用来保证事务的 持久性，undo log用来帮助事务回滚及MVCC的功能。redo log基本上都是顺序写的， 在数据库运行时不需要对redo log的文件进行读取操作。而undo log是需要进行随机读 写的。
                为了确保每次日志都写入重做日志文件，在每次将重做日志缓冲写入重做日志文件 后，InnoDB存储引擎都需要调用一次fsync操作。由于重做日志文件打开并没有使用 O_DIRECT选项，因此重做日志缓冲先写入文件系统缓存。为了确保重做日志写入磁
                盘，必须进行一次fsync操作。由于fsync的效率取决于磁盘的性能，因此磁盈鞠铺魏 定了事务提交的性能，也就是数据库的性能。

                <br> <br> 
                InnoDB存储引擎允许用户手工设置非持久性的情况发生，以此提高数据库的性能。 即当事务提交时，日志不写入重做日志文件，而是等待一个时间周期后再执行fsync操 作。由于并非强制在事务提交时进行一次fsync操作，显然这可以显著提高数据库的性 能。但是当数据库发生宕机时，由于部分日志未刷新到磁盘，因此会丢失最后一段时间 的事务。
                参数innodb_flush_log_at_trx__commit用来控制重做日志刷新到磁盘的策略。该参数 的默认值为1,表示事务提交时必须调用一次fsync操作。还可以设置该参数的值为0和 2。0表示事务提交时不进行写入重做日志操作，这个操作仅在master thread中完成，而 在master thread中每1秒会进行一次重做日志文件的fsync操作。2表示事务提交时将 重做日志写入重做日志文件，但仅写入文件系统的缓存中，不进行Aync操作。在这个 设置下，当MySQL数据库发生宕机而操作系统不发生宕机时，并不会导致事务的丢失。 而当操作系统宕机时，重启数据库后会丢失未从文件系统缓存刷新到重做日志文件那部 分事务。
      
                <br> <br> 
                在MySQL数据库中还有一种二进制日志(binlog),其用来进行POlW^J^T登妒 (PIT)的恢复及主从复制(Replication)环境的建立。从表面上看其和重做日志考蕭相 似，都是记录了对于数据库操作的日志。然而，从本质上来看，两者有着非常大的不同。
                首先，重做日志是在InnoDB存储引擎层产生，而二进制日志是在MySQL数据库 的上层产生的，并且二进制日志不仅仅针对于InnoDB存储引擎，MySQL数据库中的任 何存储引擎对于数据库的更改都会产生二进制日志。
                其次，两种日志记录的内容形式不同。MySQL数据库上层的二进制日志是一种逻 辑日志，其记录的是对应的SQL语句。而InnoDB存储引擎层面的重做日志是物理格式 日志，其记录的是对于每个页的修改。
                此外，两种日志记录写入磁盘的时间点不同，如图7.6所示。二进制日志只在事务 提交完成后进行一次写入。而InnoDB存储引擎的重做日志在事务进行中不断地被写入， 这表现为日志并不是随事务提交的顺序进行写入的。
                    
                    <br> <br> 
                    重做日志块除了日志本身之外，还由日志块头(log block header)及日志块(log block tailer)两部分组成。重做日志头一共占用12字节，重做日志尾占用8字节。故每 个重做日志块实际可以存储的大小为492字节(512.12.8)。图7.7显示了重做日志块缓 存的结构。
                    
                    <br> <br> 
                    <img src="../assets/mysql-redolog-1.png" width="800px">
                    <br> <br> 
                    图7-7显示了重做日志缓存的结构，可以发现重做日志缓存由每个为512字节大小 的日志块所组成。日志块由三部分组成，依次为日志块头(log block header)＞日志内容 (log body)、日志块尾(log block tailer)。
                    log block header由4部分组成，如表7-2所示。<br> <br>
                    <img src="../assets/mysql-redolog-2.png" width="800px">
     
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
      .MySQLSeniorRedoLog .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorRedoLog .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorRedoLog .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorRedoLog .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorRedoLog .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>