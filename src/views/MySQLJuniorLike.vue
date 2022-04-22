<template>
  <div class="MySQLJuniorLike">
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
           MySQL LIKE 子句
          </h1>
         我们知道在 MySQL 中使用 SQL SELECT 命令来读取数据， 同时我们可以在 SELECT 语句中使用 WHERE 子句来获取指定的记录。<br>

        WHERE 子句中可以使用等号 = 来设定获取数据的条件，如 "runoob_author = 'RUNOOB.COM'"。<br>

        但是有时候我们需要获取 runoob_author 字段含有 "COM" 字符的所有记录，这时我们就需要在 WHERE 子句中使用 SQL LIKE 子句。<br>

        SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于UNIX或正则表达式中的星号 *。<br>

        如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。<br>

          你可以通过 mysql> 命令提示窗口中在数据库中查询数据<br>
          <h3>语法 </h3>
          以下是 SQL SELECT 语句使用 LIKE 子句从数据表中读取数据的通用语法：<br>
           <div class="info">
                <br>
               SELECT field1, field2,...fieldN  <br>
                FROM table_name <br>
                WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue' <br>
               <br>
               
            </div><br><br>

               1. 你可以在 WHERE 子句中指定任何条件。  <br>
               2. 你可以在 WHERE 子句中使用LIKE子句。 <br>
               3. 你可以使用LIKE子句代替等号 =。 <br>
               4. LIKE 通常与 % 一同使用，类似于一个元字符的搜索。 <br>
               5.  你可以使用 AND 或者 OR 指定一个或多个条件。 <br>
                6. 你可以在 DELETE 或 UPDATE 命令中使用 WHERE...LIKE 子句来指定条件。 <br>
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
      .MySQLJuniorLike .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLJuniorLike .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLJuniorLike .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorLike .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorLike .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>