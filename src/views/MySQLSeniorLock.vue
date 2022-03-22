<template>
  <div class="MySQLSeniorLock">
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
          MySQL 锁
          </h1>
         <h3>锁机制</h3>
         <h5>共享锁与排他锁</h5>
          共享锁（读锁）：其他事务可以读，但不能写。
          排他锁（写锁） ：其他事务不能读取，也不能写。
          <h5>粒度锁</h5>
          MySQL 不同的存储引擎支持不同的锁机制，所有的存储引擎都以自己的方式显现了锁机制，服务器层完全不了解存储引擎中的锁实现：<br><br> 

          MyISAM 和 MEMORY 存储引擎采用的是表级锁（table-level locking）<br>
          BDB 存储引擎采用的是页面锁（page-level locking），但也支持表级锁<br>
          InnoDB 存储引擎既支持行级锁（row-level locking），也支持表级锁，但默认情况下是采用行级锁。<br>
          默认情况下，表锁和行锁都是自动获得的， 不需要额外的命令。<br>

          但是在有的情况下， 用户需要明确地进行锁表或者进行事务的控制， 以便确保整个事务的完整性，这样就需要使用事务控制和锁定语句来完成。<br>
          <h5>不同粒度锁的比较：</h5>
          表级锁：开销小，加锁快；不会出现死锁；锁定粒度大，发生锁冲突的概率最高，并发度最低。<br>
          这些存储引擎通过总是一次性同时获取所有需要的锁以及总是按相同的顺序获取表锁来避免死锁。<br>
          表级锁更适合于以查询为主，并发用户少，只有少量按索引条件更新数据的应用，如Web 应用<br><br>

          行级锁：开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度也最高。<br>
          最大程度的支持并发，同时也带来了最大的锁开销。<br>
          在 InnoDB 中，除单个 SQL 组成的事务外，<br>
          锁是逐步获得的，这就决定了在 InnoDB 中发生死锁是可能的。<br>
          行级锁只在存储引擎层实现，而Mysql服务器层没有实现。 行级锁更适合于有大量按索引条件并发更新少量不同数据，同时又有并发查询的应用，如一些在线事务处理（OLTP）系统<br><br>
          
          页面锁：开销和加锁时间界于表锁和行锁之间；会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般。<br>

          <h3>InnoDB行级锁和表级锁</h3>
          <h5>InnoDB锁模式：</h5>
          InnoDB 实现了以下两种类型的行锁<br>
          共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排他锁。<br>
          排他锁（X）：允许获得排他锁的事务更新数据，阻止其他事务取得相同数据集的共享读锁和排他写锁。<br><br>
          为了允许行锁和表锁共存，实现多粒度锁机制，InnoDB 还有两种内部使用的意向锁（Intention Locks），这两种意向锁都是表锁：<br>
          意向共享锁（IS）：事务打算给数据行加行共享锁，事务在给一个数据行加共享锁前必须先取得该表的 IS 锁。<br>
          意向排他锁（IX）：事务打算给数据行加行排他锁，事务在给一个数据行加排他锁前必须先取得该表的 IX 锁。<br><br>
          <h5>锁模式的兼容情况：</h5>
          <img src="../assets/mysql-lock-1.png" width="800px"><br><br>
          （如果一个事务请求的锁模式与当前的锁兼容， InnoDB 就将请求的锁授予该事务； 反之， 如果两者不兼容，该事务就要等待锁释放。）
         <h5>innodb 加锁方式</h5>
         意向锁是 InnoDB 自动加的， 不需用户干预。<br>
          对于 UPDATE、 DELETE 和 INSERT 语句， InnoDB<br>
          会自动给涉及数据集加排他锁（X)；<br>
          对于普通 SELECT 语句，InnoDB 不会加任何锁；<br>
          事务可以通过以下语句显式给记录集加共享锁或排他锁：<br>
          共享锁（S）：SELECT * FROM table_name WHERE ... LOCK IN SHARE MODE。 其他 session 仍然可以查询记录，并也可以对该记录加 share mode 的共享锁。但是如果当前事务需要对该记录进行更新操作，则很有可能造成死锁。<br>
          排他锁（X)：SELECT * FROM table_name WHERE ... FOR UPDATE。其他 session 可以查询该记录，但是不能对该记录加共享锁或排他锁，而是等待获得锁<br>
          <h5>隐式锁定：</h5>
          InnoDB在事务执行过程中，使用两阶段锁协议：<br>

          随时都可以执行锁定，InnoDB会根据隔离级别在需要的时候自动加锁；<br>

          锁只有在执行commit或者rollback的时候才会释放，并且所有的锁都是在同一时刻被释放。<br><br>

         <h5>select for update：</h5> 

          在执行这个 select 查询语句的时候，会将对应的索引访问条目进行上排他锁（X 锁），也就是说这个语句对应的锁就相当于update带来的效果。<br>

          select *** for update 的使用场景：为了让自己查到的数据确保是最新数据，并且查到后的数据只允许自己来修改的时候，需要用到 for update 子句。<br>

          select lock in share mode ：in share mode 子句的作用就是将查找到的数据加上一个 share 锁，这个就是表示其他的事务只能对这些数据进行简单的select 操作，并不能够进行 DML 操作。select *** lock in share mode 使用场景：为了确保自己查到的数据没有被其他的事务正在修改，也就是说确保查到的数据是最新的数据，并且不允许其他人来修改数据。但是自己不一定能够修改数据，因为有可能其他的事务也对这些数据 使用了 in share mode 的方式上了 S 锁。<br><br>

         <h5> 性能影响：</h5>
          select for update 语句，相当于一个 update 语句。在业务繁忙的情况下，如果事务没有及时的commit或者rollback 可能会造成其他事务长时间的等待，从而影响数据库的并发使用效率。<br>
          select lock in share mode 语句是一个给查找的数据上一个共享锁（S 锁）的功能，它允许其他的事务也对该数据上S锁，但是不能够允许对该数据进行修改。如果不及时的commit 或者rollback 也可能会造成大量的事务等待。<br><br>

          <h5>for update 和 lock in share mode 的区别：</h5>

          前一个上的是排他锁（X 锁），一旦一个事务获取了这个锁，其他的事务是没法在这些数据上执行 for update ；后一个是共享锁，多个事务可以同时的对相同数据执行 lock in share mode。<br><br>

          <h5>显式锁定 
          </h5>
          select ... lock in share mode //共享锁 <br>
          select ... for update //排他锁 <br>

          <h5>三种行锁算法</h5>

          1，Record Lock：单个行记录上的锁。 <br>
          2，Gap Lock：间隙锁，锁定一个范围，但不包括记录本身。GAP锁的目的，是为了防止同一事务的两次当前读，出现幻读的情况。<br>
          3，Next-Key Lock：1+2，锁定一个范围，并且锁定记录本身。对于行的查询，都是采用该方法，主要目的是解决幻读的问题。<br>

          <h5>行锁 for update测试</h5>
           <img src="../assets/mysql-lock-2.png" width="800px"><br><br>

         <em>如果表中是有唯一索引，主键索引  primary key id 就锁单行 Record Lock</em> <br>
          1客户端： select * from lockstudy2 where id =  5 for uodate;<br>
          锁的范围只是 5这个索引 如果执行 insert 4 6都可以执行 <br>
          如果表中是二级索引 锁的是范围 上一个索引到下一个索引的范围 Next-Key Lock<br>
          锁的是 [3,7] 所有的数据   如果执行 delete 3 / 7  insert 4 6 都会被阻塞<br>
          <h3>InnoDB 在不同隔离级别下的一致性读及锁的差异：</h3>
          锁和多版本数据（MVCC）是 InnoDB 实现一致性读和 ISO/ANSI SQL92 隔离级别的手段。<br>

          因此，在不同的隔离级别下，InnoDB 处理 SQL 时采用的一致性读策略和需要的锁是不同的：<br>
           <img src="../assets/mysql-lock-3.png" width="800px"><br><br>
            <img src="../assets/mysql-lock-4.jpg" width="800px"><br><br>

            对于许多 SQL，隔离级别越高，InnoDB 给记录集加的锁就越严格（尤其是使用范围条件的时候），产生锁冲突的可能性也就越高，从而对并发性事务处理性能的 影响也就越大。<br>

            因此， 我们在应用中， 应该尽量使用较低的隔离级别， 以减少锁争用的机率。实际上，通过优化事务逻辑，大部分应用使用 Read Commited 隔离级别就足够了。对于一些确实需要更高隔离级别的事务， 可以通过在程序中执行 SET SESSION TRANSACTION ISOLATION<br>

            LEVEL REPEATABLE READ 或 SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE 动态改变隔离级别的方式满足需求。<br>

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
      .MySQLSeniorLock .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 5800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorLock .homeBottom1{
            position: relative;
            top: 5850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorLock .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorLock .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorLock .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>