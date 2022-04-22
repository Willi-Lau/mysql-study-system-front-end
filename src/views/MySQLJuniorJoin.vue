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
           MySQL 连接的使用
          </h1>
       JOIN 按照功能大致分为如下三类：  
        1. INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。<br>
        2. LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。<br>
        3. RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。<br>
          <h3>INNER JOIN </h3>
          <img src="../assets/inner-join.png">
           <div class="info">
               <br>
               SELECT * FROM TABLEA INNER JOIN TABLEB  ON A.id = b.id<br>
               <br>
               
               </div><br><br>

            <br>

             <h3>MySQL LEFT JOIN </h3>
          <img src="../assets/left-join.png"><br>
            MySQL left join 与 join 有所不同。 MySQL LEFT JOIN 会读取左边数据表的全部数据，即便右边表无对应数据。
           <div class="info">
               <br>
               SELECT * FROM TABLEA LEFT JOIN TABLEB  ON A.id = b.id<br>
               <br>
               
               </div><br><br>

            <br>

             <h3>MySQL RIGHT JOIN </h3>
          <img src="../assets/right-join.png">
           <div class="info">
               <br>
               SELECT * FROM TABLEA RIGHT JOIN TABLEB  ON A.id = b.id<br>
               <br>
               
               </div><br><br>

            <br>


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