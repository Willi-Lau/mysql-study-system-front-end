<template>
  <div class="MySQLSeniorExplain">
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
           MySQL Explain
          </h1>
           EXPLAIN命令是查看查询优化器如何决定执行查询的主要方法。这个功能有局限性，并不会总说出真相，但他的输出是可以获取的最好信息。学习
            了EXPLAIN就可以帮助你了解MySQL优化器是如何工作的<br>


            <h3>如何使用</h3>
            要使用EXPLAIN，只需要在查询中的SELECT关键字之前增加EXPLAIN这个词。MySQL会在查询上设置一个标记。当执行查询时，这个标记会使其返回关于在
            执行计划中每一步的信息，而不是执行他。他会返回一行或多行信息，显示出执行计划中的每一部分和执行的顺序。<br> 

            下面是一个查询的例子：<br> 
            <img src="../assets/mysql-explain.png" width="1000px">
      
             <br><br> 
            <h4>包含属性：</h4>   
                 id  select_type  table  type  possible_keys  key   key_len  ref   rows  Extra  <br>  <br> 


               <h5>id:查询顺序</h5>  
                    select 查询的序列号，包含一组数字，表示查询中执行的select 子句或操作表的顺序 <br>  <br> 
                    值：id 相同 （查询多个表时） <br> 
                            普通查询 ，查询顺序是一样的，由上到下执行 <br>  <br> 
                        Id不相同：（查询多个表时） <br> 
                            如果是子查询，id 序列号会递增 ，id值越大越优先查询 <br>  <br> 
                        id相同+不同： <br> 
                            一般是有一个虚表， from (select * ...) 这种情况下 虚表会认为是衍生表 table 属性是 derivcer id <br> 
                            id 如果相同，可以认为是一组，从上往下顺序执行， <br> 
                            id不同，id越大越先执行 <br> <br> 

                <h5>select_type: 查询语句类型</h5>
                    常用值： <br> 
                        simple,primary,subquery,derived,union,union result <br>  <br> 

                        simple: 简单的 select 查询 不包含子查询 或 union <br> 

                        primary: 查询中包含任何复杂的子查询，最外层标记为primary （如两表做UNION或者存在子查询的外层的表操作为PRIMARY，内层的操作为UNION） <br> 

                        subquery: select 或者 where 中包含子查询 <br> 

                        derived:再from中包含的子查询（虚表 from (select * ...) ) 这种被标记为deriver,mysql会递归执行这些子查询，把结果放在临时表里 <br> 

                        union：：若第二个select 出现在union中，则会被标记为union。若union包含再from子句的子查询中，外层select将标记为derived <br> 

                        union result:从union表获取结果的select  <br> <br> 
                
                <h5>table： 表</h5>
                    来自那个表 有别名返回的就是别名<br> <br> 
                
                <h5>type:     访问类型排序</h5>
                    显示查询使用的是那种类型 <br> 
                    常用值： <br> 
                        all index range ref eq_ref const,system null <br>  <br> 

                    从最好到最差依次是   <br> 
                        
                        system > const > eq_ref > ref > range > index >all <br> 

                        system 表只有一行记录，也是const类型的特例 <br> 

                        const 表示通过索引一次就查到了，const 用于比较primary key 或unique索引。因为只匹配一行数据，所以很快 <br> 

                        eq_ref 唯一性索引扫描，对于每个索引，表中只有一条记录与之匹配。常用于主键或唯一索引 e.g. 员工表搜索ceo  id= 1这种只匹配一个 <br> 

                    *   ref    非唯一索引扫描，返回匹配某个单独值得所有行。一般是复合索引  e.g. 员工表搜索保洁   job = "保洁" 匹配一堆 <br> 

                    *   range 范围搜索，使用索引选择行，一般是where中使用between and,in 等 <br> 

                        index 遍历全部得索引和树 <br> 

                         all 全表扫描 <br> <br> 

                <h5>possible_keys：</h5>
                    此次查序可能用到得全部索引，不一定真的被用到 <br> <br> 
                
                <h5>key:</h5>
                    实际用到得索引 <br> 

                    若查询中使用了覆盖索引，则该索引仅能出现在key 中 <br>  <br> 
                    e.g.
                        create index c1_c2 on student(c1,c2); <br> 

                        select c1,c2 from student; <br> 

                        这里理论上 possible_keys什么都用不上，但是select 得 c1,c2 和索引 c1_c2 里得顺序一模一样，所以还是用了 索引 <br> 
            <br> 
                <h5>key_len</h5>
                    索引中使用的字节数 长度越短越好 <br> <br> 
                
                <h5>ref:</h5>
                    显示索引得哪一列被使用了，如果可能的话，是一个常数。哪些列或常量被用于查找索引列上得值 <br> 
                    值： <br> 
                        const 常量 <br> 
                        school.student.name    引用了school库 studnet 表 name 字段 <br> <br> 
                <h5>rows：</h5>
                    大致估算找到所需记录得行数 <br> <br> 
                
                <h5>Extra:</h5>
                    包含不适合再其他字段显示得信息 <br> 
                    值： <br> 
                        using filesort ： 坏 <br> 
                                mysql 会使用一个外部的索引排序，而不是按照表内索引进行读取 <br>  <br> 

                        using temporary :  坏 <br> 
                                使用了临时表保存数据 常见于 order by 和 group by    (group by ,order by 尽量按照所建索引个数顺序进行书写)      <br>    
                                e.g.<br> 
                                     create index index_c1_c2 on student(c1,c2); <br> 

                                     explain select c1 from student where c1 in ('ac','ab') group by c1  <br> 

                                        -> extra:  using filesort , using temporary , using index , using where  <br> 
                                    总结 ： 效率低下 索引和条件不一致 <br> 
    
                                     explain select c1 from student where c1 in ('ac','ab') group by c1 , c2 <br> 

                                        -> extra:  using index for group-by , using where  <br> 
                                    总结 ： 效率高效 索引和条件一致 <br>  <br> 
                        
                        Using  index: 好 <br> 
                                表示select 中使用了覆盖索引，避免访问了表得数据行，效率不错!!!!如果同时出现using where ,表明索引被用来执行 <br> 
                                索引键值得查找 <br> 

                                覆盖索引：Covering index  查询列被索引覆盖，顺序内容完全一致，不需要读取数据得行 <br>  <br> 
                        
                        using where : <br> 
                                使用了where 过滤 <br>  <br> 
                        using join buffer : <br> 
                                使用了连接缓存 <br>  <br> 
                        impossible where: <br> 
                                where 子句总是false ，不能用来获取任何元组 <br> 
                                e.g.  select * from s where age  =11 and age = 100 <br>  <br> 
      

    


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
                pattern: 'id:查询顺序',
                describe: 
               " select 查询的序列号，包含一组数字，表示查询中执行的select 子句或操作表的顺序  "+
                    "值：id 相同 （查询多个表时）                    "+
                            "普通查询 ，查询顺序是一样的，由上到下执行            "+
                        "Id不相同：（查询多个表时）  "+
                            "如果是子查询，id 序列号会递增 ，id值越大越优先查询"+
                        "id相同+不同："+
                            "一般是有一个虚表， from (select * ...) 这种情况下 虚表会认为是衍生表 table 属性是 derivcer id"+
                           " id 如果相同，可以认为是一组，从上往下顺序执行，"+
                            "id不同，id越大越先执行"
                
                
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
      .MySQLSeniorExplain .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 3800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorExplain .homeBottom1{
            position: relative;
            top: 3850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorExplain .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorExplain .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorExplain .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>