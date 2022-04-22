<template>
  <div class="MySQLSeniorAffair">
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
           MySQL 事务
          </h1>
            <div>在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。</div>
            <div>事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。/div>
                
           <h5>在innodb存储引擎中事务完全符合ACID四种特性</h5>
            <div>
                1.原子性 atomicity <br>
                2.一致性 consistency <br>
                3.隔离性 isolation <br>
                4.持久性 durability <br>
            </div>
            <div>接下来我们详细研究一下ACID及实现</div> <br>
            <h3>1.Atomicity 原子性</h3>
            <div>
                原子性是指整个数据库事务是不可分割的工作单位。只有使十五中所有的数据库操作都执行成功，才能算整个事务成功。事务中任何一个SQL语句
                的失败，已经执行成功的SQL语句也必须撤销，数据库状态应退回到执行事务前的状态 <br> 
                如果事务中的操作都是只读的，要保证原子性是很简单的。一但发生任何错误，要么重试，要么返回错误的代码。因为只读操作不会改变系统中的
                任何相关部分。但是，当事务中的操作需要改变系统中的额状态时，例如插入记录或更新记录，那么情况可能就不像只读操作那么简单了。如果操作失败
                ，很有可能引起状态的变化，因此必须要板胡系统中并发用户访问受影响的部分数据
                <h5>实现原理：undo log</h5>
                在说明原子性原理之前，首先介绍一下MySQL的事务日志。MySQL的日志有很多种，如二进制日志、错误日志、查询日志、慢查询日志等，此外InnoDB存储引擎还提供了两种事务日志：redo log(重做日志)和undo log(回滚日志)。其中redo log用于保证事务持久性；undo log则是事务原子性和隔离性实现的基础。

下面说回undo log。实现原子性的关键，是当事务回滚时能够撤销所有已经成功执行的sql语句。InnoDB实现回滚，靠的是undo log：当事务对数据库进行修改时，InnoDB会生成对应的undo log；如果事务执行失败或调用了rollback，导致事务需要回滚，便可以利用undo log中的信息将数据回滚到修改之前的样子。

undo log属于逻辑日志，它记录的是sql执行相关的信息。当发生回滚时，InnoDB会根据undo log的内容做与之前相反的工作：对于每个insert，回滚时会执行delete；对于每个delete，回滚时会执行insert；对于每个update，回滚时会执行一个相反的update，把数据改回去。

以update操作为例：当事务执行update时，其生成的undo log中会包含被修改行的主键(以便知道修改了哪些行)、修改了哪些列、这些列在修改前后的值等信息，回滚时便可以使用这些信息将数据还原到update之前的状态。
            </div>
             <h3>2.Consistency 一致性</h3>
             <div>
                 一致性指事务降数据库从一种状态转变为下一种一致的状态。在事务开始之前和事务结束以后，数据库的完整性约束没有被破坏
                 例如在表中有一个字段为姓名，为唯一约束，即在表中不能重复。如果一个事务对姓名字段进行了修改，但是在事务提交或四五操作发生回滚后，表中
                 的姓名变得非唯一了，这就破坏了事务的一致性要求。即事务降数据库从一种状态变为了一种不一致的状态。因此，事务是一致性的单位，如果事务中某个
                 动作失败了，系统可以自动撤销事务，返回初始化的状态
             </div>

              <h3>3.Isolation 隔离性</h3>
             <div>
                 隔离性还有其他的称呼，如并发控制，可串行化，锁等。事务的隔离性要求每个读写事务的对象对其他事务的操作对象能相互分离，
                 即该书屋提交前对其他事物都不可见，通常这使用锁开实现。当前数据库系统中都提供一种锁粒度的策略，允许事务仅锁住一个实体对象
                 的子集，以此来提高事务的并发度。
                 <h5>四种隔离级别</h5>
                 READ_UNCOMMITTED 会出现脏读、不可重复读、幻读 ( 隔离级别最低，并发性能高 )  <br><br>

                READ_COMMITTED  会出现不可重复读、幻读问题（锁定正在读取的行）  <br><br>

                REPEATABLE_READ 会出幻读（锁定所读取的所有行）    <br><br>

                SERIALIZABLE 保证所有的情况不会发生（锁表）    <br><br>
                对于不同的事务，采用不同的隔离级别分别有不同的结果。不同的隔离级别有不同的现象。主要有下面3种现在：
                <h5>脏读，不可重复度，幻读</h5>
                

                1、脏读（dirty read）：一个事务可以读取另一个尚未提交事务的修改数据。 <br><br>
                2、不可重复读（nonrepeatable read）：在同一个事务中，同一个查询在T1时间读取某一行，在T2时间重新读取这一行时候，这一行的数据已经
                                                    发生修改，可能被更新了（update），也可能被删除了（delete）。 <br><br>
                3、幻像读（phantom read）：在同一事务中，同一查询多次进行时候，由于其他插入操作（insert）的事务提交，导致每次返回不同的结果集。 <br><br>


                小结：不可重复读的和幻读很容易混淆，不可重复读侧重于修改，幻读侧重于新增或删除。解决不可重复读的问题只需锁住满足条件的行，解决幻
                    读需要锁表 <br><br>

                <h5>在 innodb中默认的隔离级别为 RR，在RR中主要通过锁机制(Next-key lock)和MVCC来保证隔离性。关于锁和MVCC后续会有详细描述</h5>

             </div>
              <h3>4. Durability 持久性</h3>
             <div>
                 事务一旦提交，其结果就是永久的，即使发生宕机等故障，数据库也能将数据恢复。需要注意的是，只能从事务本身的角度来保证结果的永久性。
                 例如在事务提交后，所有的变化都是永久的。即使当数据库因为崩溃而需要恢复时，也不能保证恢复提交后的数据都不会丢失。但若不是数据库本身
                 发生的故障，而是一些外部的原因，那么所有提交的数据都可能消失。持久性事务保证系统的高可靠性（High Reliablity），而不是高可用性(High Available
                 ) 对于高可用的实现，事务本身并不能保证，需要一些系统的共同配合
                <h5>实现原理：redo log</h5>
                关于redolog 后续会有详细描述
             </div>




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
      .MySQLSeniorAffair .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 2500px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorAffair .homeBottom1{
            position: relative;
            top: 2550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorAffair .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorAffair .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorAffair .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>