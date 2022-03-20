<template>
  <div class="MySQLJuniorOrderBy">
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
           MySQL 排序
          </h1>
        如果我们需要对读取的数据进行排序，我们就可以使用 MySQL 的 ORDER BY 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果。<br>

         在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。<br>
          <h3>语法 </h3>
          以下是 SQL SELECT 语句使用 ORDER BY 子句将查询数据排序后再返回数据：<br>
           <div class="info">
               <br>
               SELECT field1, field2,...fieldN FROM table_name1, table_name2...<br>
                ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]<br>
               <br>
               
               </div><br><br>

            <br>
            你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。<br>
            你可以设定多个字段来排序。<br>
            你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。<br>
            你可以添加 WHERE...LIKE 子句来设置条件。<br>
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
      .MySQLJuniorOrderBy .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLJuniorOrderBy .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLJuniorOrderBy .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorOrderBy .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorOrderBy .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>