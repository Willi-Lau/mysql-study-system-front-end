<template>
  <div class="MySQLSeniorIndex2">
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
           MySQL 索引高级
          </h1>
          <h2>聚簇索引</h2>
         在高级部分我们主要探讨的是在innodb存储引擎下的B+树索引，全文索引和Hash索引暂时不进行探讨 <br> <br> 

        首先我们要知道，B+树索引就是传统意义上的索引，这是目前最为常用的索引。关于B+树具体的内容后续会有探讨这里就不做
        过多的描述。 <br> 
        索引在结构上分为聚簇索引和非聚簇索引，聚簇索引就是按照每张表的主键构造一个B+树，同时叶子结点中存放整张表的行记录数据，所以也将
        聚簇索引的叶子结点成为数据页。聚簇索引的这个特性决定了索引组织表中数据也是索引的一部分。同b+树一样，每一个数据页都是通过一个 双向链表来连接。
        <br><br>下面来看一下聚簇索引的结构：<br>
         <img src="../assets/primary-key.jpg" width="800px"><br><br>
        <img src="../assets/primary-key.png" width="800px"><br><br>
          
        可以看到非叶子节点上存储的都是索引（key值及只向数据页的偏移量），只有叶子结点上存储了数据，其实不然，在数据库中，B+树的高度一般都在2-4层，这也就是说
        查找某一个数据的航记录最多只需要2-4次IO，在一般的机械硬盘中每秒至少可以做100此IO，所以2-4次IO只需要0.02-0.04秒<br><br>
        许多数据库的文档会这样告诉读者：聚簇索引按照顺序物理地址存储数据，但是如果聚簇索引必须按照特定的顺序存放物理记录，维护成本会非常的高。所以
        ，聚簇索引的存储在物理上不是连续的，而是在逻辑上连续的。<br><br>
        聚簇索引的另一个好处就是，他对于主键的排序查找和范围查找速度非常的块。这也得意于B+树这种数据结构<br>
        这里可以看一下例子：<br>
        <img src="../assets/mysql-index-primary-key-demo1.png" width="1000px"><br><br>
        可以看到rows在走主索引时走1行就能查到了数据而在没有索引的情况下走了6行才拿到了数据

           <h2>非聚簇索引/普通索引/辅助索引</h2>
           <div>
               对于非聚簇索引，叶子结点并不包含行记录的全部数据，叶子结点除了包含index的值之外，每一个叶子结点还包括一个书签(bookmark)，该书签
               告诉innodb哪里可以找到和索引相对应的行信息。下图就是非聚簇索引的结构和聚簇索引的关系图<br><br>
               <img src="../assets/index1.png" width="800px"><br><br>
               辅助索引的存在并不影响数据在聚簇索引中的组织。因此每张表上可以有多个附注索引。当通过辅助索引来寻找数据时，
               innodb存储引擎会便利辅助索引并通过叶子级别的指针获取聚簇索引的主键，然后再通过主键索引找到一个完整的记录。
           </div>
             <h2>联合索引</h2>
                 联合索引指的是对表上多个列进行索引索引。联合索引的创建方法与单个索引创建方法一样，不同之处在于有多个索隐列。<br>
                 <h4>最左前缀原则</h4>

            指的是查询从索引的最左列开始并且不跳过索引中间得列（指的是是否存在不是顺序）<br><br>
                 联合索引失效场景<br>
                 e.g.    create index index_nameagephone on student(name,age,phone)<br>
                        select id from student where name = "zs"           用上了索引<br>
                        <br>select id from student where age = 1 and  phone = 11111 and name = "张三" 用上了索引，和where and 顺序无关，mysql会优化顺序
                        <br>select id from student where age = 11 and phone = "121212152"  没用上索引
                        <br>select id from student where name = 11 and phone = "121212152"  用上索引 不过是部分索引为中间得age断了没用上，所以age phone没用上
                        <br>select id from student where phone = "121212152"  没用上索引


              <h2>覆盖索引</h2>
                覆盖索引即从辅助索引中就可以查找到数据，而不需要查询聚簇索引，这样可以减少大量的IO。<br>
                <img src="../assets/index2.png" width="1000px"><br>
                从图中可以看到 Extra中出现using index字样 说明使用覆盖索引 key显示使用了indexNameCity索引

              <h2>索引提示</h2>
               在某些情况下MySQL会错误的选择某个索引，导致出现效率低下，或者干脆就是想执行这个索引，使用FORCE INDEX可以强制执行走索引
               <img src="../assets/index-force.png" width="1000px">
              <h2>索引应用场景</h2>
               1.主键 <br>
            2.频繁作为查询条件的字段<br>
            3.查询中与其他表关联的字段，外键关系建立索引<br>
            4.高并发的条件下应该创建组合索引<br>
            5.查询中排序的字段，通过索引访问将大大提高访问速度<br>
            6.查询中统计或分组的字段<br><br>
            那些时候部不应该创建索引：<br>
            1.频繁更新的字段<br>
            2.where 里用不到的字段<br>
            3.表记录太少<br>
            4.数据重复并且分布平均的表字段（差异不大的数据 e.g. 性别 只有两种状态）<br>

            

            <h2>索引失效场景</h2>
            1.使用or左右两边不是一个索引，索引会失效<br>
            2.使用 is null/is not null 在单个索引情况下会生效，在复合索引情况下会使索引失效<br>
            3.使用 !=    会使索引失效<br>
            4.使用like  %M 失效  M%   生效  %M% 需要使用覆盖索引才生效<br>
                Like  %m%  时间复杂度不是 logN 是 N ，需要从二级索引树中华便利所有<br>
                Like  m%  是logN ，遵循最佳左前缀原则，符合索引B+树查询结构.<br>
            5.Order  by 中 多个索引 asc desc 这种hi使索引失效<br>
            6.+不遵循最左前缀原则，跳跃使用索引会使部分索引失效<br>
            7.索引使用内置函数 sum avg	等一定会失效<br>
            8.索引使用算术操作  where a = 10-1  一定会失效<br>
            9.隐士类型转换 比如 char类型不加双引号或单引号索引会失效<br>
            10.索引列数据离散性不高，innodb会认为走索引还不如走全表（离散度： 数据不同种类越多，离散度越高）<br>

              
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
      .MySQLSeniorIndex2 .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 5800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorIndex2 .homeBottom1{
            position: relative;
            top: 5850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorIndex2 .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorIndex2 .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorIndex2 .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>