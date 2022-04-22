<template>
  <div class="MySQLSeniorIndex1">
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
           MySQL 索引
          </h1>
            MySQL索引的建立对于MySQL的高效运行是很重要的，索引可以大大提高MySQL的检索速度。 <br>

            打个比方，如果合理的设计且使用索引的MySQL是一辆兰博基尼的话，那么没有设计和使用索引的MySQL就是一个人力三轮车。<br>

            拿汉语字典的目录页（索引）打比方，我们可以按拼音、笔画、偏旁部首等排序的目录（索引）快速查找到需要的字。<br>

            索引分单列索引和组合索引。单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。
<br>
            创建索引时，你需要确保该索引是应用在 SQL 查询语句的条件(一般作为 WHERE 子句的条件)。
<br>
            实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。
<br>
            上面都在说使用索引的好处，但过多的使用索引将会造成滥用。因此索引也会有它的缺点：虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。
<br>
            建立索引会占用磁盘空间的索引文件。<br>

            <h3>普通索引</h3>
            创建索引
           <div class="info">

               CREATE INDEX indexName ON table_name (column_name)
               <br> 
               ALTER table tableName ADD INDEX indexName(columnName)
               <br>
            
      </div>  
        删除索引的语法
        <div class="info">
             DROP INDEX [indexName] ON mytable; 
            
      </div>  
        <h3>唯一索引</h3>
        它与前面的普通索引类似，不同的就是：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。它有以下几种创建方式：
        <div class="info">

              CREATE UNIQUE INDEX indexName ON mytable(username(length)) 
               <br> 
               ALTER table mytable ADD UNIQUE [indexName] (username(length))
               <br>
            
      </div>  
      <h3>主键索引</h3>
       <div class="info">

            ALTER TABLE testalter_tbl ADD PRIMARY KEY (i);
            
      </div>  
      删除索引的语法
        <div class="info">
            ALTER TABLE testalter_tbl DROP PRIMARY KEY;
            
      </div>  
      <h3>显示索引信息</h3>
        <div class="info">
           SHOW INDEX FROM table_name\G
            
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
      .MySQLSeniorIndex1 .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorIndex1 .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorIndex1 .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorIndex1 .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorIndex1 .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>