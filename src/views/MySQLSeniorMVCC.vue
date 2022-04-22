<template>
  <div class="MySQLSeniorMVCC">
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
           MySQL MVCC
          </h1>
         <h3>什么是MVCC?</h3>
        MVCC，全称Multi-Version Concurrency Control，即多版本并发控制。MVCC是一种并发控制的方法，一般在数据库管理系统中，实现对数据库的并发访问，在编程语言中实现事务内存。
        MVCC在MySQL InnoDB中的实现主要是为了提高数据库并发性能，用更好的方式去处理读-写冲突，做到即使有读写冲突时，也能做到不加锁，非阻塞并发读
        <h3>什么是当前读和快照读？</h3>
        在学习MVCC多版本并发控制之前，我们必须先了解一下，什么是MySQL InnoDB下的当前读和快照读? <br>

        当前读：像select lock in share mode(共享锁), select for update ; update, insert ,delete(排他锁)这些操作都是一种当前读，为什么叫当前读？就是它读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。 <br>
        快照读：像不加锁的select操作就是快照读，即不加锁的非阻塞读；快照读的前提是隔离级别不是串行级别，串行级别下的快照读会退化成当前读；之所以出现快照读的情况，是基于提高并发性能的考虑，快照读的实现是基于多版本并发控制，即MVCC,可以认为MVCC是行锁的一个变种，但它在很多情况下，避免了加锁操作，降低了开销；既然是基于多版本，即快照读可能读到的并不一定是数据的最新版本，而有可能是之前的历史版本 <br>
        说白了MVCC就是为了实现读-写冲突不加锁，而这个读指的就是快照读, 而非当前读，当前读实际上是一种加锁的操作，是悲观锁的实现 <br>
        <h3>当前读，快照读和MVCC的关系</h3>

        准确的说，MVCC多版本并发控制指的是 “维持一个数据的多个版本，使得读写操作没有冲突” 这么一个概念。仅仅是一个理想概念 <br>
        而在MySQL中，实现这么一个MVCC理想概念，我们就需要MySQL提供具体的功能去实现它，而快照读就是MySQL为我们实现MVCC理想模型的其中一个具体非阻塞读功能。而相对而言，当前读就是悲观锁的具体功能实现 <br>
        要说的再细致一些，快照读本身也是一个抽象概念，再深入研究。MVCC模型在MySQL中的具体实现则是由 3个隐式字段，undo日志 ，Read View 等去完成的，具体可以看下面的MVCC实现原理。 <br>
        MVCC能解决什么问题，好处是？ <br>
        <h3>数据库并发场景有三种，分别为：</h3>

        读-读：不存在任何问题，也不需要并发控制 <br>
        读-写：有线程安全问题，可能会造成事务隔离性问题，可能遇到脏读，幻读，不可重复读 <br>
        写-写：有线程安全问题，可能会存在更新丢失问题，比如第一类更新丢失，第二类更新丢失 <br>
        <h3>MVCC带来的好处是？</h3>
        多版本并发控制（MVCC）是一种用来解决读-写冲突的无锁并发控制，也就是为事务分配单向增长的时间戳，为每个修改保存一个版本，版本与事务时间戳关联，读操作只读该事务开始前的数据库的快照。 所以MVCC可以为数据库解决以下问题 <br>

        在并发读写数据库时，可以做到在读操作时不用阻塞写操作，写操作也不用阻塞读操作，提高了数据库并发读写的性能 <br>
        同时还可以解决脏读，幻读，不可重复读等事务隔离问题，但不能解决更新丢失问题 <br>
        <h3>小结一下咯</h3>
        总之，MVCC就是因为大牛们，不满意只让数据库采用悲观锁这样性能不佳的形式去解决读-写冲突问题，而提出的解决方案，所以在数据库中，因为有了MVCC，所以我们可以形成两个组合： <br>

        MVCC + 悲观锁：MVCC解决读写冲突，悲观锁解决写写冲突 <br>
        MVCC + 乐观锁：MVCC解决读写冲突，乐观锁解决读写冲突 <br>
        这种组合的方式就可以最大程度的提高数据库并发性能，并解决读写冲突，和写写冲突导致的问题 <br>
        <h2>MVCC基本原理</h2><br>
        MVCC的目的就是多版本并发控制，在数据库中的实现，就是为了解决读写冲突，它的实现原理主要是依赖记录中的 3个隐式字段，undo日志 ，Read View 来实现的。所以我们先来看看这个三个关键的概念<br>
        每个事务都有一个事务ID叫做transaction id，这个id在事务刚启动的时候向InnoDB申请，它不重复并且严格递增。InnoDB隐藏了一个包含最新改动的事务id，每个事务修改后都会把这个字段设置为自己的事务ID。其他事务启动的时候记录下这个最新ID，然后修改的时候比对ID是否有修改。如果没有修改，说明这一行没有改动过，当前事务也能直接修改。如果ID变化了，则就要查找undolog，找到可用的合适的记录。<br>

        因此，创建快照就只要记录下这个事务ID就可以了，无需复制所有的数据。<br><br>

        在实现上，InnoDB给每个数据表都添加了隐藏的三列数据DB_TRX_ID/DB_ROLL_PTR/DB_ROW_ID，三者的含义：<br><br>

        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="pattern"
                label="模式"
                width="180">
                </el-table-column>
                <el-table-column
                prop="describe"
                label="描述"
                width="580">
                </el-table-column>
            </el-table>

            <br><br> 
            例如存在以下数据表： <br> 
            <br><img src="../assets/mysql-mvcc-1.png" width="800px"><br>
            它实际上的表现形式为：<br>
            <br><img src="../assets/mysql-mvcc-2.png" width="800px"><br>
            假设此时修改年龄为25，此时数据列和undo log的状态是：
             <br><img src="../assets/mysql-mvcc-3.png" width="800px"><br>
             undolog新生成了一个记录，保存了改动之前的数据。新记录中，通过设置DB_ROLL_PRT指向备份的undo log记录，方便回滚。如若再次修改年龄为18，那么两者的状态为：
            <br><img src="../assets/mysql-mvcc-4.png" width="800px"><br> 
            <h2>MVCC具体过程</h2>
            以下通过一个示例来描述MVCC具体的执行过程：
             <br><img src="../assets/mysql-mvcc-5.png" width="800px"><br> 
             以上面的学生表为例，同时存在三个事务修改同一行数据中的值，其中事务A和事务B先执行，然后事务C更新数据并提交。此刻事务A和事务B的更新和查询记录的结果会是怎样？
             <br><br> 
             初始时的行数据为：<br> 
             <br><img src="../assets/mysql-mvcc-6.png" width="800px"><br> 
             测试<br> 
             首先启动启动两个终端模拟事务A和事务B，执行start transaction with consistent snapshot。
             然后开启第三个终端模拟事务C，执行：<br>
             <br><img src="../assets/mysql-mvcc-7.png" width="800px"><br> 
             然后在事务B执行以下操作：先查询age的值，然后也把age加一，然后再查询age的值。<br> 
             <br><img src="../assets/mysql-mvcc-8.png" width="800px"><br> 
             事务B在更新操作执行之前，查询age的值是24，执行更新操作之后，再查询age值是26。<br> 

             此时事务A查询age的值是24：<br> 
               <br><img src="../assets/mysql-mvcc-9.png" width="800px"><br> 

               因此能得到的结论是：<br><br>

                事务B在更新数据前查到的age = 24，更新后查到的age = 25。<br>
                事务A查询到的数据是24。<br>
                看起来不符合逻辑，为什么会这样呢？<br><br>
            <h3> 查询逻辑</h3>
             <br><img src="../assets/mysql-mvcc-10.jpg" width="800px"><br> 
             如上，它是一段MySQL判断可见性的一段源码，即changes_visible方法（不完全哈，但能看出大致逻辑），该方法展示了我们拿DB_TRX_ID去跟Read View某些属性进行怎么样的比较
            在展示之前，我先简化一下Read View，我们可以把Read View简单的理解成有三个全局属性<br><br>

            trx_list（名字我随便取的）：一个数值列表，用来维护Read View生成时刻系统正活跃的事务ID<br>
            up_limit_id：记录trx_list列表中事务ID最小的ID<br>
            low_limit_id：ReadView生成时刻系统尚未分配的下一个事务ID，也就是目前已出现过的事务ID的最大值+1<br><br>
            首先比较DB_TRX_ID  up_limit_id, 如果小于，则当前事务能看到DB_TRX_ID 所在的记录，如果大于等于进入下一个判断<br>
            接下来判断 DB_TRX_ID 大于等于 low_limit_id , 如果大于等于则代表DB_TRX_ID 所在的记录在Read View生成后才出现的，那对当前事务肯定不可见，如果小于则进入下一个判断<br>
            判断DB_TRX_ID 是否在活跃事务之中，trx_list.contains(DB_TRX_ID)，如果在，则代表我Read View生成时刻，你这个事务还在活跃，还没有Commit，你修改的数据，我当前事务也是看不见的；如果不在，则说明，你这个事务在Read View生成之前就已经Commit了，你修改的结果，我当前事务是能看见的<br>
                
            <h5>或者换一种说法，用一种简单明了的方式来说明</h5>
            我们以trx_id_first/trx_id_last/trx_id_currennt分别表示事务的低水位、高水位和当前事务。<br><br>

            如何理解高低水位：<br><br>

            低水位：已经提交事务的最大值，即启动当前事务时候已经提交了的事务。<br>
            高水位：未开始事务的最小值，即当前事务启动时还未启动的事务。<br>
            当前事务：高低水位之间的事务，即当前事务启动时候已经存在的未提交事务。<br>
            以图形表示为：<br><br>
             <br><img src="../assets/mysql-mvcc-11.png" width="500px"><br> 
            在事务开始的时候，除了生成一致性视图，还要生成一个对应的视图数组，这个数组里面表示的就是所有未提交事务的集合（黄色区域）。查询数据的时候有三种情况：。<br>

           1. 数据未提交，数据不可见。。<br>
           2. 数据已提交，但是事务ID处于当前事务的高水位段，不可见。。<br>
            3. 数据已提交，并且事务ID实在当前事务之前创建，可见。。<br>
            以上面的测试过程为例，事务A的id等于1，事务B的id等于2，事务C的id等于3。那么事务启动时，事务A的视图数组为[0, 1]，事务B的视图数组为[0, 1, 2]，事务C的视图数组为[0, 1, 2, 3]：。<br>
              <br><img src="../assets/mysql-mvcc-12.png" width="800px"><br> 
              事务C最后启动，因为是自动提交，因此执行完update之后就已经commit了，此时记录的DB_TRX_ID = 3。它处于事务B的
              高水位区，虽然已经提交但是也不可见，命中第二条规则。因此它要先通过undo log找到一个可见的版本，找到上一个版
              本trx_id = 0位于它的可见区，然后读取这条记录的age值为24.<br> <br> 

                而事务B对于事务A而言，也是处于高水位区，并且事务B修改age之后没有提交，所以rtx_id = 2的事务对事务A是不可见
                的，命中了规则一，要往前找其他版本。先找到上一个版本trx_id = 3后发现还不是可见的，需要继续往前找，找到rtx_id
                 = 0的记录，它对事务A可见，再读取age值为24。<br> <br> 
                
                <h3>更新逻辑</h3>
                上面有一个不合逻辑的点在于事务B，事务B它在更新age的前后分别查询age的值是对不上的：加一之前是24，加一之后是26。这是个什么逻辑呢？<br> <br> 

            对于更新而言，它有一个很重要的概念是当前读，当前读的意思是：更新的时候，要使用当前版本的记录来读。所谓当前版本指的就是最新更新后的记录，在上面的例子
            中也就是trx_id = 3的记录。<br> <br> 
             <br><img src="../assets/mysql-mvcc-13.png" width="800px"><br> 
             在事务B修改age的值之前，此时读取age值就像上面所说：先找到trx_id = 3的记录，发现不可见，然后再读取trx_id = 0的记录。<br><br>

            但是事务B在修改age的时候，先读取当前是最新的改动trx_id = 3这条记录，此时age的值为25。然后事务C把age值加一，并设置
            trx_id = 2。事务C再读取数据，发现最新的改动事务id是2，也就是自己。处于未提交的当前事务区，就能读到age是26了。<br>

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
            tableData: [
             {
                pattern: 'DB_TRX_ID',
                describe: ' 标记了最新更新这条行记录的transaction id，每处理一个事务，其值自动+1。 '
             }, 
             {
                pattern: 'DB_ROLL_PTR',
                describe: ' 回滚指针，记录了最新一次修改该条记录的undo log，回滚的时候就通过这个指针找到undo log回滚。 '
             }, 
             {
                pattern: 'DB_ROW_ID',
                describe: ' 当数据表没有指定主键时，数据库会自动以这个列来作为主键，生成聚集索引每次事务更新数据的时候，都会生成一个新的数据版本，并且把 transaction id 赋值给这个数据版本的事务ID（即DB_TRX_ID列）。同时，旧的数据版本要保留（通过undo log保留），并且在新的数据版本中，能够有信息可以直接拿到它。也就是说，数据表中的一行数据，其实可能有多个版本。'
         
             }, 
             ]
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
      .MySQLSeniorMVCC .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 8800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorMVCC .homeBottom1{
            position: relative;
            top: 8850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorMVCC .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorMVCC .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorMVCC .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>