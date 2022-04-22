<template>
  <div class="juniorchangetables">
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
            MySQL 创建数据表
          </h1>
         创建MySQL数据表需要以下信息：      <br><br>

                表名        <br>
                表字段名    <br>
                定义每个表字段  <br><br>
            以下为创建MySQL数据表的SQL通用语法： <br><br>
               <div class="info">CREATE TABLE table_name (column_name column_type);</div><br><br>
               以下例子中我们将在 RUNOOB 数据库中创建数据表runoob_tbl： <br><br>
               <div class="info">
                   <br>
                CREATE TABLE IF NOT EXISTS `runoob_tbl`(><br>
                `runoob_id` INT UNSIGNED AUTO_INCREMENT,><br>
                `runoob_title` VARCHAR(100) NOT NULL,><br>
                `runoob_author` VARCHAR(40) NOT NULL,><br>
                `submission_date` DATE,><br>
                PRIMARY KEY ( `runoob_id` )><br>
                )ENGINE=InnoDB DEFAULT CHARSET=utf8;><br><br>
                   
                   
                   </div><br><br>
      </div>  
      <div class="d2">
          <h1>
            MySQL 删除数据表
          </h1>
         创建MySQL数据表需要以下信息：      <br><br>

                MySQL中删除数据表是非常容易操作的，但是你在进行删除表操作时要非常小心，因为执行删除命令后所有数据都会消失。        <br>
            以下为创建MySQL数据表的SQL通用语法： <br><br>
               <div class="info">DROP TABLE table_name ;</div><br><br>
            
      </div>   
      <div class="d3">
            <h1>
                MySQL 修改数据表 / MySQL ALTER命令
            </h1>
            当我们需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。      <br><br>
            <h3>删除，添加或修改表字段</h3>
            如下命令使用了 ALTER 命令及 DROP 子句来删除以上创建表的 i 字段：<br><br>
            <div class="info">ALTER TABLE tableName  DROP i;</div><br><br>
            如果数据表中只剩余一个字段则无法使用DROP来删除字段。<br><br>
            MySQL 中使用 ADD 子句来向数据表中添加列，如下实例在表 testalter_tbl 中添加 i 字段，并定义数据类型:<br>
            <div class="info">ALTER TABLE tableName ADD i Type;</div><br><br>  
            执行以上命令后，i 字段会自动添加到数据表字段的末尾。<br><br>  
            如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。<br><br>
             <div class="info">
                <br>
                
                    ALTER TABLE tableName ADD i TYPE FIRST;<br>
                    ALTER TABLE tableName ADD i TYPE AFTER INDEX;<br>
                <br>
            </div><br><br>
     
            <h3>修改字段类型及名称</h3>  
            你可以使用 ALTER 来修改字段的默认值 <br><br>
            <div class="info">ALTER TABLE Table MODIFY c CHAR(10);</div><br><br>
            使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。尝试如下实例：<br><br>
            <div class="info">ALTER TABLE tableName CHANGE i j BIGINT;</div><br><br>
            <h3>修改字段默认值</h3>  
        如果需要修改字段类型, 你可以在ALTER命令中使用 MODIFY <br><br>
            <div class="info">ALTER TABLE tableName ALTER i SET DEFAULT 1000</div><br><br>
            使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。尝试如下实例：<br><br>
            <div class="info">ALTER TABLE tableName ALTER i DROP DEFAULT;</div><br><br>
            <h3>修改表名</h3>  
        如果需要修改数据表的名称，可以在 ALTER TABLE 语句中使用 RENAME 子句来实现。<br><br>
            <div class="info">ALTER TABLE tableName RENAME TO alter_tbl;</div><br><br>
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
        token:this.$route.query.token
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
 components: { HelloWorld,Mysql },
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
     .juniorchangetables .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 2800px;
            bottom:0px;
            z-index: 1;
      }
     .juniorchangetables .homeBottom1{
            position: relative;
            top: 2850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
       .juniorchangetables .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .juniorchangetables .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 570px;

      /* border-bottom: solid 1px #484a50; */
    }
    .juniorchangetables .d2{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 270px;

      /* border-bottom: solid 1px #484a50; */
    }
     .juniorchangetables .d3{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 1570px;
         
    
      /* border-bottom: solid 1px #484a50; */
    }
   .juniorchangetables .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;

    }
</style>